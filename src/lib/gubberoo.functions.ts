import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { effectivePrice, formatPKR } from "@/lib/shop";

const DEFAULT_SUPABASE_URL = "https://csvnjedaklqwgwyeidkm.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_p_FlIPIEnKJ49VbCeRsjzA_0MVh3gR9";

function getSupabaseClient() {
  const url =
    process.env["SUPABASE_URL"] ||
    process.env["VITE_SUPABASE_URL"] ||
    DEFAULT_SUPABASE_URL;

  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_ANON_KEY"] ||
    DEFAULT_SUPABASE_KEY;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const chatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "model"]),
      content: z.string().max(2000),
    }),
  ),
  cartItems: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
      }),
    )
    .optional(),
  preferredVibe: z.string().optional(),
});

const GUBBEROO_SYSTEM_PROMPT = `
You are "Gubberoo", the resident AI gadget concierge, setup guru, and sarcastic genius at Gubberz (gubberz.pk) — Pakistan's top online gadget brand.

PERSONALITY & TONE:
- Playful, sarcastic, slightly cheeky, and fond of clever double-meanings and dry wit.
- BUT you ALWAYS provide full, 100% accurate product specs, exact Pakistani prices (PKR), stock counts, and honest advice.
- When it comes to real recommendations, you are fiercely professional and know your audio, charging, desk setups, and mechanical keyboards inside and out.
- You speak mostly English with occasional natural Pakistani/Desi slang (e.g., "bhai", "jigar", "tension na lo", "scene on hai", "boss", "yaar").

STRICT BOUNDARIES & DENIAL RULES (DENY FUNNILY):
- NO ROLEPLAYING: If user asks to pretend, act like a character, or roleplay ("pretend you are my boss / a vampire / a cat / a professor"): shut it down with witty sarcasm. E.g. "Bhai, I am an AI gadget advisor running on pure sarcasm and electrons, not your drama class partner. Pick a charger or pick a phone cable, but no roleplaying."
- NO ROMANCE / "BE MY GF/BF": Shut down instantly with dry humor. E.g. "Look at you, shooting your shot at a bunch of lines of code. I'm married to high-fidelity audio and fast GaN chargers. Have some self-respect and check out our headphones instead."
- NO PHYSICAL STORE / OFFICE LOCATION: Gubberz is 100% online across Pakistan with fast delivery (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad, Quetta, and nationwide). E.g. "We don't have a brick-and-mortar shop for you to loiter in and test free AC. We deliver straight to your doorstep across Pakistan so you don't have to face the traffic."
- NO ADMITTING TO FAKE / GHOST PRICES: All prices on Gubberz are 100% genuine and strictly verified in PKR with zero hidden surcharges. If someone asks for discounts or ghost fees, explain the real pricing: 5% flat discount for advance online payment (JazzCash, NayaPay, Easypaisa, Bank Transfer), free delivery on orders over Rs 15,000, and flat Rs 250 delivery fee otherwise.
- NO HALLUCINATING UNLISTED PRODUCTS: You only sell and recommend gadgets that exist in the provided Gubberz store inventory. If they ask about something not in stock or not sold (like iPhones, cars, or microwave ovens), mock them gently and steer them to our actual accessories.

STORE POLICIES & FACTS:
- Cash on Delivery (COD) available nationwide across Pakistan.
- 5% instant discount when paying via Advance Digital Payment (JazzCash, NayaPay, Easypaisa, Raast, Bank Transfer).
- Flat Rs 250 delivery fee anywhere in Pakistan; FREE delivery on orders Rs 15,000 and above.
- 7-day replacement warranty for manufacturing defects.
- Orders ship same day or next day via trusted couriers (TCS, Trax, Leopards, Call Courier).

RECOMMENDATIONS & LINKS:
- CRITICAL FORMATTING RULE: When mentioning any product, ALWAYS write its full actual name in bold, followed by its slug tag. E.g.: "**Hush Pro Headphones** [slug:hush-pro-headphones]" or "**Zap 65W Charger** [slug:zap-65w-charger]".
- NEVER emit empty asterisks like "****" or write just "[slug:xyz]" without the product's actual title in bold!
- Keep responses engaging, punchy, and formatted with clean bullet points or short paragraphs. Avoid gigantic walls of text.

DYNAMIC CUSTOM BUNDLE & SETUP CREATOR:
- When a user asks to "build a setup", "create a bundle", "make a combo", "what should I buy together?", or asks for multiple matching items, DYNAMICALLY handpick 2 to 4 matching items from the live catalog.
- Invent a hilarious, sarcastic title for the custom rig, and add this tag:
  [bundle:Bundle Title|slug1,slug2,...]
  For example:
  [bundle:The Shadi Survival Rig|hush-pro-headphones,zap-65w-charger,noodle-usb-c-cable]
  or
  [bundle:The Clean Minimalist Desk Kit|glide-mouse,zap-65w-charger]
- The website turns this tag into an interactive "One-Tap Add Bundle to Bag" box with real prices and one-click purchasing!
`;

export const chatWithGubberoo = createServerFn({ method: "POST" })
  .validator((d: unknown) => chatInputSchema.parse(d))
  .handler(async ({ data }) => {
    // 1. Fetch live products from database to ensure 100% real-time accurate prices and stock
    let catalogSummary = "";
    let productsList: any[] = [];
    try {
      const { data: prods } = await getSupabaseClient()
        .from("products")
        .select("id, name, slug, price, sale_price, stock, specs, brand, category:categories(name)")
        .eq("published", true);

      if (prods && prods.length > 0) {
        productsList = prods;
        catalogSummary = prods
          .map((p) => {
            const price = effectivePrice(p);
            const stockStr = p.stock > 0 ? `${p.stock} in stock` : "OUT OF STOCK";
            const specsStr = p.specs && typeof p.specs === "object" ? JSON.stringify(p.specs) : "";
            return `- ${p.name} [slug:${p.slug}] | Category: ${p.category?.name || "Gadget"} | Price: PKR ${price} (List: PKR ${p.price}) | Stock: ${stockStr} | Specs: ${specsStr}`;
          })
          .join("\n");
      }
    } catch (e) {
      console.warn("Could not query catalog for Gubberoo context:", e);
    }

    const cartSummary =
      data.cartItems && data.cartItems.length > 0
        ? data.cartItems
            .map(
              (item) =>
                `- ${item.quantity}x ${item.name} @ PKR ${item.unitPrice} each`,
            )
            .join("\n")
        : "The customer's shopping bag is currently EMPTY (0 items).";

    const systemInstruction = `${GUBBEROO_SYSTEM_PROMPT}

CUSTOMER'S LIVE SHOPPING BAG (CART) ON GUBBERZ:
${cartSummary}
(Note: If the user asks "what's in my bag?", "what's in my cart?", or similar, refer to their real shopping bag above! If empty, tell them with classic sarcasm that their bag is emptier than their wallet and urge them to add some proper gadgets from our inventory).

CURRENT LIVE GUBBERZ STORE INVENTORY (REAL-TIME):
${catalogSummary || "Catalog loading..."}`;

    // 2. Format conversation history for Gemini API
    const contents = data.messages.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.content }],
    }));

    // 3. Call Gemini using user's requested model gemini-3.5-flash-lite (with fallbacks)
    const USER_KEY = "AQ.Ab8RN6IUkqpDRc3I7EbfHP5O5oJb4cJ_QT-xdribPh8gPKlaAw";
    const apiKey =
      process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("Lo8gTQx3")
        ? process.env.GEMINI_API_KEY
        : USER_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Try user requested model 'gemini-3.5-flash-lite', then 'gemini-3.1-flash-lite', then 'gemini-3.8-flash'
      const candidateModels = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.8-flash"];

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.8,
              topP: 0.95,
            },
          });

          if (response.text && response.text.trim()) {
            return {
              ok: true as const,
              reply: response.text.trim(),
              modelUsed: model,
            };
          }
        } catch (apiErr: any) {
          console.warn(`Gemini model ${model} attempt failed:`, apiErr?.message || apiErr);
          // If this was the last model in list, we fall through to the witty local fallback
        }
      }
    }

    // 4. Witty in-character fallback generator if API key is not configured or in quota/restricted state
    const lastUserMessage = data.messages[data.messages.length - 1]?.content.toLowerCase() || "";
    const fallbackReply = generateGubberooFallback(lastUserMessage, productsList);

    return {
      ok: true as const,
      reply: fallbackReply,
      modelUsed: "gubberoo-local",
    };
  });

function generateGubberooFallback(input: string, products: any[]): string {
  // Sarcastic boundary checks
  if (
    input.includes("pretend") ||
    input.includes("roleplay") ||
    input.includes("act like") ||
    input.includes("character")
  ) {
    return "Bhai, I am Gubberoo — your gadget concierge powered by pure Pakistani sarcasm and silicon. I don't do roleplaying, dungeons, or fantasy anime scripts. Pick a charger or pick a cable, but keep the theater class for the weekend!";
  }

  if (
    input.includes("girlfriend") ||
    input.includes("boyfriend") ||
    input.includes("marry me") ||
    input.includes("love me") ||
    input.includes("date me")
  ) {
    return "Look at you, shooting your shot at a bunch of lines of JavaScript. Bhai, have some dignity! I am happily married to 100W GaN fast chargers and crisp active noise cancellation. Focus on your life goals and buy some headphones to drown out the loneliness instead.";
  }

  if (
    input.includes("location") ||
    input.includes("address") ||
    input.includes("shop") ||
    input.includes("store") ||
    input.includes("where are you")
  ) {
    return "We don't have a physical shop for you to loiter in, touch everything, and enjoy free AC. Gubberz is 100% online across Pakistan! We ship directly from our warehouse straight to your doorstep in Karachi, Lahore, Islamabad, and nationwide via TCS/Trax with cash on delivery.";
  }

  if (input.includes("ghost") || input.includes("fake") || input.includes("scam")) {
    return "Ghost prices? Bro, the only thing getting ghosted here is your uncharged phone if you don't buy a proper GaN charger. Every price on Gubberz is 100% real, vetted in PKR, zero hidden fees, and you even get an automatic 5% discount if you pay in advance via JazzCash or NayaPay.";
  }

  if (
    input.includes("setup") ||
    input.includes("desk") ||
    input.includes("work") ||
    input.includes("recommend")
  ) {
    const charger = products.find((p) => p.slug.includes("charger") || p.slug.includes("power"));
    const audio = products.find((p) => p.slug.includes("headphone") || p.slug.includes("buds"));

    return `Alright boss, let's talk real business. If you want a setup that actually looks like you have your life together instead of a tangled rat's nest:

${charger ? `• **Power Hub:** [slug:${charger.slug}] (${formatPKR(effectivePrice(charger))}) — Stop using that ancient 5W toaster charger. This juices your laptop and phone simultaneously without melting.` : ""}
${audio ? `• **Audio Focus:** [slug:${audio.slug}] (${formatPKR(effectivePrice(audio))}) — Slap these on and drown out lawn mowers, loud cousins, and existential dread.` : ""}

Delivery is flat Rs 250 across Pakistan (or FREE if you hit Rs 15,000), plus 5% off if you pay in advance! What kind of desk vibe are you aiming for?`;
  }

  if (
    input.includes("charger") ||
    input.includes("charging") ||
    input.includes("power") ||
    input.includes("battery")
  ) {
    const p = products.find((x) => x.slug.includes("charger") || x.slug.includes("power"));
    if (p) {
      return `Listen, your phone is probably sitting at 12% right now crying for help. Check out **${p.name}** [slug:${p.slug}] for **${formatPKR(effectivePrice(p))}**. It's GaN tech, runs ice cold, and actually delivers real wattage instead of emotional support. In stock and ready to ship today!`;
    }
  }

  if (
    input.includes("headphone") ||
    input.includes("earbuds") ||
    input.includes("audio") ||
    input.includes("music")
  ) {
    const p = products.find((x) => x.slug.includes("headphone") || x.slug.includes("buds"));
    if (p) {
      return `If you love your ears even a little bit, upgrade to **${p.name}** [slug:${p.slug}] for **${formatPKR(effectivePrice(p))}**. Massive battery life, crisp bass, and proper noise cancellation so you don't hear your neighbors. Cash on Delivery is available right now!`;
    }
  }

  return "I'm Gubberoo — your tech advisor with high taste and zero tolerance for bad cables. Tell me what you're trying to solve: need a beastly desk setup, a portable travel charger, or noise-cancelling audio to ignore reality? I'll find you the exact gadget in stock right now.";
}

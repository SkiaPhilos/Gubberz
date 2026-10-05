import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  Bot,
  User,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { productsQuery, formatPKR, imageSrc, effectivePrice } from "@/lib/shop";
import { useCart } from "@/lib/cart";
import { chatWithGubberoo } from "@/lib/gubberoo.functions";
import sitter from "@/assets/characters/sitter.png";

type ChatMessage = {
  id: string;
  role: "user" | "model";
  content: string;
};

const INITIAL_GREETING: ChatMessage = {
  id: "init",
  role: "model",
  content:
    "Sup! I'm **Gubberoo** — Gubberz's resident gadget concierge and tech genius. Tell me about your tragically unorganized desk, or ask me which charger won't fry your phone. \n\n*(And no, I won't roleplay a vampire or be your girlfriend. Keep it strictly tech, boss).* What are you shopping for?",
};

const SUGGESTED_PROMPTS = [
  "Build me a clean desk setup",
  "Give me a travel gadget combo",
  "Best headphones for loud cousins",
  "What's in my bag?",
  "Which charger is best for my phone?",
  "Are your prices real or ghost prices?",
];

function renderInlineFormatted(str: string): React.ReactNode[] {
  // Parses **bold** and *italic* cleanly into JSX
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(str.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-bold text-foreground">
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < str.length) {
    parts.push(str.slice(lastIndex));
  }

  return parts;
}

export function GadgetAdvisorModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: allProducts } = useQuery(productsQuery());
  const cart = useCart();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsTyping(true);

    try {
      const res = await chatWithGubberoo({
        data: {
          messages: newHistory
            .filter((m) => m.id !== "init")
            .map((m) => ({ role: m.role, content: m.content })),
          cartItems: cart.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      });

      if (res.ok && res.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "model",
            content: res.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "model",
            content:
              "My sarcastic neurons tripped over a loose wire. Try asking me again, boss!",
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "model",
          content:
            "My sarcastic neurons tripped over a loose wire. Ask me about our headphones, chargers, or cables and I'm right back on!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_GREETING]);
    setInput("");
    toast.success("Gubberoo memory refreshed!");
  };

  // Helper to extract [slug:...] tags, dynamic bundles, restore product names, and render interactive cards
  const renderMessageContent = (content: string) => {
    // 0. Extract dynamic bundles if created by Gubberoo
    const bundleRegex = /\[bundle:([^|\]]+)\|([a-z0-9,-]+)\]/g;
    const dynamicBundles: { title: string; slugs: string[] }[] = [];
    let bMatch: RegExpExecArray | null;

    while ((bMatch = bundleRegex.exec(content)) !== null) {
      const title = bMatch[1].trim();
      const slugs = bMatch[2]
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (slugs.length > 0) {
        dynamicBundles.push({ title, slugs });
      }
    }

    // 1. Collect all mentioned product slugs for cards
    const slugRegex = /\[slug:([a-z0-9-]+)\]/g;
    const mentionedSlugs: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = slugRegex.exec(content)) !== null) {
      if (!mentionedSlugs.includes(match[1])) {
        mentionedSlugs.push(match[1]);
      }
    }

    // 2. Clean up text and restore missing product names:
    // Strip [bundle:...] from prose
    let cleaned = content.replace(/\[bundle:[^\]]+\]/g, "");

    // If the model output **[slug:xyz]**, replace with **Product Name**
    cleaned = cleaned.replace(/\*\*\[slug:([a-z0-9-]+)\]\*\*/g, (_, slug) => {
      const prod = allProducts?.find((p) => p.slug === slug);
      return `**${prod ? prod.name : slug}**`;
    });

    // If the model output "[slug:xyz]", replace with Product Name if not already preceded by bold name
    cleaned = cleaned.replace(
      /(\*\*[^*]+\*\*\s*)?\[slug:([a-z0-9-]+)\]/g,
      (fullMatch, prefix, slug) => {
        if (prefix && prefix.trim().length > 0) {
          return prefix.trim();
        }
        const prod = allProducts?.find((p) => p.slug === slug);
        return `**${prod ? prod.name : slug}**`;
      },
    );

    // If there are stray empty asterisks like **** or *** from stripped tokens, eliminate them
    cleaned = cleaned.replace(/\*\*\s*\*\*/g, "");

    // 3. Format lines (bullet points, bold tags, paragraphs)
    const paragraphs = cleaned.split("\n\n");

    return (
      <div className="space-y-3">
        <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
          {paragraphs.map((para, pIdx) => {
            const lines = para.split("\n");
            return (
              <div key={pIdx} className="space-y-1">
                {lines.map((line, lIdx) => {
                  const trimmed = line.trim();
                  const isBullet =
                    trimmed.startsWith("* ") ||
                    trimmed.startsWith("- ") ||
                    trimmed.startsWith("• ");
                  const textOnly = isBullet
                    ? trimmed.replace(/^[*•-]\s+/, "")
                    : line;

                  return (
                    <div
                      key={lIdx}
                      className={isBullet ? "flex items-start gap-1.5 pl-1" : ""}
                    >
                      {isBullet && (
                        <span className="text-primary mt-1 select-none font-bold text-xs">
                          •
                        </span>
                      )}
                      <span className="flex-1">
                        {renderInlineFormatted(textOnly)}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Render Curated Dynamic Bundles if Gubberoo built a custom rig */}
        {dynamicBundles.map((b, bIdx) => {
          const bundleProducts = b.slugs
            .map((slug) => allProducts?.find((p) => p.slug === slug))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));

          if (bundleProducts.length === 0) return null;
          const bundleTotal = bundleProducts.reduce(
            (sum, p) => sum + effectivePrice(p),
            0,
          );
          const allInStock = bundleProducts.every((p) => p.stock > 0);

          const handleAddBundle = () => {
            let count = 0;
            bundleProducts.forEach((p) => {
              if (p.stock > 0) {
                cart.addItem({
                  productId: p.id,
                  name: p.name,
                  slug: p.slug,
                  unitPrice: effectivePrice(p),
                  image: p.images[0] ?? "",
                  quantity: 1,
                });
                count++;
              }
            });
            toast.success(`Added ${count} items from "${b.title}" to your bag!`);
          };

          return (
            <div
              key={bIdx}
              className="mt-3 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-surface/90 to-surface p-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-border/50">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Sparkles className="h-4 w-4 text-primary shrink-0 animate-pulse" />
                  <span className="font-bold text-xs sm:text-sm text-foreground truncate">
                    {b.title}
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary tracking-wide">
                  Gubberoo Rig
                </span>
              </div>

              <div className="space-y-1.5 mb-3">
                {bundleProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-xs py-0.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="truncate text-foreground/90 font-medium">
                        {p.name}
                      </span>
                    </div>
                    <span className="font-mono text-muted-foreground font-semibold shrink-0 ml-2">
                      {formatPKR(effectivePrice(p))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-border/50">
                <div>
                  <span className="text-[10px] uppercase font-mono text-muted-foreground block">
                    Combined Setup Total
                  </span>
                  <span className="font-mono text-sm font-black text-primary">
                    {formatPKR(bundleTotal)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundle}
                  disabled={!allInStock}
                  className="press flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:brightness-110 disabled:opacity-50 cursor-pointer"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {allInStock
                    ? `Add Entire Setup (${bundleProducts.length} Items)`
                    : "Some Items Out of Stock"}
                </button>
              </div>
            </div>
          );
        })}

        {/* Render interactive product cards if Gubberoo cited any gadgets */}
        {mentionedSlugs.length > 0 && allProducts && (
          <div className="mt-3 space-y-2 pt-2 border-t border-border/50">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1">
              <Zap className="h-3 w-3 text-primary" /> Mentioned in Recommendation:
            </span>
            <div className="grid gap-2">
              {mentionedSlugs.map((slug) => {
                const prod = allProducts.find((p) => p.slug === slug);
                if (!prod) return null;
                const price = effectivePrice(prod);
                const isOutOfStock = prod.stock <= 0;

                return (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-background/90 p-2.5 shadow-xs transition-all hover:border-primary/40"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={imageSrc(prod.images[0])}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-xl bg-surface object-contain mix-blend-multiply p-0.5"
                      />
                      <div className="min-w-0">
                        <Link
                          to="/product/$slug"
                          params={{ slug: prod.slug }}
                          onClick={() => setOpen(false)}
                          className="truncate text-xs font-bold text-foreground hover:text-primary transition-colors block"
                        >
                          {prod.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-xs font-bold text-primary">
                            {formatPKR(price)}
                          </span>
                          <span
                            className={`font-mono text-[10px] ${
                              isOutOfStock
                                ? "text-destructive font-bold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {isOutOfStock ? "Out of stock" : `${prod.stock} in stock`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        to="/product/$slug"
                        params={{ slug: prod.slug }}
                        onClick={() => setOpen(false)}
                        className="press rounded-lg bg-surface p-1.5 text-muted-foreground hover:text-foreground"
                        title="View Product"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => {
                          cart.add({
                            id: prod.id,
                            slug: prod.slug,
                            name: `${prod.name} (Gubberoo Pick)`,
                            image: prod.images[0] ?? "",
                            unitPrice: price,
                            listPrice: prod.price,
                            stock: prod.stock,
                          });
                          toast.success(`${prod.name} added to your bag!`, {
                            action: {
                              label: "View bag",
                              onClick: () => cart.setOpen(true),
                            },
                          });
                        }}
                        className="press flex items-center gap-1 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold text-primary-foreground disabled:opacity-40"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* TRIGGER BUTTON - STACKED NEATLY ABOVE WHATSAPP */}
      <button
        onClick={() => setOpen(true)}
        className="press fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xl transition-all hover:scale-105 active:scale-95"
        aria-label="Ask Gubberoo AI Setup Advisor"
      >
        <Sparkles className="h-4 w-4 fill-current animate-spin-slow" />
        <span className="font-semibold">Ask Gubberoo · Setup</span>
        <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
      </button>

      {/* GUBBEROO CHAT MODAL */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative flex h-[85vh] sm:h-[620px] w-full max-w-md flex-col rounded-t-3xl sm:rounded-3xl border border-border/80 bg-background shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/70 bg-surface/50 px-4 py-3.5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden">
                    <img
                      src={sitter}
                      alt="Gubberoo"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-success ring-1 ring-background" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-extrabold text-foreground">Gubberoo</h3>
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[9px] uppercase font-bold text-primary">
                        AI Concierge
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      Sarcastic, opinionated & fully stocked
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="press rounded-full p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
                    title="Reset Chat"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="press rounded-full p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        m.role === "user"
                          ? "bg-ink text-ink-foreground"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5" />
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-xs ${
                        m.role === "user"
                          ? "bg-ink text-ink-foreground rounded-tr-xs"
                          : "bg-surface border border-border/60 text-foreground rounded-tl-xs"
                      }`}
                    >
                      {m.role === "model" ? (
                        renderMessageContent(m.content)
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="rounded-2xl bg-surface border px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
                      <span className="font-mono text-[11px]">
                        Gubberoo is crafting a sarcastic answer
                      </span>
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts Bar */}
              <div className="border-t border-border/50 bg-background/60 px-3 py-2">
                <p className="px-1 text-[10px] font-mono uppercase text-muted-foreground font-semibold mb-1.5">
                  Try asking:
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="press shrink-0 rounded-full border border-border/80 bg-surface px-3 py-1 font-mono text-[11px] text-foreground hover:border-primary/40 hover:bg-primary/10 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 border-t border-border/70 bg-background p-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Gubberoo about gadgets, specs, setups…"
                  disabled={isTyping}
                  className="h-11 flex-1 rounded-2xl bg-surface px-4 text-xs sm:text-sm outline-none ring-primary focus:ring-2 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="press flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all"
                  aria-label="Send message to Gubberoo"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

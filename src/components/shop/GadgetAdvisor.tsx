import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Check, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { productsQuery, formatPKR, imageSrc, effectivePrice } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export function GadgetAdvisorModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState<string>("desk");
  const [priority, setPriority] = useState<string>("sound");
  const [budget, setBudget] = useState<string>("mid");

  const { data: allProducts } = useQuery(productsQuery());
  const cart = useCart();

  const reset = () => {
    setStep(1);
    setVibe("desk");
    setPriority("sound");
    setBudget("mid");
  };

  // Determine top matching products based on choices
  const getRecommendations = () => {
    if (!allProducts || allProducts.length === 0) return [];

    let pool = [...allProducts];

    if (vibe === "desk") {
      pool.sort((a, b) => (a.slug.includes("keyboard") || a.slug.includes("mouse") ? -1 : 1));
    } else if (vibe === "commute") {
      pool.sort((a, b) => (a.slug.includes("headphone") || a.slug.includes("power") ? -1 : 1));
    } else {
      pool.sort((a, b) => (a.slug.includes("buds") || a.slug.includes("cable") ? -1 : 1));
    }

    if (budget === "budget") {
      pool = pool.filter((p) => effectivePrice(p) <= 10000);
    }

    return pool.slice(0, 2);
  };

  const recommended = getRecommendations();
  const bundleTotal = recommended.reduce((sum, p) => sum + effectivePrice(p), 0);
  const discountedBundle = Math.round(bundleTotal * 0.9);

  const addSetupToCart = () => {
    recommended.forEach((p) => {
      cart.add({
        id: p.id,
        slug: p.slug,
        name: `${p.name} (Advisor Setup)`,
        image: p.images[0] ?? "",
        unitPrice: Math.round(effectivePrice(p) * 0.9),
        listPrice: p.price,
        stock: p.stock,
      });
    });
    toast.success("Setup bundle added to your bag with 10% discount!");
    setOpen(false);
    cart.setOpen(true);
  };

  return (
    <>
      {/* TRIGGER BUTTON - STACKED NEATLY ABOVE WHATSAPP WITH ZERO OVERLAP */}
      <button
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="press fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xl transition-all hover:scale-105"
        aria-label="Find my setup advisor"
      >
        <Sparkles className="h-4 w-4 fill-current" />
        <span>Find My Setup</span>
      </button>

      {/* ADVISOR MODAL */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl border max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 p-2 rounded-full hover:bg-surface text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header with Mascot */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">Gubberz Setup Advisor</h3>
                  <p className="text-xs text-muted-foreground">
                    Answer 3 quick questions to discover your ideal gadget kit
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 flex gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      step >= s ? "bg-primary" : "bg-surface"
                    }`}
                  />
                ))}
              </div>

              {/* STEP 1: Setting */}
              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-bold text-base">Where do you spend most of your time?</h4>
                  <div className="grid gap-3">
                    {[
                      { id: "desk", label: "Minimalist Desk / Work From Home", sub: "Focused on clean setup & ergonomics" },
                      { id: "commute", label: "Daily Commute & Travel", sub: "Noise cancellation & mobile battery power" },
                      { id: "casual", label: "Casual Everyday Carry", sub: "Compact, durable gear that fits in a pocket" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setVibe(opt.id);
                          setStep(2);
                        }}
                        className={`press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                          vibe === opt.id
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                            : "border-border/60 bg-surface hover:bg-muted"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Priority */}
              {step === 2 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-bold text-base">What feature matters most to you?</h4>
                  <div className="grid gap-3">
                    {[
                      { id: "sound", label: "Immersive Audio & ANC", sub: "Punchy sound profile with noise isolation" },
                      { id: "power", label: "Fast Charging & All-Day Battery", sub: "Never run out of battery on the road" },
                      { id: "typing", label: "Tactile Feel & Precision Control", sub: "Mechanical clack & smooth glide sensor" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPriority(opt.id);
                          setStep(3);
                        }}
                        className={`press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                          priority === opt.id
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                            : "border-border/60 bg-surface hover:bg-muted"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* STEP 3: Budget */}
              {step === 3 && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-bold text-base">What is your target budget?</h4>
                  <div className="grid gap-3">
                    {[
                      { id: "budget", label: "Budget Friendly (Under Rs 10,000)", sub: "Maximum value essentials" },
                      { id: "mid", label: "Sweet Spot (Rs 10,000 – Rs 25,000)", sub: "Best balanced performance & materials" },
                      { id: "pro", label: "Flagship / Pro Tier", sub: "Top tier acoustic & tactile hardware" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setBudget(opt.id);
                          setStep(4);
                        }}
                        className={`press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                          budget === opt.id
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                            : "border-border/60 bg-surface hover:bg-muted"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* STEP 4: Recommendations */}
              {step === 4 && (
                <div className="mt-6 space-y-5">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                      Your Curated Setup
                    </span>
                    <h4 className="mt-1 text-2xl font-extrabold tracking-tight">
                      Recommended by Gubberz
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {recommended.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border bg-surface p-3.5"
                      >
                        <img
                          src={imageSrc(item.images[0])}
                          alt=""
                          className="h-16 w-16 rounded-xl object-contain bg-background mix-blend-multiply border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.short_description}
                          </p>
                          <p className="font-mono text-xs font-bold text-primary mt-1">
                            {formatPKR(effectivePrice(item))}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bundle summary */}
                  <div className="rounded-2xl bg-surface/70 p-4 border flex items-center justify-between text-xs">
                    <div>
                      <p className="text-muted-foreground">Bundle Total (10% Off):</p>
                      <span className="font-mono text-lg font-black text-foreground">
                        {formatPKR(discountedBundle)}
                      </span>
                      <span className="ml-2 font-mono text-muted-foreground line-through">
                        {formatPKR(bundleTotal)}
                      </span>
                    </div>

                    <button
                      onClick={addSetupToCart}
                      className="press rounded-full bg-ink px-5 py-2.5 font-bold text-ink-foreground hover:bg-primary shadow-sm"
                    >
                      Add Setup to Bag
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={reset}
                      className="press flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="press text-xs font-semibold hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

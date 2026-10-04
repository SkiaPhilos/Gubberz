import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Truck, RefreshCw, CreditCard, HelpCircle, Check, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/shop";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Store Policies & Customer Protection — Gubberz" },
      {
        name: "description",
        content:
          "Official store policies for Gubberz: 7-day hassle-free replacement, nationwide shipping timelines, genuine warranty, and Cash on Delivery terms.",
      },
    ],
  }),
  component: PoliciesPage,
});

type PolicyTab = "returns" | "shipping" | "warranty" | "payments";

function PoliciesPage() {
  const [tab, setTab] = useState<PolicyTab>("returns");
  const { data: settings } = useQuery(settingsQuery);

  const cleanPhone = settings?.whatsappNumber?.replace(/\D/g, "") ?? "923000000000";

  return (
    <div className="mx-auto max-w-5xl px-5 pt-12 md:px-8 pb-32">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          Customer Protection & Trust
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
          Store Policies & Guarantees
        </h1>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
          At Gubberz, we believe gadgets should bring pure joy — zero friction, zero headaches.
          Here is exactly how our returns, deliveries, warranties, and payment policies work.
        </p>
      </div>

      {/* Trust Pills */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex flex-col items-center p-4 rounded-3xl border bg-card text-center">
          <RefreshCw className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-xs">7-Day Replacement</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">No-hassle exchange</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-3xl border bg-card text-center">
          <Truck className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-xs">Nationwide Express</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">1–3 business days</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-3xl border bg-card text-center">
          <ShieldCheck className="h-6 w-6 text-success mb-2" />
          <span className="font-bold text-xs">100% Genuine</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">Factory tested items</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-3xl border bg-card text-center">
          <CreditCard className="h-6 w-6 text-primary mb-2" />
          <span className="font-bold text-xs">COD or 5% Advance</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">Pay how you prefer</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mt-12 flex flex-wrap gap-2 border-b pb-4">
        {[
          { id: "returns" as const, label: "7-Day Replacement Policy", icon: RefreshCw },
          { id: "shipping" as const, label: "Shipping & Delivery", icon: Truck },
          { id: "warranty" as const, label: "Warranty & Authenticity", icon: ShieldCheck },
          { id: "payments" as const, label: "Cash on Delivery & Payment", icon: CreditCard },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`press flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-ink text-ink-foreground shadow-xs"
                  : "bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* POLICY CONTENT */}
      <div className="mt-8 rounded-3xl border bg-card p-6 md:p-10 shadow-xs">
        {tab === "returns" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                7-Day Replacement & Return Guarantee
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                If your gadget arrives defective, damaged during transit, or doesn't match the
                specifications described on Gubberz, we will replace it immediately or issue a full
                refund.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface/60 p-5 space-y-2">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  What qualifies for replacement?
                </span>
                <ul className="text-xs text-muted-foreground space-y-1.5 pl-6 list-disc">
                  <li>Hardware defects, charging failures, or unresponsive buttons</li>
                  <li>Cosmetic transit damage noticed upon unboxing</li>
                  <li>Incorrect product model or colour variant delivered</li>
                  <li>Package missing accessories listed under "What's in the Box"</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-surface/60 p-5 space-y-2">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  How to initiate a claim:
                </span>
                <ol className="text-xs text-muted-foreground space-y-1.5 pl-6 list-decimal">
                  <li>Send a quick WhatsApp message to our support desk with your Order ID</li>
                  <li>Attach a 10-second video showing the issue or unboxing</li>
                  <li>Our team books a reverse pickup courier from your doorstep at zero cost to you</li>
                  <li>Replacement unit is dispatched within 24 hours</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {tab === "shipping" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Nationwide Shipping & Delivery Timelines
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We partner with premier courier networks (TCS, Leopards, Trax, and Rider) to guarantee
                safe and tracked transit directly to your door.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b font-mono uppercase text-muted-foreground">
                    <th className="py-3 px-4">Region / City</th>
                    <th className="py-3 px-4">Delivery Window</th>
                    <th className="py-3 px-4">Courier Partner</th>
                    <th className="py-3 px-4">COD Available?</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium">
                  <tr>
                    <td className="py-3 px-4 font-bold">Karachi Hub</td>
                    <td className="py-3 px-4">Same Day / Next Day (24 hrs)</td>
                    <td className="py-3 px-4 text-muted-foreground">Rider / Leopards Express</td>
                    <td className="py-3 px-4 text-success">✓ Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Lahore & Rawalpindi / Islamabad</td>
                    <td className="py-3 px-4">1 to 2 business days</td>
                    <td className="py-3 px-4 text-muted-foreground">TCS Express / Trax</td>
                    <td className="py-3 px-4 text-success">✓ Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Faisalabad, Multan, Sialkot, Peshawar</td>
                    <td className="py-3 px-4">2 to 3 business days</td>
                    <td className="py-3 px-4 text-muted-foreground">TCS / Leopards</td>
                    <td className="py-3 px-4 text-success">✓ Yes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Rest of Pakistan & Remote Towns</td>
                    <td className="py-3 px-4">3 to 4 business days</td>
                    <td className="py-3 px-4 text-muted-foreground">PostEx / TCS</td>
                    <td className="py-3 px-4 text-success">✓ Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl bg-surface/60 p-4 text-xs text-muted-foreground flex items-center justify-between">
              <span>Standard delivery fee: Rs 200 (or free above Rs 15,000 threshold)</span>
              <span className="font-mono font-bold text-foreground">SMS & WhatsApp tracking included</span>
            </div>
          </div>
        )}

        {tab === "warranty" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Authenticity Guarantee & Hardware Warranty
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Counterfeits are rampant in the tech gadget market. At Gubberz, every single item in our
                warehouse is sourced through authorized distributor channels and inspected before packing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface/60 p-5 space-y-2">
                <span className="font-bold text-sm text-foreground">6-Month Hardware Protection</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Keyboards, wireless ANC headphones, and GaN fast chargers include a 6-month limited
                  hardware repair or replacement warranty covering internal circuit or battery degradation.
                </p>
              </div>

              <div className="rounded-2xl bg-surface/60 p-5 space-y-2">
                <span className="font-bold text-sm text-foreground">Serial Number Verification</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every packaged device has its barcode and serial number archived with your order record.
                  You can verify and claim support at any time by quoting your phone number.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Cash on Delivery & Advance Payment Discount
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We support flexible payment methods designed for shopper comfort in Pakistan.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface/60 p-5 space-y-2 border border-border/40">
                <span className="font-bold text-sm text-foreground">1. Cash on Delivery (COD)</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No advance payment required. Simply place your order, confirm your address via our
                  automated WhatsApp check, and pay the courier cash directly upon delivery at your doorstep.
                </p>
              </div>

              <div className="rounded-2xl bg-primary/10 p-5 space-y-2 border border-primary/20">
                <span className="font-bold text-sm text-foreground">
                  2. Advance Discount (Save {settings?.advanceDiscount ?? 5}%)
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When you pay upfront via JazzCash, NayaPay, Sadapay, or Raast Bank Transfer, you receive an
                  instant {settings?.advanceDiscount ?? 5}% discount deducted from your total order!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Still have questions? Help Banner */}
      <div className="mt-12 rounded-3xl bg-surface p-8 text-center border border-border/60 flex flex-col items-center">
        <h3 className="text-xl font-extrabold">Have a specific question about an order?</h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-md">
          Our customer support humans in Karachi respond in under 15 minutes during business hours.
        </p>
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Gubberz! I have a question regarding store policies and order delivery.")}`}
          target="_blank"
          rel="noreferrer"
          className="press mt-5 inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-xs font-bold text-white shadow-sm"
        >
          <Phone className="h-4 w-4" />
          <span>Chat with us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

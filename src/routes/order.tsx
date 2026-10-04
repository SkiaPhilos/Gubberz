import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { lookupOrder } from "@/lib/catalog.functions";
import { formatPKR, imageSrc, settingsQuery } from "@/lib/shop";

export const Route = createFileRoute("/order")({
  validateSearch: z.object({ code: z.string().optional(), phone: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Track your order — Gubberz" },
      { name: "description", content: "Check the status of your Gubberz order with your order code and phone number." },
      { property: "og:title", content: "Track your order — Gubberz" },
      { property: "og:description", content: "See where your Gubberz order is." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

const STATUS: Record<string, string> = {
  placed: "Order placed",
  payment_verification: "Checking your payment",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "On its way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
const METHOD: Record<string, string> = {
  cod: "Cash on delivery",
  jazzcash: "JazzCash",
  nayapay: "NayaPay",
  easypaisa: "Easypaisa",
  bank_transfer: "Bank Transfer",
  iban: "IBAN Transfer",
  raast: "Raast",
};

function OrderPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/order" });
  const [code, setCode] = useState(search.code ?? "");
  const [phone, setPhone] = useState(search.phone ?? "");
  const enabled = !!search.code && !!search.phone;
  const { data: settings } = useQuery(settingsQuery);
  const { data: order, isFetching } = useQuery({
    queryKey: ["order", search.code, search.phone],
    queryFn: () => lookupOrder({ data: { code: search.code!, phone: search.phone! } }),
    enabled,
  });

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      {order ? (
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order {order.code}</p>
          <h1 className="text-5xl font-extrabold tracking-tight">Thanks, {order.customer_name.split(" ")[0]}!</h1>
          <div className="rounded-3xl bg-surface p-5">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-2xl font-bold">{STATUS[order.status] ?? order.status}</p>
            <p className="mt-1 text-sm text-muted-foreground">{METHOD[order.payment_method]} · delivering to {order.city}</p>
          </div>
          <ul className="space-y-3">
            {order.items.map((i, n) => (
              <li key={n} className="flex items-center gap-3">
                <img src={imageSrc(i.image ?? undefined)} alt="" className="h-14 w-14 rounded-xl object-cover mix-blend-multiply" />
                <span className="flex-1 text-sm">{i.name} × {i.qty}</span>
                <span className="font-mono text-sm">{formatPKR(i.unit_price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-mono">{formatPKR(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-primary"><span>Advance discount</span><span className="font-mono">−{formatPKR(order.discount)}</span></div>}
            <div className="flex justify-between"><span>Delivery</span><span className="font-mono">{formatPKR(order.delivery_fee)}</span></div>
            <div className="flex justify-between pt-2 text-lg font-semibold"><span>Total</span><span className="font-mono">{formatPKR(order.total)}</span></div>
          </div>
          {settings && (
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi Gubberz! About my order ${order.code}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="press block rounded-full bg-ink py-3.5 text-center font-medium text-ink-foreground"
            >
              Message us on WhatsApp
            </a>
          )}
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { code: code.trim(), phone: phone.trim() } });
          }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight">Track your order</h1>
          {enabled && !isFetching && <p className="text-destructive">We couldn't find that order. Check the code and phone number.</p>}
          <input required minLength={4} maxLength={20} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Order code" className="h-12 w-full rounded-2xl bg-surface px-4 font-mono uppercase outline-none ring-primary focus:ring-2" />
          <input required minLength={10} maxLength={30} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number used at checkout" className="h-12 w-full rounded-2xl bg-surface px-4 outline-none ring-primary focus:ring-2" />
          <button className="press w-full rounded-full bg-primary py-3.5 font-medium text-primary-foreground">{isFetching ? "Looking…" : "Find my order"}</button>
        </form>
      )}
    </div>
  );
}

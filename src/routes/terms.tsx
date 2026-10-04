import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert, Truck, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Gubberz" },
      {
        name: "description",
        content:
          "Official Terms of Service for Gubberz. Rules, ordering conditions, and customer guarantees for shopping on Gubberz.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-12 md:px-8 pb-32">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Store
      </Link>

      <div className="border-b pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
          Agreement & Conditions
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Terms of Service</h1>
        <p className="mt-3 text-muted-foreground text-sm font-medium">Effective Date: October 4, 2026</p>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Gubberz website and the
          purchase of products from Gubberz. By using the website or placing an order, you agree to
          these Terms.
        </p>
      </div>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Using Gubberz
          </h2>
          <p className="text-muted-foreground">
            You agree to use Gubberz lawfully and provide accurate information when creating an
            account or placing an order.
          </p>
          <p className="text-muted-foreground">
            You are responsible for maintaining the security of your account and for information
            submitted through your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Products and Availability</h2>
          <p className="text-muted-foreground">
            We make reasonable efforts to ensure product descriptions, specifications, images, prices,
            and availability are accurate. Product appearance may vary slightly from displayed images.
          </p>
          <p className="text-muted-foreground">
            Gubberz may correct pricing, description, availability, or other listing errors and may
            cancel an order where an obvious error or unavailable product makes fulfillment impractical.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Orders</h2>
          <p className="text-muted-foreground">
            Submitting an order constitutes a request to purchase the selected products. An order may
            be reviewed, confirmed, rejected, or cancelled by Gubberz where necessary, including due
            to stock issues, incorrect information, suspected fraud, pricing errors, or inability to
            fulfill the order.
          </p>
          <p className="text-muted-foreground">
            Once an order is confirmed, we will process it for fulfillment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Prices and Discounts</h2>
          <p className="text-muted-foreground">
            All prices and applicable charges displayed at checkout are the amounts applicable to your order.
          </p>
          <p className="text-muted-foreground">
            Gubberz may offer promotional discounts from time to time. Unless explicitly stated
            otherwise, promotions cannot be combined and may be subject to additional conditions.
          </p>
          <div className="rounded-xl border bg-card p-4 text-xs font-medium text-foreground">
            Customers who choose eligible advance-payment methods may receive a{" "}
            <strong className="text-primary">5% discount</strong>, as displayed at checkout.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Payment Methods</h2>
          <p className="text-muted-foreground">Gubberz accepts payment methods including:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Cash on Delivery (COD)</li>
            <li>JazzCash</li>
            <li>NayaPay</li>
            <li>Bank transfer</li>
          </ul>
          <p className="text-muted-foreground text-xs">
            For advance payments, customers may be required to provide payment confirmation or proof
            of payment. An order requiring advance-payment verification will not be treated as fully
            confirmed until the payment has been verified by Gubberz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Shipping and Delivery
          </h2>
          <p className="text-muted-foreground">Gubberz delivers across Pakistan.</p>
          <p className="text-muted-foreground">
            Orders are typically delivered within <strong>2&ndash;4 business days</strong> after
            confirmation and fulfillment. Delivery times may vary because of weekends, public
            holidays, courier delays, weather, remote locations, incorrect delivery information, or
            circumstances beyond our reasonable control.
          </p>
          <p className="text-muted-foreground">
            Customers are responsible for providing an accurate delivery address and reachable phone
            number.
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Returns and Replacements
          </h2>
          <p className="text-muted-foreground">
            Gubberz accepts replacement requests for{" "}
            <strong className="text-foreground">
              defective or damaged products reported within 7 days of delivery
            </strong>
            .
          </p>
          <p className="text-muted-foreground">
            To request a replacement, contact customer support within the applicable period and
            provide the order details and any information reasonably required to verify the issue.
          </p>
          <p className="text-muted-foreground">
            Approved replacements are subject to product availability and inspection or verification
            where appropriate.
          </p>
          <p className="text-muted-foreground text-xs">
            Unless otherwise stated by Gubberz, returns or replacements are not guaranteed for change
            of mind, incorrect product selection, misuse, accidental damage, normal wear and tear, or
            damage caused after delivery.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Order Cancellation and Refunds</h2>
          <p className="text-muted-foreground">
            Cancellation requests may be accepted before an order has been shipped, subject to the
            circumstances of the order.
          </p>
          <p className="text-muted-foreground">
            For approved refunds relating to advance payments, the refund method and processing time
            will depend on the circumstances and payment method used.
          </p>
          <p className="text-muted-foreground text-xs">
            Gubberz may deduct or decline amounts where permitted by these Terms or applicable law,
            including where an order has already incurred non-recoverable costs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Customer Support</h2>
          <p className="text-muted-foreground">
            Customer support is available through WhatsApp and other support channels provided on the
            Gubberz website.
          </p>
          <p className="text-muted-foreground">
            We may use information from your account and order history to assist with customer-support
            requests and order-related issues.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Intellectual Property</h2>
          <p className="text-muted-foreground">
            The Gubberz name, logo, branding, website design, original graphics, text, illustrations,
            and other content provided by Gubberz are owned by or licensed to Gubberz and may not be
            copied, reproduced, modified, or commercially reused without permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Prohibited Use</h2>
          <p className="text-muted-foreground">
            You must not misuse the website, attempt unauthorized access, interfere with its
            operation, submit fraudulent information, abuse promotions, or use Gubberz for unlawful
            purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by applicable law, Gubberz will not be responsible for
            indirect, incidental, special, or consequential losses arising from the use of the website
            or products purchased through it.
          </p>
          <p className="text-muted-foreground">
            Gubberz is also not responsible for delays, interruptions, courier failures, or other
            circumstances beyond our reasonable control.
          </p>
          <p className="text-muted-foreground text-xs">
            Nothing in these Terms excludes or limits liability that cannot legally be excluded or
            limited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Changes to These Terms</h2>
          <p className="text-muted-foreground">
            Gubberz may update these Terms from time to time. Updated Terms will be published on this
            page with a revised effective date. Continued use of Gubberz after changes are published
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the applicable laws of Pakistan. Any dispute will be subject
            to the jurisdiction of the applicable courts in Pakistan.
          </p>
        </section>

        <section className="space-y-3 border-t pt-8">
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="text-muted-foreground">
            For questions about these Terms, orders, returns, or other issues, please contact Gubberz
            through the customer-support/contact options available on our website or via WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}

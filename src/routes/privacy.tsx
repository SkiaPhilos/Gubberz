import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Lock, Eye, Database, HelpCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Gubberz" },
      {
        name: "description",
        content:
          "Official Privacy Policy for Gubberz. Learn what information we collect, how we use it, and how we protect it.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          Legal & Compliance
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-muted-foreground text-sm font-medium">Effective Date: October 4, 2026</p>
      </div>

      <div className="mt-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Gubberz (&ldquo;Gubberz&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a Pakistan-based
          electronics and gadget e-commerce store serving customers nationwide. This Privacy Policy
          explains what information we collect, how we use it, and how we protect it when you use
          our website and services.
        </p>
      </div>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/90">
        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Information We Collect
          </h2>
          <p>When you use Gubberz, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Account information:</strong> Your name and email address provided through Google Sign-In.
            </li>
            <li>
              <strong>Delivery information:</strong> Your delivery address, phone number, city, and related information necessary to fulfill orders.
            </li>
            <li>
              <strong>Order information:</strong> Products purchased, quantities, prices, order status, payment method, and related transaction details.
            </li>
            <li>
              <strong>Support information:</strong> Information you voluntarily provide when contacting us through WhatsApp or other customer-support channels.
            </li>
          </ul>
          <p className="font-semibold text-foreground mt-2">
            We do not store credit or debit card numbers.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Google Sign-In and Google User Data
          </h2>
          <p className="text-muted-foreground">
            Gubberz uses Google OAuth to allow customers to sign in securely.
          </p>
          <p className="text-muted-foreground">
            When you use Google Sign-In, we receive basic profile information such as your{" "}
            <strong className="text-foreground">name and email address</strong>. This information is
            used <strong className="text-foreground">solely for authentication, account creation, account management, and associating your orders with your account</strong>.
          </p>
          <div className="rounded-xl bg-background p-4 border space-y-2 text-xs">
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              We do <strong>not</strong> sell, rent, lease, or use Google user data for advertising or targeted marketing.
            </p>
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              We do not use Google user data to build advertising profiles or sell customer information to advertisers.
            </p>
            <p className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              We do not request access to your Gmail, Google Drive, Google Contacts, or other Google services beyond the information necessary for sign-in.
            </p>
          </div>
          <p className="text-muted-foreground text-xs">
            Google-provided account information may be stored and processed through{" "}
            <strong>Supabase</strong>, our database and authentication service provider, solely to
            operate and secure your Gubberz account and services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Create and manage your account.</li>
            <li>Process and fulfill orders.</li>
            <li>Deliver products to you.</li>
            <li>Provide order tracking and customer support.</li>
            <li>Verify payments and handle payment-related communications.</li>
            <li>Respond to inquiries and resolve issues.</li>
            <li>Improve the security, reliability, and functionality of Gubberz.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
          <p className="font-semibold text-foreground pt-1">We do not sell customer personal information.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Payment Information</h2>
          <p className="text-muted-foreground">
            Gubberz supports payment methods including Cash on Delivery (COD), JazzCash, NayaPay, and bank transfer.
          </p>
          <p className="text-muted-foreground">
            Payment credentials and card numbers are not stored by Gubberz. Where applicable, payment
            information or transaction references may be provided by you for the purpose of verifying
            and processing an order.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Third-Party Services
          </h2>
          <p className="text-muted-foreground">
            Gubberz uses third-party services required to operate the store, including:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>
              <strong>Supabase</strong> &mdash; authentication, database, and related hosting infrastructure.
            </li>
            <li>
              <strong>Google OAuth</strong> &mdash; account authentication and basic profile information.
            </li>
          </ul>
          <p className="text-muted-foreground text-xs">
            Third-party services may process information on our behalf only as necessary to provide
            their respective services and operate Gubberz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Data Security</h2>
          <p className="text-muted-foreground">
            We take reasonable technical and organizational measures to protect personal information
            from unauthorized access, alteration, disclosure, or misuse. However, no internet-based
            service can guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Data Retention and Deletion</h2>
          <p className="text-muted-foreground">
            We retain information for as long as reasonably necessary to provide our services, maintain
            order and business records, resolve disputes, prevent fraud, and comply with legal
            obligations.
          </p>
          <p className="text-muted-foreground">
            You may request deletion of your Gubberz account and associated personal information by
            contacting us through the customer-support channels provided on the website. Certain
            transaction or legally required records may need to be retained where permitted or required
            by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Cookies and Similar Technologies</h2>
          <p className="text-muted-foreground">
            Gubberz may use cookies or similar technologies necessary for authentication, security,
            preferences, shopping-cart functionality, and website operation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Gubberz is intended for general consumers and is not knowingly directed toward children.
            We do not intentionally collect personal information from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. The updated version will be published
            on this page with a revised effective date.
          </p>
        </section>

        <section className="space-y-3 border-t pt-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Contact
          </h2>
          <p className="text-muted-foreground">
            For privacy questions or requests, please contact Gubberz through the customer-support/contact
            options available on our website or via our official WhatsApp line.
          </p>
        </section>
      </div>
    </div>
  );
}

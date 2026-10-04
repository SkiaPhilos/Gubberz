import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { DiscoveryProvider } from "@/lib/discovery";
import {
  CartDrawer,
  SiteFooter,
  SiteHeader,
  WhatsAppButton,
  WishlistDrawer,
} from "@/components/shop/SiteChrome";
import { PullToRefreshContainer } from "@/components/shop/PullToRefresh";
import { GadgetAdvisorModal } from "@/components/shop/GadgetAdvisor";
import lost from "@/assets/characters/lost.png";

function NotFoundComponent() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center">
      <img
        src={lost}
        alt="A small character holding a map upside down"
        width={1024}
        height={1024}
        className="w-56"
      />
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">This page wandered off.</h1>
      <p className="mt-3 text-muted-foreground">
        The link might be old or mistyped. Our little guy checked the map twice — it isn't here.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="press rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground"
        >
          Back home
        </Link>
        <Link to="/shop" className="press rounded-full bg-surface px-6 py-3 text-sm font-medium">
          Browse gadgets
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error("App error boundary:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <img src={lost} alt="" width={1024} height={1024} className="mx-auto w-40" />
        <h1 className="text-2xl font-bold tracking-tight">Something tripped over a cable.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This page didn't load. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="press rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground"
          >
            Try again
          </button>
          <a href="/" className="press rounded-full bg-surface px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gubberz — Gadgets with personality" },
      {
        name: "description",
        content:
          "Headphones, chargers, keyboards and other useful gadgets, delivered across Pakistan.",
      },
      { property: "og:title", content: "Gubberz — Gadgets with personality" },
      {
        property: "og:description",
        content:
          "Headphones, chargers, keyboards and other useful gadgets, delivered across Pakistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico?v=2" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DiscoveryProvider>
        <CartProvider>
          <SiteHeader />
          <PullToRefreshContainer>
            <main>
              <Outlet />
            </main>
            <SiteFooter />
          </PullToRefreshContainer>
          <CartDrawer />
          <WishlistDrawer />
          <GadgetAdvisorModal />
          <WhatsAppButton />
          <Toaster position="bottom-center" />
        </CartProvider>
      </DiscoveryProvider>
    </QueryClientProvider>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { getHomeSections, type HomeSection } from "@/lib/content.functions";
import { categoriesQuery, effectivePrice, formatPKR, imageSrc, productsQuery } from "@/lib/shop";
import sitter from "@/assets/characters/sitter.png";

const sectionsQuery = queryOptions({
  queryKey: ["home-sections"],
  queryFn: () => getHomeSections(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gubberz — Gadgets you'll actually want" },
      {
        name: "description",
        content:
          "An opinionated edit of headphones, chargers, keyboards and useful gadgets, delivered across Pakistan.",
      },
      { property: "og:title", content: "Gubberz — Gadgets you'll actually want" },
      {
        property: "og:description",
        content: "Ordinary gadgets, presented with too much enthusiasm. Delivered across Pakistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(productsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery),
      context.queryClient.ensureQueryData(sectionsQuery),
    ]),
  component: Home,
});

function Home() {
  const { data: products } = useSuspenseQuery(productsQuery());
  const { data: categories } = useSuspenseQuery(categoriesQuery);
  const { data: sections } = useSuspenseQuery(sectionsQuery);
  return (
    <div className="overflow-hidden">
      {sections.map((section) => (
        <Section key={section.id} section={section} products={products} categories={categories} />
      ))}
    </div>
  );
}

function Section({
  section,
  products,
  categories,
}: {
  section: HomeSection;
  products: Awaited<ReturnType<typeof getHomeSections>> extends never ? never : any[];
  categories: any[];
}) {
  const selected = section.product_slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean);
  if (section.section_type === "hero") return <Hero section={section} products={selected} />;
  if (section.section_type === "category_index")
    return (
      <section className="mx-auto mt-12 max-w-7xl px-5 md:mt-20 md:px-8">
        <SectionHeading section={section} />
        <div className="mt-10 border-t">
          {section.category_slugs.map((slug, index) => {
            const category = categories.find((item) => item.slug === slug);
            const sample = products.find((product) => product.category?.slug === slug);
            if (!category) return null;
            return (
              <Link
                key={slug}
                to="/shop"
                search={{ cat: slug }}
                className="group grid grid-cols-[3rem_minmax(0,1fr)_4.5rem] items-center gap-3 border-b py-4 md:grid-cols-[5rem_minmax(0,1fr)_7rem] md:py-6"
              >
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold md:text-4xl">{category.name}</h3>
                  <p className="truncate text-sm text-muted-foreground">{category.blurb}</p>
                </div>
                <img
                  src={imageSrc(sample?.images[0])}
                  alt=""
                  className="aspect-square w-full object-cover mix-blend-multiply transition-transform motion-safe:group-hover:rotate-3 motion-safe:group-active:scale-95"
                />
              </Link>
            );
          })}
        </div>
      </section>
    );
  if (section.section_type === "product_edit")
    return (
      <section className="mx-auto mt-28 max-w-7xl px-5 md:px-8">
        <SectionHeading section={section} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {selected.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} size="md" />
            </div>
          ))}
        </div>
      </section>
    );
  if (section.section_type === "character")
    return (
      <section className="mt-32 overflow-hidden rounded-[2.5rem] bg-ink text-ink-foreground mx-5 md:mx-8 max-w-7xl xl:mx-auto">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_22rem] md:px-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-ink-foreground/80">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {section.eyebrow}
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              {section.title}
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg text-ink-foreground/75 leading-relaxed">
              {section.body}
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-xs items-center justify-center rounded-[2.5rem] bg-[#fbf9f4] p-8 shadow-2xl ring-1 ring-white/20">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
            <motion.img
              src={sitter}
              alt="A Gubberz character testing headphones"
              className="relative z-10 w-48 md:w-56 drop-shadow-md"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.95, rotate: [0, -6, 6, 0] }}
            />
            <span className="absolute -bottom-3 rounded-full bg-primary px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
              Acoustic Testing
            </span>
          </div>
        </div>
      </section>
    );
  if (section.section_type === "product_rail")
    return (
      <section className="mt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading section={section} />
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2))] pb-6 [scrollbar-width:none]">
          {selected.map((product) => (
            <div key={product.id} className="w-[78vw] max-w-sm shrink-0 snap-center sm:w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    );
  if (section.section_type === "campaign")
    return (
      <section className="mx-auto mt-28 max-w-7xl px-5 md:px-8">
        <div className="bg-primary p-6 text-primary-foreground md:p-12">
          <SectionHeading section={section} light />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {selected.map((product) => (
              <Link
                key={product.id}
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="group grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 bg-background p-3 text-foreground"
              >
                <img
                  src={imageSrc(product.images[0])}
                  alt=""
                  className="aspect-square w-24 object-cover mix-blend-multiply transition-transform motion-safe:group-active:scale-95"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{product.name}</p>
                  <p className="font-mono text-sm text-primary">
                    {formatPKR(effectivePrice(product))}
                  </p>
                  {effectivePrice(product) < product.price && (
                    <p className="font-mono text-xs text-muted-foreground line-through">
                      {formatPKR(product.price)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  if (section.section_type === "service_notes") {
    const settings =
      typeof section.settings === "object" && section.settings && !Array.isArray(section.settings)
        ? section.settings
        : {};
    const notes = Array.isArray(settings.notes) ? settings.notes : [];
    return (
      <section className="mx-auto mt-28 grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
        {notes.map((note, index) =>
          typeof note === "object" && note && !Array.isArray(note) ? (
            <div key={index} className="border-t pt-5">
              <p className="text-lg font-semibold">{String(note.title ?? "")}</p>
              <p className="mt-1 text-muted-foreground">{String(note.body ?? "")}</p>
            </div>
          ) : null,
        )}
      </section>
    );
  }
  return null;
}

function Hero({ section, products }: { section: HomeSection; products: any[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const main = products[0];
  const secondary = products[1];
  return (
    <section
      ref={ref}
      className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-6 px-5 pb-16 pt-10 md:grid-cols-12 md:px-8 md:pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 overflow-hidden whitespace-nowrap font-extrabold text-foreground/[.035]"
      >
        <div className="animate-editorial-marquee text-[28vw] leading-none">
          GUBBERZ GUBBERZ GUBBERZ
        </div>
      </div>
      <div className="relative z-10 md:col-span-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {section.eyebrow}
        </p>
        <h1 className="mt-5 text-6xl font-extrabold leading-[.88] md:text-8xl">
          Ordinary
          <br />
          things.
          <br />
          <span className="text-primary">Weirdly</span> good.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">{section.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            to="/shop"
            className="press bg-ink px-7 py-4 text-sm font-semibold text-ink-foreground"
          >
            {section.cta_label}
          </Link>
          <Link
            to="/shop"
            search={{ sort: "new" }}
            className="border-b-2 border-foreground py-2 text-sm font-semibold"
          >
            What’s new
          </Link>
        </div>
      </div>
      {main && (
        <div className="relative mt-8 h-[31rem] md:col-span-7 md:mt-0 md:h-[40rem]">
          <motion.div
            style={{ y: imageY }}
            className="absolute left-[7%] top-[8%] z-10 w-[72%] -rotate-2 border-[10px] border-background bg-surface shadow-xl"
          >
            <Link to="/product/$slug" params={{ slug: main.slug }}>
              <img
                src={imageSrc(main.images[0])}
                alt={main.name}
                className="aspect-[4/5] w-full object-cover mix-blend-multiply"
              />
            </Link>
          </motion.div>
          {secondary && (
            <Link
              to="/product/$slug"
              params={{ slug: secondary.slug }}
              className="press absolute right-0 top-0 z-20 hidden w-40 rotate-6 bg-background p-2 shadow-lg sm:block"
            >
              <img
                src={imageSrc(secondary.images[0])}
                alt={secondary.name}
                className="aspect-square w-full object-cover mix-blend-multiply"
              />
              <p className="mt-2 truncate font-mono text-[10px] uppercase">
                Also good: {secondary.name}
              </p>
            </Link>
          )}
          <motion.img
            src={sitter}
            alt=""
            className="absolute bottom-0 right-[2%] z-20 w-32 md:w-44"
            animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      )}
    </section>
  );
}

function SectionHeading({ section, light = false }: { section: HomeSection; light?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end">
      <div>
        <p
          className={`font-mono text-xs uppercase tracking-widest ${light ? "opacity-70" : "text-muted-foreground"}`}
        >
          {section.eyebrow}
        </p>
        <h2 className="mt-3 max-w-4xl text-4xl font-bold leading-[.98] md:text-6xl">
          {section.title}
        </h2>
      </div>
      {section.body && (
        <p className={light ? "opacity-80" : "text-muted-foreground"}>{section.body}</p>
      )}
    </div>
  );
}

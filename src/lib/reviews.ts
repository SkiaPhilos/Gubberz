import setupKarachi from "@/assets/images/setup_karachi_desk_1791208163986.jpg";
import setupIsb from "@/assets/images/setup_isb_desk_1791208181214.jpg";
import setupLhr from "@/assets/images/setup_lhr_desk_1791208199098.jpg";

export type StoredReview = {
  id: string;
  productSlug: string;
  productName: string;
  author: string;
  city: "Rawalpindi" | "Islamabad" | "Karachi" | "Lahore" | "Peshawar" | "Faisalabad" | "Quetta" | string;
  rating: number; // 1-5
  title: string;
  comment: string;
  verified: boolean;
  setupPhoto?: string;
  featuredOnHome: boolean;
  status: "approved" | "pending" | "hidden";
  createdAt: string;
};

export const DEFAULT_STORED_REVIEWS: StoredReview[] = [
  {
    id: "rev-rwp",
    productSlug: "glide-mouse",
    productName: "Glide Ergonomic Mouse",
    author: "Daniyal Shah",
    city: "Rawalpindi",
    rating: 5,
    title: "Cleanest cable-free desk in Saddar",
    comment:
      "Was tired of wires cluttering my coding setup. The Glide Mouse glides effortlessly on my felt mat and battery easily lasts 3 weeks. Dispatched from Karachi and arrived in Rawalpindi in 48 hours via TCS.",
    verified: true,
    setupPhoto: setupIsb,
    featuredOnHome: true,
    status: "approved",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "rev-khi",
    productSlug: "hush-pro-headphones",
    productName: "Hush Pro Headphones",
    author: "Bilal & Sarah",
    city: "Karachi",
    rating: 5,
    title: "Saved my sanity in DHA Phase 6",
    comment:
      "ANC completely deletes the afternoon street noise and generator hum. Build quality has zero cheap creaks, and the ear cushions are cloud-soft for 8-hour Zoom marathons. Same-day delivery in Karachi!",
    verified: true,
    setupPhoto: setupKarachi,
    featuredOnHome: true,
    status: "approved",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "rev-lhr",
    productSlug: "zap-65w-charger",
    productName: "Zap 65W GaN Charger",
    author: "Hamza Riaz",
    city: "Lahore",
    rating: 5,
    title: "Replaced 4 bulky bricks in Gulberg",
    comment:
      "Charges my MacBook Pro, iPad, and Galaxy phone simultaneously without overheating. Paid via NayaPay and got the 5% advance discount instantly. 10/10 service from Gubberz.",
    verified: true,
    setupPhoto: setupLhr,
    featuredOnHome: true,
    status: "approved",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "rev-isb-1",
    productSlug: "hush-pro-headphones",
    productName: "Hush Pro Headphones",
    author: "Ayesha Malik",
    city: "Islamabad",
    rating: 5,
    title: "Super aesthetic and reliable audio",
    comment:
      "Looks straight out of an editorial design catalogue. Battery life has easily lasted me three straight workdays in F-7. Pairing with my laptop and iPhone was instantaneous.",
    verified: true,
    setupPhoto: setupIsb,
    featuredOnHome: false,
    status: "approved",
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "rev-psh",
    productSlug: "brick-20k-power-bank",
    productName: "Brick 20K Power Bank",
    author: "Usman Tariq",
    city: "Peshawar",
    rating: 5,
    title: "Heavy load-shedding lifesaver on University Road",
    comment:
      "Survives 6-hour power outages easily. Keeps both my Wi-Fi device and phone powered through evening work shifts. Solid matte finish doesn't scratch.",
    verified: true,
    featuredOnHome: false,
    status: "approved",
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
  {
    id: "rev-fsd",
    productSlug: "noodle-usb-c-cable",
    productName: "Noodle USB-C Cable",
    author: "Zeeshan Ahmed",
    city: "Faisalabad",
    rating: 5,
    title: "Heavy-duty braided nylon that won't snap",
    comment:
      "Tested with 100W PD charging on my laptop. Zero heating at the connectors and the silicone strap keeps my bag totally tangle-free.",
    verified: true,
    featuredOnHome: false,
    status: "approved",
    createdAt: new Date(Date.now() - 11 * 86400000).toISOString(),
  },
  {
    id: "rev-khi-2",
    productSlug: "click-keyboard",
    productName: "Click Mechanical Keyboard",
    author: "Mahnoor Khan",
    city: "Karachi",
    rating: 5,
    title: "Dream tactile feel for daily typing",
    comment:
      "Compact layout frees up so much desk space. Keys feel weighted and premium. Arrived well-packaged in double bubble wrap via Trax.",
    verified: true,
    setupPhoto: setupKarachi,
    featuredOnHome: false,
    status: "approved",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: "rev-lhr-2",
    productSlug: "boom-speaker",
    productName: "Boom Mini Speaker",
    author: "Haris Javed",
    city: "Lahore",
    rating: 5,
    title: "Punchy warm sound in Model Town",
    comment:
      "Shockingly loud bass without distortion. Sits right next to my coffee mug every morning. 10/10 recommendation for small desks.",
    verified: true,
    setupPhoto: setupLhr,
    featuredOnHome: false,
    status: "approved",
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
  },
];

// Backwards compatibility alias
export const FEATURED_PAKISTANI_REVIEWS = DEFAULT_STORED_REVIEWS.filter(
  (r) => r.featuredOnHome && r.setupPhoto,
).map((r) => ({
  id: r.id,
  author: r.author,
  city: r.city,
  rating: r.rating,
  date: "Verified",
  productName: r.productName,
  productSlug: r.productSlug,
  title: r.title,
  comment: r.comment,
  verified: r.verified,
  photo: r.setupPhoto!,
  tag: `${r.productName} · ${r.city}`,
}));

import setupKarachi from "@/assets/images/setup_karachi_desk_1791208163986.jpg";
import setupIsb from "@/assets/images/setup_isb_desk_1791208181214.jpg";
import setupLhr from "@/assets/images/setup_lhr_desk_1791208199098.jpg";

export type CustomerSetupReview = {
  id: string;
  author: string;
  city: "Rawalpindi" | "Islamabad" | "Karachi" | "Lahore" | "Peshawar" | "Faisalabad" | string;
  rating: number;
  date: string;
  productName: string;
  productSlug: string;
  title: string;
  comment: string;
  verified: boolean;
  photo: string;
  tag: string;
};

export const FEATURED_PAKISTANI_REVIEWS: CustomerSetupReview[] = [
  {
    id: "rev-rwp",
    author: "Daniyal Shah",
    city: "Rawalpindi",
    rating: 5,
    date: "Yesterday",
    productName: "Glide Ergonomic Mouse",
    productSlug: "glide-mouse",
    title: "Cleanest cable-free desk in Saddar",
    comment:
      "Was tired of wires cluttering my coding setup. The Glide Mouse glides effortlessly on my felt mat and battery easily lasts 3 weeks. Dispatched from Karachi and arrived in Rawalpindi in 48 hours via TCS.",
    verified: true,
    photo: setupIsb,
    tag: "Night Workspace · Rawalpindi",
  },
  {
    id: "rev-khi",
    author: "Bilal & Sarah",
    city: "Karachi",
    rating: 5,
    date: "3 days ago",
    productName: "Hush Pro Headphones",
    productSlug: "hush-pro-headphones",
    title: "Saved my sanity in DHA Phase 6",
    comment:
      "ANC completely deletes the afternoon street noise and generator hum. Build quality has zero cheap creaks, and the ear cushions are cloud-soft for 8-hour Zoom marathons. Same-day delivery in Karachi!",
    verified: true,
    photo: setupKarachi,
    tag: "Audio Setup · Karachi",
  },
  {
    id: "rev-lhr",
    author: "Hamza Riaz",
    city: "Lahore",
    rating: 5,
    date: "5 days ago",
    productName: "Zap 65W GaN Charger + Noodle Cable",
    productSlug: "zap-65w-charger",
    title: "Replaced 4 bulky bricks in Gulberg",
    comment:
      "Charges my MacBook Pro, iPad, and Galaxy phone simultaneously without overheating. Paid via NayaPay and got the 5% advance discount instantly. 10/10 service from Gubberz.",
    verified: true,
    photo: setupLhr,
    tag: "Charging Rig · Lahore",
  },
];

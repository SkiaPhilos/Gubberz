# Gubberz 🎧⚡

> Editorial storefront and admin system for curated gadgets and electronics, delivered across Pakistan.

---

## ✨ Features

- **Curated Tech Catalog**: Audio, charging gear, keyboards, desk accessories, and cables with rich editorial descriptions.
- **Smart Cart & Checkout**: LocalStorage-persisted cart, address validation for Pakistan, and multi-tier payment handling.
- **Payment Methods Supported**:
  - Cash on Delivery (COD)
  - JazzCash & NayaPay (5% instant discount on advance payments)
  - Direct Bank Transfer (IBFT)
- **Order Tracking**: Self-service tracking by order code and phone number.
- **Admin Workspace**: Product management, inventory controls, order tracking, and store policy settings.
- **Authentication**: Secure Google Sign-In powered by Supabase Auth.
- **Performance & SEO**: Built on TanStack Start with full SSR support, Tailwind CSS, and optimized assets.

---

## 🛠 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database & Auth**: [Supabase](https://supabase.com) (PostgreSQL, Row Level Security, Auth)
- **Server Engine**: [Nitro](https://nitro.build)
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gubberz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root with your credentials:
   ```env
   VITE_SUPABASE_URL="your-supabase-url"
   VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
   VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production

### Standard Build
```bash
npm run build
```

### Vercel Deployment
To build specifically for Vercel deployment:
```bash
NITRO_PRESET=vercel npm run build
```
Vercel automatically detects the preset when deployed via Git integration or Vercel CLI.

---

## 📜 Legal & Policies

- [Privacy Policy](/privacy)
- [Terms of Service](/terms)
- [Customer Protection Policies](/policies)

---

## 📄 License

Proprietary © Gubberz. All rights reserved.

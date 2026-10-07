# Gubberz Master Roadmap & Architecture Plan

This document is the single source of truth for the multi-pass implementation of:
1. **Persistent Customer Reviews, Testimonials Page (`/reviews`), and Admin Moderation**
2. **Multi-Image Product Gallery & Variant-Specific Photo Architecture**
3. **External Product Ingestion API Access Point (`POST /api/external/products`)**
4. **Built-In AI Product Studio & Photo Generator (in Admin Workspace)**

---

## 📌 Status & Overview Table

| Phase | Description | Status | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Reviews Engine & Persistence** | 🟢 COMPLETED | Persistent database storage for reviews, public `/reviews` page with Pakistani city badges, product page sync |
| **Phase 2** | **Admin Reviews & Moderation** | 🟢 COMPLETED | Admin tab for reviews, approval switch, "Pin to Homepage" selector, edit/delete controls |
| **Phase 3** | **Multi-Image & Variant Photo Editor** | 🟢 COMPLETED | Admin product dialog upgrade: multi-image gallery manager, color swatch photo assignment, size delta pricing |
| **Phase 4** | **External API Ingestion Endpoint** | 🟡 NEXT | Secure `POST /api/external/products` endpoint with API key auth for external apps & scripts |
| **Phase 5** | **Built-in AI Product Studio** | ⚪ QUEUED | 1-Click AI product & image creator inside Admin using Gemini: prompts to photos, copy, specs, and variants |

---

## 🛠️ Detailed Architectural Specification

### Phase 1: Persistent Customer Reviews & Testimonials (`/reviews`)
- [ ] **Data Model (`store_settings` key: `customer_reviews` or DB table):**
  ```typescript
  export type StoredReview = {
    id: string; // uuid
    productSlug: string;
    productName: string;
    author: string;
    city: "Karachi" | "Lahore" | "Islamabad" | "Rawalpindi" | "Peshawar" | "Faisalabad" | "Quetta" | string;
    rating: number; // 1-5
    title: string;
    comment: string;
    verified: boolean;
    setupPhoto?: string; // URL or asset path
    featuredOnHome: boolean; // Pinned to Homepage showcase
    status: "approved" | "pending" | "hidden";
    createdAt: string; // ISO string
  };
  ```
- [ ] **Server Functions (`src/lib/catalog.functions.ts`):**
  - `getPublicReviews({ productSlug?, city?, minRating? })`: Fetches all approved reviews with optional filters.
  - `submitReview({ data })`: Validates customer submission from modal, defaults status to `"approved"`, persists to database.
- [ ] **Public Testimonials Route (`src/routes/reviews.tsx`):**
  - Path: `/reviews` (and `/testimonials` redirect).
  - Overall rating summary card: Average rating (4.9★), total verified reviews count, distribution bars.
  - Interactive City Filter tabs: *All Pakistan*, *Karachi*, *Lahore*, *Islamabad*, *Rawalpindi*, *Peshawar*, *Faisalabad*.
  - Filter by Rating (*5 Stars*, *With Photos Only*).
  - Grid of review cards with full setup photo lightbox, verified badge, city tag, and 1-click link to product page.
  - "Submit Your Review" button opening the review modal.
- [ ] **Sync with Product Page (`product.$slug.tsx`) & Homepage (`index.tsx`):**
  - Product page reviews section reads from live database.
  - Submitting in "Write a Review" modal calls `submitReview` server function so reviews never disappear on reload.
  - Homepage showcase dynamically pulls reviews marked `featuredOnHome === true`.

---

### Phase 2: Admin Reviews Moderation Tab
- [ ] **Admin Workspace (`src/routes/_authenticated/admin.tsx`):**
  - Add `reviews` tab to admin navigation with pending counter badge.
  - Table of all reviews showing Author, Product, City, Rating, Date, Photo thumbnail, Status, and Home-Pinned status.
  - **1-Click Moderation Actions:**
    - Toggle `status`: Approved ↔ Hidden.
    - Toggle `featuredOnHome`: Pin/Unpin from Homepage 3-card showcase.
    - Quick Edit: Adjust author name, city tag, comment text, or photo URL.
    - Delete review button.
  - **"Add Manual Review" Creator:**
    - Allows admin to input WhatsApp customer feedback, attach desk setup photo, select city, and publish directly.

---

### Phase 3: Multi-Image Product Gallery & Variant-Specific Photos
- [ ] **Product Variant Schema Standard:**
  ```typescript
  export type ProductVariantsData = {
    colors: Array<{
      name: string;
      hex: string;
      image?: string; // Specific photo for this color
    }>;
    variantType: string; // e.g., "Size", "Wattage", "Length", "Model"
    sizes: Array<{
      name: string;
      extraPrice: number; // PKR price adjustment
      stock: number;
      specsNote?: string;
    }>;
    inBox: string[];
  };
  ```
- [ ] **Admin Product Form Dialog (`ProductFormDialog` in `admin.tsx`):**
  - **Gallery Manager:**
    - Add multiple image URLs or file uploads.
    - Drag / order gallery photos; designate primary cover photo.
  - **Color Variant Builder:**
    - Add color name + color picker (hex).
    - Select photo from product gallery OR upload unique photo for each color swatch.
  - **Size / Option Variant Builder:**
    - Add option name, extra PKR price, stock count, and spec notes.
  - **In-The-Box List Builder:**
    - Add/remove packaged accessory items.

---

### Phase 4: External Product Ingestion Access Point (`POST /api/external/products`)
- [ ] **Endpoint Route (`server.ts` or API handler):**
  - Route: `POST /api/external/products`
  - Authentication: Header `x-gubberz-api-key` (verified against environment variable `GUBBERZ_EXTERNAL_API_KEY`).
  - Allowed operations:
    1. **Create New Product:** Full payload with title, slug, price, sale price, category slug, images array, specs, features, and nested variants.
    2. **Update / Append Variants to Existing Product:** Specify existing product `slug` or `id`, and provide new variants or new images.
- [ ] **Validation & Error Handling:**
  - Strict Zod schema validation.
  - Returns `{ success: true, product: { id, slug, url: "https://gubberz.pk/product/..." } }`.
  - Comprehensive error responses (401 Unauthorized, 400 Bad Request with field details, 404 Category/Product Not Found).

---

### Phase 5: Built-In AI Product Studio (Inside Admin Workspace)
- [ ] **Admin AI Product Studio Drawer / Dialog:**
  - In Admin Products tab, add prominent button: `✨ AI Product Studio`.
  - **Inputs:**
    - Product Name / Concept prompt (e.g. *"Aero 65W GaN Travel Charger with braided cable"*).
    - Category selection (Audio, Power, Desk, Cables).
    - Studio Style Preset (*Minimal Concrete Studio*, *Moody Cyberpunk Workspace*, *Warm Wood Desktop*, *Clean White Catalog*).
  - **AI Automation Actions (using Google GenAI):**
    - Generate 2-3 photorealistic high-res product photos matching Gubberz aesthetic.
    - Save images directly to Supabase Storage bucket (`product-images`).
    - Generate sarcastic, witty Gubberz copy (short blurb + detailed description).
    - Auto-generate technical specs dictionary and bullet features.
    - Generate 2-3 color variants with matching hex codes and 2 size tiers with realistic PKR pricing.
  - **Review & Publish:**
    - Admin can inspect generated images, regenerate any photo, edit copy/specs, and click **"Publish to Storefront"** in 1 click.
    - Option to also upload custom photos from local disk or Google Drive.

---

## 📌 Implementation Checklist & State Tracking
- [x] **Phase 1: Persistent Reviews & `/reviews` Page**
  - [x] Implement review storage in database (`getPublicReviews`, `submitReview`).
  - [x] Build `/reviews` testimonials route with city filtering & lightbox.
  - [x] Update product detail page (`product.$slug.tsx`) to read & write live reviews.
  - [x] Update homepage (`index.tsx`) to display pinned reviews.
- [x] **Phase 2: Admin Reviews Moderation**
  - [x] Add `reviews` tab in `admin.tsx`.
  - [x] Implement approval toggle, pin to home toggle, quick edit, and delete.
  - [x] Add manual review submission form for WhatsApp feedback.
- [x] **Phase 3: Multi-Image & Variant Photo Editor**
  - [x] Upgrade `ProductFormDialog` with multi-image gallery manager.
  - [x] Implement color swatch photo picker in admin dialog.
  - [x] Implement size/option delta pricing and stock inputs.
- [ ] **Phase 4: External Ingestion API**
  - [ ] Create `POST /api/external/products` endpoint with API key security.
  - [ ] Support both new product creation and appending variants to existing products.
  - [ ] Add API documentation & curl examples in admin workspace.
- [ ] **Phase 5: Built-In AI Product Studio**
  - [ ] Implement AI Product Studio modal in admin workspace.
  - [ ] Wire Gemini model generation for images, witty copy, specs, and variants.
  - [ ] Enable 1-click publishing directly to live store catalogue.

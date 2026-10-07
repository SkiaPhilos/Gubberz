import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Package,
  Layers,
  ShoppingBag,
  Boxes,
  Settings,
  History,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  Check,
  X,
  ExternalLink,
  CreditCard,
  Search,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  RefreshCw,
  Upload,
  Printer,
  MessageCircle,
  Zap,
  Flame,
  Copy,
  Tag,
  Star,
  MessageSquare,
  Pin,
  PinOff,
  Camera,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  changeInventory,
  changeOrderStatus,
  claimAdminRole,
  deleteCategory,
  deleteProduct,
  deleteHomeSection,
  getAdminSnapshot,
  getOrderDetails,
  reorderCategories,
  reorderHomeSections,
  saveCategory,
  saveHomeSection,
  saveProduct,
  saveStoreSetting,
  toggleCategoryPublished,
  toggleProductField,
  uploadProductImage,
  moderateReview,
  addManualReview,
} from "@/lib/admin.functions";
import {
  DEFAULT_COUPONS,
  DEFAULT_FLASH_SALE,
  type PromoCoupon,
  type FlashSaleConfig,
} from "@/lib/catalog.functions";
import { DEFAULT_STORED_REVIEWS, type StoredReview } from "@/lib/reviews";
import { formatPKR, imageSrc } from "@/lib/shop";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Gubberz Admin Workspace" },
      {
        name: "description",
        content: "Management console for Gubberz editorial storefront and store operations.",
      },
    ],
  }),
  component: AdminDashboard,
});

type Tab =
  | "overview"
  | "orders"
  | "products"
  | "categories"
  | "inventory"
  | "settings"
  | "promos"
  | "flash"
  | "reviews"
  | "sections";

const PRESET_IMAGE_KEYS = [
  "headphones",
  "earbuds",
  "speaker",
  "charger",
  "powerbank",
  "keyboard",
  "mouse",
  "cable",
];

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("overview");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-snapshot"],
    queryFn: () => getAdminSnapshot(),
  });

  const claimAdminMutation = useMutation({
    mutationFn: () => claimAdminRole(),
    onSuccess: () => {
      toast.success("Admin role claimed successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to claim admin role"),
  });

  const saveSectionMutation = useMutation({
    mutationFn: (section: any) => saveHomeSection({ data: section }),
    onSuccess: () => {
      toast.success("Homepage section saved!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["home-sections"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to save section"),
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (id: string) => deleteHomeSection({ data: { id } }),
    onSuccess: () => {
      toast.success("Section removed!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["home-sections"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete section"),
  });

  const reorderSectionsMutation = useMutation({
    mutationFn: (items: Array<{ id: string; sort_order: number }>) =>
      reorderHomeSections({ data: { items } }),
    onSuccess: () => {
      toast.success("Layout order updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["home-sections"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to update layout order"),
  });

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    const items = reordered.map((sec: any, i: number) => ({ id: sec.id, sort_order: i + 1 }));
    reorderSectionsMutation.mutate(items);
  };

  const saveSettingMutation = useMutation({
    mutationFn: ({ key, value }: { key: any; value: any }) =>
      saveStoreSetting({ data: { key, value } }),
    onSuccess: () => {
      toast.success("Store setting updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to save setting"),
  });

  const adjustStockMutation = useMutation({
    mutationFn: ({
      productId,
      delta,
      reason,
    }: {
      productId: string;
      delta: number;
      reason: string;
    }) => changeInventory({ data: { productId, delta, reason } }),
    onSuccess: () => {
      toast.success("Stock adjustment recorded in history!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to adjust stock"),
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId, status, note }: { orderId: string; status: any; note: string }) =>
      changeOrderStatus({ data: { orderId, status, note } }),
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["order-details"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to update order status"),
  });

  const saveCategoryMutation = useMutation({
    mutationFn: (cat: any) => saveCategory({ data: cat }),
    onSuccess: () => {
      toast.success("Category saved!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to save category"),
  });

  const toggleCategoryMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      toggleCategoryPublished({ data: { id, published } }),
    onSuccess: () => {
      toast.success("Category visibility updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to toggle category"),
  });

  const reorderCategoriesMutation = useMutation({
    mutationFn: (items: { id: string; sort_order: number }[]) =>
      reorderCategories({ data: { items } }),
    onSuccess: () => {
      toast.success("Category sequence updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to reorder categories"),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory({ data: { id } }),
    onSuccess: () => {
      toast.success("Category deleted!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete category"),
  });

  const saveProductMutation = useMutation({
    mutationFn: (product: any) => saveProduct({ data: product }),
    onSuccess: () => {
      toast.success("Product saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to save product"),
  });

  const toggleProductFieldMutation = useMutation({
    mutationFn: ({
      id,
      field,
      value,
    }: {
      id: string;
      field: "published" | "featured";
      value: boolean;
    }) => toggleProductField({ data: { id, field, value } }),
    onSuccess: () => {
      toast.success("Product status updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to toggle product status"),
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => deleteProduct({ data: { id } }),
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete product"),
  });

  const moderateReviewMutation = useMutation({
    mutationFn: ({
      reviewId,
      action,
      data,
    }: {
      reviewId: string;
      action: "toggle_status" | "toggle_featured" | "delete" | "update";
      data?: any;
    }) => moderateReview({ data: { reviewId, action, data } }),
    onSuccess: () => {
      toast.success("Review updated!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["public-reviews"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to update review"),
  });

  const addManualReviewMutation = useMutation({
    mutationFn: (review: any) => addManualReview({ data: review }),
    onSuccess: () => {
      toast.success("Customer review added!");
      queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
      queryClient.invalidateQueries({ queryKey: ["public-reviews"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to add review"),
  });

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Loading Gubberz admin workspace…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">Admin authentication required</h1>
        <p className="mt-3 text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "You need authorized credentials to access this area."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="press rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ink-foreground"
          >
            Retry
          </button>
          <button
            onClick={handleSignOut}
            className="press rounded-full bg-surface px-6 py-2.5 text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const {
    sections = [],
    products = [],
    categories = [],
    settings = [],
    orders = [],
    inventoryMovements = [],
    hasAdmin = false,
    userId = "",
  } = data || {};

  const settingsMap: Record<string, any> = {};
  for (const s of settings) settingsMap[s.key] = s.value;

  const reviewsList: StoredReview[] =
    Array.isArray(settingsMap["customer_reviews"]) && settingsMap["customer_reviews"].length > 0
      ? settingsMap["customer_reviews"]
      : DEFAULT_STORED_REVIEWS;

  const pendingReviews = reviewsList.filter((r) => r.status === "pending");

  const lowStock = products.filter((p: any) => p.stock <= (p.low_stock_threshold ?? 3));
  const pendingVerificationOrders = orders.filter((o: any) => o.status === "payment_verification");
  const filteredOrders = orders.filter((o: any) => {
    const matchesStatus = orderFilter === "all" || o.status === orderFilter;
    if (!matchesStatus) return false;
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return (
      o.code?.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.phone?.includes(q) ||
      o.city?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
            >
              ← Storefront
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight">gubberz</span>
              <span className="rounded bg-ink px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-ink-foreground">
                Admin v3
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground md:inline">
              UID: {userId?.slice(0, 8)}…
            </span>
            <button
              onClick={() => refetch()}
              title="Refresh data"
              className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={handleSignOut}
              className="press rounded-full bg-surface px-4 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-5 md:px-8">
          {[
            { id: "overview", label: "Overview", icon: Boxes },
            {
              id: "orders",
              label: `Orders (${orders.length})`,
              icon: ShoppingBag,
              badge:
                pendingVerificationOrders.length > 0
                  ? `${pendingVerificationOrders.length} pending`
                  : undefined,
            },
            { id: "products", label: `Products (${products.length})`, icon: Package },
            { id: "categories", label: `Categories (${categories.length})`, icon: Layers },
            {
              id: "inventory",
              label: `Inventory (${lowStock.length > 0 ? `${lowStock.length} alert` : "OK"})`,
              icon: History,
            },
            { id: "settings", label: "Store & Payments", icon: Settings },
            { id: "promos", label: "Coupons & Promos", icon: Tag },
            { id: "flash", label: "Flash Drops & Sales", icon: Flame },
            {
              id: "reviews",
              label: `Reviews (${reviewsList.length})`,
              icon: MessageSquare,
              badge: pendingReviews.length > 0 ? `${pendingReviews.length} pending` : undefined,
            },
            { id: "sections", label: `Editorial Layout (${sections.length})`, icon: ImageIcon },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as Tab)}
                className={`press shrink-0 flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  tab === t.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] text-destructive font-bold">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {!hasAdmin && (
          <div className="mb-8 rounded-3xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-foreground flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" /> Verified Authentication Active
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Signed in with User ID:{" "}
                  <code className="font-mono text-foreground font-semibold">{userId}</code>.
                  Initialize or claim database administrator privileges for this session:
                </p>
              </div>
              <button
                disabled={claimAdminMutation.isPending}
                onClick={() => claimAdminMutation.mutate()}
                className="press rounded-full bg-ink px-4 py-2 font-mono text-xs font-bold text-ink-foreground"
              >
                {claimAdminMutation.isPending ? "Assigning Role…" : "Establish Admin Role"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-8">
            {pendingVerificationOrders.length > 0 && (
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">
                        {pendingVerificationOrders.length} Order(s) Awaiting Payment Verification
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Advance payments submitted with payment proof screenshot ready for review.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOrderFilter("payment_verification");
                      setTab("orders");
                    }}
                    className="press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground"
                  >
                    Inspect Proofs →
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border bg-surface p-6">
                <p className="font-mono text-xs uppercase text-muted-foreground">Total Orders</p>
                <p className="mt-2 font-mono text-3xl font-extrabold">{orders.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Lifetime customer purchases</p>
              </div>
              <div className="rounded-3xl border bg-surface p-6">
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  Published Products
                </p>
                <p className="mt-2 font-mono text-3xl font-extrabold">
                  {products.filter((p: any) => p.published).length} / {products.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Across {categories.length} categories
                </p>
              </div>
              <div className="rounded-3xl border bg-surface p-6">
                <p className="font-mono text-xs uppercase text-muted-foreground">Low Stock Watch</p>
                <p
                  className={`mt-2 font-mono text-3xl font-extrabold ${lowStock.length > 0 ? "text-destructive" : ""}`}
                >
                  {lowStock.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Threshold &lt;= 3 units</p>
              </div>
              <div className="rounded-3xl border bg-surface p-6">
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  Active Categories
                </p>
                <p className="mt-2 font-mono text-3xl font-extrabold">
                  {categories.filter((c: any) => c.published).length} / {categories.length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Shown in store navigation</p>
              </div>
            </div>

            {/* Quick Sections */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Low stock list */}
              <div className="rounded-3xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-primary" /> Inventory Attention
                  </h3>
                  <button
                    onClick={() => setTab("inventory")}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Manage Inventory →
                  </button>
                </div>
                {lowStock.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    All items have healthy inventory levels.
                  </p>
                ) : (
                  <ul className="mt-4 divide-y">
                    {lowStock.map((p: any) => (
                      <li key={p.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={imageSrc(p.images?.[0])}
                            alt=""
                            className="h-9 w-9 rounded-xl object-cover bg-surface"
                          />
                          <div>
                            <p className="font-semibold text-sm">{p.name}</p>
                            <p className="font-mono text-xs text-muted-foreground">SKU: {p.sku}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                              p.stock <= 0
                                ? "bg-destructive/10 text-destructive"
                                : "bg-accent/20 text-accent-foreground"
                            }`}
                          >
                            {p.stock <= 0 ? "Out of stock" : `${p.stock} left`}
                          </span>
                          <AdjustStockDialog
                            product={p}
                            onAdjust={(delta, reason) =>
                              adjustStockMutation.mutate({ productId: p.id, delta, reason })
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recent Orders */}
              <div className="rounded-3xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Recent Orders
                  </h3>
                  <button
                    onClick={() => setTab("orders")}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View all ({orders.length}) →
                  </button>
                </div>
                {orders.length === 0 ? (
                  <p className="mt-4 text-sm text-muted-foreground">No orders recorded yet.</p>
                ) : (
                  <ul className="mt-4 divide-y">
                    {orders.slice(0, 6).map((o: any) => (
                      <li key={o.id} className="flex items-center justify-between py-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold">{o.code}</span>
                            <span className="text-xs font-medium text-foreground">
                              · {o.customer_name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {o.city} · Method: {o.payment_method?.toUpperCase()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-mono text-sm font-semibold">{formatPKR(o.total)}</p>
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase font-semibold ${getStatusBadgeClass(o.status)}`}
                            >
                              {o.status.replace("_", " ")}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedOrderId(o.id);
                              setTab("orders");
                            }}
                            className="press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted"
                          >
                            Inspect
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {tab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Customer Orders</h2>
                <p className="text-sm text-muted-foreground">
                  Track orders, verify advance payment proofs, inspect order items, and advance
                  status steps.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search by code, customer, phone…"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="h-10 w-64 rounded-2xl bg-surface pl-9 pr-3 text-xs outline-none ring-primary focus:ring-2"
                  />
                  {orderSearch && (
                    <button
                      onClick={() => setOrderSearch("")}
                      className="absolute right-3 top-2.5 text-xs text-muted-foreground"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl bg-surface p-1 text-xs">
              {[
                { id: "all", label: `All (${orders.length})` },
                {
                  id: "payment_verification",
                  label: `Payment Verification (${orders.filter((o: any) => o.status === "payment_verification").length})`,
                },
                {
                  id: "placed",
                  label: `Placed (${orders.filter((o: any) => o.status === "placed").length})`,
                },
                {
                  id: "confirmed",
                  label: `Confirmed (${orders.filter((o: any) => o.status === "confirmed").length})`,
                },
                {
                  id: "packed",
                  label: `Packed (${orders.filter((o: any) => o.status === "packed").length})`,
                },
                {
                  id: "shipped",
                  label: `Shipped (${orders.filter((o: any) => o.status === "shipped").length})`,
                },
                {
                  id: "delivered",
                  label: `Delivered (${orders.filter((o: any) => o.status === "delivered").length})`,
                },
                {
                  id: "cancelled",
                  label: `Cancelled (${orders.filter((o: any) => o.status === "cancelled").length})`,
                },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setOrderFilter(st.id)}
                  className={`press rounded-xl px-3 py-1.5 font-mono uppercase transition-colors ${
                    orderFilter === st.id
                      ? "bg-ink font-bold text-ink-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="rounded-3xl border bg-card p-12 text-center">
                <p className="text-muted-foreground">No orders matching this filter or search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xs"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-lg font-extrabold">{order.code}</span>
                          <span
                            className={`rounded-full px-3 py-0.5 font-mono text-xs uppercase font-semibold ${getStatusBadgeClass(order.status)}`}
                          >
                            {order.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold">
                          {order.customer_name} · <span className="font-mono">{order.phone}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.city} · Placed {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="font-mono text-xl font-bold">
                          {formatPKR(order.total)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] uppercase text-muted-foreground font-semibold">
                            {order.payment_method}
                          </span>
                          <button
                            onClick={() => setSelectedOrderId(order.id)}
                            className="press rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-ink-foreground"
                          >
                            Inspect Details →
                          </button>
                        </div>
                      </div>
                    </div>

                    {order.payment_proof && (
                      <div className="mt-4 rounded-2xl bg-surface/70 border border-primary/20 p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-foreground">
                            Payment Proof Screenshot Attached ({order.payment_method.toUpperCase()})
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className="font-mono text-xs text-primary font-bold hover:underline"
                        >
                          Review Receipt & Verify ↗
                        </button>
                      </div>
                    )}

                    {/* Quick status steps */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
                      <span className="font-mono text-xs text-muted-foreground mr-1">
                        Advance Status:
                      </span>
                      {[
                        "payment_verification",
                        "confirmed",
                        "packed",
                        "shipped",
                        "delivered",
                        "cancelled",
                      ].map((st) => (
                        <button
                          key={st}
                          disabled={order.status === st || updateOrderStatusMutation.isPending}
                          onClick={() => {
                            const note =
                              prompt(
                                `Add a note for status "${st.replace("_", " ")}" (optional):`,
                              ) ?? "";
                            updateOrderStatusMutation.mutate({
                              orderId: order.id,
                              status: st,
                              note,
                            });
                          }}
                          className={`press rounded-full border px-3 py-1 font-mono text-xs uppercase ${
                            order.status === st
                              ? "bg-ink text-ink-foreground opacity-50 cursor-default"
                              : "bg-surface hover:bg-muted text-foreground"
                          }`}
                        >
                          {st.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ORDER INSPECTION DRAWER/MODAL */}
            {selectedOrderId && (
              <OrderInspectionModal
                orderId={selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
                onUpdateStatus={(orderId, status, note) =>
                  updateOrderStatusMutation.mutate({ orderId, status, note })
                }
              />
            )}
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {tab === "products" && (
          <ProductsManager
            products={products}
            categories={categories}
            onSaveProduct={(p) => saveProductMutation.mutate(p)}
            onToggleField={(id, field, value) =>
              toggleProductFieldMutation.mutate({ id, field, value })
            }
            onDeleteProduct={(id) => deleteProductMutation.mutate(id)}
            onAdjustStock={(productId, delta, reason) =>
              adjustStockMutation.mutate({ productId, delta, reason })
            }
          />
        )}

        {/* TAB 4: CATEGORIES MANAGEMENT (REORDER & HIDE) */}
        {tab === "categories" && (
          <CategoriesManager
            categories={categories}
            products={products}
            onSaveCategory={(c) => saveCategoryMutation.mutate(c)}
            onTogglePublished={(id, published) => toggleCategoryMutation.mutate({ id, published })}
            onReorder={(items) => reorderCategoriesMutation.mutate(items)}
            onDeleteCategory={(id) => deleteCategoryMutation.mutate(id)}
          />
        )}

        {/* TAB 5: INVENTORY CHANGES & HISTORY */}
        {tab === "inventory" && (
          <InventoryManager
            products={products}
            movements={inventoryMovements}
            onAdjustStock={(productId, delta, reason) =>
              adjustStockMutation.mutate({ productId, delta, reason })
            }
          />
        )}

        {/* TAB 6: STORE SETTINGS & PAYMENT METHODS */}
        {tab === "settings" && (
          <StoreSettingsManager
            settings={settingsMap}
            onSaveSetting={(key, value) => saveSettingMutation.mutate({ key, value })}
          />
        )}

        {/* TAB 7: HOMEPAGE EDITORIAL SECTIONS */}
        {tab === "sections" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Editorial Homepage Layout & Sections
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage the storefront layout: reorder sections, edit storytelling copy, choose themes, and pick featured products.
                </p>
              </div>

              <CreateSectionDialog
                products={products}
                categories={categories}
                nextSortOrder={sections.length + 1}
                onSave={(newSec) => saveSectionMutation.mutate(newSec)}
              />
            </div>

            {sections.length === 0 ? (
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <p className="font-bold text-lg">No layout sections found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first custom section above to customize the homepage.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section: any, index: number) => (
                  <div
                    key={section.id}
                    className="rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface font-mono text-xs font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-surface px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground font-semibold">
                              {section.section_type.replace(/_/g, " ")}
                            </span>
                            <span className="font-bold">{section.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {section.eyebrow ? `${section.eyebrow} · ` : ""}Theme: {section.theme} · {section.product_slugs?.length || 0} Products
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Reorder Up / Down */}
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveSection(index, "up")}
                          className="press flex h-8 w-8 items-center justify-center rounded-full bg-surface hover:bg-muted disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          disabled={index === sections.length - 1}
                          onClick={() => handleMoveSection(index, "down")}
                          className="press flex h-8 w-8 items-center justify-center rounded-full bg-surface hover:bg-muted disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            saveSectionMutation.mutate({
                              ...section,
                              published: !section.published,
                            })
                          }
                          className={`press rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                            section.published
                              ? "bg-success/20 text-success"
                              : "bg-surface text-muted-foreground"
                          }`}
                        >
                          {section.published ? "Active" : "Hidden"}
                        </button>

                        <SectionEditDialog
                          section={section}
                          products={products}
                          categories={categories}
                          onSave={(updated) => saveSectionMutation.mutate(updated)}
                        />

                        <button
                          onClick={() => {
                            if (confirm(`Remove section "${section.title}" from homepage?`)) {
                              deleteSectionMutation.mutate(section.id);
                            }
                          }}
                          className="press flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                          title="Delete Section"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {section.body && (
                      <p className="mt-3 text-sm text-muted-foreground">{section.body}</p>
                    )}

                    {section.product_slugs && section.product_slugs.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t">
                        <span className="text-[11px] font-mono text-muted-foreground mr-1 self-center">Products:</span>
                        {section.product_slugs.map((slug: string) => (
                          <span
                            key={slug}
                            className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-mono font-medium"
                          >
                            {slug}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: PROMOS & COUPONS GENERATOR */}
        {tab === "promos" && (
          <PromosCouponsManager
            coupons={
              Array.isArray(settingsMap["coupons"]) && settingsMap["coupons"].length > 0
                ? settingsMap["coupons"]
                : DEFAULT_COUPONS
            }
            onSaveCoupons={(newCoupons) =>
              saveSettingMutation.mutate({ key: "coupons", value: newCoupons })
            }
          />
        )}

        {/* TAB 9: FLASH DROPS & MIDNIGHT SALES */}
        {tab === "flash" && (
          <FlashSaleManager
            config={
              settingsMap["flash_sale"] && typeof settingsMap["flash_sale"] === "object"
                ? settingsMap["flash_sale"]
                : DEFAULT_FLASH_SALE
            }
            onSaveFlashSale={(cfg) =>
              saveSettingMutation.mutate({ key: "flash_sale", value: cfg })
            }
          />
        )}

        {/* TAB 10: CUSTOMER REVIEWS & MODERATION */}
        {tab === "reviews" && (
          <ReviewsModerationManager
            reviews={reviewsList}
            products={products}
            onModerate={(reviewId, action, data) =>
              moderateReviewMutation.mutate({ reviewId, action, data })
            }
            onAddManualReview={(review) => addManualReviewMutation.mutate(review)}
            onSaveAllReviews={(updated) =>
              saveSettingMutation.mutate({ key: "customer_reviews", value: updated })
            }
          />
        )}
      </main>
    </div>
  );
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "payment_verification":
      return "bg-amber-500/15 text-amber-700 border border-amber-500/30";
    case "confirmed":
      return "bg-blue-500/15 text-blue-700";
    case "packed":
      return "bg-purple-500/15 text-purple-700";
    case "shipped":
      return "bg-indigo-500/15 text-indigo-700";
    case "delivered":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-surface text-foreground";
  }
}

// ==========================================
// ORDER INSPECTION DIALOG (WITH PROOF & TIMELINE)
// ==========================================
function OrderInspectionModal({
  orderId,
  onClose,
  onUpdateStatus,
}: {
  orderId: string;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: any, note: string) => void;
}) {
  const [statusNote, setStatusNote] = useState("");
  const [showProofZoom, setShowProofZoom] = useState(false);
  const [courier, setCourier] = useState<"TCS" | "TRAX" | "LEOPARDS">("TCS");
  const [consignment, setConsignment] = useState("");

  const handleGenerateConsignment = () => {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    const prefix = courier === "TCS" ? "TCS" : courier === "TRAX" ? "TRX" : "LEO";
    const code = `${prefix}-${randomDigits}PK`;
    setConsignment(code);
    toast.success(`Generated ${courier} Consignment #${code}`);
  };

  const getTrackingUrl = (c: string, num: string) => {
    if (c === "TCS") return `https://www.tcsexpress.com/tracking?consignmentNo=${num}`;
    if (c === "TRAX") return `https://sonic.trax.pk/tracking?tracking_number=${num}`;
    return `https://leopardscourier.com/tracking?track_numbers=${num}`;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["order-details", orderId],
    queryFn: () => getOrderDetails({ data: { orderId } }),
  });

  if (isLoading || !data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
        <div className="rounded-3xl bg-background p-8 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-primary border-r-transparent" />
          <p className="mt-2 text-xs font-mono">Loading order records…</p>
        </div>
      </div>
    );
  }

  const { order, items, events } = data;
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!order?.payment_proof) {
      setProofUrl(null);
      return;
    }
    if (order.payment_proof.startsWith("http")) {
      setProofUrl(order.payment_proof);
      return;
    }
    // Attempt signed URL first (for private buckets)
    supabase.storage
      .from("payment-proofs")
      .createSignedUrl(order.payment_proof, 3600)
      .then(({ data, error }) => {
        if (data?.signedUrl) {
          setProofUrl(data.signedUrl);
        } else {
          const base = import.meta.env.VITE_SUPABASE_URL || "";
          setProofUrl(`${base}/storage/v1/object/public/payment-proofs/${order.payment_proof}`);
        }
      })
      .catch(() => {
        const base = import.meta.env.VITE_SUPABASE_URL || "";
        setProofUrl(`${base}/storage/v1/object/public/payment-proofs/${order.payment_proof}`);
      });
  }, [order?.payment_proof]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-extrabold font-mono">{order.code}</h3>
              <span
                className={`rounded-full px-3 py-0.5 font-mono text-xs uppercase font-bold ${getStatusBadgeClass(order.status)}`}
              >
                {order.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="press flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-semibold hover:bg-muted"
            >
              <Printer className="h-3.5 w-3.5 text-primary" /> Print Slip
            </button>
            <button
              onClick={onClose}
              className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Customer & Delivery Card */}
          <div className="rounded-2xl border bg-surface/50 p-4 space-y-2 text-xs">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> Delivery Details
            </h4>
            <p className="font-semibold text-sm text-foreground">{order.customer_name}</p>
            <p className="text-muted-foreground font-mono flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <a href={`tel:${order.phone}`} className="hover:underline">
                {order.phone}
              </a>
              <a
                href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-success hover:underline font-bold"
              >
                WhatsApp ↗
              </a>
            </p>
            {order.email && (
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-3 w-3" /> {order.email}
              </p>
            )}
            <p className="pt-1 text-foreground leading-relaxed">
              <strong>Address:</strong> {order.address}, <strong>{order.city}</strong>
            </p>
            {order.notes && (
              <p className="rounded-xl bg-background p-2.5 text-muted-foreground border">
                <strong>Customer Note:</strong> {order.notes}
              </p>
            )}

            {/* PAKISTAN COURIER CONSIGNMENT GENERATOR DESK */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-primary" /> Courier Consignment
                </span>
                <span className="text-[10px] font-mono text-primary font-bold uppercase">TCS & Trax</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={courier}
                  onChange={(e) => setCourier(e.target.value as any)}
                  className="rounded-xl border bg-background px-2.5 py-1.5 text-xs font-medium"
                >
                  <option value="TCS">TCS Express</option>
                  <option value="TRAX">Trax Logistics</option>
                  <option value="LEOPARDS">Leopards Courier</option>
                </select>

                <button
                  type="button"
                  onClick={handleGenerateConsignment}
                  className="press rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:brightness-110 shadow-xs cursor-pointer"
                >
                  Generate {courier} #
                </button>
              </div>

              {consignment && (
                <div className="rounded-xl bg-background border p-2.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-primary">{consignment}</span>
                    <a
                      href={getTrackingUrl(courier, consignment)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-muted-foreground hover:text-primary underline flex items-center gap-1"
                    >
                      Track Portal ↗
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateStatus(
                        order.id,
                        "shipped",
                        `Dispatched via ${courier}. Consignment #${consignment}. Tracking: ${getTrackingUrl(courier, consignment)}`,
                      );
                      toast.success(`Marked as Shipped with ${courier} Consignment!`);
                    }}
                    className="w-full press rounded-lg bg-indigo-600 hover:bg-indigo-500 py-1.5 text-xs font-bold text-white shadow-xs cursor-pointer"
                  >
                    🚀 Assign & Mark Shipped
                  </button>
                </div>
              )}
            </div>

            {/* Instant Pakistani WhatsApp Dispatch Templates (Phase 4) */}
            <div className="pt-3 border-t space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                <MessageCircle className="h-3 w-3 text-success" /> 1-Click WhatsApp Notification:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <a
                  href={`https://wa.me/${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi ${order.customer_name}! Your Gubberz order #${order.code} is confirmed. Delivery to ${order.city}. Total: Rs ${formatPKR(order.total)}. We are packing your gadgets now!`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press rounded-lg bg-surface px-2.5 py-1.5 text-center text-[11px] font-semibold text-foreground hover:bg-success/15 hover:text-success border transition-colors truncate"
                >
                  💬 Confirmed
                </a>
                <a
                  href={`https://wa.me/${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    consignment
                      ? `Hi ${order.customer_name}! Great news — your Gubberz order #${order.code} has been dispatched via ${courier} (Tracking #${consignment})! Track live here: ${getTrackingUrl(courier, consignment)}`
                      : `Hi ${order.customer_name}! Great news — your Gubberz order #${order.code} has been dispatched! Track your parcel live here: ${typeof window !== "undefined" ? window.location.origin : ""}/order?code=${order.code}&phone=${encodeURIComponent(order.phone)}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press rounded-lg bg-surface px-2.5 py-1.5 text-center text-[11px] font-semibold text-foreground hover:bg-success/15 hover:text-success border transition-colors truncate"
                >
                  🚚 Dispatched
                </a>
                <a
                  href={`https://wa.me/${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi ${order.customer_name}! Your Gubberz order #${order.code} is out for delivery today in ${order.city}. ${order.payment_method === "cod" ? `Please have Rs ${formatPKR(order.total)} ready for the courier rider.` : "Advance payment is already settled."} Thank you!`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press rounded-lg bg-surface px-2.5 py-1.5 text-center text-[11px] font-semibold text-foreground hover:bg-success/15 hover:text-success border transition-colors truncate"
                >
                  📦 Out for Delivery
                </a>
                <a
                  href={`https://wa.me/${order.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi ${order.customer_name}! Your Gubberz order #${order.code} has been delivered. We hope you love your gadgets! If you need warranty or setup help, reply here anytime.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press rounded-lg bg-surface px-2.5 py-1.5 text-center text-[11px] font-semibold text-foreground hover:bg-success/15 hover:text-success border transition-colors truncate"
                >
                  ✅ Delivered
                </a>
              </div>
            </div>
          </div>

          {/* Payment Card & Proof Review */}
          <div className="rounded-2xl border bg-surface/50 p-4 space-y-2.5 text-xs">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-primary" /> Payment Method & Verification
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Selected Method:</span>
              <span className="font-mono font-bold uppercase">{order.payment_method}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-mono">{formatPKR(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex items-center justify-between text-success">
                <span>Advance Payment Discount:</span>
                <span className="font-mono">-{formatPKR(order.discount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span className="font-mono">{formatPKR(order.delivery_fee)}</span>
            </div>
            <div className="flex items-center justify-between border-t pt-2 font-bold text-sm">
              <span>Final Total:</span>
              <span className="font-mono text-base">{formatPKR(order.total)}</span>
            </div>

            {/* Proof viewer */}
            {proofUrl ? (
              <div className="mt-3 rounded-xl border bg-background p-3">
                <p className="font-bold text-xs text-foreground mb-2 flex items-center justify-between">
                  <span>Attached Payment Proof</span>
                  <a
                    href={proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline font-mono text-[11px]"
                  >
                    Open Original ↗
                  </a>
                </p>
                <div
                  onClick={() => setShowProofZoom(true)}
                  className="relative cursor-zoom-in rounded-lg overflow-hidden border bg-surface group"
                >
                  <img
                    src={proofUrl}
                    alt="Payment proof screenshot"
                    className="max-h-48 w-full object-contain"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-mono font-bold">
                    Click to Zoom
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground italic pt-1">
                No payment proof attached (Cash on Delivery or pending submission).
              </p>
            )}
          </div>
        </div>

        {/* ORDER ITEMS LIST */}
        <div className="mt-6 border-t pt-6">
          <h4 className="font-bold text-sm mb-3">Order Items ({items.length})</h4>
          <div className="divide-y rounded-2xl border bg-card">
            {items.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={imageSrc(item.image)}
                    alt=""
                    className="h-10 w-10 rounded-xl object-cover bg-surface"
                  />
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-muted-foreground font-mono">
                      Qty: {item.qty} × {formatPKR(item.unit_price)}
                    </p>
                  </div>
                </div>
                <div className="font-mono font-bold text-sm">
                  {formatPKR(item.unit_price * item.qty)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS WORKFLOW CONTROLS */}
        <div className="mt-6 border-t pt-6 space-y-4">
          <h4 className="font-bold text-sm">Update Order Status</h4>
          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Optional Note / Tracking Number / Verification Reason
            </label>
            <input
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="e.g. Verified via JazzCash TRX# 9821, or Dispatched via TCS #392819"
              className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "payment_verification", label: "Payment Verification", color: "bg-amber-600" },
              { id: "confirmed", label: "Confirm Order", color: "bg-blue-600" },
              { id: "packed", label: "Mark Packed", color: "bg-purple-600" },
              { id: "shipped", label: "Mark Shipped", color: "bg-indigo-600" },
              { id: "delivered", label: "Mark Delivered", color: "bg-emerald-600" },
              { id: "cancelled", label: "Cancel Order", color: "bg-destructive" },
            ].map((st) => (
              <button
                key={st.id}
                disabled={order.status === st.id}
                onClick={() => {
                  onUpdateStatus(order.id, st.id, statusNote);
                  setStatusNote("");
                }}
                className={`press rounded-xl px-4 py-2 text-xs font-bold text-white transition-opacity ${
                  order.status === st.id
                    ? "opacity-30 cursor-not-allowed bg-muted text-muted-foreground"
                    : st.color
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* ORDER STATUS HISTORY AUDIT LOG */}
        <div className="mt-6 border-t pt-6">
          <h4 className="font-bold text-sm mb-3">Status Timeline & History ({events.length})</h4>
          {events.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Initial state recorded upon order placement.
            </p>
          ) : (
            <div className="space-y-2.5">
              {events.map((ev: any) => (
                <div
                  key={ev.id}
                  className="rounded-xl bg-surface/60 p-3 text-xs flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-mono font-bold uppercase text-foreground">
                      {ev.from_status ? `${ev.from_status} → ` : ""}
                      {ev.to_status}
                    </span>
                    {ev.note && <p className="text-muted-foreground mt-0.5">{ev.note}</p>}
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground font-mono">
                    {new Date(ev.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FULLSCREEN PROOF LIGHTBOX */}
        {showProofZoom && proofUrl && (
          <div
            onClick={() => setShowProofZoom(false)}
            className="fixed inset-0 z-60 flex items-center justify-center bg-ink/90 p-4 cursor-zoom-out"
          >
            <div className="max-w-4xl max-h-[90vh]">
              <img
                src={proofUrl}
                alt="Enlarged payment proof screenshot"
                className="max-h-[85vh] w-auto rounded-2xl object-contain mx-auto shadow-2xl"
              />
              <p className="mt-2 text-center text-xs font-mono text-white/70">
                Click anywhere to close full preview
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// CATEGORIES MANAGER (REORDER & HIDE)
// ==========================================
function CategoriesManager({
  categories,
  products,
  onSaveCategory,
  onTogglePublished,
  onReorder,
  onDeleteCategory,
}: {
  categories: any[];
  products: any[];
  onSaveCategory: (c: any) => void;
  onTogglePublished: (id: string, published: boolean) => void;
  onReorder: (items: { id: string; sort_order: number }[]) => void;
  onDeleteCategory: (id: string) => void;
}) {
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const newCategories = [...categories];
    const current = newCategories[index];
    const target = newCategories[targetIndex];
    if (!current || !target) return;

    const updated = [
      { id: current.id, sort_order: target.sort_order ?? targetIndex },
      { id: target.id, sort_order: current.sort_order ?? index },
    ];
    onReorder(updated);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Category Architecture</h2>
          <p className="text-sm text-muted-foreground">
            Manage store categories, customize blurbs, reorder display hierarchy, and hide/publish
            sections.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="press flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-3xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-4 w-28">Order</th>
              <th className="px-6 py-4">Category Name & Slug</th>
              <th className="px-6 py-4">Blurb / Description</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Visibility</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat: any, index: number) => {
              const count = products.filter((p: any) => p.category_id === cat.id).length;
              return (
                <tr key={cat.id} className="hover:bg-surface/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-bold text-xs w-6 text-muted-foreground">
                        #{index + 1}
                      </span>
                      <button
                        disabled={index === 0}
                        onClick={() => handleMove(index, "up")}
                        title="Move Up"
                        className="press rounded p-1 hover:bg-surface disabled:opacity-20"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        disabled={index === categories.length - 1}
                        onClick={() => handleMove(index, "down")}
                        title="Move Down"
                        className="press rounded p-1 hover:bg-surface disabled:opacity-20"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold">{cat.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">/{cat.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground max-w-xs truncate">
                    {cat.blurb || "—"}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    <span className="rounded-full bg-surface px-2.5 py-1 font-bold">
                      {count} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onTogglePublished(cat.id, !cat.published)}
                      className={`press flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                        cat.published
                          ? "bg-success/15 text-success"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {cat.published ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                      {cat.published ? "Published" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to delete category "${cat.name}"? Products inside will remain in the catalogue as uncategorized.`,
                            )
                          ) {
                            onDeleteCategory(cat.id);
                          }
                        }}
                        className="press rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT CATEGORY DIALOG */}
      {(isCreating || editingCategory) && (
        <CategoryFormDialog
          initial={editingCategory}
          onClose={() => {
            setIsCreating(false);
            setEditingCategory(null);
          }}
          onSave={(data) => {
            onSaveCategory(data);
            setIsCreating(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

function CategoryFormDialog({
  initial,
  onClose,
  onSave,
}: {
  initial: any | null;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [blurb, setBlurb] = useState(initial?.blurb ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl">
        <h3 className="text-lg font-bold">{initial ? "Edit Category" : "Add New Category"}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Define category names, SEO slug, and storefront blurb.
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!initial) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                }
              }}
              placeholder="e.g. Wireless Audio"
              className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">URL Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. wireless-audio"
              className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Blurb / Tagline
            </label>
            <textarea
              rows={3}
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              placeholder="e.g. Pure sound, zero cords, built for all-day focus."
              className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="cat-published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded accent-primary"
            />
            <label htmlFor="cat-published" className="text-xs font-medium cursor-pointer">
              Publish category to storefront navigation
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
          >
            Cancel
          </button>
          <button
            disabled={!name.trim() || !slug.trim()}
            onClick={() => {
              onSave({
                id: initial?.id,
                name: name.trim(),
                slug: slug.trim(),
                blurb: blurb.trim() || null,
                published,
                sort_order: initial?.sort_order ?? 99,
              });
            }}
            className="press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PRODUCTS MANAGER (FULL CRUD & IMAGES)
// ==========================================
function ProductsManager({
  products,
  categories,
  onSaveProduct,
  onToggleField,
  onDeleteProduct,
  onAdjustStock,
}: {
  products: any[];
  categories: any[];
  onSaveProduct: (p: any) => void;
  onToggleField: (id: string, field: "published" | "featured", value: boolean) => void;
  onDeleteProduct: (id: string) => void;
  onAdjustStock: (productId: string, delta: number, reason: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filtered = products.filter((p) => {
    if (selectedCat !== "all" && p.category_id !== selectedCat) return false;
    if (stockFilter === "low" && p.stock > (p.low_stock_threshold ?? 3)) return false;
    if (stockFilter === "out" && p.stock > 0) return false;
    if (stockFilter === "healthy" && p.stock <= (p.low_stock_threshold ?? 3)) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Product Catalogue</h2>
          <p className="text-sm text-muted-foreground">
            Manage catalogue items, pricing, technical specifications, gallery photos, and featured
            selections.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="press flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filter and search toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface/60 p-3 border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search products by name or SKU…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-60 rounded-xl bg-background pl-9 pr-3 text-xs outline-none ring-primary focus:ring-2"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="h-9 rounded-xl bg-background px-3 text-xs outline-none ring-primary focus:ring-2 font-medium"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="h-9 rounded-xl bg-background px-3 text-xs outline-none ring-primary focus:ring-2 font-medium"
          >
            <option value="all">All Inventory States</option>
            <option value="healthy">In Stock (Healthy)</option>
            <option value="low">Low Stock Alerts</option>
            <option value="out">Out of Stock (0 units)</option>
          </select>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          Showing {filtered.length} of {products.length} products
        </span>
      </div>

      <div className="overflow-x-auto rounded-3xl border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">SKU / Category</th>
              <th className="px-6 py-4">Price (PKR)</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Visibility</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((product: any) => {
              const cat = categories.find((c) => c.id === product.category_id);
              return (
                <tr key={product.id} className="hover:bg-surface/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={imageSrc(product.images?.[0])}
                        alt=""
                        className="h-10 w-10 rounded-xl object-cover bg-surface"
                      />
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="font-mono text-xs text-muted-foreground">/{product.slug}</span>
                          <span className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border flex items-center gap-1">
                            📷 {Array.isArray(product.images) ? product.images.length : 1}
                          </span>
                          {product.variants?.colors && Array.isArray(product.variants.colors) && product.variants.colors.length > 0 && (
                            <div className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded-md border" title={`${product.variants.colors.length} color swatches`}>
                              {product.variants.colors.slice(0, 3).map((c: any, ci: number) => (
                                <span
                                  key={ci}
                                  className="h-2 w-2 rounded-full border border-black/20 shrink-0"
                                  style={{ backgroundColor: c.hex }}
                                />
                              ))}
                              {product.variants.colors.length > 3 && (
                                <span className="text-[9px] font-mono text-muted-foreground">+{product.variants.colors.length - 3}</span>
                              )}
                            </div>
                          )}
                          {product.variants?.sizes && Array.isArray(product.variants.sizes) && product.variants.sizes.length > 0 && (
                            <span className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border">
                              {product.variants.sizes.length} {product.variants.variantType || "opts"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-semibold">{product.sku}</p>
                    <p className="text-xs text-muted-foreground">{cat?.name ?? "Unassigned"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold">{formatPKR(product.price)}</span>
                    {product.sale_price && (
                      <span className="ml-2 font-mono text-xs text-primary font-bold">
                        Sale: {formatPKR(product.sale_price)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold ${
                          product.stock <= 0
                            ? "text-destructive"
                            : product.stock <= (product.low_stock_threshold ?? 3)
                              ? "text-amber-600"
                              : "text-foreground"
                        }`}
                      >
                        {product.stock}
                      </span>
                      {product.stock <= (product.low_stock_threshold ?? 3) && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] text-destructive">
                          {product.stock <= 0 ? "Empty" : "Low"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleField(product.id, "published", !product.published)}
                      className={`press rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                        product.published
                          ? "bg-success/15 text-success"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {product.published ? "Live" : "Draft"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleField(product.id, "featured", !product.featured)}
                      className={`press rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                        product.featured
                          ? "bg-amber-500/20 text-amber-700"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {product.featured ? "Featured ★" : "No"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <AdjustStockDialog
                        product={product}
                        onAdjust={(delta, reason) => onAdjustStock(product.id, delta, reason)}
                      />
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${product.name}" permanently from catalogue?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        className="press rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT PRODUCT DIALOG */}
      {(isCreating || editingProduct) && (
        <ProductFormDialog
          initial={editingProduct}
          categories={categories}
          onClose={() => {
            setIsCreating(false);
            setEditingProduct(null);
          }}
          onSave={(data) => {
            onSaveProduct(data);
            setIsCreating(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

function ProductFormDialog({
  initial,
  categories,
  onClose,
  onSave,
}: {
  initial: any | null;
  categories: any[];
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [sku, setSku] = useState(initial?.sku ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "Gubberz");
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? categories[0]?.id ?? "");
  const [shortDesc, setShortDesc] = useState(initial?.short_description ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(Number(initial?.price ?? 4999));
  const [salePrice, setSalePrice] = useState(
    initial?.sale_price != null ? String(initial.sale_price) : "",
  );
  const [stock, setStock] = useState(Number(initial?.stock ?? 15));
  const [lowStockThreshold, setLowStockThreshold] = useState(
    Number(initial?.low_stock_threshold ?? 3),
  );

  // 1. MULTI-IMAGE GALLERY STATE
  const initialImages: string[] =
    Array.isArray(initial?.images) && initial.images.length > 0
      ? initial.images
      : ["headphones"];
  const [galleryImages, setGalleryImages] = useState<string[]>(initialImages);
  const [newCustomImageUrl, setNewCustomImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingForColorIdx, setUploadingForColorIdx] = useState<number | null>(null);

  // Helper function to read file to base64
  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const resultStr = reader.result as string;
        const base64 = resultStr.includes(",") ? resultStr.split(",")[1] : resultStr;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Handle multiple or single file uploads to product gallery
  async function handleGalleryFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File "${file.name}" exceeds 5MB limit`);
          continue;
        }
        const base64 = await readFileAsBase64(file);
        const res = await uploadProductImage({
          data: {
            fileName: file.name,
            contentType: file.type || "image/jpeg",
            base64Data: base64,
          },
        });
        uploadedUrls.push(res.publicUrl);
        successCount++;
      }
      if (uploadedUrls.length > 0) {
        setGalleryImages((prev) => [...prev, ...uploadedUrls]);
        toast.success(`Added ${successCount} photo${successCount > 1 ? "s" : ""} to gallery!`);
      }
    } catch (err: any) {
      console.error("Gallery upload error:", err);
      toast.error(err.message || "Failed to upload photo");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  // Handle dedicated upload for a specific color swatch
  async function handleColorPhotoUpload(
    colorIdx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }

    setUploadingForColorIdx(colorIdx);
    try {
      const base64 = await readFileAsBase64(file);
      const res = await uploadProductImage({
        data: {
          fileName: file.name,
          contentType: file.type || "image/jpeg",
          base64Data: base64,
        },
      });

      // Update color's image
      setColors((prev) => {
        const copy = [...prev];
        copy[colorIdx] = { ...copy[colorIdx], image: res.publicUrl };
        return copy;
      });

      // Ensure it is in the gallery images if not already
      setGalleryImages((prev) => {
        if (!prev.includes(res.publicUrl)) {
          return [...prev, res.publicUrl];
        }
        return prev;
      });

      toast.success(`Photo assigned to "${colors[colorIdx]?.name || "Color"}"!`);
    } catch (err: any) {
      console.error("Color photo upload failed:", err);
      toast.error(err.message || "Failed to upload color photo");
    } finally {
      setUploadingForColorIdx(null);
      e.target.value = "";
    }
  }

  function handleMakeCover(idx: number) {
    if (idx === 0) return;
    setGalleryImages((prev) => {
      const target = prev[idx];
      const remainder = prev.filter((_, i) => i !== idx);
      return [target, ...remainder];
    });
    toast.success("Cover photo updated!");
  }

  function handleMoveImage(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= galleryImages.length) return;
    setGalleryImages((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[target];
      copy[target] = temp;
      return copy;
    });
  }

  function handleRemoveGalleryImage(idx: number) {
    if (galleryImages.length <= 1) {
      toast.error("Catalogue product must have at least 1 image");
      return;
    }
    const removedImg = galleryImages[idx];
    setGalleryImages((prev) => prev.filter((_, i) => i !== idx));

    // If any color had this image assigned, clear it
    setColors((prev) =>
      prev.map((c) => (c.image === removedImg ? { ...c, image: undefined } : c)),
    );
    toast.success("Removed image from gallery");
  }

  function handleAddPresetToGallery(key: string) {
    setGalleryImages((prev) => [...prev, key]);
    toast.success(`Added preset "${key}" to gallery!`);
  }

  function handleAddCustomUrl() {
    const trimmed = newCustomImageUrl.trim();
    if (!trimmed) return;
    setGalleryImages((prev) => [...prev, trimmed]);
    setNewCustomImageUrl("");
    toast.success("Added photo URL to gallery!");
  }

  // 2. PRODUCT VARIATIONS (Colors, Size/Unit Dropdown, and In-The-Box)
  const initialVariants =
    initial?.variants && typeof initial.variants === "object" ? initial.variants : {};
  const [variantType, setVariantType] = useState<string>(initialVariants.variantType || "Size");
  const [colors, setColors] = useState<Array<{ name: string; hex: string; image?: string }>>(
    Array.isArray(initialVariants.colors) ? initialVariants.colors : [],
  );
  const [sizes, setSizes] = useState<
    Array<{ name: string; extraPrice: number; stock: number; specsNote?: string }>
  >(
    Array.isArray(initialVariants.sizes)
      ? initialVariants.sizes.map((s: any) => ({
          name: s.name || "",
          extraPrice: Number(s.extraPrice) || 0,
          stock: Number(s.stock ?? initial?.stock ?? 15),
          specsNote: s.specsNote || "",
        }))
      : [],
  );

  // 3. IN-THE-BOX LIST BUILDER
  const [inBox, setInBox] = useState<string[]>(
    Array.isArray(initialVariants.inBox) && initialVariants.inBox.length > 0
      ? initialVariants.inBox
      : [],
  );
  const [newInBoxItem, setNewInBoxItem] = useState("");

  const COMMON_IN_BOX_PRESETS = [
    "Braided USB-C Cable (1.2m)",
    "Protective Carry Pouch",
    "Quick Start Guide",
    "Official 1-Year Warranty Card",
    "Replacement Silicone Tips (S/M/L)",
    "Fast 65W Power Adapter",
    "2.4GHz Wireless Nano Receiver",
    "Keycap & Switch Puller Tool",
  ];

  function handleAddInBoxPreset(preset: string) {
    if (inBox.includes(preset)) {
      toast("Item already in the box list");
      return;
    }
    setInBox((prev) => [...prev, preset]);
  }

  function handleAddCustomInBox() {
    const val = newInBoxItem.trim();
    if (!val) return;
    if (inBox.includes(val)) {
      toast("Item already in the box list");
      return;
    }
    setInBox((prev) => [...prev, val]);
    setNewInBoxItem("");
  }

  // Features
  const [featuresText, setFeaturesText] = useState(
    Array.isArray(initial?.features) ? initial.features.join("\n") : "",
  );

  // Specifications key-value rows
  const initialSpecsList =
    initial?.specs && typeof initial.specs === "object"
      ? Object.entries(initial.specs).map(([key, value]) => ({
          key,
          value: String(value ?? ""),
        }))
      : [];
  const [specsList, setSpecsList] = useState<Array<{ key: string; value: string }>>(
    initialSpecsList,
  );

  const [published, setPublished] = useState(initial?.published ?? true);
  const [featured, setFeatured] = useState(initial?.featured ?? false);

  function handleSave() {
    const parsedSpecs: Record<string, string> = {};
    for (const s of specsList) {
      if (s.key.trim()) {
        parsedSpecs[s.key.trim()] = s.value.trim();
      }
    }

    const cleanColors = colors
      .filter((c) => c.name.trim())
      .map((c) => ({
        name: c.name.trim(),
        hex: c.hex || "#1f2123",
        image: c.image?.trim() || undefined,
      }));

    const cleanSizes = sizes
      .filter((s) => s.name.trim())
      .map((s) => ({
        name: s.name.trim(),
        extraPrice: Number(s.extraPrice) || 0,
        stock: Number(s.stock) >= 0 ? Number(s.stock) : Number(stock),
        specsNote: s.specsNote?.trim() || undefined,
      }));

    const cleanInBox = inBox.map((i) => i.trim()).filter(Boolean);

    const finalVariants = {
      colors: cleanColors,
      variantType: variantType.trim() || "Size",
      sizes: cleanSizes,
      inBox: cleanInBox,
    };

    const finalImages = galleryImages.length > 0 ? galleryImages : ["headphones"];

    const features = featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      id: initial?.id,
      name: name.trim(),
      slug: slug.trim(),
      sku: sku.trim(),
      brand: brand.trim() || null,
      category_id: categoryId || null,
      short_description: shortDesc.trim() || null,
      description: description.trim() || null,
      price: Number(price),
      sale_price: salePrice ? Number(salePrice) : null,
      stock: Number(stock),
      low_stock_threshold: Number(lowStockThreshold),
      images: finalImages,
      specs: parsedSpecs,
      variants: finalVariants,
      features,
      published,
      featured,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{initial ? "Edit Product" : "Add New Product"}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configure storefront copy, multi-image gallery, color swatches, size tiers, and packaging specs.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="press rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5 text-xs">
          {/* Basic Identity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Product Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!initial) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                  }
                }}
                placeholder="e.g. Surge GaN Charger"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2 font-medium"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. surge-gan-charger"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">SKU Code</label>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. GBZ-PWR-003"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm uppercase outline-none ring-primary focus:ring-2 font-bold"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Gubberz"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2 font-medium"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2 font-medium"
              >
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Price (PKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2 font-bold"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Sale Price (PKR)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Optional"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2 font-bold text-primary"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">Stock Count</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2 font-bold"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground font-bold">
                Low Alert Threshold
              </label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* 1. MULTI-IMAGE GALLERY MANAGER (PHASE 3)                   */}
          {/* ========================================================= */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4.5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
                    1
                  </span>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" /> Product Gallery & Visual Assets
                  </h4>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Order photos, designate the primary cover image, and upload multi-angle studio shots.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                  {galleryImages.length} {galleryImages.length === 1 ? "Photo" : "Photos"}
                </span>
                <label
                  className={`press cursor-pointer inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${
                    isUploading
                      ? "bg-muted text-muted-foreground pointer-events-none"
                      : "bg-primary text-primary-foreground hover:brightness-110 shadow-xs"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Uploading…
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" /> Upload Photos
                    </>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleGalleryFilesUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Gallery Cards Grid with Order Controls & Cover Tag */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryImages.map((imgKey, idx) => {
                const isCover = idx === 0;
                return (
                  <div
                    key={`${imgKey}-${idx}`}
                    className={`relative rounded-2xl border p-2 bg-background flex flex-col justify-between transition-all ${
                      isCover
                        ? "border-primary ring-2 ring-primary/40 shadow-sm"
                        : "border-border/70 hover:border-foreground/30"
                    }`}
                  >
                    {/* Index & Cover Badge */}
                    <div className="flex items-center justify-between pb-1.5">
                      <span className="font-mono text-[10px] font-bold text-muted-foreground">
                        #{idx + 1}
                      </span>
                      {isCover ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] font-extrabold text-primary-foreground uppercase tracking-wider flex items-center gap-1">
                          <Star className="h-2.5 w-2.5 fill-current" /> Cover
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleMakeCover(idx)}
                          className="press text-[10px] font-semibold text-primary hover:underline flex items-center gap-0.5"
                          title="Set as primary cover photo"
                        >
                          <Star className="h-3 w-3" /> Make Cover
                        </button>
                      )}
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface flex items-center justify-center p-2 border border-border/40">
                      <img
                        src={imageSrc(imgKey)}
                        alt={`Gallery ${idx + 1}`}
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Image Key or URL snippet */}
                    <div className="pt-1.5 pb-1">
                      <p className="font-mono text-[10px] text-muted-foreground truncate" title={imgKey}>
                        {imgKey.startsWith("http") ? imgKey.split("/").pop() || imgKey : imgKey}
                      </p>
                    </div>

                    {/* Reorder and Delete Toolbar */}
                    <div className="flex items-center justify-between border-t border-border/50 pt-1.5 mt-0.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, -1)}
                          className="press h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 cursor-pointer"
                          title="Move left"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === galleryImages.length - 1}
                          onClick={() => handleMoveImage(idx, 1)}
                          className="press h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 cursor-pointer"
                          title="Move right"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        disabled={galleryImages.length <= 1}
                        className="press h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-20 cursor-pointer"
                        title="Remove photo from gallery"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick-Add from Bundled Preset Icons */}
            <div className="rounded-xl bg-background/80 border p-3 space-y-2">
              <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" /> Quick Add Bundled Studio Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IMAGE_KEYS.map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => handleAddPresetToGallery(key)}
                    className="press flex items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1 text-[11px] font-mono hover:border-primary hover:text-primary transition-colors"
                  >
                    <img src={imageSrc(key)} alt={key} className="h-3.5 w-3.5 object-cover rounded" />
                    <span>+{key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Custom URL to Gallery */}
            <div className="flex gap-2">
              <input
                value={newCustomImageUrl}
                onChange={(e) => setNewCustomImageUrl(e.target.value)}
                placeholder="Add external or Supabase Storage image URL (https://...)"
                className="h-9 flex-1 rounded-xl bg-background px-3 font-mono text-xs outline-none ring-primary focus:ring-2 border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomUrl();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomUrl}
                disabled={!newCustomImageUrl.trim()}
                className="press rounded-xl bg-surface px-3.5 py-1.5 font-bold text-xs hover:bg-muted disabled:opacity-40 border"
              >
                + Add URL
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. COLOR VARIANTS WITH PHOTO PICKER (PHASE 3)             */}
          {/* ========================================================= */}
          <div className="rounded-2xl border border-border/80 bg-surface/30 p-4.5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
                    2
                  </span>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Color Variants & Photo Assignment
                  </h4>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Interactive swatches (Apple & Torras style). Each color swatch switches the hero photo when clicked.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setColors([...colors, { name: "", hex: "#1f2123", image: "" }])}
                className="press rounded-xl bg-surface px-3 py-1.5 text-xs font-bold text-primary flex items-center gap-1 hover:bg-muted border border-primary/30"
              >
                <Plus className="h-3.5 w-3.5" /> Add Color Swatch
              </button>
            </div>

            {colors.length === 0 ? (
              <div className="rounded-xl border border-dashed p-3.5 text-center text-[11px] text-muted-foreground">
                No color variants configured. The single standard cover photo will be displayed.
              </div>
            ) : (
              <div className="space-y-3">
                {colors.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/60 bg-background p-3 space-y-3 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {/* Color Picker & Name */}
                      <div className="flex items-center gap-2.5">
                        <input
                          type="color"
                          value={c.hex}
                          onChange={(e) => {
                            const copy = [...colors];
                            copy[idx].hex = e.target.value;
                            setColors(copy);
                          }}
                          className="h-8 w-8 rounded-full border border-black/20 cursor-pointer overflow-hidden p-0"
                          title="Pick color"
                        />
                        <input
                          value={c.name}
                          onChange={(e) => {
                            const copy = [...colors];
                            copy[idx].name = e.target.value;
                            setColors(copy);
                          }}
                          placeholder="Color Name (e.g. Sage Olive, Matte Black)"
                          className="h-8.5 w-52 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2 font-semibold"
                        />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">{c.hex}</span>
                      </div>

                      {/* Remove Color Button */}
                      <button
                        type="button"
                        onClick={() => setColors(colors.filter((_, i) => i !== idx))}
                        className="press text-muted-foreground hover:text-destructive p-1 rounded-lg"
                        title="Remove Color"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Dedicated Photo Picker for this Color */}
                    <div className="rounded-xl bg-surface/50 border p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Current Assigned Photo Thumbnail */}
                        <div className="h-10 w-10 rounded-lg border bg-background flex items-center justify-center overflow-hidden shrink-0">
                          {c.image ? (
                            <img
                              src={imageSrc(c.image)}
                              alt={c.name || "Color"}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-[9px] font-mono text-muted-foreground text-center">
                              Cover
                            </span>
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-[11px] text-foreground">
                            {c.image ? "Specific Photo Linked" : "Uses Default Cover Photo"}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[200px]">
                            {c.image ? c.image : "No special image selected"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Pick from existing gallery images dropdown */}
                        <select
                          value={c.image || ""}
                          onChange={(e) => {
                            const copy = [...colors];
                            copy[idx].image = e.target.value || undefined;
                            setColors(copy);
                          }}
                          className="h-8 rounded-lg bg-background px-2.5 text-[11px] font-medium outline-none ring-primary focus:ring-1 border"
                        >
                          <option value="">Default Cover Photo</option>
                          {galleryImages.map((img, imgIdx) => (
                            <option key={`${img}-${imgIdx}`} value={img}>
                              Gallery Photo #{imgIdx + 1} ({img.startsWith("http") ? "Storage" : img})
                            </option>
                          ))}
                        </select>

                        {/* Dedicated File Upload for this Color */}
                        <label
                          className={`press cursor-pointer inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold border ${
                            uploadingForColorIdx === idx
                              ? "bg-muted text-muted-foreground pointer-events-none"
                              : "bg-background hover:bg-muted text-foreground"
                          }`}
                        >
                          {uploadingForColorIdx === idx ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : (
                            <Upload className="h-3 w-3" />
                          )}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => handleColorPhotoUpload(idx, e)}
                            disabled={uploadingForColorIdx === idx}
                            className="hidden"
                          />
                        </label>

                        {/* Clear button if image is set */}
                        {c.image && (
                          <button
                            type="button"
                            onClick={() => {
                              const copy = [...colors];
                              copy[idx].image = undefined;
                              setColors(copy);
                            }}
                            className="press text-muted-foreground hover:text-foreground text-[11px] underline px-1"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* 3. SIZE & OPTION VARIANTS WITH DELTA PRICING & STOCK      */}
          {/* ========================================================= */}
          <div className="rounded-2xl border border-border/80 bg-surface/30 p-4.5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
                    3
                  </span>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Size, Wattage & Spec Options (Delta Pricing)
                  </h4>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Options dropdown (e.g. 65W vs 100W, S/M/L, 1.2m vs 2.0m) with extra PKR price and variant inventory stock.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={variantType}
                  onChange={(e) => setVariantType(e.target.value)}
                  placeholder="Label (e.g. Size, Wattage, Model)"
                  className="h-8 w-36 rounded-xl bg-background px-2.5 text-xs font-mono font-medium outline-none ring-primary focus:ring-1 border"
                  title="Variant property label"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSizes([
                      ...sizes,
                      { name: "", extraPrice: 0, stock: Number(stock) || 15, specsNote: "" },
                    ])
                  }
                  className="press rounded-xl bg-surface px-3 py-1.5 text-xs font-bold text-primary flex items-center gap-1 hover:bg-muted border border-primary/30"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Option
                </button>
              </div>
            </div>

            {sizes.length === 0 ? (
              <div className="rounded-xl border border-dashed p-3.5 text-center text-[11px] text-muted-foreground">
                No size or spec options added. Base product price and main inventory stock apply.
              </div>
            ) : (
              <div className="space-y-2">
                {sizes.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-2 rounded-2xl bg-background p-3 border border-border/60 shadow-2xs"
                  >
                    <input
                      value={s.name}
                      onChange={(e) => {
                        const copy = [...sizes];
                        copy[idx].name = e.target.value;
                        setSizes(copy);
                      }}
                      placeholder="Option Name (e.g. 100W GaN (4 Ports), 2.0 Metres, Pro Hard Case)"
                      className="h-8.5 flex-1 min-w-[160px] rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2 font-semibold"
                    />

                    <div className="flex items-center gap-1.5 shrink-0 bg-surface px-2 py-1 rounded-xl border">
                      <span className="text-[11px] font-mono font-bold text-muted-foreground">+PKR:</span>
                      <input
                        type="number"
                        value={s.extraPrice}
                        onChange={(e) => {
                          const copy = [...sizes];
                          copy[idx].extraPrice = Number(e.target.value);
                          setSizes(copy);
                        }}
                        placeholder="0"
                        className="h-7 w-20 rounded-lg bg-background px-2 text-xs font-mono font-bold outline-none ring-primary focus:ring-1"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 bg-surface px-2 py-1 rounded-xl border">
                      <span className="text-[11px] font-mono font-bold text-muted-foreground">Stock:</span>
                      <input
                        type="number"
                        value={s.stock}
                        onChange={(e) => {
                          const copy = [...sizes];
                          copy[idx].stock = Number(e.target.value);
                          setSizes(copy);
                        }}
                        placeholder="15"
                        className="h-7 w-16 rounded-lg bg-background px-2 text-xs font-mono font-bold outline-none ring-primary focus:ring-1"
                      />
                    </div>

                    <input
                      value={s.specsNote || ""}
                      onChange={(e) => {
                        const copy = [...sizes];
                        copy[idx].specsNote = e.target.value;
                        setSizes(copy);
                      }}
                      placeholder="Note (e.g. Includes braided 100W cable)"
                      className="h-8.5 flex-1 min-w-[140px] rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2"
                    />

                    <button
                      type="button"
                      onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                      className="press text-muted-foreground hover:text-destructive p-1 rounded-lg"
                      title="Remove Option"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* 4. IN-THE-BOX ACCESSORY BUILDER (PHASE 3)                  */}
          {/* ========================================================= */}
          <div className="rounded-2xl border border-border/80 bg-surface/30 p-4.5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-background font-bold text-xs">
                  4
                </span>
                <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                  What's in the Box (Packaging Contents)
                </h4>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {inBox.length} {inBox.length === 1 ? "item" : "items"}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Shown to customers on the product page with checkmark badges so they know what cables, pouches, and accessories are included.
            </p>

            {/* In Box Items List */}
            {inBox.length > 0 && (
              <div className="space-y-1.5">
                {inBox.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 rounded-xl bg-background px-3 py-1.5 border border-border/50 text-xs"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Check className="h-3.5 w-3.5 text-success" />
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInBox(inBox.filter((_, i) => i !== idx))}
                      className="press text-muted-foreground hover:text-destructive p-0.5"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Item */}
            <div className="flex gap-2">
              <input
                value={newInBoxItem}
                onChange={(e) => setNewInBoxItem(e.target.value)}
                placeholder="Add package item (e.g. Braided USB-C Cable (1.2m), Travel Pouch)"
                className="h-9 flex-1 rounded-xl bg-background px-3 text-xs outline-none ring-primary focus:ring-2 border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomInBox();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomInBox}
                disabled={!newInBoxItem.trim()}
                className="press rounded-xl bg-surface px-3.5 py-1.5 font-bold text-xs hover:bg-muted disabled:opacity-40 border"
              >
                + Add Item
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {COMMON_IN_BOX_PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => handleAddInBoxPreset(p)}
                    className="press rounded-lg border bg-surface/70 px-2.5 py-1 text-[10px] font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    +{p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial Descriptions */}
          <div>
            <label className="font-mono uppercase text-muted-foreground font-bold">
              Short Description (Tagline)
            </label>
            <input
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="e.g. 65W GaN fast charger with 3 ports"
              className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div>
            <label className="font-mono uppercase text-muted-foreground font-bold">Full Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed editorial copy about materials, experience, and benefits…"
              className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div>
            <label className="font-mono uppercase text-muted-foreground font-bold">
              Key Features (1 per line)
            </label>
            <textarea
              rows={3}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Active noise cancelling&#10;40h battery life&#10;Fold-flat hinge"
              className="mt-1 w-full rounded-xl bg-surface p-3 font-mono text-xs outline-none ring-primary focus:ring-2"
            />
          </div>

          {/* Technical Specifications */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-mono uppercase text-muted-foreground text-xs font-bold">
                  Technical Specifications (Optional)
                </label>
                <p className="text-[11px] text-muted-foreground">
                  Can be left empty. Enter property name (e.g. Watts) and value (e.g. 65W).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSpecsList([...specsList, { key: "", value: "" }])}
                className="press text-xs font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add specification
              </button>
            </div>

            {specsList.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 p-3 text-center text-[11px] text-muted-foreground">
                No specifications added yet. Click &quot;+ Add specification&quot; to add technical specs like Watts, Battery, or Weight.
              </div>
            ) : (
              <div className="space-y-2">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      value={spec.key}
                      onChange={(e) => {
                        const copy = [...specsList];
                        copy[idx].key = e.target.value;
                        setSpecsList(copy);
                      }}
                      placeholder="Property (e.g. Watts, Battery, Output)"
                      className="h-9 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2 font-medium"
                    />
                    <input
                      value={spec.value}
                      onChange={(e) => {
                        const copy = [...specsList];
                        copy[idx].value = e.target.value;
                        setSpecsList(copy);
                      }}
                      placeholder="Value (e.g. 50, 40 hours, 65W GaN)"
                      className="h-9 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setSpecsList(specsList.filter((_, i) => i !== idx))}
                      className="press h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      title="Remove Specification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visibility and Featured Checkboxes */}
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
              <label htmlFor="prod-published" className="font-semibold cursor-pointer">
                Publish Product to storefront
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded accent-primary cursor-pointer"
              />
              <label htmlFor="prod-featured" className="font-semibold cursor-pointer">
                Feature on Homepage Curations ★
              </label>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="press rounded-full bg-surface px-5 py-2 text-xs font-semibold hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!name.trim() || !sku.trim()}
            onClick={handleSave}
            className="press rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50 hover:brightness-110 shadow-xs"
          >
            Save Product & Variants
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// INVENTORY MANAGER (STOCK & AUDIT LOG)
// ==========================================
function InventoryManager({
  products,
  movements,
  onAdjustStock,
}: {
  products: any[];
  movements: any[];
  onAdjustStock: (productId: string, delta: number, reason: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const lowStockItems = products.filter((p) => p.stock <= (p.low_stock_threshold ?? 3));
  const outOfStockItems = products.filter((p) => p.stock <= 0);

  const filtered = products.filter((p) => {
    if (filter === "low") return p.stock <= (p.low_stock_threshold ?? 3);
    if (filter === "out") return p.stock <= 0;
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Inventory & Stock Movements</h2>
        <p className="text-sm text-muted-foreground">
          Real-time inventory levels, threshold alerts, and complete historical audit logs of stock
          adjustments.
        </p>
      </div>

      {/* Low Stock Urgency Banner (Phase 4) */}
      {lowStockItems.length > 0 && (
        <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                Low Stock Urgency Alert ({lowStockItems.length} items low or out of stock)
              </h4>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                {outOfStockItems.length} products are currently sold out. Replenish units now to prevent lost sales.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilter("low")}
            className="press rounded-full bg-amber-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-amber-700"
          >
            Review Low Stock Items →
          </button>
        </div>
      )}

      {/* Stock Overview */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold">Current Stock Levels</h3>
          <div className="flex gap-1.5 rounded-xl bg-surface p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`press rounded-lg px-3 py-1 font-mono uppercase ${
                filter === "all" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setFilter("low")}
              className={`press rounded-lg px-3 py-1 font-mono uppercase ${
                filter === "low" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              Low Stock Alerts ({lowStockItems.length})
            </button>
            <button
              onClick={() => setFilter("out")}
              className={`press rounded-lg px-3 py-1 font-mono uppercase ${
                filter === "out" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              Out of Stock ({outOfStockItems.length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">SKU</th>
                <th className="px-6 py-3.5">Current Stock</th>
                <th className="px-6 py-3.5">Threshold</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Quick Restock / Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-surface/30">
                  <td className="px-6 py-3.5 font-semibold text-xs">{product.name}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                    {product.sku}
                  </td>
                  <td className="px-6 py-3.5 font-mono font-bold">
                    <span
                      className={
                        product.stock <= 0
                          ? "text-destructive"
                          : product.stock <= (product.low_stock_threshold ?? 3)
                            ? "text-amber-600"
                            : ""
                      }
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                    {product.low_stock_threshold ?? 3}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
                        product.stock <= 0
                          ? "bg-destructive/15 text-destructive font-bold"
                          : product.stock <= (product.low_stock_threshold ?? 3)
                            ? "bg-amber-500/15 text-amber-700 font-semibold"
                            : "bg-success/15 text-success"
                      }`}
                    >
                      {product.stock <= 0
                        ? "Out of stock"
                        : product.stock <= (product.low_stock_threshold ?? 3)
                          ? "Low stock warning"
                          : "Healthy"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onAdjustStock(product.id, 5, "Quick restock +5")}
                        className="press rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-foreground hover:bg-primary hover:text-primary-foreground border"
                        title="Quick add +5 units"
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdjustStock(product.id, 10, "Quick restock +10")}
                        className="press rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-foreground hover:bg-primary hover:text-primary-foreground border"
                        title="Quick add +10 units"
                      >
                        +10
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdjustStock(product.id, 25, "Quick restock +25")}
                        className="press rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-foreground hover:bg-primary hover:text-primary-foreground border hidden sm:inline-block"
                        title="Quick add +25 units"
                      >
                        +25
                      </button>
                      <AdjustStockDialog
                        product={product}
                        onAdjust={(delta, reason) => onAdjustStock(product.id, delta, reason)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Audit Trail */}
      <div className="space-y-4 border-t pt-8">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <History className="h-5 w-5 text-primary" /> Stock Adjustment History & Audit Trail
        </h3>
        <p className="text-xs text-muted-foreground">
          Historical record of every manual and automated inventory adjustment, reason provided, and
          timestamp.
        </p>

        {movements.length === 0 ? (
          <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
            No inventory movement records logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3.5">Date / Time</th>
                  <th className="px-6 py-3.5">Product</th>
                  <th className="px-6 py-3.5">Change (Delta)</th>
                  <th className="px-6 py-3.5">Stated Reason</th>
                  <th className="px-6 py-3.5 text-right">Authorized By</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                {movements.map((m: any) => {
                  const prod = products.find((p) => p.id === m.product_id);
                  return (
                    <tr key={m.id} className="hover:bg-surface/30">
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">
                        {new Date(m.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-3.5 font-semibold text-foreground">
                        {prod ? prod.name : m.product_id?.slice(0, 8)}
                      </td>
                      <td className="px-6 py-3.5 font-mono font-bold">
                        <span
                          className={`rounded-full px-2.5 py-0.5 ${
                            m.delta > 0
                              ? "bg-success/15 text-success"
                              : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {m.delta > 0 ? `+${m.delta}` : m.delta}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-foreground">{m.reason}</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground text-right">
                        {m.changed_by ? `${m.changed_by.slice(0, 8)}…` : "Admin"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// STORE SETTINGS & PAYMENT METHODS MANAGER
// ==========================================
function StoreSettingsManager({
  settings,
  onSaveSetting,
}: {
  settings: Record<string, any>;
  onSaveSetting: (key: string, value: any) => void;
}) {
  const [wa, setWa] = useState(String(settings.whatsapp_number ?? "923274393495"));
  const [email, setEmail] = useState(String(settings.contact_email ?? "maniacphilos@gmail.com"));
  const [fee, setFee] = useState(Number(settings.delivery_fee ?? 250));
  const [disc, setDisc] = useState(Number(settings.advance_payment_discount_percent ?? 5));

  const accounts: any[] = Array.isArray(settings.payment_methods)
    ? settings.payment_methods
    : [
        {
          id: "jazzcash",
          label: "JazzCash",
          account_title: "Gubberz",
          account_number: "+92 327 4393495",
          enabled: true,
          instructions: "Transfer to JazzCash mobile wallet and upload screenshot receipt.",
        },
        {
          id: "nayapay",
          label: "NayaPay",
          account_title: "Gubberz",
          account_number: "4782 7800 6321 6637",
          enabled: true,
          instructions: "Transfer via NayaPay and attach confirmation proof.",
        },
        {
          id: "easypaisa",
          label: "Easypaisa",
          account_title: "Gubberz Store",
          account_number: "+92 300 1234567",
          enabled: true,
          instructions: "Transfer to Easypaisa account and upload proof.",
        },
        {
          id: "bank_transfer",
          label: "Bank Transfer / Raast / IBAN",
          account_title: "Gubberz Tech",
          account_number: "PK89MEZN0001020304050607 · Raast: 923274393495",
          enabled: true,
          instructions: "Send via online banking or Raast instant transfer.",
        },
      ];

  const [paymentList, setPaymentList] = useState<any[]>(accounts);
  const [editingPayment, setEditingPayment] = useState<any | null>(null);

  function handleSavePaymentMethod(method: any) {
    const updated = [...paymentList];
    const idx = updated.findIndex((a) => a.id === method.id);
    if (idx >= 0) {
      updated[idx] = method;
    } else {
      updated.push(method);
    }
    setPaymentList(updated);
    onSaveSetting("payment_methods", updated);
    setEditingPayment(null);
  }

  function handleToggleMethod(id: string) {
    const updated = paymentList.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
    setPaymentList(updated);
    onSaveSetting("payment_methods", updated);
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Store Settings & Payment Methods</h2>
        <p className="text-sm text-muted-foreground">
          Update business contact details, delivery fees, advance discounts, and configure payment
          gateways for customers.
        </p>
      </div>

      {/* General Settings */}
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <h3 className="text-base font-bold">Contact & Fulfillment Rules</h3>

        <div>
          <label className="text-xs font-mono uppercase text-muted-foreground">
            WhatsApp Business Number
          </label>
          <div className="mt-1 flex gap-2">
            <input
              value={wa}
              onChange={(e) => setWa(e.target.value)}
              className="h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
            />
            <button
              onClick={() => onSaveSetting("whatsapp_number", wa)}
              className="press rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground"
            >
              Save
            </button>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Customers use this for instant order queries and product assistance.
          </p>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-muted-foreground">Contact Email</label>
          <div className="mt-1 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 flex-1 rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
            />
            <button
              onClick={() => onSaveSetting("contact_email", email)}
              className="press rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Delivery Fee (PKR)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                className="h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
              <button
                onClick={() => onSaveSetting("delivery_fee", fee)}
                className="press rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Advance Payment Discount (%)
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                value={disc}
                onChange={(e) => setDisc(Number(e.target.value))}
                className="h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
              <button
                onClick={() => onSaveSetting("advance_payment_discount_percent", disc)}
                className="press rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Customers who choose advance payment methods (JazzCash, NayaPay, Easypaisa, Bank Transfer)
          automatically receive this discount calculated on subtotal.
        </p>
      </div>

      {/* Payment Methods Configuration */}
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Pakistani Payment Methods</h3>
            <p className="text-xs text-muted-foreground">
              Configure payment accounts, account titles, numbers, and custom instructions shown
              during checkout.
            </p>
          </div>
          <button
            onClick={() =>
              setEditingPayment({
                id: `custom_${Date.now()}`,
                label: "",
                account_title: "",
                account_number: "",
                enabled: true,
                instructions: "",
              })
            }
            className="press flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Add Method
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {paymentList.map((acc: any) => (
            <div
              key={acc.id}
              className="rounded-2xl border bg-surface/50 p-4 transition-all hover:bg-surface/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{acc.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                        acc.enabled
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {acc.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">
                    <strong>Title:</strong> {acc.account_title || "—"} ·{" "}
                    <strong>Account / IBAN:</strong> {acc.account_number || "—"}
                  </p>
                  {acc.instructions && (
                    <p className="text-xs text-muted-foreground mt-1">{acc.instructions}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleMethod(acc.id)}
                    className="press rounded-full bg-surface px-3 py-1 font-mono text-xs hover:bg-muted font-medium"
                  >
                    {acc.enabled ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => setEditingPayment(acc)}
                    className="press rounded-full bg-ink px-4 py-1 font-mono text-xs text-ink-foreground font-semibold"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT PAYMENT METHOD MODAL */}
      {editingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold">Configure Payment Method</h3>
            <div>
              <label className="text-xs font-mono uppercase text-muted-foreground">
                Method Label
              </label>
              <input
                value={editingPayment.label}
                onChange={(e) => setEditingPayment({ ...editingPayment, label: e.target.value })}
                placeholder="e.g. JazzCash, NayaPay, Meezan Bank"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-muted-foreground">
                Account Title
              </label>
              <input
                value={editingPayment.account_title}
                onChange={(e) =>
                  setEditingPayment({ ...editingPayment, account_title: e.target.value })
                }
                placeholder="e.g. Gubberz Store / Muhammad Ali"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-muted-foreground">
                Account Number / Phone / IBAN
              </label>
              <input
                value={editingPayment.account_number}
                onChange={(e) =>
                  setEditingPayment({ ...editingPayment, account_number: e.target.value })
                }
                placeholder="e.g. 03274393495 or PK89MEZN..."
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-muted-foreground">
                Customer Instructions
              </label>
              <textarea
                rows={3}
                value={editingPayment.instructions || ""}
                onChange={(e) =>
                  setEditingPayment({ ...editingPayment, instructions: e.target.value })
                }
                placeholder="e.g. Transfer the exact discounted amount and upload payment screenshot."
                className="mt-1 w-full rounded-xl bg-surface p-3 text-xs outline-none ring-primary focus:ring-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="acc-enabled"
                checked={editingPayment.enabled}
                onChange={(e) =>
                  setEditingPayment({ ...editingPayment, enabled: e.target.checked })
                }
                className="h-4 w-4 rounded accent-primary"
              />
              <label htmlFor="acc-enabled" className="text-xs font-medium cursor-pointer">
                Enable payment method for customers at checkout
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditingPayment(null)}
                className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                disabled={!editingPayment.label.trim()}
                onClick={() => handleSavePaymentMethod(editingPayment)}
                className="press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
              >
                Save Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// ADJUST STOCK DIALOG
// ==========================================
function AdjustStockDialog({
  product,
  onAdjust,
}: {
  product: any;
  onAdjust: (delta: number, reason: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [delta, setDelta] = useState(10);
  const [reason, setReason] = useState("Restock batch");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="press rounded-full bg-surface px-3 py-1 font-mono text-xs hover:bg-muted font-medium"
      >
        Adjust
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 text-left backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-background p-6 shadow-2xl">
            <h3 className="text-lg font-bold">Adjust Stock: {product.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Current In-Stock: <strong>{product.stock}</strong> units
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Stock Delta (+/-)
                </label>
                <input
                  type="number"
                  value={delta}
                  onChange={(e) => setDelta(parseInt(e.target.value) || 0)}
                  placeholder="e.g. +10 or -5"
                  className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
                />
                <p className="mt-1 text-[11px] text-muted-foreground font-mono">
                  New stock will be: <strong>{Math.max(0, product.stock + delta)}</strong> units
                </p>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Reason for Adjustment (Audit Trail)
                </label>
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Restock shipment, damaged unit, recount"
                  className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                disabled={delta === 0 || !reason.trim()}
                onClick={() => {
                  onAdjust(delta, reason.trim());
                  setOpen(false);
                }}
                className="press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground disabled:opacity-50"
              >
                Apply & Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// CREATE & EDIT SECTION DIALOGS
// ==========================================
function CreateSectionDialog({
  products,
  categories,
  nextSortOrder,
  onSave,
}: {
  products: any[];
  categories: any[];
  nextSortOrder: number;
  onSave: (section: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sectionType, setSectionType] = useState<string>("product_edit");
  const [title, setTitle] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [body, setBody] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Shop The Edit");
  const [ctaHref, setCtaHref] = useState("/shop");
  const [theme, setTheme] = useState("paper");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Please provide a section title");
      return;
    }

    onSave({
      section_type: sectionType,
      title: title.trim(),
      eyebrow: eyebrow.trim() || null,
      body: body.trim() || null,
      cta_label: ctaLabel.trim() || null,
      cta_href: ctaHref.trim() || null,
      theme,
      layout: "standard",
      sort_order: nextSortOrder,
      published: true,
      product_slugs: selectedSlugs,
      category_slugs: categories.map((c) => c.slug).slice(0, 4),
      settings: {},
    });

    setOpen(false);
    setTitle("");
    setEyebrow("");
    setBody("");
    setSelectedSlugs([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="press flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90"
      >
        <Plus className="h-4 w-4" /> Add Section
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold">Add Custom Homepage Section</h3>
              <button
                onClick={() => setOpen(false)}
                className="press h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Section Type
                </label>
                <select
                  value={sectionType}
                  onChange={(e) => setSectionType(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                >
                  <option value="product_edit">Editorial Pick (Curated Grid)</option>
                  <option value="product_rail">Product Rail (Horizontal Scroll Carousel)</option>
                  <option value="hero">Hero Banner (Full Screen Showcase)</option>
                  <option value="category_index">Category Index (Department Directory)</option>
                  <option value="character">Brand Story & Character Spotlight</option>
                  <option value="campaign">Marketing Campaign Banner</option>
                  <option value="service_notes">Store Policy & Service Notes</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    Eyebrow / Badge
                  </label>
                  <input
                    value={eyebrow}
                    onChange={(e) => setEyebrow(e.target.value)}
                    placeholder="e.g. Staff Favorite, Limited Run"
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">Title *</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. High-Power Daily Drivers"
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">Body Copy</label>
                <textarea
                  rows={2}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Editorial description explaining why this collection matters..."
                  className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    CTA Button Label
                  </label>
                  <input
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    CTA Destination Link
                  </label>
                  <input
                    value={ctaHref}
                    onChange={(e) => setCtaHref(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  >
                    <option value="paper">Paper (Warm minimal)</option>
                    <option value="ink">Ink (Dark high-contrast)</option>
                    <option value="accent">Accent (Vibrant pop)</option>
                  </select>
                </div>
              </div>

              {/* Product Selector */}
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground block mb-1.5">
                  Featured Products ({selectedSlugs.length} selected)
                </label>
                <div className="max-h-48 overflow-y-auto rounded-2xl border bg-surface/50 p-2 space-y-1">
                  {products.map((p) => {
                    const isSelected = selectedSlugs.includes(p.slug);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleSlug(p.slug)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-bold"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={imageSrc(p.images?.[0])}
                            alt=""
                            className="h-7 w-7 rounded object-cover"
                          />
                          <span className="truncate">{p.name}</span>
                        </div>
                        <span className="font-mono text-[11px] shrink-0 ml-2">
                          {isSelected ? "✓ Selected" : "+ Add"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-sm"
              >
                Add Section to Homepage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionEditDialog({
  section,
  products = [],
  categories = [],
  onSave,
}: {
  section: any;
  products?: any[];
  categories?: any[];
  onSave: (updated: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sectionType, setSectionType] = useState(section.section_type);
  const [title, setTitle] = useState(section.title);
  const [eyebrow, setEyebrow] = useState(section.eyebrow ?? "");
  const [body, setBody] = useState(section.body ?? "");
  const [ctaLabel, setCtaLabel] = useState(section.cta_label ?? "");
  const [ctaHref, setCtaHref] = useState(section.cta_href ?? "");
  const [theme, setTheme] = useState(section.theme);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(section.product_slugs || []);

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="press rounded-full bg-surface px-4 py-1.5 text-xs font-semibold hover:bg-muted"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold">Customize Section: {section.title}</h3>
              <button
                onClick={() => setOpen(false)}
                className="press h-8 w-8 rounded-full bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Section Type
                </label>
                <select
                  value={sectionType}
                  onChange={(e) => setSectionType(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                >
                  <option value="product_edit">Editorial Pick (Curated Grid)</option>
                  <option value="product_rail">Product Rail (Horizontal Scroll Carousel)</option>
                  <option value="hero">Hero Banner (Full Screen Showcase)</option>
                  <option value="category_index">Category Index (Department Directory)</option>
                  <option value="character">Brand Story & Character Spotlight</option>
                  <option value="campaign">Marketing Campaign Banner</option>
                  <option value="service_notes">Store Policy & Service Notes</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">Eyebrow</label>
                  <input
                    value={eyebrow}
                    onChange={(e) => setEyebrow(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">Title *</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground">Body Copy</label>
                <textarea
                  rows={3}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    CTA Label
                  </label>
                  <input
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">
                    CTA Href
                  </label>
                  <input
                    value={ctaHref}
                    onChange={(e) => setCtaHref(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-muted-foreground">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  >
                    <option value="paper">Paper (Warm minimal)</option>
                    <option value="ink">Ink (Dark high-contrast)</option>
                    <option value="accent">Accent (Vibrant pop)</option>
                  </select>
                </div>
              </div>

              {/* Product Selector */}
              <div>
                <label className="text-xs font-mono uppercase text-muted-foreground block mb-1.5">
                  Featured Products ({selectedSlugs.length} selected)
                </label>
                <div className="max-h-48 overflow-y-auto rounded-2xl border bg-surface/50 p-2 space-y-1">
                  {products.map((p) => {
                    const isSelected = selectedSlugs.includes(p.slug);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleSlug(p.slug)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground font-bold"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={imageSrc(p.images?.[0])}
                            alt=""
                            className="h-7 w-7 rounded object-cover"
                          />
                          <span className="truncate">{p.name}</span>
                        </div>
                        <span className="font-mono text-[11px] shrink-0 ml-2">
                          {isSelected ? "✓ Selected" : "+ Add"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onSave({
                    ...section,
                    section_type: sectionType,
                    title,
                    eyebrow: eyebrow || null,
                    body: body || null,
                    cta_label: ctaLabel || null,
                    cta_href: ctaHref || null,
                    theme,
                    product_slugs: selectedSlugs,
                  });
                  setOpen(false);
                }}
                className="press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// PROMOS & COUPONS MANAGER
// ==========================================
function PromosCouponsManager({
  coupons,
  onSaveCoupons,
}: {
  coupons: PromoCoupon[];
  onSaveCoupons: (updated: PromoCoupon[]) => void;
}) {
  const [list, setList] = useState<PromoCoupon[]>(coupons);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minOrder, setMinOrder] = useState(2500);
  const [description, setDescription] = useState("");

  const handleGenerateRandom = () => {
    const prefixes = ["GUBBERZ", "PAK", "VIP", "DROP", "TECH"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(10 + Math.random() * 90);
    setCode(`${prefix}${num}`);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Please provide a coupon code");
      return;
    }
    const existingIndex = list.findIndex((c) => c.code.toUpperCase() === cleanCode);
    let updated: PromoCoupon[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = {
        ...updated[existingIndex],
        discountPercent,
        minOrderAmount: minOrder || undefined,
        description: description || undefined,
        active: true,
      };
      toast.success(`Updated coupon ${cleanCode}!`);
    } else {
      updated = [
        ...list,
        {
          code: cleanCode,
          discountPercent,
          minOrderAmount: minOrder || undefined,
          description: description || `Special ${discountPercent}% discount across Pakistan`,
          usedCount: 0,
          active: true,
        },
      ];
      toast.success(`Created coupon ${cleanCode}!`);
    }
    setList(updated);
    onSaveCoupons(updated);
    setCode("");
    setDescription("");
  };

  const handleToggle = (cCode: string) => {
    const updated = list.map((c) =>
      c.code === cCode ? { ...c, active: !c.active } : c,
    );
    setList(updated);
    onSaveCoupons(updated);
    toast.success("Coupon status toggled");
  };

  const handleDelete = (cCode: string) => {
    const updated = list.filter((c) => c.code !== cCode);
    setList(updated);
    onSaveCoupons(updated);
    toast.success(`Deleted coupon ${cCode}`);
  };

  const handleCopy = (cCode: string) => {
    navigator.clipboard.writeText(cCode);
    toast.success(`Copied "${cCode}" to clipboard!`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Coupons & Promotional Codes Generator
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create custom voucher codes, set minimum order values, and manage Gubberoo VIP coupons across Pakistan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* CREATE COUPON FORM */}
        <div className="rounded-3xl border bg-card p-6 shadow-sm md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-base">Generate New Coupon</h3>
          </div>

          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono uppercase text-muted-foreground font-bold">
                  Coupon Code
                </label>
                <button
                  type="button"
                  onClick={handleGenerateRandom}
                  className="text-primary hover:underline font-mono cursor-pointer"
                >
                  ⚡ Random Code
                </button>
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. GUBBEROO5"
                className="w-full rounded-xl border bg-background p-2.5 font-mono uppercase font-bold text-sm tracking-wider"
                required
              />
            </div>

            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Discount Percentage (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="3"
                  max="35"
                  step="1"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="flex-1 cursor-pointer"
                />
                <span className="font-mono font-bold text-sm bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                  {discountPercent}%
                </span>
              </div>
            </div>

            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Minimum Order Value (PKR)
              </label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                placeholder="2000"
                className="w-full rounded-xl border bg-background p-2.5 font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Description / Campaign Note
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Gubberoo AI Setup Bundle Perk"
                className="w-full rounded-xl border bg-background p-2.5 text-xs"
              />
            </div>

            <button
              type="submit"
              className="press w-full rounded-2xl bg-primary py-3 text-center font-bold text-xs text-primary-foreground shadow-sm hover:brightness-110 cursor-pointer"
            >
              + Save & Publish Coupon
            </button>
          </form>
        </div>

        {/* ACTIVE COUPONS TABLE */}
        <div className="rounded-3xl border bg-card p-6 shadow-sm md:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-base">Active Store Coupons ({list.length})</h3>
              <p className="text-xs text-muted-foreground">
                Validated automatically in Cart Drawer and at Checkout.
              </p>
            </div>
          </div>

          <div className="divide-y">
            {list.map((c) => (
              <div
                key={c.code}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-foreground bg-surface border px-2.5 py-0.5 rounded-lg tracking-wider">
                      {c.code}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {c.discountPercent}% OFF
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.active
                          ? "bg-success/20 text-success"
                          : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {c.active ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.description || "General discount"} · Min:{" "}
                    <strong>{formatPKR(c.minOrderAmount || 0)}</strong> · Uses:{" "}
                    <strong>{c.usedCount || 0}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(c.code)}
                    className="press rounded-lg border bg-surface px-2.5 py-1.5 font-mono text-[11px] font-medium hover:bg-muted flex items-center gap-1 cursor-pointer"
                    title="Copy code"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle(c.code)}
                    className="press rounded-lg border bg-surface px-2.5 py-1.5 font-mono text-[11px] font-medium hover:bg-muted cursor-pointer"
                  >
                    {c.active ? "Disable" : "Enable"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.code)}
                    className="press rounded-lg bg-destructive/10 text-destructive p-1.5 hover:bg-destructive/20 cursor-pointer"
                    title="Delete coupon"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FLASH DROPS & MIDNIGHT SALES MANAGER
// ==========================================
function FlashSaleManager({
  config,
  onSaveFlashSale,
}: {
  config: FlashSaleConfig;
  onSaveFlashSale: (updated: FlashSaleConfig) => void;
}) {
  const [active, setActive] = useState(config.active);
  const [title, setTitle] = useState(config.title || "Midnight Drop");
  const [bannerText, setBannerText] = useState(
    config.bannerText ||
      "⚡ MIDNIGHT DROP · EXTRA 10% OFF WITH CODE MIDNIGHT10 · NATIONWIDE EXPRESS DISPATCH",
  );
  const [promoCode, setPromoCode] = useState(config.promoCode || "MIDNIGHT10");
  const [discountPercent, setDiscountPercent] = useState(config.discountPercent || 10);
  const [targetDate, setTargetDate] = useState(config.targetDate);

  const handleSetHours = (hours: number) => {
    const future = new Date(Date.now() + hours * 3600 * 1000).toISOString();
    setTargetDate(future);
    toast.success(`Target countdown set to +${hours} hours!`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FlashSaleConfig = {
      active,
      title,
      bannerText,
      promoCode,
      discountPercent,
      targetDate,
    };
    onSaveFlashSale(updated);
    toast.success("Flash Drop & Midnight Sale configuration saved!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <Flame className="h-6 w-6 text-amber-500 fill-current animate-pulse" /> Flash Drops & Midnight Sales Engine
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the live countdown banner, emergency flash drops, and midnight promotion announcements.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSave} className="rounded-3xl border bg-card p-6 shadow-sm space-y-5 text-xs">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-bold text-base text-foreground">Sale Status</h3>
              <p className="text-muted-foreground">Toggle the storewide countdown banner on or off</p>
            </div>
            <button
              type="button"
              onClick={() => setActive(!active)}
              className={`press rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-colors cursor-pointer ${
                active ? "bg-amber-500 text-zinc-950" : "bg-surface text-muted-foreground border"
              }`}
            >
              {active ? "⚡ LIVE FLASH DROP ACTIVE" : "OFFLINE / HIDDEN"}
            </button>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border bg-background p-2.5 text-sm font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Banner Announcement Bar Text
            </label>
            <input
              type="text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              className="w-full rounded-xl border bg-background p-2.5 text-xs font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Featured Coupon Code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="w-full rounded-xl border bg-background p-2.5 font-mono uppercase font-bold text-sm"
                required
              />
            </div>
            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full rounded-xl border bg-background p-2.5 font-mono font-bold text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-2">
              Countdown Target Time
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[6, 12, 24, 48].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => handleSetHours(hrs)}
                  className="press rounded-xl border bg-surface px-3 py-1.5 font-mono text-xs font-semibold hover:bg-muted cursor-pointer"
                >
                  +{hrs} Hours
                </button>
              ))}
            </div>
            <input
              type="text"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              placeholder="ISO date timestamp"
              className="w-full rounded-xl border bg-background p-2.5 font-mono text-xs text-muted-foreground"
            />
          </div>

          <button
            type="submit"
            className="press w-full rounded-2xl bg-amber-500 hover:bg-amber-400 py-3 text-center font-bold text-xs text-zinc-950 shadow-sm cursor-pointer"
          >
            💾 Save Flash Drop Configuration
          </button>
        </form>

        {/* LIVE STORE PREVIEW */}
        <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base border-b pb-3">Live Banner Preview</h3>
          <p className="text-xs text-muted-foreground">
            This is how the ticking countdown looks to customers at the top of Gubberz across desktop and mobile:
          </p>

          <div className="rounded-2xl overflow-hidden border border-amber-500/40 shadow-sm">
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white p-3 text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400 uppercase">
                  ⚡ Flash Drop
                </span>
                <span className="font-bold text-zinc-100 text-xs truncate max-w-xs">
                  {bannerText}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                  05h : 22m : 41s
                </span>
                <span className="rounded bg-amber-500 text-zinc-950 px-2 py-0.5 font-mono font-bold text-[10px]">
                  Code: {promoCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// REVIEWS & TESTIMONIALS MODERATION MANAGER
// ==========================================
function ReviewsModerationManager({
  reviews,
  products,
  onModerate,
  onAddManualReview,
}: {
  reviews: StoredReview[];
  products: any[];
  onModerate: (
    reviewId: string,
    action: "toggle_status" | "toggle_featured" | "delete" | "update",
    data?: any,
  ) => void;
  onAddManualReview: (review: any) => void;
  onSaveAllReviews: (reviews: StoredReview[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending" | "hidden" | "pinned"
  >("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<StoredReview | null>(null);
  const [zoomPhoto, setZoomPhoto] = useState<{ url: string; caption: string } | null>(null);

  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const hiddenCount = reviews.filter((r) => r.status === "hidden").length;
  const pinnedCount = reviews.filter((r) => r.featuredOnHome).length;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const filtered = reviews.filter((r) => {
    if (statusFilter === "approved" && r.status !== "approved") return false;
    if (statusFilter === "pending" && r.status !== "pending") return false;
    if (statusFilter === "hidden" && r.status !== "hidden") return false;
    if (statusFilter === "pinned" && !r.featuredOnHome) return false;

    if (cityFilter !== "all" && r.city.toLowerCase() !== cityFilter.toLowerCase()) {
      return false;
    }
    if (ratingFilter !== "all" && r.rating !== ratingFilter) {
      return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        r.author.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q) ||
        r.productName.toLowerCase().includes(q) ||
        r.productSlug.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Pakistani Buyer Testimonials Desk
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
            Customer Reviews & Setup Moderation
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Approve customer reviews, pin real desk setup photos to the homepage showcase, and log verified WhatsApp feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/reviews"
            target="_blank"
            className="press rounded-full bg-surface border border-border/80 px-4 py-2 text-xs font-semibold hover:bg-muted inline-flex items-center gap-1.5"
          >
            <span>View Public /reviews</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground hover:bg-primary transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add WhatsApp / Manual Review</span>
          </button>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 font-mono text-xs">
        <div className="rounded-2xl border bg-surface/50 p-4 space-y-1">
          <span className="text-[11px] text-muted-foreground uppercase">Total Reviews</span>
          <p className="text-2xl font-black text-foreground">{reviews.length}</p>
          <span className="text-[10px] text-muted-foreground">In database</span>
        </div>
        <div className="rounded-2xl border bg-surface/50 p-4 space-y-1">
          <span className="text-[11px] text-muted-foreground uppercase">Approved</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{approvedCount}</p>
          <span className="text-[10px] text-muted-foreground">Visible on store</span>
        </div>
        <div className="rounded-2xl border bg-surface/50 p-4 space-y-1">
          <span className="text-[11px] text-muted-foreground uppercase">Pending Review</span>
          <p className={`text-2xl font-black ${pendingCount > 0 ? "text-amber-500" : "text-foreground"}`}>
            {pendingCount}
          </p>
          <span className="text-[10px] text-muted-foreground">Awaiting approval</span>
        </div>
        <div className="rounded-2xl border bg-surface/50 p-4 space-y-1">
          <span className="text-[11px] text-muted-foreground uppercase">Pinned on Home</span>
          <p className="text-2xl font-black text-primary">{pinnedCount} / 3</p>
          <span className="text-[10px] text-muted-foreground">Homepage showcase</span>
        </div>
        <div className="rounded-2xl border bg-surface/50 p-4 space-y-1">
          <span className="text-[11px] text-muted-foreground uppercase">Avg Rating</span>
          <p className="text-2xl font-black text-amber-500 flex items-center gap-1">
            <span>{avgRating}</span>
            <Star className="h-4 w-4 fill-current" />
          </p>
          <span className="text-[10px] text-muted-foreground">Pakistani buyers</span>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="rounded-3xl border bg-card p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-1 rounded-xl bg-surface p-1 text-xs font-mono">
            {[
              { id: "all", label: `All (${reviews.length})` },
              { id: "approved", label: `Approved (${approvedCount})` },
              { id: "pending", label: `Pending (${pendingCount})` },
              { id: "hidden", label: `Hidden (${hiddenCount})` },
              { id: "pinned", label: `Pinned to Home (${pinnedCount})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setStatusFilter(t.id as any)}
                className={`press rounded-lg px-3 py-1 font-semibold transition-colors cursor-pointer ${
                  statusFilter === t.id
                    ? "bg-foreground text-background font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search author, city, gadget…"
              className="h-9 w-full rounded-xl bg-surface pl-8 pr-3 text-xs outline-none ring-primary focus:ring-2"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-2 text-xs text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Second Row: City & Rating Filters */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" /> City:
            </span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="rounded-lg border bg-surface px-2.5 py-1 text-xs cursor-pointer font-medium"
            >
              <option value="all">All Pakistani Cities</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Multan">Multan</option>
              <option value="Quetta">Quetta</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" /> Rating:
            </span>
            <select
              value={ratingFilter}
              onChange={(e) =>
                setRatingFilter(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              className="rounded-lg border bg-surface px-2.5 py-1 text-xs cursor-pointer font-medium"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
              <option value="3">3 Stars Only</option>
              <option value="2">2 Stars Only</option>
              <option value="1">1 Star Only</option>
            </select>
          </div>

          {(statusFilter !== "all" || cityFilter !== "all" || ratingFilter !== "all" || search) && (
            <button
              onClick={() => {
                setStatusFilter("all");
                setCityFilter("all");
                setRatingFilter("all");
                setSearch("");
              }}
              className="text-primary hover:underline ml-auto text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* REVIEWS LIST */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center space-y-3">
          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="font-bold text-base">No customer reviews match your filter</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search keywords, city filter, or status pill above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`rounded-3xl border bg-card p-5 transition-all space-y-3.5 ${
                r.status === "hidden"
                  ? "opacity-60 bg-surface/30 border-dashed"
                  : r.status === "pending"
                    ? "border-amber-500/40 bg-amber-500/5"
                    : "border-border/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Photo Thumbnail */}
                  {r.setupPhoto ? (
                    <div
                      onClick={() =>
                        setZoomPhoto({
                          url: r.setupPhoto!,
                          caption: `${r.author}'s Desk Setup · ${r.city} (${r.productName})`,
                        })
                      }
                      className="relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface border border-border/80 cursor-pointer group shadow-xs"
                      title="Click to zoom setup photo"
                    >
                      <img
                        src={r.setupPhoto}
                        alt="Desk setup thumbnail"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px]">
                        🔍
                      </div>
                      <div className="absolute bottom-1 left-1 rounded-full bg-background/90 px-1 py-0.5 text-[8px] font-mono font-bold text-foreground">
                        📷 Setup
                      </div>
                    </div>
                  ) : (
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-surface/80 border border-dashed flex items-center justify-center text-muted-foreground text-[10px] font-mono">
                      No photo
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-foreground">{r.author}</span>
                      <span className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded-full border border-border/60">
                        <MapPin className="h-3 w-3 text-primary" /> {r.city}
                      </span>
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <Check className="h-3 w-3" /> Verified Buyer
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-foreground">"{r.title}"</span>
                      <span className="text-muted-foreground">·</span>
                      <Link
                        to="/product/$slug"
                        params={{ slug: r.productSlug }}
                        target="_blank"
                        className="text-primary hover:underline font-mono text-[11px] font-medium inline-flex items-center gap-1"
                      >
                        <span>{r.productName}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 pt-0.5">
                      {r.comment}
                    </p>
                  </div>
                </div>

                {/* Right Badges & Timestamps */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    {r.status === "approved" && (
                      <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-bold">
                        Approved ✓
                      </span>
                    )}
                    {r.status === "pending" && (
                      <span className="rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 text-[10px] font-bold">
                        Pending Moderation
                      </span>
                    )}
                    {r.status === "hidden" && (
                      <span className="rounded-full bg-destructive/15 text-destructive px-2.5 py-0.5 text-[10px] font-bold">
                        Hidden 🚫
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString("en-PK", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS ROW */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Pin to Homepage Showcase */}
                  <button
                    type="button"
                    onClick={() => onModerate(r.id, "toggle_featured")}
                    className={`press rounded-full px-3 py-1 font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      r.featuredOnHome
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-surface border border-border/80 text-muted-foreground hover:text-foreground"
                    }`}
                    title="Toggle pinning this review to the homepage 3-card desk setup showcase"
                  >
                    {r.featuredOnHome ? (
                      <>
                        <Pin className="h-3 w-3 fill-current" />
                        <span>Pinned on Homepage ★</span>
                      </>
                    ) : (
                      <>
                        <PinOff className="h-3 w-3" />
                        <span>Pin to Homepage</span>
                      </>
                    )}
                  </button>

                  {/* Toggle Status (Approve / Hide) */}
                  <button
                    type="button"
                    onClick={() => onModerate(r.id, "toggle_status")}
                    className={`press rounded-full px-3 py-1 font-semibold transition-colors cursor-pointer border ${
                      r.status === "approved"
                        ? "bg-surface border-border/80 text-muted-foreground hover:text-destructive hover:border-destructive/40"
                        : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 shadow-xs"
                    }`}
                  >
                    {r.status === "approved" ? "Hide from Storefront" : "✓ Approve & Publish"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingReview(r)}
                    className="press rounded-full bg-surface border px-3 py-1 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Quick Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Permanently delete review by ${r.author}?`)) {
                        onModerate(r.id, "delete");
                      }
                    }}
                    className="press rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 p-1.5 cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD MANUAL REVIEW MODAL */}
      {isAddModalOpen && (
        <ManualReviewModal
          products={products}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(data) => {
            onAddManualReview(data);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {/* EDIT REVIEW MODAL */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          products={products}
          onClose={() => setEditingReview(null)}
          onSave={(updatedData) => {
            onModerate(editingReview.id, "update", updatedData);
            setEditingReview(null);
          }}
        />
      )}

      {/* PHOTO LIGHTBOX */}
      {zoomPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setZoomPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-background p-3 border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-background cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={zoomPhoto.url}
              alt=""
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-2xl"
            />
            <p className="mt-3 text-center text-xs font-mono text-muted-foreground">
              {zoomPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MANUAL REVIEW MODAL (WHATSAPP FEEDBACK)
// ==========================================
function ManualReviewModal({
  products,
  onClose,
  onSave,
}: {
  products: any[];
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? "glide-mouse");
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("Karachi");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [setupPhoto, setSetupPhoto] = useState("");
  const [featuredOnHome, setFeaturedOnHome] = useState(false);
  const [verified, setVerified] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const matchedProduct = products.find((p) => p.slug === productSlug);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        try {
          const res = await uploadProductImage({
            data: {
              fileName: file.name,
              contentType: file.type || "image/jpeg",
              base64Data: base64,
            },
          });
          if (res.publicUrl) {
            setSetupPhoto(res.publicUrl);
            toast.success("Desk setup photo uploaded successfully!");
          }
        } catch (uploadErr: any) {
          toast.error(uploadErr.message || "Failed to upload photo");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploading(false);
      toast.error("Could not process photo file");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !comment.trim()) {
      toast.error("Please fill in author, headline, and comment");
      return;
    }
    onSave({
      productSlug,
      productName: matchedProduct?.name || productSlug,
      author: author.trim(),
      city: city.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      setupPhoto: setupPhoto.trim() || undefined,
      featuredOnHome,
      verified,
      status: "approved",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-xl">Add WhatsApp / Manual Review</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Publish customer testimonials or setup photos received over WhatsApp, SMS, or Instagram.
            </p>
          </div>
          <button
            onClick={onClose}
            className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Select Gadget
            </label>
            <select
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="w-full rounded-xl border bg-background p-2.5 font-semibold text-xs"
              required
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({formatPKR(p.price)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Daniyal Shah"
                className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Pakistani City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
              >
                {[
                  "Karachi",
                  "Lahore",
                  "Islamabad",
                  "Rawalpindi",
                  "Peshawar",
                  "Faisalabad",
                  "Multan",
                  "Quetta",
                  "Sialkot",
                  "Gujranwala",
                  "Other Pakistan City",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Star Rating
            </label>
            <div className="flex items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="press p-1 cursor-pointer"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="font-mono text-xs font-bold text-muted-foreground ml-2">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cleanest cable-free setup in Saddar"
              className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
              required
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Customer Feedback
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Copy message from WhatsApp or customer text..."
              className="w-full rounded-xl border bg-background p-2.5 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Desk Setup Photo
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={setupPhoto}
                onChange={(e) => setSetupPhoto(e.target.value)}
                placeholder="https://... photo URL"
                className="flex-1 rounded-xl border bg-background p-2.5 font-mono text-xs"
              />
              <label className="press rounded-xl bg-surface border px-3 py-2 cursor-pointer flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground">
                <Upload className="h-3.5 w-3.5" />
                <span>{isUploading ? "Uploading…" : "Upload"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t font-mono">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              <span>Verified Buyer Badge</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featuredOnHome}
                onChange={(e) => setFeaturedOnHome(e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              <span className="font-bold text-primary">Pin to Homepage Showcase ★</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="press rounded-full bg-surface px-4 py-2 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="press rounded-full bg-primary px-6 py-2 font-bold text-primary-foreground shadow-sm hover:brightness-110"
            >
              Publish Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// EDIT REVIEW MODAL
// ==========================================
function EditReviewModal({
  review,
  products,
  onClose,
  onSave,
}: {
  review: StoredReview;
  products: any[];
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [author, setAuthor] = useState(review.author);
  const [city, setCity] = useState(review.city);
  const [rating, setRating] = useState(review.rating);
  const [title, setTitle] = useState(review.title);
  const [comment, setComment] = useState(review.comment);
  const [setupPhoto, setSetupPhoto] = useState(review.setupPhoto || "");
  const [status, setStatus] = useState<"approved" | "pending" | "hidden">(review.status);
  const [featuredOnHome, setFeaturedOnHome] = useState(review.featuredOnHome);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      author: author.trim(),
      city: city.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      setupPhoto: setupPhoto.trim() || undefined,
      status,
      featuredOnHome,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-extrabold text-xl">Edit Customer Review</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update buyer details, headline, feedback, or desk setup photo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Pakistani City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Rating
            </label>
            <div className="flex items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="press p-1 cursor-pointer"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="font-mono text-xs font-bold text-muted-foreground ml-2">
                {rating} Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
              required
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Feedback Comment
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border bg-background p-2.5 text-xs"
              required
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
              Desk Setup Photo URL
            </label>
            <input
              type="text"
              value={setupPhoto}
              onChange={(e) => setSetupPhoto(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border bg-background p-2.5 font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div>
              <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                Moderation Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
              >
                <option value="approved">Approved (Live)</option>
                <option value="pending">Pending Moderation</option>
                <option value="hidden">Hidden from Store</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                <input
                  type="checkbox"
                  checked={featuredOnHome}
                  onChange={(e) => setFeaturedOnHome(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
                <span className="font-bold text-primary">Pin to Homepage ★</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="press rounded-full bg-surface px-4 py-2 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="press rounded-full bg-primary px-6 py-2 font-bold text-primary-foreground shadow-sm hover:brightness-110"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

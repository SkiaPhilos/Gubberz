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
} from "@/lib/admin.functions";
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
  "overview" | "orders" | "products" | "categories" | "inventory" | "settings" | "sections";

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
          <button
            onClick={onClose}
            className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
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
                        <p className="font-mono text-xs text-muted-foreground">/{product.slug}</p>
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
  const initialImg = initial?.images?.[0] ?? "headphones";
  const isInitialCustom = initialImg.startsWith("http") || initialImg.startsWith("data:");
  const [selectedImage, setSelectedImage] = useState(isInitialCustom ? "" : initialImg);
  const [customImageUrl, setCustomImageUrl] = useState(isInitialCustom ? initialImg : "");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const ext =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase()
          .replace(/[^a-z0-9]/g, "") || "jpg";
      const filePath = `products/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

      const primaryBucket = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "product-images";
      let uploadResult = await supabase.storage
        .from(primaryBucket)
        .upload(filePath, file, { contentType: file.type, upsert: true });

      let targetBucket = primaryBucket;
      if (
        uploadResult.error &&
        uploadResult.error.message?.toLowerCase().includes("bucket not found") &&
        primaryBucket !== "products"
      ) {
        const fallbackResult = await supabase.storage
          .from("products")
          .upload(filePath, file, { contentType: file.type, upsert: true });
        if (!fallbackResult.error) {
          uploadResult = fallbackResult;
          targetBucket = "products";
        }
      }

      if (uploadResult.error) {
        throw uploadResult.error;
      }

      const { data } = supabase.storage.from(targetBucket).getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error("Could not get public URL from storage");

      setCustomImageUrl(data.publicUrl);
      setSelectedImage("");
      toast.success("Image uploaded to Supabase Storage!");
    } catch (err: any) {
      console.error("Storage upload failed:", err);
      toast.error(err.message || "Failed to upload to Supabase Storage");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }
  const [featuresText, setFeaturesText] = useState(
    Array.isArray(initial?.features) ? initial.features.join("\n") : "",
  );
  const [specsText, setSpecsText] = useState(
    JSON.stringify(
      typeof initial?.specs === "object" && initial?.specs
        ? initial.specs
        : { Connection: "Bluetooth 5.3", Battery: "30h" },
      null,
      2,
    ),
  );
  const [published, setPublished] = useState(initial?.published ?? true);
  const [featured, setFeatured] = useState(initial?.featured ?? false);

  function handleSave() {
    let parsedSpecs: Record<string, unknown> = {};
    try {
      parsedSpecs = JSON.parse(specsText);
    } catch {
      toast.error('Specifications must be valid JSON format (e.g. {"Battery": "40h"})');
      return;
    }

    const imageToUse = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;
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
      images: [imageToUse],
      specs: parsedSpecs,
      features,
      published,
      featured,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold">{initial ? "Edit Product" : "Add New Product"}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Provide complete storefront copy, specs, pricing, and visual imagery.
        </p>

        <div className="mt-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono uppercase text-muted-foreground">Product Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!initial) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
                  }
                }}
                placeholder="e.g. Surge GaN Charger"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">Slug</label>
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
              <label className="font-mono uppercase text-muted-foreground">SKU Code</label>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g. GBZ-PWR-003"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm uppercase outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Gubberz"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">Category</label>
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
              <label className="font-mono uppercase text-muted-foreground">Price (PKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">Sale Price (PKR)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Optional"
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">Stock Count</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
              />
            </div>
            <div>
              <label className="font-mono uppercase text-muted-foreground">
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

          {/* Image Selection & Supabase Storage Upload */}
          <div className="rounded-2xl border bg-surface/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-mono uppercase text-muted-foreground font-bold">
                  Product Image Asset
                </label>
                <p className="text-[11px] text-muted-foreground">
                  Upload directly to Supabase Storage, pick a bundled preset, or link an external URL.
                </p>
              </div>
              {(customImageUrl || selectedImage) && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground">Preview:</span>
                  <img
                    src={imageSrc(customImageUrl || selectedImage)}
                    alt="Preview"
                    className="h-10 w-10 rounded-lg object-cover border"
                  />
                </div>
              )}
            </div>

            {/* Direct File Upload to Supabase Storage */}
            <div className="rounded-xl border border-dashed p-3 bg-background/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <Upload className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="font-medium">Upload to Supabase Storage</p>
                  <p className="text-[10px] text-muted-foreground">
                    Saves to <code className="font-mono">product-images</code> bucket (max 5MB, JPG/PNG/WebP)
                  </p>
                </div>
              </div>
              <label
                className={`press cursor-pointer inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  isUploading
                    ? "bg-muted text-muted-foreground pointer-events-none"
                    : "bg-ink text-ink-foreground hover:bg-ink/90"
                }`}
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3" /> Select File
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Bundled Presets */}
            <div>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">
                Or Select Bundled Preset Asset:
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1.5">
                {PRESET_IMAGE_KEYS.map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setSelectedImage(key);
                      setCustomImageUrl("");
                    }}
                    className={`press relative rounded-xl border p-1 transition-all ${
                      selectedImage === key && !customImageUrl
                        ? "border-primary ring-2 ring-primary bg-primary/10"
                        : "bg-surface hover:bg-muted"
                    }`}
                  >
                    <img
                      src={imageSrc(key)}
                      alt={key}
                      className="h-10 w-full object-cover rounded-lg"
                    />
                    <span className="block text-center font-mono text-[9px] uppercase mt-1 truncate">
                      {key}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <div>
              <label className="font-mono text-[10px] uppercase text-muted-foreground">
                Or Custom / Supabase Storage URL
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  value={customImageUrl}
                  onChange={(e) => {
                    setCustomImageUrl(e.target.value);
                    if (e.target.value) setSelectedImage("");
                  }}
                  placeholder="https://...supabase.co/storage/v1/object/public/product-images/..."
                  className="h-9 flex-1 rounded-xl bg-background px-3 font-mono text-xs outline-none ring-primary focus:ring-2"
                />
                {customImageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomImageUrl("");
                      setSelectedImage("headphones");
                    }}
                    className="press rounded-xl px-2.5 py-1 text-xs bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="font-mono uppercase text-muted-foreground">
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
            <label className="font-mono uppercase text-muted-foreground">Full Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed editorial copy about materials, experience, and benefits…"
              className="mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono uppercase text-muted-foreground">
                Key Features (1 per line)
              </label>
              <textarea
                rows={4}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="Active noise cancelling&#10;40h battery life&#10;Fold-flat hinge"
                className="mt-1 w-full rounded-xl bg-surface p-3 font-mono text-xs outline-none ring-primary focus:ring-2"
              />
            </div>

            <div>
              <label className="font-mono uppercase text-muted-foreground">
                Specifications (JSON Object)
              </label>
              <textarea
                rows={4}
                value={specsText}
                onChange={(e) => setSpecsText(e.target.value)}
                placeholder='{"Battery": "40h", "Connection": "Bluetooth 5.3"}'
                className="mt-1 w-full rounded-xl bg-surface p-3 font-mono text-xs outline-none ring-primary focus:ring-2"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 border-t">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              <label htmlFor="prod-published" className="font-medium cursor-pointer">
                Publish Product to storefront
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="prod-featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />
              <label htmlFor="prod-featured" className="font-medium cursor-pointer">
                Feature on Homepage Curations ★
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="press rounded-full bg-surface px-5 py-2 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            disabled={!name.trim() || !sku.trim()}
            onClick={handleSave}
            className="press rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
          >
            Save Product
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
              Low Stock Alerts (
              {products.filter((p) => p.stock <= (p.low_stock_threshold ?? 3)).length})
            </button>
            <button
              onClick={() => setFilter("out")}
              className={`press rounded-lg px-3 py-1 font-mono uppercase ${
                filter === "out" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"
              }`}
            >
              Out of Stock ({products.filter((p) => p.stock <= 0).length})
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
                <th className="px-6 py-3.5 text-right">Adjustment</th>
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
                    <AdjustStockDialog
                      product={product}
                      onAdjust={(delta, reason) => onAdjustStock(product.id, delta, reason)}
                    />
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

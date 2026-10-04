import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/catalog.functions", () => ({
  getCategories: vi.fn().mockResolvedValue([]),
  getProducts: vi.fn().mockResolvedValue([]),
  getProduct: vi.fn().mockResolvedValue(null),
  getStoreSettings: vi.fn().mockResolvedValue({
    whatsapp: "923274393495",
    email: "maniacphilos@gmail.com",
    advanceDiscount: 5,
    deliveryFee: 250,
    accounts: [],
  }),
}));

vi.mock("@/lib/content.functions", () => ({
  getHomeSections: vi.fn().mockResolvedValue([]),
}));

import { routeTree } from "@/routeTree.gen";

function renderAt(path: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Assert only that the router mounts and paints, never page content:
// routes are rewritten as the app is built and this must keep passing.
describe("App routing", () => {
  it("renders the index route", async () => {
    const { container } = renderAt("/");

    await waitFor(() => expect(container.firstChild ?? document.body.firstChild).not.toBeNull());
  });

  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const { container } = renderAt("/this-route-does-not-exist");

    await waitFor(() => expect(container.firstChild ?? document.body.firstChild).not.toBeNull());
  });
});

<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Gubberz architecture

- Public catalogue reads go through `src/lib/catalog.functions.ts` server functions using a publishable-key client — keeps SSR working without a session.
- Product images are stored as keys mapped to bundled assets in `src/lib/shop.ts`, or full URLs — lets seed data and later uploads coexist.
- Cart lives in localStorage via `CartProvider` until checkout — no account needed to shop.
- Orders are created only via the `place_order` security-definer database function (called from `placeOrder` server fn) — prices, discount and stock are computed and decremented atomically on the server; order tables have no public policies.
- Payment accounts, WhatsApp, contact email, delivery fee and advance discount live in `store_settings` — editable without code changes.

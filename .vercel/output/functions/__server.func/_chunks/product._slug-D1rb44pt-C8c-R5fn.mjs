import { X as notFound, _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { d as productQuery, f as productsQuery, p as settingsQuery } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-D1rb44pt.js
var $$splitComponentImporter = () => import("./product._slug-BqD9O_XZ-ZuRqc3iS.mjs");
var Route = createFileRoute("/product/$slug")({
	loader: async ({ context, params }) => {
		const [p] = await Promise.all([
			context.queryClient.ensureQueryData(productQuery(params.slug)),
			context.queryClient.ensureQueryData(productsQuery()),
			context.queryClient.ensureQueryData(settingsQuery)
		]);
		if (!p) throw notFound();
		return {
			name: p.name,
			desc: p.short_description ?? ""
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product not found — Gubberz" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `${loaderData.name} — Gubberz`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: loaderData.desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: loaderData.desc
			},
			{
				property: "og:type",
				content: "product"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

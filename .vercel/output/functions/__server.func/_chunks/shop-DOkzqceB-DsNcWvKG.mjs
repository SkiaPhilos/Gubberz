import { _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { c as stringType, n as booleanType, o as objectType, r as enumType } from "./_libs/zod-Bbj5tsZ5.mjs";
import { f as productsQuery, n as categoriesQuery } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DOkzqceB.js
var lost_default = "/assets/lost-NSaqlIh3.png";
var $$splitComponentImporter = () => import("./shop-DfSs6mTF-hWthqD8f.mjs");
var searchSchema = objectType({
	q: stringType().optional(),
	cat: stringType().optional(),
	sort: enumType([
		"new",
		"price-asc",
		"price-desc"
	]).optional(),
	priceRange: enumType([
		"all",
		"under-5k",
		"5k-15k",
		"over-15k"
	]).optional(),
	inStockOnly: booleanType().optional(),
	onSaleOnly: booleanType().optional()
});
var Route = createFileRoute("/shop")({
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps }) => Promise.all([context.queryClient.ensureQueryData(productsQuery(deps)), context.queryClient.ensureQueryData(categoriesQuery)]),
	head: () => ({ meta: [
		{ title: "Shop all gadgets — Gubberz" },
		{
			name: "description",
			content: "Browse headphones, earbuds, speakers, chargers, power banks, keyboards, mice and cables at Gubberz."
		},
		{
			property: "og:title",
			content: "Shop all gadgets — Gubberz"
		},
		{
			property: "og:description",
			content: "Every gadget we sell, in one place. Search, filter and find something nice."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { lost_default as n, Route as t };

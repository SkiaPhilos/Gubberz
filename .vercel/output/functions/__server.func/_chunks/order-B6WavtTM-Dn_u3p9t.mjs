import { _ as lazyRouteComponent, v as createFileRoute } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { c as stringType, o as objectType } from "./_libs/zod-Bbj5tsZ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-B6WavtTM.js
var $$splitComponentImporter = () => import("./order-B0RbQuvc-D35BY_Cq.mjs");
var Route = createFileRoute("/order")({
	validateSearch: objectType({
		code: stringType().optional(),
		phone: stringType().optional()
	}),
	head: () => ({ meta: [
		{ title: "Track your order — Gubberz" },
		{
			name: "description",
			content: "Check the status of your Gubberz order with your order code and phone number."
		},
		{
			property: "og:title",
			content: "Track your order — Gubberz"
		},
		{
			property: "og:description",
			content: "See where your Gubberz order is."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

import { n as queryOptions } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { r as createSsrRpc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Hnsg-D0T.js
var getHomeSections = createServerFn({ method: "GET" }).handler(createSsrRpc("b8e9338a8e2ba564fda443a8f916c84c79a0c5804f0ce1d9ae1d4bd59f16ff61"));
var sectionsQuery = queryOptions({
	queryKey: ["home-sections"],
	queryFn: () => getHomeSections()
});
//#endregion
export { sectionsQuery as t };

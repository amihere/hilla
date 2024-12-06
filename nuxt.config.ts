// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	// ssr: false,
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			title: "Hilla",
			meta: [],
		},
	},
	css: ["~/assets/css/main.css"],
	modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/google-adsense"],
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
	googleAdsense: {
		id: process.env.GOOGLE_ADSENSE_ID,
		test: false,
	},
});

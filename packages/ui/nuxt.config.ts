import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxt/ui-pro",
		"@nuxt/content",
		"@vueuse/nuxt",
		"@nuxt/fonts",
		"@nuxtjs/google-fonts",
		"@nuxt/scripts",
	],
	vite: {
		plugins: [tailwindcss()],
	},
	css: ["~/assets/css/main.css"],
	components: [{ path: "./components", prefix: "Ui" }],
	ssr: false,
	typescript: {
		typeCheck: true,
	},
});

import yaml from "@rollup/plugin-yaml";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ["../../packages/ui/"],
	modules: [
		"@nuxt/ui-pro",
		"@nuxt/content",
		"@vueuse/nuxt",
		"@nuxt/fonts",
		"@nuxtjs/google-fonts",
		"@nuxt/scripts",
	],
	ssr: false,

	devtools: {
		enabled: true,
	},

	css: ["~/assets/css/main.css"],
	runtimeConfig: {
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			brevoKey: process.env.NUXT_PUBLIC_BREVO_KEY,
			brevoUrl: process.env.NUXT_PUBLIC_BREVO_URL,
			brevoListId: process.env.NUXT_PUBLIC_BREVO_LIST_ID,
			googleTagManagerId: process.env.NUXT_PUBLIC_GOOGLE_TAG_MANAGER
		},
	},

	routeRules: {
		"/api/**": {
			cors: true,
		},
	},

	devServer: {
		port: 3010,
	},

	future: {
		compatibilityVersion: 4,
	},

	compatibilityDate: "2024-07-11",
	vite: {
		plugins: [yaml()],
	},
	typescript: {
		typeCheck: true,
	},

	googleFonts: {
		families: {
			Karma: [300, 400, 500, 600, 700],
			Inter: [300, 400, 500, 600, 700],
		},
	},
  scripts: {
    registry: {
      googleTagManager: {
        id: process.env.NUXT_PUBLIC_GOOGLE_TAG_MANAGER ?? ''
      }
    }
  }
});

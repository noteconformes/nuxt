<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { ContentNavigationLink } from "@nuxt/ui-pro/runtime/types/content.js";

const { data: navigation } = await useAsyncData("navigation", () =>
	queryCollectionNavigation("all"),
);
provide("navigation", navigation);

const { data: files } = useLazyAsyncData(
	"search",
	() => queryCollectionSearchSections("all"),
	{ server: false },
);

const route = useRoute();
const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "Artículos",
		to: "/articulos",
		active: route.path.startsWith("/articulos"),
	},
	{
		label: "Libros",
		to: "/libros",
		active: route.path.startsWith("/libros"),
	},
	{
		label: "Acerca de",
		to: "/acerca-de",
		active: route.path.startsWith("/acerca-de"),
	},
]);
const items3 = computed<ContentNavigationLink[]>(() => {
	const values: ContentNavigationLink[] = [
		{
			title: "Inicio",
			path: "/",
		},
	];
	console.log(items.value);
	for (const item of items.value) {
		console.log(item);
		values.push({
			title: `${item.label}`,
			path: `${item.to}`,
		});
	}
	return values;
});
</script>

<template>
  <UApp>
    <UHeader
      title="No te Conformes"
      :ui="{
        title: 'text-primary'
      }"
    >
      <UNavigationMenu :items="items" />
      <template #right>
        <ThemePicker />
        <UTooltip text="Search" :kbds="['meta', 'K']">
          <UContentSearchButton />
        </UTooltip>
      </template>
      <template #body>
        <UContentNavigation
          :navigation="items3"
          highlight
          :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
        >
          <template #link-title="{ link }">
            <span class="inline-flex items-center gap-0.5">
              {{ link.title }}

              <sup v-if="link.module === 'ui-pro'" class="text-[8px] font-medium text-primary">PRO</sup>
            </span>
          </template>
        </UContentNavigation>
      </template>
    </UHeader>
    <NuxtLayout>
      <div id="content">
        <NuxtPage />
      </div>
    </NuxtLayout>
    <USeparator class="h-px" />

    <UFooter class="bg-muted">
      <div class="flex flex-col items-center gap-8 print:hidden">
        <div class="flex flex-col items-center gap-4">
          <h5 class="text-lg font-semibold">
            Suscríbete al boletín
          </h5>
          <p class="text-sm text-neutral-500">
            Recibe artículos, libros y recursos directamente en tu bandeja de entrada.
          </p>
          <Suscription>
            <template #default="{ onSave, loading, success, error }">
              <div class=" max-w-md mx-auto">
                <UAlert
                  v-if="success"
                  color="success"
                  variant="outline"
                  title="Gracias por suscribirte"
                  class="mb-4 py-2"
                  icon="i-lucide-check-circle"
                />
                <SuscriptionForm
                  v-else
                  class="flex flex-col sm:flex-row gap-2"
                  :loading="loading"
                  :error="error"
                  :on-save="onSave"
                />
              </div>
            </template>
          </Suscription>
        </div>
        <div class="text-sm text-muted">
          © 2025 - No te Conformes
        </div>
      </div>
    </UFooter>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 100 }"
      />
    </ClientOnly>
  </UApp>
</template>

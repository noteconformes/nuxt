<script setup lang="ts">
import { isValidInteger } from "~/util/getIntegerOrDefault";

const route = useRoute();
const valid = computed(() => isValidInteger(route.query.page));
const tag = computed(() => `${route.params.tag}`);
if (!valid.value.isValid && valid.value.value) {
	navigateTo(`/tags/${route.params.tag}`, { replace: true });
}
const pageNumber = computed(() =>
	valid.value.isValid ? valid.value.value : 1,
);
const title = computed(() => tag.value.replaceAll("-", " "));

useHead({ title: `Tag: ${title.value}` });

const { articles, total } = await useArticles({
	page: pageNumber,
	itemsPerPage: computed(() => 6),
	tags: computed(() => [tag.value]),
	type: computed(() => ["article", "series"]),
});
</script>

<template>
  <template v-if="!tag || (articles?.status.value === 'success' && !articles?.data?.value?.length)">
    <UError
      :error="{
        statusCode: 404,
        statusMessage: 'Página no encontrada',
        message: 'La página que estás buscando no existe.'
      }"
    />
  </template>
  <UiArticles
    v-else
    v-model:page="pageNumber"
    :title="title"
    :path="`/tags/${tag}`"
    :items-per-page="6"
    :total="total ?? 0"
    :articles="articles?.data.value ?? []"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <div class="capitalize">
          {{ title }}
        </div>
        <UBadge color="neutral" variant="outline" class="capitalize">
          Tag
        </UBadge>
      </div>
    </template>
  </UiArticles>
</template>

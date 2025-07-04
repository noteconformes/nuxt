<script setup lang="ts">
import { isValidInteger } from "~/util/getIntegerOrDefault";

useHead({ title: "Libros" });

const route = useRoute();
const valid = computed(() => isValidInteger(route.query.page));
if (!valid.value.isValid && valid.value.value) {
	navigateTo("/libros", { replace: true });
}
const pageNumber = computed(() =>
	valid.value.isValid ? valid.value.value : 1,
);
const { articles, total } = await useArticles({
	page: pageNumber,
	itemsPerPage: computed(() => 6),
	type: computed(() => ["book"]),
});
</script>

<template>
  <UiArticles
    v-model:page="pageNumber"
    title="Libros"
    path="/libros"
    :items-per-page="6"
    :total="total ?? 0"
    :articles="articles.data.value ? articles.data.value.map((article) => ({
      ...article,
      image: article.image,
      description: undefined,
      date: article.translation.authors.join(', ')
    }))
      : []"
    :ui-blog-post="{
      root: 'w-64',
      header: ' aspect-auto h-auto',
      image: 'w-64 h-auto '
    }"
  />
</template>

<script setup lang="ts">
const { serie } = defineProps<{
	serie: string;
}>();

const path = computed(() => `/articulos/${serie}`);

const { data: page } = await useAsyncData(path, () =>
	queryCollection("all").path(path.value).first(),
);
</script>

<template>
  <UBlogPost
    v-if="page"
    date="Este artículo es parte de la serie:"
    :title="page.title"
    :image="{
      src: page.image.src,
      alt: page.image.alt
    }"
    :to="path"
    variant="subtle"
    :ui="{
      root: 'flex-row',
      header: 'w-36',
      body: 'sm:p-2 justify-center',
      meta: 'mb-0'
    }"
  />
</template>

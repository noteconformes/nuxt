<script setup lang="ts">
interface ArticleData {
	title: string;
	path: string;
	image: {
		src: string;
		alt: string;
	};
}
defineProps<{ items: ArticleData[] }>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <UBlogPost
      v-for="item in items"
      :key="item.path"
      :title="item.title"
      :image="{
        src: item.image.src.substring(0, 4) === 'http'
          ? item.image.src
          :`/img/articulos/${item.image.src}`,
        alt: item.image.alt
      }"
      :to="item.path"
      variant="subtle"
      :ui="{
        root: 'flex-row',
        header: 'w-20 h-20',
        body: 'sm:p-2 justify-center',
        meta: 'mb-0',
        title: 'text-sm text-muted'
      }"
    />
  </div>
</template>

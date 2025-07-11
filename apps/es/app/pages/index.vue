<script setup lang="ts">
import HomeHeader from "~/components/homeHeader/index.vue";

const { articles: page } = await useArticles({
	page: computed(() => 1),
	itemsPerPage: computed(() => 7),
	type: computed(() => ["article", "series"]),
});

const first = computed(() => page.data.value?.[0]);
const second = page.data.value?.slice(1, 7) || [];

useSeoMeta({
	title: "Artículos",
	ogTitle: "Artículos",
	twitterTitle: "Artículos",
	titleTemplate: "No te conformes - Romanos 12:2",
	description: "Artículos sobre la Biblia y la fe cristiana",
	ogDescription: "Artículos sobre la Biblia y la fe cristiana",
	twitterDescription: "Artículos sobre la Biblia y la fe cristiana",
	ogImage:
		"https://res.cloudinary.com/dpzgupe2y/image/upload/v1749582209/leyend-la-biblia_ricc1l.jpg",
	twitterImage:
		"https://res.cloudinary.com/dpzgupe2y/image/upload/v1749582209/leyend-la-biblia_ricc1l.jpg",
});
</script>

<template>
  <UMain class="flex flex-col gap-8 py-8 items-center justify-center">
    <HomeHeader />
    <UBlogPost
      v-if="first"
      :title="first.title"
      :date="first.date"
      :description="first.description"
      :to="first.path"
      :image="first.image.src"
      orientation="horizontal"
      :ui="{
        description: 'mt-2 pr-4 text-lg'
      }"
    />
    <UBlogPosts class="lg:gap-y-8">
      <UBlogPost
        v-for="(post, index) in second"
        :key="index"
        :title="post.title"
        :date="post.date"
        :to="post.path"
        :image="post.image.src"
      />
    </UBlogPosts>
  </UMain>
</template>

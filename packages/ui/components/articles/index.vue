<script setup lang="ts">
import type { BlogPostProps, PageHeaderProps } from "@nuxt/ui-pro";

interface ArticulosCollectionItem {
	title: string;
	path: string;
	image: {
		src: string;
	};
	type: "article" | "series" | "subseries" | "book";
}

defineProps<{
	title?: string;
	path: string;
	itemsPerPage: number;
	total: number;
	articles: ArticulosCollectionItem[];
	uiPageHeader?: PageHeaderProps["ui"];
	uiBlogPost?: BlogPostProps["ui"];
}>();
const page = defineModel<number>("page", { required: true });
</script>

<template>
  <UPage>
    <UPageHeader :ui="uiPageHeader">
      <template #title>
        <slot name="title">
          {{ title }}
        </slot>
      </template>
      <template v-if="total && total > itemsPerPage" #links>
        <div class="hidden sm:flex justify-between items-center gap-2">
          <div v-if="articles.length" class="opacity-50 text-xs">
            {{ articles.length }} de {{ total }} artículos
          </div>
          <UPagination
            v-model:page="page"
            :items-per-page="itemsPerPage"
            :total="total"
            :show-controls="false"
            show-edges
            :sibling-count="0"
            size="sm"
            :to="(pageSelected) => ({
              path,
              query: { page: pageSelected }
            })"
            variant="ghost"
          />
        </div>
      </template>
    </UPageHeader>
    <UMain class="flex flex-col gap-8 py-8 items-center ">
      <UBlogPosts class="lg:gap-y-8">
        <UBlogPost
          v-for="(post, index) in articles"
          :key="index"
          v-bind="post"
          :to="post.path"
          :image="post.image.src"
          :badge="post.type === 'series' ? 'Serie' : undefined"
          :ui="uiBlogPost"
        />
      </UBlogPosts>
      <UPagination
        v-if="total && total > itemsPerPage"
        v-model:page="page"
        :items-per-page="itemsPerPage"
        show-edges
        :sibling-count="1"
        :total="total"
        :to="(pageSelected) => ({
          path,
          query: { page: pageSelected },
          hash: '#content'
        })"
        :ui="{
          first: 'hidden sm:block',
          last: 'hidden sm:block'
        }"
      />
    </UMain>
  </UPage>
</template>

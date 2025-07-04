<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import type { ContentTocLink } from "@nuxt/ui-pro/runtime/types/content.js";
import type { ImageProps } from "../image/index.vue";
import type { TranslationProps } from "./header/bar.vue";
import type { ShareIconsProps } from "./share/icons.vue";

type UiProps = {
	image?: string;
};

defineProps<{
	title: string;
	description?: string;
	breadcrumb?: BreadcrumbItem[];
	date: string;
	authors?: string[];
	translation?: TranslationProps;
	image?: ImageProps;
	body?: Record<string, any>;
	tocLinks?: ContentTocLink[];
	serie?: string;
	share?: ShareIconsProps;
	tags?: string[];
	currentPath: string;
	ui?: UiProps;
	attachments?: {
		pdf: string;
		epub?: string;
	};
}>();
</script>

<template>
  <UPage
    :ui="{
      center: 'lg:col-span-7',
      right: 'lg:col-span-3'
    }"
  >
    <UPageHeader
      :ui="{ root: 'border-none' }"
      :title="title"
      :description="description"
    >
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>
    </UPageHeader>

    <div>
      <ArticleHeaderBar
        :date="date"
        :translation="translation"
        :authors="authors"
      />
      <div
        v-if="image"
        :class="[
          'bg-elevated/50 px-2 print:hidden',
          ui?.image,
          { 'pb-2': !image.descr }
        ]"
      >
        <Image
          :src="image.src"
          :alt="image.alt"
          :cc="image.cc"
          :descr="image.descr"
        />
      </div>
    </div>

    <UPageBody class="space-y-0 mt-0">
      <div class="sm:flex gap-4">
        <div class="max-w-2xl flex flex-col gap-8">
          <ContentRenderer
            v-if="body"
            :value="body"
            :prose="true"
            class="text-xl font-karma wrap-anywhere"
          />
          <ArticleParent
            v-if="serie"
            :serie="serie"
          />
          <div class="flex flex-col sm:flex-row gap-4">
            <ArticleBooksDownload
              v-if="attachments?.pdf"
              title="Descargar PDF"
              :url="attachments.pdf"
              class="flex-1"
            >
              Para ver en computador o smartphone y fácil de imprimir
            </ArticleBooksDownload>
            <ArticleBooksDownload
              v-if="attachments?.epub"
              title="Descargar EPUB"
              :url="attachments.epub"
              class="flex-1"
            >
              Para leer de una forma más fácil en el smartphone.
            </ArticleBooksDownload>
          </div>
          <div
            v-if="share"
            class="sm:hidden flex justify-center items-center bg-(--ui-bg-muted)"
          >
            <ArticleShareIcons
              :url="share.url"
              :text="share.text"
              hide-label
              tooltip
            />
          </div>
          <div
            v-if="tags && tags.length > 0"
            class="flex gap-2 flex-wrap items-center justify-center sm:justify-start print:hidden"
          >
            <span class="text-sm font-semibold hidden sm:block">
              Tags
            </span>
            <UButton
              v-for="tag in tags"
              :key="tag"
              :label="tag.replaceAll('-', ' ')"
              variant="outline"
              color="neutral"
              size="sm"
              class="capitalize"
              :href="`/tags/${tag}`"
            />
          </div>
        </div>
        <div
          v-if="share"
          class="hidden sm:block print:hidden"
        >
          <ArticleShareVertical
            :url="share.url"
            :text="share.text"
          />
        </div>
      </div>
    </UPageBody>
    <template #right>
      <div class="print:hidden">
        <UContentToc
          :links="tocLinks && tocLinks.length > 1 ? tocLinks : []"
          class="z-[2]"
          highlight
          highlight-color="neutral"
          color="neutral"
        >
          <template #bottom>
            <slot name="aside" />
            <ArticleRelated
              v-if="tags && tags.length > 0"
              :tags="tags"
              :path="currentPath"
              :limit="tocLinks && tocLinks.length > 1 ? 4 : 5"
            >
              <template #default="{ items }">
                <USeparator v-if="tocLinks && tocLinks.length > 1" type="dashed" />
                <div>
                  <div class="group text-sm font-semibold flex-1 items-center gap-1.5 py-1.5 -mt-1.5 focus-visible:outline-primary hidden lg:flex">
                    <div class="truncate">
                      Artículos relacionados
                    </div>
                  </div>
                </div>
                <ArticleRelatedArticles :items="items" />
              </template>
            </ArticleRelated>
          </template>
        </UContentToc>
      </div>
    </template>
  </UPage>
</template>

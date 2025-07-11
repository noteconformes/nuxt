<script lang="ts">
import dayjs from "dayjs";

export type TranslationProps = {
	summary: string;
	url?: string;
	authors?: string[];
};
</script>

<script setup lang="ts">
defineProps<{
  date: string
  translation?: TranslationProps
  authors?: string[]
}>()
</script>

<template>
  <div class="items-center gap-4 justify-center sm:justify-between bg-elevated/50 py-2 px-3">
    <div class="flex items-center divide-x divide-(--ui-text-muted)">
      <div class="text-muted text-sm pr-7 mr-5 text-nowrap">
        <div>
          Publicado: {{ dayjs(date).format('MMMM D, YYYY') }}
        </div>
        <div v-if="authors && authors.length > 0" class="hidden">
          escrito por
          <span v-for="name in authors" :key="name">
            {{ name }}
          </span>
        </div>
      </div>
      <div v-if="translation">
        <UPopover arrow>
          <UButton
            variant="link"
            color="neutral"
            label="Traducción"
          >
            <template #leading>
              <UIcon name="i-lucide-info" class="size-3" />
            </template>
          </UButton>
          <template #content>
            <div class=" max-w-80">
              <ArticleTranslation
                :url="translation.url"
                :text="translation.summary"
                :authors="translation.authors"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </div>
</template>

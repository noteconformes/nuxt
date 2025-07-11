<script lang="ts">
import getRandomImage, { type BgImageProps } from "~/util/getRandomImage";
// @ts-expect-error yaml is not typed
import page from ".index.yml";
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  verse?: string
  image?: BgImageProps
}>(), {
  title: page.title,
  description: page.description,
  verse: page.verse
})
const img = useTemplateRef<HTMLImageElement>('img')

const imageData = computed(() => {
  if (props.image) {
    return props.image
  }
  if (img.value?.src) {
    return {
      src: img.value.src,
      alt: img.value.alt || 'Background image',
      width: img.value.naturalWidth || 1920,
      height: img.value.naturalHeight || 1080
    }
  }
  return getRandomImage()
})
</script>

<template>
  <UPageCTA
    :title="title"
    variant="naked"
    class="bg-black text-white"
    :ui="{
      title: 'text-white font-karma',
      description: 'text-white',
      container: 'py-6 sm:px-6 sm:py-6 lg:py-6'
    }"
  >
    <template #description>
      <p class="font-karma">
        {{ description }}
      </p>
      <p class="font-semibold mt-2 font-karma">
        {{ verse }}
      </p>
    </template>
    <img
      ref="img"
      :src="imageData.src"
      :alt="imageData.alt"
      :width="imageData.width"
      :height="imageData.height"
      class="absolute inset-0 object-cover w-full h-full -z-10 opacity-40"
    >
  </UPageCTA>
</template>

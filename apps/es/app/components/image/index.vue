<script lang="ts">
export type ImageProps = {
	src: string;
	alt?: string;
	cc?: string;
	descr?: string;
};
</script>

<script setup lang="ts">
defineProps<ImageProps>()
const isLoadError = ref(false)
</script>

<template>
  <figure v-if="!isLoadError">
    <div class="relative">
      <img
        :src="src"
        :alt="alt"
        class="w-full object-cover object-center"
        :onerror="() => { isLoadError = true }"
      >
      <UButton
        v-if="cc"
        icon="i-lucide-info"
        size="sm"
        color="neutral"
        variant="soft"
        :href="cc"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute bottom-2 right-2 opacity-30 hover:opacity-100 p-0.5"
        title="Creditos de la imagen"
        aria-label="Creditos de la imagen"
      />
    </div>
    <figcaption
      v-if="descr"
      class="text-sm text-neutral-500 text-center sm:text-right p-2 print:hidden"
    >
      {{ descr }}
    </figcaption>
  </figure>
</template>

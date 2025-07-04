<script setup lang="ts">
defineProps<{
	src: string;
	title?: string;
}>();
</script>

<template>
  <div>
    <figure>
      <div class="aspect-video">
        <iframe
          loading="lazy"
          :title="title"
          width="500"
          height="281"
          :src="src"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="w-full h-full"
        />
      </div>
      <figcaption class="[&>p]:text-sm/tight [&>p]:mt-2 text-center opacity-90">
        <slot>
          {{ title }}
        </slot>
      </figcaption>
    </figure>
  </div>
</template>

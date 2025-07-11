<script setup lang="ts">
defineProps<{
	src: string;
	alt?: string;
	caption?: string;
}>();
</script>

<template>
  <figure class="text-center">
    <img
      :src="src"
      :alt="alt"
      class="mx-auto"
    >
    <figcaption class="[&>p]:text-sm/tight [&>p]:mt-2 text-center opacity-90">
      <slot>
        {{ caption }}
      </slot>
    </figcaption>
  </figure>
</template>

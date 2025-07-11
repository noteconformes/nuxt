<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
	position?: "left" | "right" | "center" | "inline";
	quote: string;
}>();
const url = window.location.origin + window.location.pathname;
const { copy, copied } = useClipboard({ legacy: true });
</script>

<template>
  <div
    :class="[
      'text-3xl/tight',
      '[&>p]:text-3xl/tight [&>p]:mb-0',
      {
        'sm:float-right sm:pl-5 sm:max-w-xs': position === 'right',
        'sm:float-left sm:pr-5 sm:max-w-xs xl:-ml-20': position === 'left',
        'inline-block': position === 'inline'
      }
    ]"
  >
    <div :class="{ 'text-center': position === 'center' }">
      {{ quote }}
    </div>
    <div
      :class="{ 'justify-center': position === 'center' }"
      class="flex items-center gap-2 text-sm font-semibold justify-left"
    >
      Comparté: <UButton
        variant="outline"
        color="neutral"
        size="sm"
        icon="i-lucide-facebook"
        :href="`https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com&quote=${quote}`"
        target="_blank"
        rel="noopener noreferrer"
      /> <UButton
        variant="outline"
        color="neutral"
        size="sm"
        icon="i-lucide-twitter"
        :href="`https://twitter.com/intent/tweet?text=${quote}&url=${url}`"
        target="_blank"
        rel="noopener noreferrer"
      /> <UButton
        variant="outline"
        color="neutral"
        size="sm"
        :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
        class="cursor-pointer"
        :ui="{ leadingIcon: copied ? 'text-success' : '' }"
        @click="copy(`${props.quote}\n${url}`)"
      />
    </div>
  </div>
</template>

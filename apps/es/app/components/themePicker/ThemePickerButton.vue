<script setup lang="ts">
defineProps<{
	label: string;
	icon?: string;
	chip?: string;
	selected?: boolean;
}>();
</script>

<template>
  <UButton
    size="sm"
    color="neutral"
    variant="outline"
    :icon="icon"
    :label="label"
    class="capitalize ring-default rounded-sm text-[11px]"
    :class="[selected ? 'bg-elevated' : 'hover:bg-elevated/50']"
  />
</template>

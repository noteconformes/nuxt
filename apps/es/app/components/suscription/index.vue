<script setup lang="ts">
import { useSuscription } from "./useSuscription";

const { onSave, loading, success, error } = useSuscription();
</script>

<template>
  <slot v-bind="{ onSave, loading, success, error }" />
</template>

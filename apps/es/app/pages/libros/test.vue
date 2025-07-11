<script setup lang="ts">
definePageMeta({ layout: "docs" });

const path = "consumido-por-fuego-el-lugar-santisimo-en-la-ley-biblica";
const { data: page, status } = await useAsyncData(path, () =>
	queryCollection("all").path(path).first(),
);
</script>

<template>
  This is a test: consumido-por-fuego-el-lugar-santisimo-en-la-ley-biblica
</template>

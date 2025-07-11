<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () =>
	queryCollection("all").path(route.path).first(),
);
</script>

<template>
  <UPage v-if="page">
    <UPageHeader class="justify-center">
      <template #title>
        {{ page.title }}
      </template>
    </UPageHeader>

    <UPageBody class="max-w-2xl mx-auto">
      <ContentRenderer
        v-if="page.body"
        :value="page"
        :prose="true"
        class="text-xl font-karma"
      />
    </UPageBody>
  </UPage>
</template>

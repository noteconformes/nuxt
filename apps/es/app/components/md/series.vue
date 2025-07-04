<script setup lang="ts">
const props = defineProps<{
	serie: string;
}>();

const { data } = await useAsyncData(
	computed(() => `${props.serie}`),
	() =>
		queryCollection("all")
			.where("serie", "=", props.serie)
			.order("date", "ASC")
			.all(),
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <UBlogPost
      v-for="(post, index) in data"
      :key="index"
      :to="post.path"
      :title="post.title"
      :description="post.description"
      :ui="{
        body: 'sm:p-4 justify-center'
      }"
    />
  </div>
</template>

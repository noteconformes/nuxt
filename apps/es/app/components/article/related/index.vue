<script setup lang="ts">
const { path, tags, limit } = defineProps<{
	tags: string[];
	path: string;
	limit: number;
}>();

const { data } = await useAsyncData(
	computed(() => `articulos-${JSON.stringify(tags)}`),
	() => {
		const query = queryCollection("all")
			.where("type", "<>", "subseries")
			.where("path", "<>", path)
			.order("date", "DESC")
			.limit(limit);

		if (tags.length) {
			query.orWhere((subQuery) => {
				for (const tag of tags) {
					subQuery.where("tags", "LIKE", `%${tag}%`);
				}
				return subQuery;
			});
		}

		return query.all();
	},
);
</script>

<template>
  <slot v-if="data && data.length > 0" :items="data" />
</template>

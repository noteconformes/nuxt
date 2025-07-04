interface UseArticlesProps {
	page: Ref<number>;
	itemsPerPage: Ref<number>;
	type: Ref<string[]>;
	tags?: Ref<string[]>;
}

export const useArticles = async ({
	page,
	itemsPerPage,
	tags,
	type,
}: UseArticlesProps) => {
	const tagsString = computed(() => tags?.value.join(",") ?? "");
	const collection = "all";
	const totalSkip = computed(() => (page.value - 1) * itemsPerPage.value);
	const articles = await useAsyncData(
		computed(
			() =>
				`${collection}_${tagsString.value}_${type.value.join(",")}_${page.value}_${totalSkip.value}_${itemsPerPage.value}`,
		),
		() => {
			const query = queryCollection(collection)
				.where("type", "IN", type.value)
				.order("date", "DESC")
				.skip(totalSkip.value)
				.limit(itemsPerPage.value);

			if (tags?.value.length) {
				query.orWhere((subQuery) => {
					for (const tag of tags.value) {
						subQuery.where("tags", "LIKE", `%${tag}%`);
					}
					return subQuery;
				});
			}

			return query.all();
		},
	);
	const { data: total } = await useAsyncData(
		computed(
			() => `total_${collection}_${type.value.join(",")}_${tagsString.value}`,
		),
		() => {
			const query = queryCollection(collection).where("type", "IN", type.value);
			if (tags?.value.length) {
				query.orWhere((subQuery) => {
					for (const tag of tags.value) {
						subQuery.where("tags", "LIKE", `%${tag}%`);
					}
					return subQuery;
				});
			}
			return query.count();
		},
	);

	return {
		articles,
		total,
		totalSkip,
	};
};

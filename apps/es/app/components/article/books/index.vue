<script setup lang="ts">
interface BooksProps {
	type: "pdf" | "epub";
	url: string;
}
defineProps<{
	books: BooksProps[];
}>();
</script>

<template>
  <ArticleBooksDownload
    v-for="book in books"
    :key="book.url"
    :url="book.url"
    title=""
  >
    has-optional:
  </ArticleBooksDownload>
</template>

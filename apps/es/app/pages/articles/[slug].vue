<script setup lang="ts">
const route = useRoute();
navigateTo(`${route.path.replace("/articles", "/articulos")}`, {
	replace: true,
});
</script>

<template>
  <div class="flex items-center justify-center">
    Re-redireccionando...
  </div>
</template>

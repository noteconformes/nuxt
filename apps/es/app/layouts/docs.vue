<script setup lang="ts">
/* import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation') */
</script>

<template>
  <UMain>
    <UContainer>
      <UPage>
        <!-- <template #left>
          <UPageAside>
            <UContentNavigation
              v-if="navigation"
              :navigation="navigation"
              :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
              highlight
            />
          </UPageAside>
        </template> -->
        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

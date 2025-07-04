<script setup lang="ts">
interface DecargarBoxProps {
	title: string;
	url: string;
}

const props = defineProps<DecargarBoxProps>();

const { proxy } = useScriptGoogleTagManager()
const onClick = () => {
  proxy.dataLayer.push({
    event: 'download',
    url: props.url
  })
}
</script>

<template>
  <UCard>
    <template #header>
      {{ title }}
    </template>
    <div class="mt-2 mb-4 flex-1">
      <slot />
    </div>
    <template #footer>
      <div class="text-right">
        <UButton
          :href="url"
          target="_blank"
          rel="noreferrer"
          variant="outline"
          color="neutral"
          @click="onClick"
        >
          Descargar aquí
        </UButton>
      </div>
    </template>
  </UCard>
</template>

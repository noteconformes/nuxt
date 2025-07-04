<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { type TypeOf, z } from "zod";

defineProps<{
	onSave: (props: FormValues) => void;
	loading: boolean;
	error: Error | undefined;
	class?: HTMLAttributes["class"];
}>();
const schema = z.object({
	name: z.string().min(2, "El nombre es obligatorio"),
	email: z
		.string()
		.email("Email es inválido")
		.min(1, "El email es obligatorio"),
});
type FormValues = TypeOf<typeof schema>;
const form = reactive<Partial<FormValues>>({});
</script>

<template>
  <UForm
    :state="form"
    :schema="schema"
    @submit="(event) => onSave(event.data)"
  >
    <UAlert
      v-if="error"
      color="error"
      variant="subtle"
      :title="error.message"
      class="mb-4 py-2"
      icon="i-lucide-alert-circle"
    />
    <div :class="$props.class">
      <div class="flex gap-4">
        <UFormField name="name" required>
          <UInput
            v-model="form.name"
            placeholder="Tu nombre"
            :disabled="loading"
          />
        </UFormField>
        <UFormField name="email" required>
          <UInput
            v-model="form.email"
            type="email"
            placeholder="Tu email"
            :disabled="loading"
          />
        </UFormField>
      </div>
      <div>
        <UButton
          type="submit"
          color="primary"
          class="w-full justify-center"
          :loading="loading"
          :disabled="loading"
        >
          Suscribirse
        </UButton>
      </div>
    </div>
  </UForm>
</template>

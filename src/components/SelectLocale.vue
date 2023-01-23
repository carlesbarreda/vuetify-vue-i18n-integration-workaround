<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { availableLocales, t } = useI18n({
  inheritLocale: true,
  useScope: "global",
});

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string
  }>(),
  {
    modelValue: import.meta.env.APP_LOCALE ? import.meta.env.APP_LOCALE : "ca",
    label: 'locale',
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: string): void;
}>();

const localeItem = computed({
  get: () => ({ locale: props.modelValue, name: t("locales." + props.modelValue) }),
  set: (item) => emit("update:modelValue", item.locale),
});

const localeItems = computed(() => {
  let locales: LocaleItem[] = [];
  availableLocales.forEach((value) =>
    locales.push({ locale: String(value), name: t("locales." + value) })
  );
  return locales;
});

/* Example usage
<SelectLocale v-model="locale" />
*/
</script>

<template>
  <v-select
    v-model="localeItem"
    :items="localeItems"
    item-title="name"
    item-value="locale"
    return-object
    :label="t(label)"
    class="pe-2"
  ></v-select>
</template>

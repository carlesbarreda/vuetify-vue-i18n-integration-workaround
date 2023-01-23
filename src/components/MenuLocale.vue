<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { availableLocales, t } = useI18n({
  inheritLocale: true,
  useScope: "global",
});

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    activator?: string;
    anchor?: string;
    show?: boolean;
  }>(),
  {
    modelValue: import.meta.env.APP_LOCALE ? import.meta.env.APP_LOCALE : "ca",
    activator: "parent",
    anchor: "bottom end",
    show: false,
  }
);

const activator = ref(props.activator);
const anchor = ref(props.anchor);
const show = ref(props.show);

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: string): void;
  (event: "update:show", show: boolean): void;
}>();

const localeItems = computed(() => {
  let locales: LocaleItem[] = [];
  availableLocales.forEach((value) =>
    locales.push({ locale: String(value), name: t("locales." + value) })
  );
  return locales;
});

const localeItem = computed({
  get: () => ({ locale: props.modelValue, name: t("locales." + props.modelValue) }),
  set: (item) => emit("update:modelValue", item.locale),
});

const showMenu = computed({
  get: () => show.value,
  set: (value) => {show.value = value; emit("update:show", value)},
});

/* Example usage
<v-btn variant="text" icon>
  <v-icon>mdi-flag</v-icon>
  <MenuLocale v-model="locale" />
</v-btn>

<v-btn variant="text" icon id="menu-locale-activator">
  <v-icon>mdi-flag</v-icon>
</v-btn>
<MenuLocale v-model="locale" v-model:show="isMenuLocale" activator="#menu-locale-activator" anchor="bottom end" />
*/
</script>

<template>
  <v-menu v-model="showMenu" :activator="activator" :anchor="anchor">
    <v-list density="compact">
      <v-list-item
        v-for="item in localeItems"
        :key="item.locale"
        :title="item.name"
        :value="item.locale"
        :active="item.locale == localeItem.locale"
        @click="localeItem = item"
      ></v-list-item>
    </v-list>
  </v-menu>
</template>

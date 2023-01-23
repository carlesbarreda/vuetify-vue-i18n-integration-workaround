<script setup lang="ts">
import { ref, computed } from 'vue';
import MenuLocale from '@/components/MenuLocale.vue';
import SelectLocale from '@/components/SelectLocale.vue';

import { useI18n } from 'vue-i18n';
import { useLocale } from "vuetify";

const { locale, n } = useI18n();
const { current, t } = useLocale();

const files = ref<File[] | undefined>(undefined);
const size = ref<1000 | 1024>(1024);
const withSize = ref<boolean>(true);

const now = computed((): Date => new Date());

const lang = computed({
  get: () => locale.value,
  set: (lang) => locale.value = current.value = lang,
});

const totalFiles = computed((): number => {
  return files.value ? files.value.length : 0;
});

const totalSize = computed((): number => {
  let total = 0;
  if (files.value)
    for (let i = 0; i < files.value.length; i++) total += files.value[i].size;
  return total;
});

const totalSizeString = computed((): string => {
  return `${n(totalSize.value, 'decimal')} B`;
});

const totalString = computed((): string => {
  return (!withSize.value) 
    ? t('$vuetify.fileInput.counter', [
        totalFiles.value,
      ])
    : t('$vuetify.fileInput.counterSize', [
        totalFiles.value,
        humanReadableFileSize(totalSize.value, size.value),
      ]);
});

// from vuetify/lib/util/
const humanReadableFileSize = (bytes: number, base = 1000): string => {
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
};
</script>

<template>
  <v-container class="main">
    <h3>{{ $t('title') }}</h3>
    <p>{{ $d(now, 'xl') }}</p>

    <div class="d-flex">
      <v-btn variant="text" icon>
        <v-icon>mdi-flag</v-icon>
        <MenuLocale v-model="lang" />
      </v-btn>

      <SelectLocale v-model="lang" class="locale-select" />

      <v-select
        v-model="size"
        :items="[1000, 1024]"
        :disabled="!withSize"
        :label="$t('size')"
        class="size-select"
      >
      </v-select>

      <v-checkbox-btn
        v-model="withSize"
        class="pe-2"
      ></v-checkbox-btn>
    </div>

    <v-file-input
      v-model="files"
      :label="files && files?.length > 0 ? $t('files') :  $t('dropfiles')"
      :show-size="withSize ? size : false"
      counter
      multiple
    ></v-file-input>

    <div class="text-right">
      <span>{{ $t('expected-string') }}:</span> <span>{{ totalString }}</span>
      <div>
        <span>{{ $t('files') }}: {{ totalFiles }}</span>
        <span v-if="withSize">&nbsp; {{ $t('total') }}: {{ totalSizeString }} ({{ $t('size') }}: {{ size }})</span>
      </div>
    </div>

  </v-container>
</template>

<style scoped>
.main {
  min-width: 441px;
}
.locale-select {
  width: 174px;
}
.size-select {
  width: 95px;
}
</style>

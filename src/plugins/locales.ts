import { createI18n } from 'vue-i18n';

import locales from "@intlify/unplugin-vue-i18n/messages";

// Translations provided by Vuetify
import { ca, es, en } from 'vuetify/locale';

import type { DateTimeFormats, NumberFormats } from '@intlify/core-base';

export const defaultLocale: string = import.meta.env.APP_LOCALE || "ca";
export const fallbackLocale: string =
  import.meta.env.APP_FALLBACK_LOCALE || "ca";

export const datetimeFormats: DateTimeFormats = {
  ca: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    xl: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    xl: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  es: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    xl: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
};

export const numberFormats: NumberFormats = {
  ca: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
  en: {
    currency: {
      style: 'currency',
      currency: 'GBP',
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
  es: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: 'percent',
      useGrouping: false,
    },
  },
};

export const messages = {
  ca: { $vuetify: ca, ...locales["ca"] },
  es: { $vuetify: es, ...locales["es"] },
  en: { $vuetify: en, ...locales["en"] },
};

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  messages: messages,
  datetimeFormats: datetimeFormats,
  numberFormats: numberFormats,
  useScope: 'global',
});

// Only if you want hot module replacement when translation message file change
if (import.meta.hot) {
  import.meta.hot.on("locales-update", (data) => {
    Object.keys(data).forEach((lang) => {
      i18n.global.setLocaleMessage(lang, data[lang]);
    });
  });
}

export default i18n;

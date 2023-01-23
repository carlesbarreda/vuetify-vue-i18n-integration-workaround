/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly APP_TITLE: string;
  readonly APP_LOCALE: string;
  readonly APP_FALLBACK_LOCALE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface LocaleItem {
  locale: string;
  name: string;
}

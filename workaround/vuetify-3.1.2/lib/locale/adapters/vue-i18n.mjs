import { watch } from 'vue';
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
//TODO: Fix `t` integration with i18n, keep `t` vuetify while isn't fixed
import { consoleError, consoleWarn, getObjectValueByPath } from "../../util/index.mjs";
const LANG_PREFIX = '$vuetify.';
const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[+index]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function (key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    // If 'param' is i18n style use 'params[0]' as 'params' array
    if (params.length == 1 && typeof params[0] === 'object')
      params = params[0];
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }
    // keep long key
    const shortKey = key; // key.replace(LANG_PREFIX, '');
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== 'string') {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace(str, params);
  };
};
//TODO: End
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop);
  internal.value = props[prop] ?? provided.value;
  watch(provided, v => {
    if (props[prop] == null) {
      internal.value = v;
    }
  });
  return internal;
}
function createProvideFunction(data) {
  return props => {
    const current = useProvided(props, 'locale', data.current);
    const fallback = useProvided(props, 'fallback', data.fallback);
    const messages = useProvided(props, 'messages', data.messages);
    const i18n = data.useI18n({
      locale: current.value,
      fallbackLocale: fallback.value,
      messages: messages.value,
      useScope: 'local',
      legacy: false,
      inheritLocale: false
    });
    watch(current, v => {
      i18n.locale.value = v;
    });
    return {
      name: 'vue-i18n',
      current,
      fallback,
      messages,
      // @ts-expect-error Type instantiation is excessively deep and possibly infinite
      //t: i18n.t,
      //TODO: Downgrade `t` while fixing integration with i18n
      t: createTranslateFunction(current, fallback, messages),
      n: i18n.n,
      provide: createProvideFunction({
        current,
        fallback,
        messages,
        useI18n: data.useI18n
      })
    };
  };
}
export function createVueI18nAdapter(_ref) {
  let {
    i18n,
    useI18n
  } = _ref;
  const current = i18n.global.locale;
  const fallback = i18n.global.fallbackLocale;
  const messages = i18n.global.messages;
  return {
    name: 'vue-i18n',
    current,
    fallback,
    messages,
    //t: i18n.global.t,
    //TODO: Downgrade `t` while fixing integration with i18n
    t: createTranslateFunction(current, fallback, messages),
    n: i18n.global.n,
    provide: createProvideFunction({
      current,
      fallback,
      messages,
      useI18n
    })
  };
}
//# sourceMappingURL=vue-i18n.mjs.map
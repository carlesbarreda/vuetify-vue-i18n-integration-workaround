import { resolveDirective as _resolveDirective, createVNode as _createVNode, mergeProps as _mergeProps, Fragment as _Fragment } from "vue";
// Styles
import "./VFileInput.css";

// Components
import { filterFieldProps, makeVFieldProps } from "../VField/VField.mjs";
import { filterInputProps, makeVInputProps, VInput } from "../VInput/VInput.mjs";
import { VChip } from "../VChip/index.mjs";
import { VCounter } from "../VCounter/index.mjs";
import { VField } from "../VField/index.mjs"; // Composables
import { forwardRefs } from "../../composables/forwardRefs.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities
import { computed, nextTick, ref } from 'vue';
import { callEvent, defineComponent, filterInputAttrs, humanReadableFileSize, useRender, wrapInArray } from "../../util/index.mjs"; // Types
export const VFileInput = defineComponent({
  name: 'VFileInput',
  inheritAttrs: false,
  props: {
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize'
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter'
    },
    multiple: Boolean,
    hint: String,
    persistentHint: Boolean,
    placeholder: String,
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: v => {
        return typeof v === 'boolean' || [1000, 1024].includes(v);
      }
    },
    ...makeVInputProps({
      prependIcon: '$file'
    }),
    modelValue: {
      type: Array,
      default: () => [],
      validator: val => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object');
      }
    },
    ...makeVFieldProps({
      clearable: true
    })
  },
  emits: {
    'click:control': e => true,
    'update:modelValue': files => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, 'modelValue');
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map(file => {
      const {
        name = '',
        size = 0
      } = file;
      return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      var _model$value;
      const fileCount = ((_model$value = model.value) == null ? void 0 : _model$value.length) ?? 0;
      //TODO: Update all apperance of `t` to use i18n params style
      if (props.showSize) return t(props.counterSizeString, [fileCount, totalBytesReadable.value]);else return t(props.counterString, [fileCount]);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const isFocused = ref(false);
    const inputRef = ref();
    const messages = computed(() => {
      return props.messages.length ? props.messages : props.persistentHint ? props.hint : '';
    });
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        var _inputRef$value;
        (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
      }
      if (!isFocused.value) {
        isFocused.value = true;
      }
    }
    function onClickPrepend(e) {
      callEvent(props['onClick:prepend'], e);
      onControlClick(e);
    }
    function onControlClick(e) {
      var _inputRef$value2;
      (_inputRef$value2 = inputRef.value) == null ? void 0 : _inputRef$value2.click();
      emit('click:control', e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        if (inputRef != null && inputRef.value) {
          inputRef.value.value = '';
        }
        callEvent(props['onClick:clear'], e);
      });
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [{
        modelValue: _,
        ...inputProps
      }] = filterInputProps(props);
      const [fieldProps] = filterFieldProps(props);
      return _createVNode(VInput, _mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": "v-file-input",
        "onClick:prepend": onClickPrepend,
        "onClick:append": props['onClick:append']
      }, rootAttrs, inputProps, {
        "focused": isFocused.value,
        "messages": messages.value
      }), {
        ...slots,
        default: _ref3 => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref3;
          return _createVNode(VField, _mergeProps({
            "ref": vFieldRef,
            "prepend-icon": props.prependIcon,
            "onClick:control": onControlClick,
            "onClick:clear": onClear,
            "onClick:prependInner": props['onClick:prependInner'],
            "onClick:appendInner": props['onClick:appendInner']
          }, fieldProps, {
            "id": id.value,
            "active": isDirty.value || isFocused.value,
            "dirty": isDirty.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: _ref4 => {
              var _model$value2;
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return _createVNode(_Fragment, null, [_createVNode("input", _mergeProps({
                "ref": inputRef,
                "type": "file",
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": e => {
                  e.stopPropagation();
                  onFocus();
                },
                "onChange": e => {
                  if (!e.target) return;
                  const target = e.target;
                  model.value = [...(target.files ?? [])];
                },
                "onFocus": onFocus,
                "onBlur": () => isFocused.value = false
              }, slotProps, inputAttrs), null), _createVNode("div", {
                "class": fieldClass
              }, [!!((_model$value2 = model.value) != null && _model$value2.length) && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map(text => _createVNode(VChip, {
                "key": text,
                "size": "small",
                "color": props.color
              }, {
                default: () => [text]
              })) : fileNames.value.join(', '))])]);
            }
          });
        },
        details: hasDetails ? slotProps => {
          var _slots$details, _model$value3;
          return _createVNode(_Fragment, null, [(_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps), hasCounter && _createVNode(_Fragment, null, [_createVNode("span", null, null), _createVNode(VCounter, {
            "active": !!((_model$value3 = model.value) != null && _model$value3.length),
            "value": counterValue.value
          }, slots.counter)])]);
        } : undefined
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
//# sourceMappingURL=VFileInput.mjs.map
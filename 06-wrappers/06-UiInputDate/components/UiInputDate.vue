<template>
  <UiInput :model-value="modelProxy" @input="handleInput" :type="type">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      default: 'date'
    },
    modelValue: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
    }
  },
  data() {
    return {}
  },
  computed: {
    modelProxy: {
      get() {
        return this.modelValue ? this.localDatetime : null;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    localDatetime() {
      const dateISO = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return dateISO.slice(0, 10);
      }
      if (this.type === 'time') {
        return dateISO.slice(11, 16);
      }
      return dateISO.slice(0, 16);
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>

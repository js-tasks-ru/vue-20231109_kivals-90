<template>
  <div class="toasts">
    <UIToast
      v-for="({ message, type }, index) in toasts"
      :key="index"
      :message="message"
      :variant="type"
      :icon="type === $options.TOAST_TYPES.SUCCESS ? 'check-circle' : 'alert-circle'"
    />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UIToast from "./UIToast.vue";

const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const DELAY = 5000;

export default {
  name: 'TheToaster',

  components: { UIToast, UiIcon },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.createMessage(message, TOAST_TYPES.SUCCESS);
    },

    error(message) {
      this.createMessage(message, TOAST_TYPES.ERROR);
    },

    createMessage(message, type) {
      this.toasts.push({ message, type });
      setTimeout(
        () => this.toasts = this.toasts.filter(m => m.message !== message), DELAY
      );
    }
  },

  TOAST_TYPES,
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast + .toast {
  margin-top: 20px;
}
</style>

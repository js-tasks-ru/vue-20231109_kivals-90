<template>
  <div class="toasts">
    <UIToast
      v-for="{ id, message, type } in toasts"
      :key="id"
      :message="message"
      :variant="type"
    />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UIToast from "./UIToast.vue";

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
      this.createMessage(message, "success");
    },

    error(message) {
      this.createMessage(message, "error");
    },

    createMessage(message, type) {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      setTimeout(
        () => this.toasts = this.toasts.filter(m => m.id !== id), DELAY
      );
    }
  },
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

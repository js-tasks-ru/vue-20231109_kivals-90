<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': loading}"
      :style="imageSrc"
    >
      <span class="image-uploader__text">
        {{ imageTitle }}
      </span>
      <input
        ref="input"
        type="file"
        @change="handleChange"
        @click="handleClick"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    uploader: {
      type: Function,
    },
    preview: {
      type: String,
    }
  },
  emits: ['select', 'remove', 'upload', 'error'],
  data() {
    return {
      image: this.preview,
      loading: false,
    }
  },
  computed: {
    imageTitle() {
      if (this.loading) {
        return 'Загрузка...';
      }
      return this.image ? 'Удалить изображение' : 'Загрузить изображение';
    },
    imageSrc() {
      return this.image ? `--bg-url:url(${this.image})` : null;
    }
  },
  methods: {
    handleClick(e) {
      if (this.image || this.loading) {
        e.preventDefault();
      }
      if (this.image && !this.loading) {
        this.image = null;
        this.$refs.input.value = '';
        this.$emit('remove');
      }
    },
    handleChange(e) {
      this.image = URL.createObjectURL(e.target.files[0]);
      this.$emit("select", e.target.files[0]);
      if (this.uploader) {
        this.loading = true;
        this.uploader(e.target.files[0])
          .then(result => {
            this.$emit("upload", result);
        }).catch((err) => {
          this.$emit("error", err);
          this.$refs.input.value = '';
          this.image = null;
        }).finally(() => {
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

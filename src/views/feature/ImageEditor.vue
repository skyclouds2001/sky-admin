<script setup lang="ts">
/**
 * 图片编辑器预览地址
 *
 * @see https://github.com/nihaojob/vue-fabric-editor
 * @see https://juejin.cn/user/3843548383549214
 */
const ImageEditorUrl = 'https://nihaojob.github.io/vue-fabric-editor/'
</script>

<template>
  <iframe class="image-editor" name="image-editor" title="image-editor" referrerpolicy="no-referrer" :src="ImageEditorUrl"></iframe>
</template>

<style scoped lang="scss">
.image-editor {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 800px;
}
</style>

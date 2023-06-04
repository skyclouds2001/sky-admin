<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { ElButton, ElCard, ElIcon, ElSpace, ElUpload, type UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { compressImage, downloadFile } from '@/util'

const img = shallowRef<File | null>(null)

const image = ref<string | null>(null)

const handleChoose: UploadProps['onChange'] = (file) => {
  img.value = file.raw as File
  image.value = URL.createObjectURL(file.raw as File)
}

const handleCompress = async () => {
  if (img.value === null) return

  const blob = await compressImage({
    image: img.value,
    maxWidth: 1000,
    maxHeight: 1000,
    quality: 0.5,
  })

  downloadFile(blob)
}
</script>

<template>
  <el-space size="large" class="w-full p-4">
    <el-card shadow="always">
      <el-upload accept="image/*" drag :limit="1" :show-file-list="false" :auto-upload="false" :on-change="handleChoose" class="upload">
        <img v-if="image" :src="image" class="avatar" />
        <el-icon v-else class="icon"><Plus /></el-icon>
      </el-upload>
      <el-button :disable="img === null || image === null" type="primary" @click="handleCompress">压缩</el-button>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss">
.upload {
  @apply py-3;

  :deep(.el-upload-dragger) {
    @apply p-0;
  }
}

.avatar {
  @apply w-40 h-40 block;
}

.icon {
  @apply w-40 h-40 text-center;
}
</style>

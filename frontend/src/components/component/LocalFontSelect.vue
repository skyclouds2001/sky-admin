<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

const props = withDefaults(
  defineProps<{
    // @ts-expect-error - Local Font Access API
    modelValue: FontData
    name?: string
    placeholder?: string
    postscriptNames?: string[] | null
  }>(),
  {
    name: 'Local Font Select',
    placeholder: 'Please select the font you need',
    postscriptNames: null,
  }
)

const emits = defineEmits<{
  // @ts-expect-error - Local Font Access API
  'update:modelValue': [value: FontData]
}>()

const isSupported = 'queryLocalFonts' in window

const font = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

// @ts-expect-error - Local Font Access API
const fonts = ref<FontData[]>([])

const loadFont = async (): Promise<void> => {
  if (!isSupported) {
    console.error('Current Browser does not support for Local Font Access API')
  }

  const options =
    props.postscriptNames != null
      ? {
          postscriptNames: props.postscriptNames,
        }
      : {}

  // @ts-expect-error - Local Font Access API
  const data = await window.queryLocalFonts(options)

  fonts.value = data
}

defineOptions({
  name: 'LocalFontSelect',
  inheritAttrs: false,
})

defineExpose({
  isSupported,
  font,
  fonts,
  loadFont,
})
</script>

<template>
  <el-select v-model="font" :disabled="!isSupported" filterable :name="props.name" :placeholder="props.placeholder" :aria-label="props.name" @visible-change="loadFont">
    <el-option v-for="item in fonts" :key="item.postscriptName" :label="item.fullName" :value="item" />
  </el-select>
</template>

<style scoped lang="scss"></style>

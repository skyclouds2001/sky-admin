<script setup lang="ts">
import { login } from '@/api'
import { Lock as Locker, User } from '@element-plus/icons-vue'
import { useStorage } from '@sky-fly/sky-hooks'
import { ElButton, ElCard, ElCol, ElForm, ElFormItem, ElInput, ElMessage, ElRow, type FormInstance, type FormRules } from 'element-plus'
import { getCurrentInstance, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const appContext = getCurrentInstance()?.appContext

const router = useRouter()

const i18n = useI18n()

const storage = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

const el = ref<FormInstance | null>(null)

interface Form {
  username: string
  password: string
}

const form = reactive<Form>({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: {
    required: true,
    message: i18n.t('login.check_username'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: i18n.t('login.check_password'),
    trigger: 'blur',
  },
})

const isSubmitting = ref(false)

const handleSubmit = async (): Promise<void> => {
  if (el.value === null) return

  const status = await el.value.validate()

  if (!status) {
    ElMessage.error(
      {
        message: i18n.t('login.check_info'),
        center: true,
        showClose: true,
        grouping: true,
      },
      appContext
    )
  }

  try {
    isSubmitting.value = true
    const res = await login(form.username, form.password)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (res.success) {
      ElMessage.success(
        {
          message: i18n.t('login.success'),
          center: true,
          showClose: true,
          grouping: true,
        },
        appContext
      )
      storage.value = res.data.accessToken
      await router.push('/home')
    } else {
      ElMessage.error(
        {
          message: `${i18n.t('login.fail')}: ${res.message}`,
          center: true,
          showClose: true,
          grouping: true,
        },
        appContext
      )
    }
  } catch {
    ElMessage.error(
      {
        message: i18n.t('login.fail'),
        center: true,
        showClose: true,
        grouping: true,
      },
      appContext
    )
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <el-row class="h-screen w-screen items-center justify-center" style="background-image: linear-gradient(90deg, #0065ca, #54a9ff)">
    <el-col :span="8">
      <el-card :header="i18n.t('login.login')">
        <el-form ref="el" :model="form" :rules="rules" label-position="top" label-width="100px" status-icon hide-required-asterisk>
          <el-form-item :label="i18n.t('login.username')" prop="username">
            <el-input v-model="form.username" :placeholder="i18n.t('login.check_username')" :prefix-icon="User" name="username" label="username" />
          </el-form-item>
          <el-form-item :label="i18n.t('login.password')" prop="password">
            <el-input v-model="form.password" :placeholder="i18n.t('login.check_password')" show-password :prefix-icon="Locker" name="password" label="password" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="isSubmitting" :disabled="isSubmitting" @click="handleSubmit">{{ i18n.t('login.login') }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>

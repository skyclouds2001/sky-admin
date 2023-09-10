<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElScrollbar, ElTabs, ElTabPane } from 'element-plus'

const i18n = useI18n()

type Tab = 'Notification' | 'Message' | 'Todo'

const tab = ref<Tab>('Notification')

const notifications = ref([])

const messages = ref([])

const todos = ref([])
</script>

<template>
  <el-tabs v-model="tab" class="tabs">
    <el-tab-pane :label="`${i18n.t('layout.notification.notification')}(${notifications.length})`" name="Notification" lazy>
      <el-scrollbar height="300px" noresize>
        <section>Notification</section>
      </el-scrollbar>
    </el-tab-pane>

    <el-tab-pane :label="`${i18n.t('layout.notification.message')}(${messages.length})`" name="Message" lazy>
      <el-scrollbar height="300px" noresize>
        <section>Message</section>
      </el-scrollbar>
    </el-tab-pane>

    <el-tab-pane :label="`${i18n.t('layout.notification.todo')}(${todos.length})`" name="Todo" lazy>
      <el-scrollbar height="300px" noresize>
        <section>Todo</section>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.tabs {
  width: 300px;
}
</style>

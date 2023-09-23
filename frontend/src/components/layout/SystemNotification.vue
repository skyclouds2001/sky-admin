<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElScrollbar, ElTabs, ElTabPane } from 'element-plus'
import { NotificationItem, TodoItem } from '@/components'
import { notifications as notification, todos as todo } from '@/data'
import type { Notification, Todo } from '@/model'

const i18n = useI18n()

type Tab = 'Notification' | 'Message' | 'Todo'

const tab = ref<Tab>('Notification')

const notifications = ref<Notification[]>([])

const messages = ref([])

const todos = ref<Todo[]>([])

notifications.value = notification
todos.value = todo
</script>

<template>
  <el-tabs v-model="tab">
    <el-tab-pane :label="`${i18n.t('layout.notification.notification')}(${notifications.length})`" name="Notification" lazy>
      <el-scrollbar height="300px" noresize>
        <notification-item v-for="item in notifications" :key="item.id" :notification="item" />
      </el-scrollbar>
    </el-tab-pane>

    <el-tab-pane :label="`${i18n.t('layout.notification.message')}(${messages.length})`" name="Message" lazy>
      <el-scrollbar height="300px" noresize>
        <section>Message</section>
      </el-scrollbar>
    </el-tab-pane>

    <el-tab-pane :label="`${i18n.t('layout.notification.todo')}(${todos.length})`" name="Todo" lazy>
      <el-scrollbar height="300px" noresize>
        <todo-item v-for="item in todos" :key="item.id" :todo="item" />
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss"></style>

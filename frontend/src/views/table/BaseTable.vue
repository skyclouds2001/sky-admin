<script setup lang="ts">
import { getCurrentInstance, reactive, ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber, ElMessage, ElMessageBox, ElOption, ElPagination, ElRate, ElSelect, ElSpace, ElTable, ElTableColumn, ElTag, type FormInstance } from 'element-plus'
import { Download, EditPen, Search } from '@element-plus/icons-vue'
import { addArticle, updateArticle, removeArticle } from '@/api'
import { useArticles } from '@/hook'
import type { Article } from '@/model'
import { exportExcelFromData } from '@/util'

const i18n = useI18n()

const appContext = getCurrentInstance()?.appContext

const { articles, page, size, total, search, refresh } = useArticles()

const form = shallowRef<FormInstance | null>(null)

const article: Omit<Article, 'id' | 'author' | 'createdAt' | 'updatedAt'> = reactive({
  title: '',
  description: '',
  authorId: 0,
  star: 0,
  read: 0,
  status: 'Drafted',
})

const articleForm = ref(false)

/**
 * 导出表格回调方法
 */
const handleExport = (): void => {
  exportExcelFromData<Article>(articles.value)
}

/**
 * 搜索文章方法
 */
const handleSearch = (): void => {
  console.log(search)
}

/**
 * 新增文章信息列表方法
 */
const handleAddArticle = async (): Promise<void> => {
  if (form.value == null) return

  const flag = await form.value?.validate()

  if (!flag) {
    return
  }

  try {
    const res = await addArticle(article)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (res.success) {
      ElMessage.success(
        {
          message: '添加成功',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )

      articleForm.value = false
      form.value.resetFields()
    } else {
      ElMessage.error(
        {
          message: `添加失败：${res.message}`,
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    }
  } catch {
    ElMessage.error(
      {
        message: '添加失败',
        showClose: true,
        center: true,
        grouping: true,
      },
      appContext
    )
  } finally {
    void refresh()
  }
}

/**
 * 编辑文章信息方法
 * @param id 文章ID
 */
const handleEditArticle = (id: number): void => {
  console.log(id)
}

/**
 * 切换文章状态方法
 * @param id 文章ID
 */
const handleToggleArticleStatus = (id: number): void => {
  const article = articles.value.find((v) => v.id === id) as Article

  ElMessageBox.confirm(
    article.status === 'Drafted' ? '确认发表文章？' : '确认草稿文章？',
    '警告',
    {
      type: 'info',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      center: true,
      draggable: true,
    },
    appContext
  )
    .then(async () => {
      try {
        const a = Object.assign({}, article)
        a.status = article.status === 'Drafted' ? 'Published' : 'Drafted'
        const res = await updateArticle(a)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (res.success) {
          ElMessage.success(
            {
              message: '修改成功',
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        } else {
          ElMessage.error(
            {
              message: `修改失败：${res.message}`,
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        }
      } catch {
        ElMessage.error(
          {
            message: '修改失败',
            showClose: true,
            center: true,
            grouping: true,
          },
          appContext
        )
      } finally {
        void refresh()
      }
    })
    .catch(() => {
      ElMessage.error(
        {
          message: '修改失败',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    })
}

/**
 * 移除文章信息方法
 * @param id 文章ID
 */
const handleRemoveArticle = (id: number): void => {
  ElMessageBox.confirm(
    '确认删除？',
    '警告',
    {
      type: 'error',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      center: true,
      draggable: true,
    },
    appContext
  )
    .then(async () => {
      try {
        const res = await removeArticle(id)
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (res.success) {
          ElMessage.success(
            {
              message: '删除成功',
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        } else {
          ElMessage.error(
            {
              message: `删除失败：${res.message}`,
              showClose: true,
              center: true,
              grouping: true,
            },
            appContext
          )
        }
      } catch {
        ElMessage.error(
          {
            message: '删除失败',
            showClose: true,
            center: true,
            grouping: true,
          },
          appContext
        )
      } finally {
        void refresh()
      }
    })
    .catch(() => {
      ElMessage.info(
        {
          message: '已取消删除',
          showClose: true,
          center: true,
          grouping: true,
        },
        appContext
      )
    })
}
</script>

<template>
  <el-space direction="vertical" fill size="large" class="base-table-space p-5">
    <!-- 搜索框部分 -->
    <el-form :model="search" inline>
      <el-form-item>
        <el-input v-model="search.title" name="title" :label="i18n.t('table.search.name_label')" :placeholder="i18n.t('table.search.name_placeholder')" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleSearch">{{ i18n.t('table.search.search') }}</el-button>
        <el-button type="primary" :icon="Download" @click="handleExport">{{ i18n.t('table.search.export') }}</el-button>
        <el-button type="primary" :icon="EditPen" @click="articleForm = true">{{ i18n.t('table.search.add') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="articles" stripe border flexible row-key="id">
      <el-table-column type="selection" width="50" align="center" fixed />
      <el-table-column type="expand">
        <template #default="scope">
          <div class="mx-4">
            <p v-if="scope.row.description" class="my-1">{{ i18n.t('table.table.description') }}: {{ scope.row.description }}</p>
            <p class="my-1">{{ i18n.t('table.table.create_time') }}: {{ new Date(scope.row.createdAt).toLocaleString() }}</p>
            <p class="my-1">{{ i18n.t('table.table.update_time') }}: {{ new Date(scope.row.updatedAt).toLocaleString() }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50" align="center" />
      <el-table-column prop="title" :label="i18n.t('table.table.title')" width="200" align="center" />
      <el-table-column prop="author.name" :label="i18n.t('table.table.author')" width="100" align="center" />
      <el-table-column prop="read" :label="i18n.t('table.table.read')" width="100" align="center" />
      <el-table-column prop="star" :label="i18n.t('table.table.star')" width="150" align="center">
        <template #default="scope">
          <el-rate v-model="scope.row.star" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="i18n.t('table.table.status')" width="100" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'Drafted'" type="info">{{ i18n.t('table.table.status_drafted') }}</el-tag>
          <el-tag v-if="scope.row.status === 'Published'" type="success">{{ i18n.t('table.table.status_published') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.t('table.table.operate')" width="300" align="center" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="handleEditArticle(scope.row.id)">{{ i18n.t('table.table.operate_edit') }}</el-button>
          <el-button v-if="scope.row.status === 'drafted'" type="success" @click="handleToggleArticleStatus(scope.row.id)">{{ i18n.t('table.table.operate_published') }}</el-button>
          <el-button v-if="scope.row.status === 'published'" @click="handleToggleArticleStatus(scope.row.id)">{{ i18n.t('table.table.operate_drafted') }}</el-button>
          <el-button type="danger" @click="handleRemoveArticle(scope.row.id)">{{ i18n.t('table.table.operate_delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <el-pagination v-model:current-page="page" v-model:page-size="size" :total="total" :default-current-page="1" :default-page-size="10" layout="prev, pager, next, jumper, ->, total, sizes" background />
  </el-space>

  <!-- 文章表单 -->
  <el-dialog v-model="articleForm" center align-center draggable>
    <el-form ref="form" :model="article">
      <el-form-item label="title">
        <el-input v-model="article.title" name="title" label="title" placeholder="Please input title" clearable />
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="article.description" name="description" label="description" placeholder="Please input description" clearable />
      </el-form-item>
      <el-form-item label="author">
        <el-input v-model="article.authorId" name="author" label="author" placeholder="Please input author" clearable />
      </el-form-item>
      <el-form-item label="star">
        <el-rate v-model="article.star" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" clearable label="star" />
      </el-form-item>
      <el-form-item label="read">
        <el-input-number v-model="article.read" name="read" label="read" placeholder="Please input read" :min="0" :step="1" step-strictly />
      </el-form-item>
      <el-form-item label="status">
        <el-select v-model="article.status" name="status" placeholder="Please select status">
          <el-option label="drafted" value="drafted" />
          <el-option label="published" value="published" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="articleForm = false">Cancel</el-button>
        <el-button type="primary" @click="handleAddArticle">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
.base-table-space {
  @apply w-full;

  > div {
    @apply w-full;
  }
}
</style>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElSpace, ElCard, ElRow, ElCol, ElForm, ElFormItem, ElInput, ElInputNumber, ElSelect, ElOption, ElDatePicker, ElTimePicker, ElRadioGroup, ElRadio, ElSwitch, ElCheckboxGroup, ElCheckbox, ElRate, ElColorPicker, ElSlider } from 'element-plus'

const form = reactive({
  name: '',
  sex: '',
  age: 0,
  region: '',
  date: '',
  time: '',
  rate: 0,
  score: 0,
  choice: [],
  private: false,
  color: '',
  note: '',
})
</script>

<template>
  <el-space direction="vertical" fill size="large" class="px-80 py-4 w-full">
    <el-card shadow="always">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" name="name" label="姓名" placeholder="请填写姓名" clearable />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" name="sex" label="性别">
            <el-radio label="男" name="male" border />
            <el-radio label="女" name="female" border />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄">
          <el-input-number v-model="form.age" name="age" label="年龄" placeholder="请填写年龄" :min="0" :max="150" :step="1" step-strictly />
        </el-form-item>

        <el-form-item label="地区">
          <el-select v-model="form.region" name="area" placeholder="请选择所在地区" clearable>
            <el-option label="北京" value="beijing" />
            <el-option label="上海" value="shanghai" />
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-row>
            <el-col :span="11">
              <el-date-picker v-model="form.date" name="日期" placeholder="请选择日期" />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.time" name="时间" placeholder="请选择时间" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="评级">
          <el-rate v-model="form.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" allow-half clearable label="评级" />
        </el-form-item>

        <el-form-item label="评分">
          <el-slider v-model="form.score" label="评分" show-input show-input-controls show-stops show-tooltip />
        </el-form-item>

        <el-form-item label="选项">
          <el-checkbox-group v-model="form.choice" label="选项">
            <el-checkbox label="服务到位" name="service" border />
            <el-checkbox label="设备良好" name="device" border />
            <el-checkbox label="环境优异" name="environment" border />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="保密">
          <el-switch v-model="form.private" name="private" />
        </el-form-item>

        <el-form-item label="颜色">
          <el-color-picker v-model="form.color" name="color" label="颜色" show-alpha />
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="form.note" type="textarea" name="name" label="备注" placeholder="请填写备注" show-word-limit />
        </el-form-item>
      </el-form>
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>

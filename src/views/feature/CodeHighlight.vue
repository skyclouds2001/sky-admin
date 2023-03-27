<script setup lang="ts">
import { ElSpace, ElCard } from 'element-plus'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('c', c)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('java', java)
hljs.registerLanguage('python', python)

const HighlightJs = hljsVuePlugin.component

const codes: Array<{
  name: string
  lang: string
  code: string
}> = [
  {
    name: 'JavaScript',
    lang: 'javascript',
    code: 'const c = 1;',
  },
  {
    name: 'TypeScript',
    lang: 'typescript',
    code: 'const d: number = 1;',
  },
  {
    name: 'CSS',
    lang: 'css',
    code: `
* {
  box-sizing: border-box;
}
    `.trim(),
  },
  {
    name: 'C',
    lang: 'c',
    code: `
#include "stdio.h"

int main () {
  printf("Hello world!");
  return 0;
}
    `.trim(),
  },
  {
    name: 'C++',
    lang: 'cpp',
    code: `
#include "iostream"

int main () {
  std::cout << "Hello world!" << std::endl;
  return 0;
}
    `.trim(),
  },
  {
    name: 'Java',
    lang: 'java',
    code: `
public class App {
  public static void main (String[] args) {
    System.out.println("Hello world!");
  }
}
    `.trim(),
  },
  {
    name: 'Python',
    lang: 'python',
    code: 'print("Hello world")',
  },
]
</script>

<template>
  <el-space size="large" wrap alignment="flex-start" class="w-full p-4">
    <el-card v-for="item in codes" :key="item.lang" shadow="always">
      <template #header>
        <div class="text-center text-base font-bold">{{ item.name }}</div>
      </template>
      <highlight-js :language="item.lang" :code="item.code" />
    </el-card>
  </el-space>
</template>

<style scoped lang="scss"></style>

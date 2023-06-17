import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import HomePage from '@/views/HomePage.vue'

describe('HomePage', () => {
  it('should has model part title', () => {
    render(HomePage, {
      global: {
        plugins: [router, store, i18n],
      },
    })
    screen.getByText('作者信息')
  })
})

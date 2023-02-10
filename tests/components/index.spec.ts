import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import MainPage from '@/views/HomePage.vue'

describe('basic tests', () => {
  it('basic test', () => {
    render(MainPage)
    screen.getByText('main')
  })
})

import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import HomePage from '@/views/HomePage.vue'

describe('basic tests', () => {
  it('basic test', () => {
    render(HomePage)
    screen.getByText('home')
  })
})

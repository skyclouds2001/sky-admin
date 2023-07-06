import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useToggle } from '../src'

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined()
  })

  it('should represent default value', () => {
    const { value } = useToggle()

    expect(value.value).not.toBe(true)
    expect(value.value).toBe(false)
  })

  it('should represent preset values', () => {
    const { value } = useToggle({
      truthy: 'true',
      falsy: 'false',
    })

    expect(value.value).not.toBe('true')
    expect(value.value).toBe('false')
  })

  it('should initial with init value', () => {
    const { value } = useToggle({
      initial: true,
    })

    expect(value.value).toBe(true)
    expect(value.value).not.toBe(false)
  })

  it('should support toggle value', () => {
    const { value, toggle } = useToggle({
      truthy: 'true',
      falsy: 'false',
      initial: 'true',
    })

    expect(value.value).toBe('true')
    expect(value.value).not.toBe('false')

    toggle()

    expect(value.value).not.toBe('true')
    expect(value.value).toBe('false')

    toggle('false')

    expect(value.value).not.toBe('true')
    expect(value.value).toBe('false')

    toggle('true')

    expect(value.value).toBe('true')
    expect(value.value).not.toBe('false')
  })

  it('should bind with preset values if presets with refs', async () => {
    const truthy = ref('true')
    const falsy = ref('false')
    const { value, toggle } = useToggle({
      truthy,
      falsy,
      initial: 'true',
    })

    expect(value.value).toBe('true')
    expect(value.value).not.toBe('false')

    truthy.value = 't'
    falsy.value = 'f'

    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(value.value).toBe('t')
    expect(value.value).not.toBe('f')

    toggle()

    expect(value.value).not.toBe('t')
    expect(value.value).toBe('f')
  })
})

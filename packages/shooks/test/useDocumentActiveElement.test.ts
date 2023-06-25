import { beforeEach, describe, expect, it } from 'vitest'
import { useDocumentActiveElement } from '..'
import { afterEach } from 'node:test'

describe('useDocumentActiveElement', () => {
  let input: HTMLInputElement | null = null

  beforeEach(() => {
    input = document.createElement('input')
    document.body.appendChild(input)
  })

  afterEach(() => {
    input?.remove()
  })

  it('should be defined', () => {
    expect(useDocumentActiveElement).toBeDefined()
  })

  it('should initialize with default value', () => {
    const activeElement = useDocumentActiveElement()

    expect(activeElement).toEqual(document.body)
  })

  it('should initialize with already-active element', () => {
    input?.focus()

    const activeElement = useDocumentActiveElement()

    expect(activeElement).toEqual(input)
  })

  it('should observe focus and blur events', () => {
    const activeElement = useDocumentActiveElement()

    input?.focus()

    expect(activeElement).toEqual(input)

    input?.blur()

    expect(activeElement).toEqual(document.body)
  })
})

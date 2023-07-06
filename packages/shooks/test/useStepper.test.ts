import { describe, expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import { useStepper } from '..'

describe('useStepper', () => {
  const stepsArray = ['a', 'b', 0, 1] as const
  const stepsObject = { a: 1, b: 'str', c: true, d: () => 0, e: null, f: undefined } as const

  it('should be defined', () => {
    expect(useStepper).toBeDefined()
  })

  it('should correctly represent steps', () => {
    const sa = useStepper(stepsArray)
    const so = useStepper(stepsObject)

    expect(sa.steps.value).toStrictEqual(stepsArray)
    expect(so.steps.value).toStrictEqual(stepsObject)
  })

  it('should correctly represent steps', () => {
    const sat = useStepper(reactive(stepsArray))
    const sot = useStepper(reactive(stepsObject))
    const saf = useStepper(ref(stepsArray))
    const sof = useStepper(ref(stepsObject))

    expect(sat.steps.value).toStrictEqual(stepsArray)
    expect(sot.steps.value).toStrictEqual(stepsObject)
    expect(saf.steps.value).toStrictEqual(stepsArray)
    expect(sof.steps.value).toStrictEqual(stepsObject)
  })

  it('should correctly represent step names and count', () => {
    const sa = useStepper(stepsArray)
    const so = useStepper(stepsObject)

    expect(sa.stepNames.value).toStrictEqual(stepsArray)
    expect(so.stepNames.value).toStrictEqual(Object.keys(stepsObject))
    expect(sa.stepCount.value).toBe(4)
    expect(so.stepCount.value).toBe(6)
  })

  it('should change as reactive steps update', () => {
    const us = reactive([1, 2])
    const saa = useStepper(us)

    expect(saa.steps.value.at(0)).toBe(1)
    expect(saa.stepCount.value).toBe(2)
    expect(saa.stepNames.value).not.toContain(4)

    us[0] = 0
    expect(saa.steps.value.at(0)).toBe(0)

    us.push(3)
    expect(saa.stepCount.value).toBe(3)

    us.push(4)
    expect(saa.stepNames.value).toContain(4)
  })

  it('should index at 0 without initial or other index with given initial', () => {
    const sa = useStepper(stepsArray)
    const so = useStepper(stepsObject)
    const sai = useStepper(stepsArray, 0)
    const soi = useStepper(stepsObject, 'e')

    expect(sa.index.value).toBe(0)
    expect(so.index.value).toBe(0)
    expect(sai.index.value).toBe(2)
    expect(soi.index.value).toBe(4)
  })

  it('should correctly represent current & previous & next step', () => {
    const sab = useStepper(stepsArray)
    const sob = useStepper(stepsObject)
    const sae = useStepper(stepsArray, 1)
    const soe = useStepper(stepsObject, 'f')

    expect(sab.current.value).toBe('a')
    expect(sob.current.value).toBe(1)
    expect(sae.current.value).toBe(1)
    expect(soe.current.value).toBeUndefined()

    expect(sab.previous.value).toBeUndefined()
    expect(sob.previous.value).toBeUndefined()
    expect(sae.previous.value).toBe(0)
    expect(soe.previous.value).toBeNull()

    expect(sab.next.value).toBe('b')
    expect(sob.next.value).toBe('str')
    expect(sae.next.value).toBeUndefined()
    expect(soe.next.value).toBeUndefined()

    expect(sab.isFirst.value).toBe(true)
    expect(sob.isFirst.value).toBe(true)
    expect(sae.isFirst.value).toBe(false)
    expect(soe.isFirst.value).toBe(false)

    expect(sab.isLast.value).toBe(false)
    expect(sob.isLast.value).toBe(false)
    expect(sae.isLast.value).toBe(true)
    expect(soe.isLast.value).toBe(true)
  })

  it('should get & at value if existed or undefined if not existed', () => {
    const sa = useStepper(stepsArray)
    const so = useStepper(stepsObject)

    expect(sa.at(2)).toBe(0)
    expect(so.at(2)).toBe(true)
    expect(sa.at(100)).toBeUndefined()
    expect(so.at(100)).toBeUndefined()

    expect(sa.get('b')).toBe('b')
    expect(so.get('c')).toBe(true)
    expect(sa.get('none')).toBeUndefined()
    expect(so.get('none')).toBeUndefined()
  })

  it('should represent current position comparison', () => {
    const sa = useStepper(['0', '1', '2', '3', '4'], '2')
    const so = useStepper({ a: '0', b: '1', c: '2', d: '3', e: '4' }, 'c')

    expect(sa.isPrevious('0')).toBe(false)
    expect(sa.isPrevious('1')).toBe(true)
    expect(sa.isPrevious('2')).toBe(false)
    expect(sa.isPrevious('3')).toBe(false)
    expect(sa.isPrevious('4')).toBe(false)
    expect(sa.isPrevious('none')).toBe(false)
    expect(so.isPrevious('a')).toBe(false)
    expect(so.isPrevious('b')).toBe(true)
    expect(so.isPrevious('c')).toBe(false)
    expect(so.isPrevious('d')).toBe(false)
    expect(so.isPrevious('e')).toBe(false)
    expect(so.isPrevious('none')).toBe(false)

    expect(sa.isNext('0')).toBe(false)
    expect(sa.isNext('1')).toBe(false)
    expect(sa.isNext('2')).toBe(false)
    expect(sa.isNext('3')).toBe(true)
    expect(sa.isNext('4')).toBe(false)
    expect(sa.isNext('none')).toBe(false)
    expect(so.isNext('a')).toBe(false)
    expect(so.isNext('b')).toBe(false)
    expect(so.isNext('c')).toBe(false)
    expect(so.isNext('d')).toBe(true)
    expect(so.isNext('e')).toBe(false)
    expect(so.isNext('none')).toBe(false)

    expect(sa.isCurrent('0')).toBe(false)
    expect(sa.isCurrent('1')).toBe(false)
    expect(sa.isCurrent('2')).toBe(true)
    expect(sa.isCurrent('3')).toBe(false)
    expect(sa.isCurrent('4')).toBe(false)
    expect(sa.isCurrent('none')).toBe(false)
    expect(so.isCurrent('a')).toBe(false)
    expect(so.isCurrent('b')).toBe(false)
    expect(so.isCurrent('c')).toBe(true)
    expect(so.isCurrent('d')).toBe(false)
    expect(so.isCurrent('e')).toBe(false)
    expect(so.isCurrent('none')).toBe(false)

    expect(sa.isBefore('0')).toBe(true)
    expect(sa.isBefore('1')).toBe(true)
    expect(sa.isBefore('2')).toBe(false)
    expect(sa.isBefore('3')).toBe(false)
    expect(sa.isBefore('4')).toBe(false)
    expect(sa.isBefore('none')).toBe(false)
    expect(so.isBefore('a')).toBe(true)
    expect(so.isBefore('b')).toBe(true)
    expect(so.isBefore('c')).toBe(false)
    expect(so.isBefore('d')).toBe(false)
    expect(so.isBefore('e')).toBe(false)
    expect(so.isBefore('none')).toBe(false)

    expect(sa.isAfter('0')).toBe(false)
    expect(sa.isAfter('1')).toBe(false)
    expect(sa.isAfter('2')).toBe(false)
    expect(sa.isAfter('3')).toBe(true)
    expect(sa.isAfter('4')).toBe(true)
    expect(sa.isAfter('none')).toBe(false)
    expect(so.isAfter('a')).toBe(false)
    expect(so.isAfter('b')).toBe(false)
    expect(so.isAfter('c')).toBe(false)
    expect(so.isAfter('d')).toBe(true)
    expect(so.isAfter('e')).toBe(true)
    expect(so.isAfter('none')).toBe(false)
  })

  it('should update using goto controller', () => {
    const sa = useStepper(['0', '1', '2', '3', '4'])
    const so = useStepper({ a: '0', b: '1', c: '2', d: '3', e: '4' })

    sa.goTo('2')
    so.goTo('c')
    expect(sa.index.value).toBe(2)
    expect(sa.current.value).toBe('2')
    expect(so.index.value).toBe(2)
    expect(so.current.value).toBe('2')

    sa.goToNext()
    so.goToNext()
    expect(sa.index.value).toBe(3)
    expect(sa.current.value).toBe('3')
    expect(so.index.value).toBe(3)
    expect(so.current.value).toBe('3')

    sa.goToPrevious()
    so.goToPrevious()
    expect(sa.index.value).toBe(2)
    expect(sa.current.value).toBe('2')
    expect(so.index.value).toBe(2)
    expect(so.current.value).toBe('2')
  })
})

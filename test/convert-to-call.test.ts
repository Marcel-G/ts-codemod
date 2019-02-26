import * as assert from 'assert'
import {normalize, transform} from '..'
import ConvertToCall from '../transformations/convert-to-call'

describe('convert-to-call', () => {
  it('should convert arg to a function call', () => {
    const input = `
    const result = functionCall(youGottaChangeMe)
    `
    const expected = normalize(`
    const result = functionCall(youGottaChangeMe())
    `)

    const actual = transform({
      transformationCtor: ConvertToCall,
      content: input,
      path: './src/file.ts',
      params: {name: 'youGottaChangeMe'}
    }).newContent

    assert.strictEqual(actual, expected)
  })

  it('should convert values to function call', () => {
    const input = `
    const result = youGottaChangeMe
    `
    const expected = normalize(`
    const result = youGottaChangeMe()
    `)

    const actual = transform({
      transformationCtor: ConvertToCall,
      content: input,
      path: './src/file.ts',
      params: {name: 'youGottaChangeMe'}
    }).newContent

    assert.strictEqual(actual, expected)
  })

  it('should not convert import specifiers to function call', () => {
    const input = normalize(`
    import {youGottaChangeMe} from 'abc'
    const result = youGottaChangeMe
    `)
    const expected = normalize(`
    import {youGottaChangeMe} from 'abc'
    const result = youGottaChangeMe()
    `)

    const actual = transform({
      transformationCtor: ConvertToCall,
      content: input,
      path: './src/file.ts',
      params: {name: 'youGottaChangeMe'}
    }).newContent

    assert.strictEqual(actual, expected)
  })
})

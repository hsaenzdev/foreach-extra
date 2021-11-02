
/**
 * * Array/Object iteration with recursion
 * *
 * 
 */

import foreachExtra from '../src/foreach-extra'

describe('Recursive Array/Object interation', () => {
    jest.useFakeTimers()

    it('Should iterate over array recursively', () => {
        const options = { recursive: true }
        const arr = [[1, 2], [3]]
        const result = []
        
        foreachExtra(arr, options, (item, index, cb) => {
            expect(typeof item).toBe('number')
            expect(typeof index).toBe('number')
            expect(cb).toBeInstanceOf(Function)
    
            result.push(item)

            cb()

            jest.runAllTimers()
        }, () => {
            expect(result).toEqual([1, 2,  3])
        })
    })

    it('should iterate over object recursively', () => {
        const options = { recursive: true }
        const obj = {
            a: { a: 1 },
            b: 2,
            c: 3
        }

        const result = []

        foreachExtra(obj, options, (value, key, cb) => {
            expect(typeof key).toBe('string')
            expect(typeof value).toBe('number')
            expect(cb).toBeInstanceOf(Function)
            
            result.push(value)
            
            cb()
            jest.runAllTimers()
        }, () => {
            expect(result).toEqual([1, 2, 3])
        })
    })
})

/**
 * * Simple iteration
 * *
 * 
 */

import foreachExtra from '../src/foreach-extra'

describe('Simple iteration', () => {
    it('Should iterate over the array', () => {
        const arr = [1, 2, 3]
    
        const result = []
        
        foreachExtra(arr, (item, index, cb) => {
            expect(item).toBe(arr[index])
            expect(typeof item).toBe('number')
            expect(typeof index).toBe('number')
            expect(cb).toBeInstanceOf(Function)
    
            result.push(item)
            cb()
        }, () => {
            expect(result).toEqual([1, 2, 3])
        })
    })
})

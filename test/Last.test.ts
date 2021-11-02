/**
 * *
 * *
 * 
 */

import foreachExtra from '../src/foreach-extra'

describe('Get the last item of array', () => {
    jest.useFakeTimers()
    
    it('Should get the last item', () => {
        const arr = [1, 2, 3]
        const result = []

        foreachExtra(arr, (item, index, cb) => {
            expect(item).toBe(arr[index])
            expect(typeof item).toBe('number')
            expect(typeof index).toBe('number')
            expect(cb).toBeInstanceOf(Function)

            result.push(item)

            cb('last')
            
            jest.runAllTimers()
        }, () => {
            expect(result).toEqual([1, 3])
        })
    })
})

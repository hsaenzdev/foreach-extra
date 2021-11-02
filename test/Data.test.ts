/**
 * * Get array/Object data
 * *
 * 
 */

import foreachExtra from '../src/foreach-extra'

describe('Get array/object data', () => {
    jest.useFakeTimers()

    it('Should return array data ', () => {
        const arr = [1, 2, 3]
        
        let result = []
        foreachExtra(arr, (item, index, cb) => {
            expect(item).toBe(arr[index])
            expect(typeof item).toBe('number')
            expect(typeof index).toBe('number')
            expect(cb).toBeInstanceOf(Function)

            result = cb('data')

            cb('break')
            
            jest.runAllTimers()
        }, () => {
            expect(result).toEqual([1, 2, 3])
        })
    })
})

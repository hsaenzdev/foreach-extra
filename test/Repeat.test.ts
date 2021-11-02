/**
 * * Repeat an array item
 * *
 * 
 */

import foreachExtra from '../src/foreach-extra'

describe('Repeat an array item', () => { 
    jest.useFakeTimers()

    it('Should repeat an array item', () => {
        const arr = [1, 2, 3]
        const result = []
        let trigger = false

        foreachExtra(arr, (item, index, cb) => {
            expect(item).toBe(arr[index])
            expect(typeof item).toBe('number')
            expect(typeof index).toBe('number')
            expect(cb).toBeInstanceOf(Function)
            
            result.push(item)

            if (index === 0 && trigger === false) {
                trigger = true
                cb('repeat')
            } else {
                cb()
            }

            jest.runAllTimers()
        }, () => {
            expect(result).toEqual([1, 1, 2, 3])
        })
    })
})

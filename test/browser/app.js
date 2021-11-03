/**
 * * Test foreach extra in browser
 * *
 * 
 */

//const foreachExtra = require('../../dist/foreach-extra.node')

const arr = [
    'pizza', 
    'pasta', 
    'salad', 
    [
        'nachos',
        'tacos', 
        'fries', 
        'burger',
        'fajitas'
    ],
    'burrito', 
    'sandwich',
    'chicken', 
    {
        food1: 'chicken', 
        food2: 'pizza', 
        food3: 'salad', 
        food4: 'burrito', 
        food5: 'sandwich',
        food6: ['steak', 'burger', 'hotdog', 'crepe'],
    },
    'cake',
    'chips',
    'soup',
    'sushi',
    'ramen',
    'pancakes',
    'waffles',
    'steak',
    'salmon'
]

const options = {
    skip: 1,
    recursive: true,
    skipRecursive: 2
}

foreachExtra(arr, options, (item, index, cb) => {
    console.log(item, index)

    // Get next item after 1 second
    setTimeout(() => { 
        if (item === 'hotdog') {
            // This will not work as expected because
            // "hotdog" is the last item in the current array.
            // We know that "crepe" is the last item but we set skipRecursive to 2
            cb('last')
            return
        }

        if (item === 'chips') {
            // The last item in the current array is "salmon"
            // but we set skip to 1 so we will get steak as the last item
            cb('last')
            return
        }

        cb()
    }, 500)
}, () => {
    console.log('done!')
})
// pasta    1
// fries    2
// sandwich 5
// salad    food3
// hotdog   2
// chips    9
// steak    15

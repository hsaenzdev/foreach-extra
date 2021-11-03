# Foreach-extra
A javascript extended iteration tool written in typescript:
* Sync/Async
* Recursion
* Delay
* Skip
  
# Installation
``` bash
npm i foreach-extra
```

## Node
``` javascript
const foreachExtra = require('foreach-extra')
```
``` javascript
import foreachExtra from 'foreach-extra'
```

## Browser
```html
<script src="node_modules/foreach-extra/dist/foreach-extra.min.js"></script>
```

# Getting Started
Next examples will asume you have installed and imported foreach-extra.

## Basic usage
``` javascript
foreachExtra(['pizza', 'pasta', 'salad'], (item, index, cb) => {
    console.log(item, index)

    // Get the next item
    cb()
}, () => {
    console.log('done!')
})
// pizza 0
// pasta 1
// salad 2
```
``` javascript
const obj = {
    food1: 'pizza',
    food2: 'pasta',
    food3: 'salad'
}

foreachExtra(obj, (value, key, cb) => {
    console.log(value, key)

    // Get the next value
    cb()
}, () => {
    console.log('done!')
})
// pizza food1
// pasta food2
// salad food3
```

## Options
* dalay         - Time in ms to get the next item
* skip          - Skip items between iterations
* recursive     - Depth iteration
* skipRecursive - Skip items between recursive iterations

``` javascript
// Default options are
const options = {
    delay: 0,
    skip: 0,
    recursive: false,
    skipRecursive: 0
}

foreachExtra(['pizza', 'pasta', 'salad'], options, (item, index, cb) => {
    console.log(item, index)

    // Get the next item
    cb()
}, () => {
    console.log('done!')
})
// pizza 0
// pasta 1
// salad 2
```

## Callback options
The callback function can receives the following options:
* break  - Break the iteration
* next   - Next item will be the next one (Default)
* prev   - Next item will be the previous one
* first  - Next item will be the first one
* repeat - Next item will be the same one
* last   - Next interation will be the last one
* data   - Will return the entire array/object

``` javascript
foreachExtra(['pizza', 'pasta', 'salad'], (item, index, cb) => {
    console.log(item, index)

    // Break the iteration
    cb('break')
}, () => {
    console.log('done!')
})
// pizza 0
```

``` javascript
foreachExtra(['pizza', 'pasta', 'salad'], (item, index, cb) => {
    console.log(item, index)

    // Get the next and last item - salad
    cb('last')
}, () => {
    console.log('done!')
})
// pizza 0
// salad 1
```

``` javascript
foreachExtra(['pizza', 'pasta', 'salad'], (item, index, cb) => {
    // console.log(item, index)

    const data = cb('data')

    console.log(data)

    // Get the next item
    cb()
}, () => {
    console.log('done!')
})
// ['pizza', 'pasta', 'salad']
// ['pizza', 'pasta', 'salad']
// ['pizza', 'pasta', 'salad']
```

## Advance usage
This example will show how to use the options
``` javascript
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
    }, 1000)
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
```

# License  
Copyright (c) 2021 Saenzo  
MIT License

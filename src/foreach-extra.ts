/**
 * * Foreach extra
 * *
 * * 
 * 
 * @param arg1 data - Object or Array
 * @param arg2 user options or iterator callback
 * @param arg3 iterator callback
 * @param arg4 callback when the process ends
 * 
 */

import { isBrowser, isJsDom } from 'is-in-browser'

declare global { interface Window { foreachExtra: Function } }

// Interator
interface IForeach { (value: any, key: any, next: Function): void }

// User options
interface IOptions {
    delay?: number,
    skip?: number,
    recursive?: boolean,
    skipRecursive?: number,
}

interface IParams {
    arg1: Array<any>|Object, 
    arg2: IForeach|IOptions,
    arg3?: IForeach|Function,
    arg4?: Function
}

interface IForeachExtra {(
    arg1: Array<any>|Object, 
    arg2: IForeach|IOptions,
    arg3?: IForeach|Function,
    arg4?: Function
): void }

// Default options
const defaultOptions:IOptions = {
    delay: 0,
    skip: 0,
    recursive: false,
    skipRecursive: 0,
}

class ForeachExtra {
    // Params
    data:Array<any>|Object
    cursor:IForeach|Function
    callback:Function
    options:IOptions

    // Flow control
    len:number
    current:number
    keys:Array<any>

    constructor(params:IParams) {
        this.data = params.arg1

        this.options = { ...defaultOptions }

        if (typeof params.arg2 === 'function') { 
            this.cursor = params.arg2
            this.callback = params.arg3
        }
    
        if (typeof params.arg2 === 'object') {
            this.cursor = params.arg3
            this.callback = params.arg4

            this.options = { ...defaultOptions, ...params.arg2 }
        }
    }

    init():void {
        this.keys = Object.keys(this.data)
        this.current = 0
        this.len = this.keys.length

        this.next() 
    }

    hasRecursion():boolean {
        if (this.options.recursive === false) { 
            return false
        }

        const key = this.keys[this.current]

        const item = this.data[key]

        if (Array.isArray(item) === true) { return true }

        if (typeof item === 'object') { return true }

        return false
    }

    hasNext():boolean {
        return (this.current + this.options.skip + 1) < this.len
    }
    
    next():void {
        // Get arr/obj current index
        this.current += this.options.skip

        let key = this.keys[this.current]

        if (typeof key === 'undefined') {
            this.callback && this.callback()
            return
        }

        if (this.hasRecursion() === true) {
            const skip = this.options.skipRecursive

            const options = { ...this.options, skip  }

            foreachExtra(this.data[key], {...options}, this.cursor, () => {
                this.current++
                setTimeout(() => { this.next() }, this.options.delay)
            })

            return
        }

        if (Array.isArray(this.data)) { key = +key }
    
        this.cursor(this.data[key], key, this.requestCommand.bind(this))
        
    }

    requestCommand(command:string):void|Object|Array<any> {
        const goBack = [ 'prev', 'first', 'repeat', 'data' ].includes(command)
        
        if (this.hasNext() === false && goBack === false) {
            this.callback && this.callback()
            return
        }

        if (command === 'data') { 
            return this.data
        }

        if (command === 'break') {
            this.current = this.len + 1
            this.next()
            return
        }

        if (command === 'last') {
            let skip = this.options.skip + 1
            let rem = this.len % skip

            this.current = this.len - rem - skip

            setTimeout(() => { this.next() }, this.options.delay)
            return
        }

        if (command === 'prev') {
            this.current -= this.options.skip
            setTimeout(() => { this.next() }, this.options.delay)
            return
        }

        if (command === 'first'){
            this.current = 0
            setTimeout(() => { this.next() }, this.options.delay)
            return
        }

        if (command === 'repeat') {
            this.current -= this.options.skip
            setTimeout(() => { this.next() }, this.options.delay)
            return
        }

        this.current++
        setTimeout(() => { this.next() }, this.options.delay)
    }
}

const foreachExtra:IForeachExtra = (arg1, arg2, arg3, arg4) => {
    new ForeachExtra({arg1, arg2, arg3, arg4}).init()
}

/* istanbul ignore next */
if (isBrowser || isJsDom) { window.foreachExtra = foreachExtra }

export = foreachExtra

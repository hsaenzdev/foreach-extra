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
declare global {
    interface Window {
        foreachExtra: Function;
    }
}
interface IForeach {
    (value: any, key: any, next: Function): void;
}
interface IOptions {
    delay?: number;
    skip?: number;
    recursive?: boolean;
    skipRecursive?: number;
}
interface IForeachExtra {
    (arg1: Array<any> | Object, arg2: IForeach | IOptions, arg3?: IForeach | Function, arg4?: Function): void;
}
declare const foreachExtra: IForeachExtra;
export default foreachExtra;

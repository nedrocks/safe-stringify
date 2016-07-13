/* @flow */

/**
 * Handles cycles in an object. If there are self references then this will
 * force that value to not appear in the output. See https://goo.gl/FLN94e for
 * more information on this function.
 *
 * NOTE: that this does run in n^2 of the total number of unique objects
 * recursively within the object being stringified.
 */
const decycler: Function = () => {
  const cache: Array<Object> = [];
  return (key: string, val: any) => {
    if (typeof val === 'object' && val !== null) {
      if (cache.indexOf(val) > -1) {
        // Return undefined as specified in the spec (see link above).
        return undefined;
      } else {
        cache.push(val);
      }
    }
    return val;
  }
}

/**
 * Passes the above decycler function into the `JSON.stringify` function in
 * order to disallow cycles.
 *
 * @param {any} input Any primitive input type.
 * @return {string} Stringified result from the input param.
 */
export default (input: any): string => JSON.stringify(input, decycler());

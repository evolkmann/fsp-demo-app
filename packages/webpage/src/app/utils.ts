/**
 * https://www.30secondsofcode.org/js/s/group-by
 */
export const groupBy = <T>(arr: T[], fn: (v: T) => any): {
  [key: string]: T[]
} =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

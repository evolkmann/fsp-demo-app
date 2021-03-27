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

/**
 * https://stackoverflow.com/a/18197341
 */
export function download(filename: string, content: string, mimeType: string) {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

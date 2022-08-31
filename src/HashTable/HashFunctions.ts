export type HashFn = (key: number | string, size: number) => number;

/**
 * h(key) = key % size
 */
export function divisionHash(key: number, size: number): number {
  return key % size;
}

/**
 * h(key) = floor( size * (key * coef mod 1) )
 * 
 * 0 <= coef >= 1
 */
export function multiplicationHash(key: number, size: number): number {
  // Custom coef beetwen 0 and 1
  const coef = 0.6123;
  return Math.floor(size * (key * coef % 1));
}

/**
 * By folding we mean that, if the array `size = 100`, 
 * that means `2-digit` numbers can only fit inside it,
 * so we fold the given key in parts of `2`.
 * I.e. if `Key=20574` Then we will fold it in parts of `2`, which will be:
 * `20, 57, and 4`.
 * So to get an `index < 100` from these parts, we can sum these up i.e.
 * `20 + 57 + 4 = 81`. So `81` is the index where this `Key=20574` can be placed.
 * 
 * Please note that there can be cases where even after
 * folding we get a `number > size` e.g.
 * `Key=56571` then breaking it down in parts of `2 = 56+57+1=114`
 * 
 * Now we cant place this Data at index `114` inside the array of size `100`,
 * so we can either apply this algorithm again or can use the Division method
 * (mostly used in such scenarios) to get `114%100=14`
 * 
 * So this Data can be placed at the `14th Index` of this array.
 * 
 * Similarly, if the array `size = 1000`, then we can insert `3-digit` numbers,
 * so then we can break `Key=20574` as `205+74=279`
 * 
 * So Data with `Key=20574` can be placed at `279th Index` in an array of size `1000`.
 */
export function foldingHash(key: number, size: number): number {
  const digits = size.toString().length - 1 ?? 1;

  const keyAsArrayOfDigits = key.toString().split('');
  let sum = 0;

  while (keyAsArrayOfDigits.length) {
    sum += Number(keyAsArrayOfDigits.splice(0, digits).join());
  }

  return sum % size;
}

/**
 * This method, basically square the given number and pick `N` middle numbers 
 * in that squared number, to find the index.
 * 
 * @example
 * If the array `size = 100`, meaning we can fit only `2 digit` numbers,
 * let’s take `N=2` here (`N` can be taken anything).
 * 
 * `Hash(931) = 931^2 = 866761`. Picking `N(=2)` middle elements i.e. `67`.
 * 
 * So `67` can be placed at `67th Index` in the array of size `100`.
 * 
 * @example
 * Where the index obtained from the mid square method is > size of array,
 * we can again resort back to the Division method.
 * 
 * Let’s take `N=2` and Array `size=11`.
 * 
 * `Hash(93) = 93^2 = 8649`. Picking `N(=2)` middle elements i.e. `64` Now since `64>11`,
 * so we can apply the Division method to get `64%11=9`.
 * 
 * So `93` can be placed at `9th Index` in the array of size `11`.
 */
export function midSquareHash(key: number, size: number): number {
  // Custom, count numbers taken from middle
  const n = 2;

  const square = key ** 2;
  const squareStr = square.toString();
  const squareStrMiddle = Math.floor(squareStr.length / 2) - 1;
  const value = squareStr.slice(squareStrMiddle, squareStrMiddle + n);

  return Number(value) % size;
}

/**
 * h(key) = key => string => chars => charCodes => midSquareHash(sum(charCodes))
 */
 export function sumCharCodesHash<T extends { toString: () => string }>(key: T, size: number): number {
  const sumCharCodes = key.toString().split('').reduce((acc, char) => acc += char.charCodeAt(0), 0);

  return midSquareHash(sumCharCodes, size);
}

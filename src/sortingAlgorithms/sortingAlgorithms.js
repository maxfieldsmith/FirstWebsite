export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function swap(mainArray, i, j) {
  let temp = mainArray[i];
  mainArray[i] = mainArray[j];
  mainArray[j] = temp;
}

function bubbleSortHelper(mainArray, animations) {
  let n = mainArray.length;
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1, 0]);
      animations.push([j, j + 1, 1]);
      if (mainArray[j] > mainArray[j + 1]) {
        animations.push([j, mainArray[j + 1], 2]);
        animations.push([j + 1, mainArray[j], 2]);
        swap(mainArray, j, j + 1);
      }
    }
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, p, r, animations) {
  if (p < r) {
    let q = partition(mainArray, p, r, animations);
    quickSortHelper(mainArray, p, q - 1, animations);
    quickSortHelper(mainArray, q + 1, r, animations);
  }
}

function partition(mainArray, p, r, animations) {
  let x = mainArray[r];
  let i = p - 1;
  for (let j = p; j < r; j++) {
    animations.push([r, j, 0]);
    animations.push([r, j, 1]);
    if (mainArray[j] < x) {
      i += 1;
      animations.push([i, mainArray[j], 2]);
      animations.push([j, mainArray[i], 2]);
      swap(mainArray, i, j);
    }
  }

  animations.push([i + 1, mainArray[r], 2]);
  animations.push([r, mainArray[i + 1], 2]);
  swap(mainArray, i + 1, r);
  return i + 1;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(mainArray, animations) {
  let n = mainArray.length;
  for (let i = Math.floor(n / 2); i > -1; i--) {
    maxHeapify(mainArray, n, i, animations);
  }

  for (let i = n - 1; i > -1; i--) {
    animations.push([i, mainArray[0], 2]);
    animations.push([0, mainArray[i], 2]);

    swap(mainArray, i, 0);
    maxHeapify(mainArray, i, 0, animations);
  }
}

function maxHeapify(mainArray, n, i, animations) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  if (l < n && mainArray[l] > mainArray[largest]) {
    animations.push([l, largest, 0]);
    animations.push([l, largest, 1]);
    largest = l;
  }
  if (r < n && mainArray[r] > mainArray[largest]) {
    animations.push([r, largest, 0]);
    animations.push([r, largest, 1]);
    largest = r;
  }
  if (largest !== i) {
    animations.push([i, mainArray[largest], 2]);
    animations.push([largest, mainArray[i], 2]);
    swap(mainArray, i, largest);
    maxHeapify(mainArray, n, largest, animations);
  }
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSortHelper(array, animations);
  return animations;
}

function insertionSortHelper(mainArray, animations) {
  let key, j;
  for (let i = 1; i < mainArray.length; i++) {
    key = mainArray[i];
    j = i - 1;
    animations.push([i, j, 0]);
    animations.push([i, j, 1]);
    while (j >= 0 && mainArray[j] > key) {
      animations.push([j + 1, mainArray[j], 2]);
      mainArray[j + 1] = mainArray[j];
      j -= 1;
    }
    animations.push([j + 1, key, 2]);
    mainArray[j + 1] = key;
  }
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }

export function getRadixSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  radixSortHelper(array, animations);
  return animations;
}

function radixSortHelper(mainArray, animations) {
  let maxNum = Math.max.apply(null, mainArray);

  for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
    countingSort(mainArray, exp, animations);
  }
}

function countingSort(mainArray, k, animations) {
  let n = mainArray.length;
  let c = new Array(10);
  let b = new Array(n);
  c.fill(0);

  for (let i = 0; i < n; i++) {
    c[Math.floor(mainArray[i] / k) % 10]++;
  }
  for (let i = 1; i < 10; i++) {
    c[i] += c[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    b[c[Math.floor(mainArray[i] / k) % 10] - 1] = mainArray[i];
    c[Math.floor(mainArray[i] / k) % 10]--;
  }

  for (let i = 0; i < n; i++) {
    animations.push([i, b[i], 2]);
    mainArray[i] = b[i];
  }
}

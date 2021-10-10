/* function mergeSort(array) {
    if(array.length === 1) return array;
    const midIndex = Math.floor(array.length/2);
    const leftArray = mergeSort(array.slice(0,midIndex))
    const rightArray = mergeSort(array.slice(midIndex));
    const sortedArray = [];

    let i = 0, j=0;

    while(i<leftArray.length && j<rightArray.length){
        if(leftArray[i] < rightArray[j]){
            sortedArray.push(leftArray[i++])
        } else {
            sortedArray.push(rightArray[j++])
        }
    }
    while(i<leftArray.length) sortedArray.push(leftArray[i++])
    while(j<rightArray.length) sortedArray.push(rightArray[j++])
    return sortedArray;
}*/

function mergeSort(array){
    const animations = []
    if(array.length<=1) return array;
    const tempArray = array.slice();
    mergeSortHelper(array, 0, array.length-1, tempArray, animations);
    return animations
}

function mergeSortHelper(
    array,
    startIdx,
    endIdx,
    tempArray,
    animations
){
    if(startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx+endIdx)/2);
    mergeSortHelper(tempArray, startIdx, midIdx, array, animations);
    mergeSortHelper(tempArray, midIdx+1, endIdx, array, animations);
    doMerge(array, startIdx, midIdx, endIdx, tempArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
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



  function partition(arr, left, right) {
    let pivot = arr[right]
    // push arr[right]
    let i = left - 1 
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j)
      }
    }
    swap(arr, i + 1, right)
    return i + 1;
  }
  
  function quickSort(arr, left, right) {
    if (left < right) {
      let pi = partition(arr, left, right);
      
      quickSort(arr, left, pi-1);
      quickSort(arr, pi+1, right)
    }
  }

  async function testSort(array){
    console.log(array)
  }
  
  function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }


  export { mergeSort, quickSort, testSort}
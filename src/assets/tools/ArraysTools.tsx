export function arrayMerge<T>(array1: T[], array2: T[]) : T[] {
    // Merges all elements of array2 into array1 if they are not already in array1
    for (var index in array2) {
        array1[index] = array2[index];
    }
    return array1;
}


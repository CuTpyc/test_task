/*Task 2 Complited*/

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

function* chunkArray(array, size) {
    let startPosition = 0;
    while (startPosition < array.length) yield array.slice(startPosition, startPosition += size);
    return
}

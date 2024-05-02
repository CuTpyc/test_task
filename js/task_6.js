/*Task 6 Complited*/

let arr = [
    [5, 3, 6],
    [7, 11, 2],
    [15, 9, 4]
]

findAndMultiply(arr)

function findAndMultiply(element = []) {

    const min = Math.min(...element.flat())
    let newArr = element.map((e) => {
        return e.map((num) => {
            return num % 2 !== 0
                ? num *= min
                : num
        })
    })
    return newArr
}
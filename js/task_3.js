/*Task 3 Complited*/

const f1 = (cb) => { cb(1) }
const f2 = (a, cb) => { cb(a) }
const f3 = (a, b, cb) => { setTimeout(() => cb([a, b]), 1000) }

async function bulkRun(list) {


    return Promise.all(list.map(listItem => {
        const [func, args] = listItem
        return new Promise((resolve, reject) => {
            func(...args, resolve)
        })
    }))
}

bulkRun(
    [
        [f1, []],
        [f2, [2]],
        [f3, [3, 4]]
    ]
).then(console.log)
// Output: [1, 2, [3, 4]]
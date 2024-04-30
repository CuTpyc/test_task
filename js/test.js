/*Task 1 Complited*/

const div = document.createElement('div')
const p = document.createElement('p')
const span = document.createElement('span')
p.appendChild(span)
div.appendChild(p)


console.log("'div'", nodeChildCount(div))
console.log("'div, 1'", nodeChildCount(div, 1))
console.log("'div, 2'", nodeChildCount(div, 2))

console.log(div.childElementCount)

function nodeChildCount(elem, deep) {

    let childrensAmount = 0
    for (const child of elem.childNodes) {
        if (deep > 1) {
            childrensAmount += nodeChildCount(child, deep - 1)

        } else if (deep === undefined) {
            childrensAmount += nodeChildCount(child)
        }

    }
    return childrensAmount + elem.childElementCount

}

/*Task 2 Complited*/

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
// iterator.next()  { value: [1,2,3], done: false }
// iterator.next()  { value: [4,5,6], done: false }
// iterator.next()  { value: [7,8], done: false }
// iterator.next()  { value: undefined, done: true }
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

function* chunkArray(array, size) {
    let startPosition = 0;
    while (startPosition < array.length) yield array.slice(startPosition, startPosition += size);
    return
}

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

/*Task 4 Complited*/

let testData3 = [{ "name": "Vasya", "email": "vasya@example.com", "age": 20, "skills": { "php": 0, "js": -1, "madness": 10, "rage": 10 } }, { "name": "Dima", "email": "dima@example.com", "age": 34, "skills": { "php": 5, "js": 7, "madness": 3, "rage": 2 } }, { "name": "Colya", "email": "colya@example.com", "age": 46, "skills": { "php": 8, "js": -2, "madness": 1, "rage": 4 } }, { "name": "Misha", "email": "misha@example.com", "age": 16, "skills": { "php": 6, "js": 6, "madness": 5, "rage": 2 } }, { "name": "Ashan", "email": "ashan@example.com", "age": 99, "skills": { "php": 0, "js": 10, "madness": 10, "rage": 1 } }, { "name": "Rafshan", "email": "rafshan@example.com", "age": 11, "skills": { "php": 0, "js": 0, "madness": 0, "rage": 10 } }]

const mapRules = [
    ["name", "n", (value) => value.toLowerCase()],
    ["age", "a"]
]

function mapper(rules) {
    return (element) => {
        const result = {};
        for (let [key, newKey, transform] of rules) {
            if (element.hasOwnProperty(key)) {
                result[newKey] = transform ? transform(element[key]) : element[key];
            }
        }
        return result;
    };
}

testData3.map(mapper(mapRules)) // [{"n":"vasya","a":20},{"n":"dima","a":34},{"n":"colya","a":46},{"n":"misha","a":16},{"n":"ashan","a":99},{"n":"rafshan","a":11}]
console.log("Task 4", testData3.map(mapper(mapRules)))

/*Task 5 Complited*/

function NotificationException() { }
function ErrorException() { }
function primitiveMultiply(a, b) {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    } else if (rand > 0.85) {
        throw new ErrorException()
    } else {
        throw new NotificationException()
    }
}

function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof ErrorException) {
                throw e;
            }
        }
    }
}
console.log("Task 5", reliableMultiply(8, 8));

/*Task 6 Complited*/

let arr = [
    [5, 3, 6],
    [7, 11, 2],
    [15, 9, 4]
]

console.log("myFunction", findAndMultiply(arr))

function findAndMultiply(element) {
    let a
    element.filter((e) => {

        for (let num of e) {
            if (num >= a) {
                continue
            } else {
                a = num
            }
        }


    })
    console.log("Task6.1", a)
    let newArr = element.map((e) => {
        return e.map((num) => {
            if (num % 2 !== 0) {
                console.log("Task6.222", num, " ", a)
                return num *= a

            } else {
                return num
            }
        })
    })

    return newArr
    console.log("Task6", newArr)
}



/*Task 7 Complited*/

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
        reader.onerror = reject;
    });
};

getBase64FromUrl('https://lh3.googleusercontent.com/i7cTyGnCwLIJhT1t2YpLW-zHt8ZKalgQiqfrYnZQl975-ygD_0mOXaYZMzekfKW_ydHRutDbNzeqpWoLkFR4Yx2Z2bgNj2XskKJrfw8').then(console.log).catch(console.error)



// Output data: image / png; base64, iVBORw0KGgoAAAANSUhEUgAAAgAAAACeCAIAAADL6SW3AAAAA3NCSVQICAjb4U / gAAAMGElEQVR4nO3dfZBdZX3A8d....

/*Task 8 Complited*/

let x = "Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Double Double Double"

String.prototype.removeDuplicate = function () {
    const set = new Set(this.split(','))
    return [...set].join(',')
}

x.removeDuplicate()



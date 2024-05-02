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
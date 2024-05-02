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
    try {
        return primitiveMultiply(a, b); // case rand < 0.5
    } catch (err) {
        if (err instanceof ErrorException) { // rand > 0.85
            console.error(err)
        }
        if (err instanceof NotificationException) { // rand >= 0.5 && rand <= 0.85
            console.warn(err)
            return reliableMultiply(a, b);
        }
    }
}
console.log("Task 5", reliableMultiply(8, 8));
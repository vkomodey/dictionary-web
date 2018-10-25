export function shuffle(array) {
    let copy = Array.from(array);
    let shuffled = [];

    if (!array) {
        return array;
    }

    array.forEach(() => {
        let elem = spliceRandomElement(copy);

        shuffled.push(elem);
    });

    return shuffled;
}

function spliceRandomElement(array) {
    let randomIndex = Math.round(Math.random() * (array.length - 1));

    return array.splice(randomIndex, 1)[0];
}

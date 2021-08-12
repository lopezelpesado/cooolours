// constants

const cooolours = Array.from(document.getElementsByClassName("cooolours"));

// functions

// random number between 0 and 255

function randomNumber0To360 () {
    return Math.floor(Math.random() * 361)
}

// random number between 0 and 100

function randomNumber0To100 () {
    return Math.floor(Math.random() * 101)
}

// random colour generator

function randomHSLCooolour () {
    return `${randomNumber0To360()}, ${randomNumber0To100()}%, ${randomNumber0To100()}%`
}

// set cooolours with random colours

function setCooolours () {
    cooolours.forEach(e => {
        e.style.backgroundColor = `hsl(${randomHSLCooolour()})`
    })
}

setCooolours ()

console.log(randomHSLCooolour())
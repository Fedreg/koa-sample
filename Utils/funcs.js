//Util/funcs.js

export async function multYourName(name, times) {
    let newName = (name + " ")
    for (let i = 0; i < times - 1; i++)
        newName += (name + " ")
    return newName
}

export async function doSomeMath(a, b, c) {
    console.log(a,b,c)
    switch(b) {
        case "+":
            return parseInt(a) + parseInt(c)
            break
        case "-":
            return parseInt(a) - parseInt(c)
            break
        case "*":
            return parseInt(a) * parseInt(c)
            break
        case "div":
            return parseInt(a) / parseInt(c)
            break
        default:
            return parseInt(a) + parseInt(c)
    }
    return
}


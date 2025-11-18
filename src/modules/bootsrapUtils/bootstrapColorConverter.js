export function bootstrapColorConverter(color){
    // console.log(getComputedStyle(document.documentElement))
    const colorReg = /[$](\w+)/.exec(color)
    console.log(document.documentElement.style.getPropertyValue(colorReg))
    const colorUsable = `--bs-${colorReg[1]}`
    console.log(colorUsable)
    return getComputedStyle(document.documentElement).getPropertyValue(colorUsable.trim())
}
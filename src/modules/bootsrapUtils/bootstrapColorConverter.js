export function bootstrapColorConverter(color){
    console.log(getComputedStyle(document.documentElement))
    return getComputedStyle(document.documentElement).getPropertyValue(color.trim())
}
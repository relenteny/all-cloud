export function formatFloat(value: number, precision: number = 3) {
    return parseFloat(value.toString()).toFixed(3)
}
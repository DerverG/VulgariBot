// Función para convertir objetos en dot notation
const flattenObject = (obj, prefix = '', res = {}) => {
    for (const key of Object.keys(obj)) {
        const value = obj[key]
        const newKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            flattenObject(value, newKey, res)
        } else {
            res[newKey] = value
        }
    }
    return res
}

module.exports = flattenObject
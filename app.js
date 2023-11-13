//Vasiloiu Ioana - 1097E

/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */

const InvalidType = new Error('InvalidType');

function render(input, values) {
    if (typeof input !== 'object' || typeof values !== 'object')
        throw InvalidType;
    return htmlStringGenerator(input, values);
}
function putValues(string, values) {
    return string.replace(/\${(.*?)}/g, (match, key) => values[key] || match);
}

function htmlStringGenerator(input, values) {
    let HTMLString = '';
    for (const key in input) {
        const value = input[key];
        if (typeof value === 'string') {
            const modifiedValue = putValues(value, values);
            HTMLString += `<${key}>${modifiedValue}</${key}>`;
        }
        else if (typeof value === 'object') {
            HTMLString += `<${key}>${htmlStringGenerator(value, values)}</${key}>`;
        }
    }
    return HTMLString;
}

module.exports = {
    render
}

/**
 * Converts a hexadecimal string to a human-readable date string.
 * @param {string} hexString - A hexadecimal string representing a date.
 * @returns {string} A human-readable date string in the format 'YYYY-MM-DD HH:MM:SS'.
 */
function hexToDec(hexString) {
    const result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        const num = parseInt(hexString.substring(i, i+2), 16);
        result.push(num);
    }
    const year = `20${result[0].toString()}`;
    const month = result[1].toString().padStart(2, '0');
    const day = result[2].toString().padStart(2, '0');
    const hour = result[3].toString().padStart(2, '0');
    const minute = result[4].toString().padStart(2, '0');
    const second = result[5].toString().padStart(2, '0');
    const resultString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return resultString;
}

function hexToString(hexString) {
    const result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        const hex = hexString.substring(i, i+2);
        const dec = parseInt(hex, 16);
        if (dec === 0x2C) {
            result.push(',');
        } else {
            result.push(hex);
        }
    }
    return result.join('').split(',');
}
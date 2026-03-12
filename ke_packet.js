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

function hexToFloat64(str64) {
  // Pad the str64ing with zeroes to 16 characters.
  str64 = (str64 + "0000000000000000").slice(0,16);
  // Split into bits: sign (1), exponent (11), significand (52).
  var sign_and_exponent_bits = parseInt(str64.slice(0,3), 16);
  var sign = sign_and_exponent_bits >= 0x800 ? -1 : +1;
  var exponent_bits = sign_and_exponent_bits & ((1<<11) - 1);
  var significand_bits = parseInt(str64.slice(3,16), 16);
  // Classify the floating-point value.
  if (exponent_bits == 0x7FF)  
    return significand_bits == 0 ? sign * Number.POSITIVE_INFINITY : Number.NaN;
  else if (exponent_bits == 0) 
    return sign * Math.pow(2, 1-1023-52) * significand_bits;
  else  
    return sign * Math.pow(2, exponent_bits-1023-52) * (Math.pow(2, 52) + significand_bits);
}  

const ke_data = hexToString('180C050F2F1F2C03509160668118632C642CC154992C312C64');

console.log(`수신시각 : ${hexToDec(ke_data[0])}`); 
console.log(`KE 배터리 잔량 : ${parseInt(ke_data[2], 16)}`); 
console.log(`SH 안전고리 체결상태 : ${hexToText(ke_data[4])}`);  
console.log(`SH 안전고리 : ${parseInt(ke_data[5], 16)}`); 
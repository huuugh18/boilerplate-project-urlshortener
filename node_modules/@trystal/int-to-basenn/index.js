"use strict";
exports.BASE62CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
exports.BASE64CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
exports.BASE36CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.BASE26CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.BASE27CHARS = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var CASING;
(function (CASING) {
    CASING[CASING["Uppercase"] = 0] = "Uppercase";
    CASING[CASING["Lowercase"] = 1] = "Lowercase";
    CASING[CASING["Mixed"] = 2] = "Mixed";
})(CASING = exports.CASING || (exports.CASING = {}));
const UPPER = CASING.Uppercase;
const LOWER = CASING.Lowercase;
const MIXED = CASING.Mixed;
function validateIntval(intval) {
    if (typeof intval !== 'number')
        throw 'Intval must be a number';
    if (intval < 0)
        throw 'Intval must be positive';
}
function validateCharset(charset) {
    if (typeof charset !== 'string')
        throw `CharSet must be a string, got ${charset}`;
    if (charset.length < 2)
        throw 'CharSet must have at least two characters';
    if (new Set(charset).size < charset.length)
        throw 'CharSet cannot have duplicate characters';
}
function identifyCasing(charset) {
    if (charset === charset.toLowerCase())
        return LOWER;
    if (charset === charset.toUpperCase())
        return UPPER;
    return MIXED;
}
function encode(intval, charset = exports.BASE62CHARS, validate = true) {
    if (validate) {
        validateCharset(charset);
        validateIntval(intval);
    }
    if (!intval)
        return charset[0];
    const base = charset.length;
    let arr = [];
    while (intval > 0) {
        arr.push(charset[intval % base]);
        intval = Math.floor(intval / base);
    }
    return arr.reverse().join('');
}
exports.encode = encode;
function lookup(char, charset, casing) {
    switch (casing) {
        case LOWER: return charset.indexOf(char.toLowerCase());
        case UPPER: return charset.indexOf(char.toUpperCase());
    }
    return charset.indexOf(char);
}
function decode(strval, charset = exports.BASE62CHARS, validate = false, casing = null) {
    if (validate)
        validateCharset(charset);
    if (!strval)
        return 0;
    if (casing === null)
        casing = identifyCasing(charset);
    let base = charset.length;
    return strval.split('').reduce((intval, char) => {
        const charval = lookup(char, charset, casing);
        if (charval < 0)
            throw `Invalid character '${char}' in '${strval}'`;
        return (intval * base) + charval;
    }, 0);
}
exports.decode = decode;
class Converter {
    constructor(charset = exports.BASE62CHARS, casing = null) {
        validateCharset(charset);
        if (casing === null)
            casing = identifyCasing(charset);
        this.encode = (intval) => encode(intval, charset, false);
        this.decode = (str) => decode(str, charset, false, casing);
        this.charset = charset;
        this.casing = casing;
    }
}
exports.Converter = Converter;
exports.Base62 = new Converter(exports.BASE62CHARS, MIXED);
exports.base62Encode = (intval) => exports.Base62.encode(intval);
exports.base62Decode = (strval) => exports.Base62.decode(strval);
exports.Base64 = new Converter(exports.BASE64CHARS, MIXED);
exports.base64Encode = (intval) => exports.Base64.encode(intval);
exports.base64Decode = (strval) => exports.Base64.decode(strval);
exports.Base26 = new Converter(exports.BASE26CHARS, UPPER);
exports.base26Encode = (intval) => exports.Base26.encode(intval);
exports.base26Decode = (strval) => exports.Base26.decode(strval);
exports.Base36 = new Converter(exports.BASE36CHARS, UPPER);
exports.base36Encode = (intval) => exports.Base36.encode(intval);
exports.base36Decode = (strval) => exports.Base36.decode(strval);

"use strict";
const int_to_basenn_1 = require("@trystal/int-to-basenn");
exports.base62encode = int_to_basenn_1.base62Encode;
function genId(len, charset) {
    let chars = [];
    for (let i = 0; i < len; i++)
        chars.push(charset[Math.floor(Math.random() * charset.length)]);
    return chars.join('');
}
function randomId(len, validator, charset = int_to_basenn_1.BASE62CHARS) {
    const maxVal = charset.length;
    const maxAttempts = 100;
    let newlen = len;
    while (true) {
        for (let i = 0; i < 100; i++) {
            let id = genId(newlen, charset);
            if (!validator || validator(id))
                return id;
        }
        newlen++;
        if (newlen > 10 && newlen > len + 2)
            throw "could not find a random Id given that satisfies the validator";
    }
}
exports.randomId = randomId;

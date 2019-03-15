import * as BaseNN from './index'

import {encode,decode} from './index'
import {base26Encode, base26Decode} from './index'
import {base36Encode, base36Decode} from './index'
import {base62Encode, base62Decode} from './index'
import {base64Encode, base64Decode} from './index'

import {BASE27CHARS, Converter} from './index'


console.log(base26Encode(1000)) // BMM
console.log(base26Decode('A')) // 0
console.log(base26Decode('B')) // 1
console.log(base26Decode('AB')) // 1
console.log(base26Decode('AAB')) // 1
console.log(base26Decode('BA')) // 26
console.log(base26Decode('BB'))  // 27
console.log(base26Decode('BAA')) // 676

// console.log(base36Encode(1000))  // RS
// console.log(base36Decode('0')) // 0
// console.log(base36Decode('01')) // 1
// console.log(base36Decode('001')) // 1
// console.log(base36Decode('1'))  // 1
// console.log(base36Decode('A'))  // 10
// console.log(base36Decode('1A')) // 46
// console.log(base36Decode('1B')) // 47
// console.log(base36Decode('100')) // 1296

// console.log(BaseNN.base26Encode(100))

// console.log(base62Encode(100))
// console.log(base62Decode('AaZz99'))
// console.log(BaseNN.base26Encode(100))


// const base27 = new Converter(BASE27CHARS)
// base27.encode(100)
// base27.decode('_ABZZ')


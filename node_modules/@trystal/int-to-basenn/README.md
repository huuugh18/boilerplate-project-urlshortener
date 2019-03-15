Simple function to convert an integer into baseNN representations.  

By default a base62 character set is used:

```
import {encode, decode} from '@trystal/int-to-basenn'

console.log(encode(1000)) // g8
console.log(decode('g8')) // 1000
```

It supports arbitrary character sets:

```
console.log(encode(   1000, 'WXYZ')) // ZZYYW
console.log(decode('ZZYYW', 'WXYZ')) // 1000
```

Supports case insensitive decoding by default.

```
console.log(encode(   5000, 'ABCDEF')) // DFAFC
console.log(decode('dfafc', 'ABCDEF')) // 5000
```

It supports mixed case character sets.
```
console.log(encode(   10000, 'abcABC')) // bbBbBB
console.log(decode('bbBbBB', 'abcABC')) // 10000
console.log(decode('BBBBBB', 'abcABC')) // 37324
console.log(decode('bbbbbb', 'abcABC')) // 9331
```

It provides base26 convenience functions.

```
import {base26Encode, base26Decode, Base26, BASE26CHARS} from '@trystal/int-to-basenn'

console.log(BASE26CHARS)                
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(encode(1000, BASE26CHARS))  // BMM
console.log(base26Encode(1000))         // BMM
console.log(Base26.encode(1000))        // BMM

console.log(decode('BMM', BASE26CHARS)) // 1000
console.log(base26Decode('BMM'))        // 1000
console.log(Base26.decode('BMM'))       // 1000
```  

It provides base36 convenience functions.

```
import {base36Encode, base36Decode, Base36, BASE36CHARS} from '@trystal/int-to-basenn'

console.log(BASE36CHARS)                
// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(encode(1000, BASE36CHARS))  // RS
console.log(base36Encode(1000))         // RS
console.log(Base36.encode(1000))        // RS

console.log(decode('RS', BASE36CHARS))  // 1000
console.log(base36Decode('RS'))         // 1000
console.log(Base36.decode('RS'))        // 1000
```  

It provides base62 convenience functions.

```
import {base62Encode, base62Decode, Base62, BASE62CHARS} from '@trystal/int-to-basenn'

console.log(BASE62CHARS) 
// 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(encode(1000, BASE62CHARS))  // g8
console.log(base62Encode(1000))         // g8
console.log(Base62.encode(1000))        // g8

console.log(decode('g8', BASE62CHARS))  // 1000
console.log(base62Decode('g8'))         // 1000
console.log(Base62.decode('g8'))        // 1000
```  

It provides base64 convenience functions.

```
import {base64Encode, base64Decode, Base64, BASE64CHARS} from '@trystal/int-to-basenn'

console.log(BASE64CHARS) 
// ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/

console.log(encode(1000, BASE64CHARS))  // Po
console.log(base64Encode(1000))         // Po
console.log(Base64.encode(1000))        // Po

console.log(decode('Po', BASE64CHARS))  // 1000
console.log(base64Decode('Po'))         // 1000
console.log(Base64.decode('Po'))        // 1000
```  

It provides an option to create a custom converter
```
import {Converter} from '@trystal/int-to-basenn'

const MyConverter = new Converter('/*=q@Z')

console.log(MyConverter.encode(   5443)) // @****
console.log(MyConverter.decode('@****')) // 5443
```


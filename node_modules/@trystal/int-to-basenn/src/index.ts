export const BASE62CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const BASE64CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
export const BASE36CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const BASE26CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const BASE27CHARS = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export enum CASING { Uppercase=1, Lowercase, Mixed }

const UPPER = CASING.Uppercase
const LOWER = CASING.Lowercase
const MIXED = CASING.Mixed

function validateIntval(intval:number) {
  if(typeof intval !== 'number') throw 'Intval must be a number'
  if(intval < 0) throw 'Intval must be positive'
}

function validateCharset(charset:string) {
  if(typeof charset !== 'string') throw `CharSet must be a string, got ${charset}`
  if(charset.length < 2) throw 'CharSet must have at least two characters'
  if(new Set(charset).size < charset.length) throw 'CharSet cannot have duplicate characters'
}

function identifyCasing(charset:string) {
  if(charset === charset.toLowerCase()) return LOWER
  if(charset === charset.toUpperCase()) return UPPER
  return MIXED
}

export function encode(intval:number, charset=BASE62CHARS, validate=true):string {
  if(validate) {
    validateCharset(charset)
    validateIntval(intval)
  }
  if(!intval) return charset[0]
  const base = charset.length
  let arr = []
  while (intval > 0) {
    arr.push(charset[intval % base])
    intval = Math.floor(intval / base)
  }
  return arr.reverse().join('')
}

function lookup(char:string, charset:string, casing:CASING) {
  switch(casing) {
    case LOWER: return charset.indexOf(char.toLowerCase())
    case UPPER: return charset.indexOf(char.toUpperCase())
  }
  return charset.indexOf(char)
}

export function decode(strval:string, charset=BASE62CHARS, validate=false, casing?:CASING) {
  if(validate) validateCharset(charset)
  if(!strval) return 0
  if(!casing) casing = identifyCasing(charset)
  let base = charset.length
  return strval.split('').reduce((intval,char) => { 
    const charval = lookup(char, charset, casing as CASING)
    if(charval < 0) throw `Invalid character '${char}' in '${strval}'`
    return (intval * base) + charval
  }, 0) 
}

export class Converter {
  public charset:string 
  public casing:CASING 
  constructor(charset=BASE62CHARS, casing?:CASING) {
      validateCharset(charset)
      this.charset = charset
      this.casing = casing || identifyCasing(charset)
  }
  encode = (intval:number) => encode(intval, this.charset, false)
  decode = (str:string)    => decode(str,    this.charset, false, this.casing)
}

export const Base62 = new Converter(BASE62CHARS, MIXED)
export const base62Encode = (intval:number) => Base62.encode(intval)
export const base62Decode = (strval:string) => Base62.decode(strval)

export const Base64 = new Converter(BASE64CHARS, MIXED)
export const base64Encode = (intval:number) => Base64.encode(intval)
export const base64Decode = (strval:string) => Base64.decode(strval)

export const Base26 = new Converter(BASE26CHARS, UPPER)
export const base26Encode = (intval:number) => Base26.encode(intval)
export const base26Decode = (strval:string) => Base26.decode(strval)

export const Base36 = new Converter(BASE36CHARS, UPPER)
export const base36Encode = (intval:number) => Base36.encode(intval)
export const base36Decode = (strval:string) => Base36.decode(strval)

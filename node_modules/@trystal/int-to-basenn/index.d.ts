export as namespace IntToBaseNN;
export = IntToBaseNN;

declare namespace IntToBaseNN {
  const BASE62CHARS : string
  const BASE64CHARS : string
  const BASE36CHARS : string
  const BASE26CHARS : string
  const BASE27CHARS : string
  enum CASING { Uppercase, Lowercase, Mixed }

  interface IEncodeFunc { (intval:number) : string }
  interface IDecodeFunc { (strval:string) : number }

  class Converter {
    charset:string
    casing:CASING
    constructor(charset?:string, casing?:CASING)
    encode : IEncodeFunc
    decode : IDecodeFunc
  }

  function encode(intval:number, charset?:string, validate?:boolean):string
  function decode(strval:string, charset?:string, validate?:boolean, casing?:CASING):number

  const Base26 : Converter
  const base26Encode : IEncodeFunc
  const base26Decode : IDecodeFunc

  const Base36 : Converter
  const base36Encode : IEncodeFunc
  const base36Decode : IDecodeFunc

  const Base62 : Converter
  const base62Encode : IEncodeFunc
  const base62Decode : IDecodeFunc

  const Base64 : Converter
  const base64Encode : IEncodeFunc
  const base64Decode : IDecodeFunc
}

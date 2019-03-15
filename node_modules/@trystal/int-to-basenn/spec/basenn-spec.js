/*eslint-env node, jasmine, es6*/
const BASENN=require('../index.js')
const {encode,decode}=BASENN

describe("Encoder tests", () => {
  it("Encodes/decodes using base62 by default", () => {
    expect(encode(1000)).toBe("g8")
    expect(decode('g8')).toBe(1000)
  })
  it("Supports arbitrary character sets.", () => {
    expect(encode(1000, 'WXYZ')).toEqual('ZZYYW')  
    expect(decode('ZZYYW', 'WXYZ')).toEqual(1000)  
  })
  it("Supports case insensitive decoding by default.", () => {
    expect(encode(5000, 'ABCDEF')).toEqual('DFAFC')  
    expect(decode('dfafc', 'ABCDEF')).toEqual(5000)  
  })
  it("Supports mixed case character sets.", () => {
    expect(encode(10000, 'abcABC')).toEqual('bbBbBB')  
    expect(decode('bbBbBB', 'abcABC')).toEqual(10000)  
    expect(decode('BBBBBB', 'abcABC')).toEqual(37324)  
    expect(decode('bbbbbb', 'abcABC')).toEqual(9331)  
  })
})

describe("Provides base26 convenience functions", () => {
  const {base26Encode, base26Decode, Base26, BASE26CHARS} = BASENN
  it("Encodes an integer into base26 format", () => {
    expect(BASE26CHARS).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(encode(1000, BASE26CHARS)).toEqual('BMM')
    expect(base26Encode(1000)).toEqual('BMM')
    expect(Base26.encode(1000)).toEqual('BMM')
  });
  it("Decodes base26 numbers into integers", () => {
    expect(decode('BMM', BASE26CHARS)).toEqual(1000)
    expect(base26Decode('BMM')).toEqual(1000)
    expect(Base26.decode('BMM')).toEqual(1000)
  });
});

describe("Provides base36 convenience functions", () => {
  const {base36Encode, base36Decode, Base36, BASE36CHARS} = BASENN
  it("Encodes an integer into base36 format", () => {
    expect(BASE36CHARS).toBe('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(encode(1000, BASE36CHARS)).toEqual('RS')
    expect(base36Encode(1000)).toEqual('RS')
    expect(Base36.encode(1000)).toEqual('RS')
  });
  it("Decodes base36 numbers into integers", () => {
    expect(decode('RS', BASE36CHARS)).toEqual(1000)
    expect(base36Decode('RS')).toEqual(1000)
    expect(Base36.decode('RS')).toEqual(1000)
  });
});

describe("Provides base62 convenience functions", () => {
  const {base62Encode, base62Decode, Base62, BASE62CHARS} = BASENN
  it("Encodes an integer into base62 format", () => {
    expect(BASE62CHARS).toBe('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(encode(1000, BASE62CHARS)).toEqual('g8')
    expect(base62Encode(1000)).toEqual('g8')
    expect(Base62.encode(1000)).toEqual('g8')
  });
  it("Decodes base62 numbers into integers", () => {
    expect(decode('g8', BASE62CHARS)).toEqual(1000)
    expect(base62Decode('g8')).toEqual(1000)
    expect(Base62.decode('g8')).toEqual(1000)
  });
});


describe("Provides base64 convenience functions", () => {
  const {base64Encode, base64Decode, Base64, BASE64CHARS} = BASENN
  it("Encodes an integer into base64 format", () => {
    expect(BASE64CHARS).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/')
    expect(encode(1000, BASE64CHARS)).toEqual('Po')
    expect(base64Encode(1000)).toEqual('Po')
    expect(Base64.encode(1000)).toEqual('Po')
  });
  it("Decodes base64 numbers into integers", () => {
    expect(decode('Po', BASE64CHARS)).toEqual(1000)
    expect(base64Decode('Po')).toEqual(1000)
    expect(Base64.decode('Po')).toEqual(1000)
  });
});

describe("Allows building a de/encoder", () => {
  const {Converter} = BASENN
  const MyConverter = new Converter('/*=q@Z')
  it("Decodes strings using a custom converter", () => {
    expect(MyConverter.decode('@****')).toEqual(5443)
  });
  it("Encodes an integer using a custom converter", () => {
    expect(MyConverter.encode(5443)).toEqual('@****')
  });
  it("Remembers the character set being used", () => {
    expect(MyConverter.ch)
  })
});

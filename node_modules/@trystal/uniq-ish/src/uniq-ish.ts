import {BASE62CHARS, base62Encode} from '@trystal/int-to-basenn'

export const base62encode = base62Encode  // backward compatibility

function genId(len:number, charset:string) : string {
  let chars = [] as string[]
  for(let i = 0; i < len; i++) chars.push(charset[Math.floor(Math.random()*charset.length)])
  return chars.join('')
}

export function randomId(len:number, validator?:((id:string)=>boolean)|null, charset = BASE62CHARS) {
  const maxVal = charset.length
  const maxAttempts = 100
  let newlen = len
  while(true) {
    for(let i = 0; i < 100; i++) {
      let id = genId(newlen, charset)
      if(!validator || validator(id)) return id
    }
    newlen++
    if(newlen > 10 && newlen > len + 2) throw "could not find a random Id given that satisfies the validator"  
  }
}



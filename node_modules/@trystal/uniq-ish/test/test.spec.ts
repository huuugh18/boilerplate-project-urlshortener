import {randomId} from '../src/uniq-ish'

describe('uniq-ish tests', () => {
  it('Creates a unique id with length 3', () => {
    const id = randomId(3)
    console.log(id)
    expect(id.length).toEqual(3)
  })

  it('Creates a unique id with length 4', () => {
    const id = randomId(4)
    console.log(id)
    expect(id.length).toEqual(4)
  })

  it('Creates a unique id with length 10', () => {
    const id = randomId(10)
    console.log(id)
    expect(id.length).toEqual(10)
  })

  it('Bumps the length after repated validation failures', () => {
    const requestedLength = 2
    const validator = (s:string) => s.length > 2
    const id = randomId(2, validator)
    console.log(id)
    expect(id.length).toBeGreaterThan(2)
  })

  it('Uses a specified character set', () => {
    const charset = 'Q0x'
    const id = randomId(5, null, charset)
    console.log(id)
    expect(id.length).toBeGreaterThan(4)
    let invalidPos = -1
    id.split('').forEach((c,i) => { if(charset.indexOf(c)< 0) invalidPos = i})
    expect(invalidPos).toBe(-1)
  })

  it('Creates a unique id with length 50 using just \'abcdef-\' where values have exactly one -', () => {
    const validator = (s:string) => (s.match(/-/g)||[]).length == 1
    const id = randomId(10, validator, 'abc-def')
    console.log(id)
    expect(id.length).toEqual(10)
  })
})

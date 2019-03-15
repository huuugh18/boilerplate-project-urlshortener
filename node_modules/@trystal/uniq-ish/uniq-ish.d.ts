declare module "@trystal/uniq-ish" {
  export function base62encode(i: number): string; // backwards compatible only
  export function randomId(len: number, validator?: ((id: string) => boolean)|null, charset?:string): string;
}

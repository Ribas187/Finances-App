import { createHash } from "crypto";

export function hash(value: string, secret: string = '') {
  return createHash('sha256')
    .update(`${value}${secret}`)
    .digest('hex');
}
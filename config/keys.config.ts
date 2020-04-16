import { readFileSync } from 'fs'

export const RSA_PRIVATE_KEY = readFileSync('./.keys/private.key')
export const RSA_PUBLIC_KEY = readFileSync('./.keys/public.key')
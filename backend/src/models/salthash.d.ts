declare module 'salthash' {
    export function hashPassword(password: string): { salt: string, hash: string };
    export function verifyPassword(password: string, salt: string, hash: string): boolean;
  }
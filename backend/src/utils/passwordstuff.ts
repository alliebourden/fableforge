import crypto = require('crypto');
const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
    return {
      salt,
      hash: hash.toString('hex')
    };
  }
  
  export function verifyPassword(password: string, salt: string, hash: string) {
    const verifyHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');
    return hash === verifyHash;
  }
const crypto = require('crypto');

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64; // for SHA-512

function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
  return {
    salt,
    hash: hash.toString('hex')
  };
}

function verifyPassword(password, salt, hash) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Example usage
const password = 'myPassword123';
const hashedPassword = hashPassword(password);
console.log('Salt:', hashedPassword.salt);
console.log('Hash:', hashedPassword.hash);

const isPasswordCorrect = verifyPassword("test", hashedPassword.salt, hashedPassword.hash);
console.log('Is password correct?', isPasswordCorrect);
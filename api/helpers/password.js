import bcrypt from 'bcrypt';
import { password as passwordConfig } from '../../littleterrarium.config.js';

const hash = (password) => {
  return bcrypt.hash(password, 10);
}

const compare = (password, hash) => {
  return bcrypt.compare(password, hash);
}

const check = (password) => {
  
  const arrPasswd = [...password];
  let minLength = (password.length >= passwordConfig.length);
  let hasUppercase = !passwordConfig.requireUppercase;
  let hasNumber = !passwordConfig.requireNumber;
  let hasNonAlphanumeric = !passwordConfig.requireNonAlphanumeric;

  while ((arrPasswd.length > 0) || (!hasUppercase && !hasNumber && !hasNonAlphanumeric)) {
    const char = arrPasswd.shift();

    if (!hasUppercase && (char === char.toUpperCase()) && (char !== char.toLowerCase())) hasUppercase = true;
    if (!hasNumber && Number.parseInt(char)) hasNumber = true;
    // TODO: check for non alphanum
    hasNonAlphanumeric = true;
  }

  let result;

  if (minLength && hasUppercase && hasNumber && hasNonAlphanumeric) {
    result = { valid: true, msg: 'PASSWD_VALID' }
  }
  else {
    result = { valid: false, error: 'PASSWD_INVALID', comp: { minLength, hasUppercase, hasNumber, hasNonAlphanumeric } }
  }

  return result;
}

const requirements = () => {
  return passwordConfig;
}

export default {
  hash,
  compare,
  check,
  requirements
};
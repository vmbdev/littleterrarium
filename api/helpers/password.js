import bcrypt from 'bcrypt';
import { password as passwordConfig } from '../../littleterrarium.config.js';

const hash = (password) => {
  return bcrypt.hash(password, 10);
}

const compare = (password, hash) => {
  return bcrypt.compare(password, hash);
}

const check = (password) => {
  if (password.length < passwordConfig.length) return { valid: false, error: 'PASSWD_TOO_SHORT' }

  const arrPasswd = [...password];
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

  if (hasUppercase && hasNumber && hasNonAlphanumeric) return { valid: true, msg: 'PASSWD_VALID' }
  else return { valid: false, error: 'PASSWD_INVALID', comp: { hasUppercase, hasNumber, hasNonAlphanumeric }}
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
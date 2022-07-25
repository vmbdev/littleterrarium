import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import Password from '../helpers/password.js';

const prisma = new PrismaClient();

// body.user, body.password
const signin = async (req, res) => {
  
};


const logout = (req, res) => {
  
};

// username, firstname, lastname, (plain) password
const register = async (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  const optionalFields = ['firstname', 'lastname'];
  const data = {};

  for (const field of requiredFields) {
    // if a mandatory field isn't received, return with error
    if (!req.body[field]) return res.send({ error: 'ERR_MISSING_FIELD', field });

    if ((field === 'password') && (checkPassword(data[field]))) {
      data[field] = await bcrypt.hash(req.body.password, 10);
    }
    else data[field] = req.body[field];
  }
  
  for (const field of optionalFields) {
    if (req.body[field]) data[field] = req.body[field];
  }

  prisma.user.create({ data })
  .then(() => { res.send({ msg: 'USER_CREATED' }) })
  .catch((error) => { res.send({ error: error.code, meta: error.meta }) });
}

const find = (req, res) => {
  const id = Number.parseInt(req.params.id);
  console.log(req.params.id);
  prisma.user.findUnique({ where: { id }})
  .then((user) => {
    if (user.public) {
      delete user.password;
      res.send(user);
    }
    else res.send({ error: 'USER_PRIVATE' });
  });
}

const checkPassword = (req, res) => {
  res.send(Password.checkPassword(req.params.password));
}

const passwordRequirements = (req, res) => {
  res.send(Password.requirements());
}

export default { signin, logout, register, find, checkPassword, passwordRequirements };
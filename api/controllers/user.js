import prisma from '../prismainstance.js';
import Password from '../helpers/password.js';

const isEmail = (email) => {
  return (email.match(/^\S+@\S+\.\S+$/i) !== null);
}

// body.user, body.password
const signin = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const signinToken = isEmail(username) ? 'email' : 'username';
    const user = await prisma.user.findUnique({
      where: { [signinToken]: username },
      select: { password: true, id: true, role: true }
    });

    if (user) {
      const passwdCorrect = await Password.compare(password, user.password);
      if (passwdCorrect) {
        req.session.signedIn = true;
        req.session.role = user.role;
        req.session.userId = user.id;
        res.send({ msg: 'USER_SIGNED' });
      }
      else res.status(400).send({ error: 'USER_PASSWD_INVALID' });
    }
    else res.status(400).send({ error: 'USER_NOT_FOUND' })
  }
};

const logout = (req, res) => {
  req.session.destroy(() => { res.send({ msg: 'USER_LOGGED_OUT' })});
};

const register = async (req, res) => {
  const requiredFields = ['username', 'password', 'email'];
  const optionalFields = ['firstname', 'lastname'];
  const data = {};

  for (const field of requiredFields) {
    // if a mandatory field isn't received, return with error
    if (!req.body[field]) return res.status(400).send({ error: 'MISSING_FIELD', field });

    if ((field === 'password') && (Password.check(req.body.password).valid)) {
      data[field] = await Password.hash(req.body.password);
    }
    else data[field] = req.body[field];
  }
  
  for (const field of optionalFields) {
    if (req.body[field]) data[field] = req.body[field];
  }

  prisma.user.create({ data })
  .then(() => { res.send({ msg: 'USER_CREATED' }) })
  .catch((error) => { res.status(400).send({ error: 'USER_FIELD', field: error.meta.target }) });
}

const find = (req, res) => {
  const id = Number.parseInt(req.params.id);
  prisma.user.findUnique({ where: { id }})
  .then((user) => {
    if (user) {
      if (user.public || (req.session.userId === id) || (req.session.role === 'ADMIN')) {
        delete user.password;
        res.send(user);
      }
      else res.send({ error: 'USER_PRIVATE' });
    }
    else res.status(400).send({ error: 'USER_NOT_FOUND' });
  });
}

const modify = async (req, res) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;

  const fields = ['username', 'password', 'email', 'firstname', 'lastname', 'role'];
  const data = {};
  for (const reqField of Object.keys(req.body)) {
    if (fields.includes(reqField)) {
      if ((reqField === 'email') && !isEmail(req.body.email)) return res.status(400).send({ error: 'USER_EMAIL_INVALID' });
      else if (reqField === 'password') data['password'] = await Password.hash(req.body.password);
      else if (reqField === 'role') {
        if (Session.isAuthorised(req.session)) data['role'] = req.body.role;
        else return res.status(403).send({ error: 'UNAUTHORISED'});
      }
      else data[reqField] = req.body[reqField];
    }
  }
  
  prisma.user.update({ where: { id: Number.parseInt(userId) }, data })
  .then(() => res.send({ msg: 'USER_UPDATED' }))
  .catch((error) => { res.status(400).send({ error: 'USER_FIELD', field: error.meta.target }) });
}

const restore = (req, res) => {

}

const verify = (req, res) => {

}

const checkPassword = (req, res) => {
  const pcheck = Password.check(req.params.password);
  if (pcheck.valid) res.send({ msg: 'PASSWD_VALID' });
  else {
    res.status(400).send({
      error: pcheck.reason,
      ...(pcheck.reason === 'PASSWD_INVALID') && { comp: pcheck.comp }
    });
  }
}

const passwordRequirements = (req, res) => {
  res.send(Password.requirements());
}

export default {
  signin,
  logout,
  register,
  find,
  checkPassword,
  passwordRequirements,
  modify,
  restore,
  verify
};
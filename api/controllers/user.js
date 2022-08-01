import prisma from '../prismainstance.js';
import Password from '../helpers/password.js';

const isEmail = (email) => {
  return (email.match(/^\S+@\S+\.\S+$/i) !== null);
}

const register = async (req, res, next) => {
  const requiredFields = ['username', 'password', 'email'];
  const optionalFields = ['firstname', 'lastname'];
  const data = {};

  for (const field of requiredFields) {
    // if a mandatory field isn't received, return with error
    if (!req.body[field]) return next({ error: 'MISSING_FIELD', code: 400, data: { field } });

    else if (field === 'password') {
      const passwdCheck = Password.check(req.body.password);

      if (passwdCheck.valid) data['password'] = await Password.hash(req.body.password);
      else return next({ code: 400, error: passwdCheck.error, data: { comp: passwdCheck.comp ? passwdCheck.comp : null } });
    }
    else data[field] = req.body[field];
  }
  
  for (const field of optionalFields) {
    if (req.body[field]) data[field] = req.body[field];
  }

  prisma.user.create({ data })
    .then(() => { res.send({ msg: 'USER_CREATED' }) })
    .catch((error) => { next({ error: 'USER_FIELD', code: 400, data: { field: error.meta.target } }) });
}

const find = (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  prisma.user.findUnique({ where: { id }})
    .then((user) => {
      if (user) {
        // FIXME: manage this with auth middleware
        if (user.public || (req.session.userId === id) || (req.session.role === 'ADMIN')) {
          delete user.password;
          res.send(user);
        }
        else next({ error: 'USER_PRIVATE', code: 403 });
      }
      else next({ error: 'USER_NOT_FOUND', code: 400 });
    });
}

const modify = async (req, res, next) => {
  const userId = req.body.userId ? req.body.userId : req.session.userId;
  const fields = ['username', 'password', 'email', 'firstname', 'lastname', 'role'];
  const data = {};

  for (const reqField of Object.keys(req.body)) {
    if (fields.includes(reqField)) {
      switch (reqField) {
        case 'email': {
          if (!isEmail(req.body.email)) return next({ error: 'USER_EMAIL_INVALID', code: 400 });
          break;
        }
        case 'password': {
          const passwdCheck = Password.check(req.body.password);
  
          if (passwdCheck.valid) data['password'] = await Password.hash(req.body.password);
          else return next({ code: 400, error: passwdCheck.error, data: { comp: passwdCheck.comp ? passwdCheck.comp : null } });
          break;
        }
        case 'role': {
          if (Session.isAuthorised(req.session)) data['role'] = req.body.role;
          else return next({ code: 403 });
          break;
        }
        default: {
          data[reqField] = req.body[reqField];
        }
      }
    }
  }
  
  prisma.user.update({ where: { id: Number.parseInt(userId) }, data })
    .then(() => { 
      res.send({ msg: 'USER_UPDATED' })
    })
    .catch((error) => {
      next({ error: 'USER_FIELD', code: 400, data: { field: error.meta.target } })
    });
}

const remove = (req, res, next) => {

}

const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    // did the user logged in with the username or with the password?
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
      else next({ error: 'USER_PASSWD_INVALID', code: 403 });
    }
    else next({ error: 'USER_NOT_FOUND', code: 400 })
  }
};

const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.send({ msg: 'USER_LOGGED_OUT' })
  });
};


const restore = (req, res, next) => {

}

const verify = (req, res, next) => {

}

const checkPassword = (req, res, next) => {
  const pcheck = Password.check(req.params.password);
  if (pcheck.valid) res.send({ msg: 'PASSWD_VALID' });
  else {
    next({
      error: pcheck.reason,
      code: 400,
      data: { comp: pcheck.reason === 'PASSWD_INVALID' ? pcheck.comp : null }
    });
  }
}

const passwordRequirements = (req, res, next) => {
  res.send(Password.requirements());
}

export default {
  register,
  find,
  modify,
  remove,
  signin,
  logout,
  restore,
  verify,
  checkPassword,
  passwordRequirements,
};
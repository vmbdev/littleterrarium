// only allow if it's signed in, and if the user modifying is him/herself or if he/she's an admin
const self = (req, res, next) => {
  if (!req.session.signedIn) return next({ code: 403 });
  else {
    const userId = (
        req.body.userId ? req.body.userId
      : req.params.userId ? req.params.userId
      : req.session.userId
    );

    if ((userId !== req.session.userId) && (req.session.role !== 'ADMIN')) {
      return next({ code: 403 });
    }

    next();
  }
}

const admin = (req, res, next) => {
  if (!req.session.signedIn && (req.session.role !== 'ADMIN')) return next({ code: 403 });

  next();
}

const signedIn = (req, res, next) => {
  if (!req.session.signedIn) return next({ code: 403 });

  next();
}

export default {
  self,
  admin,
  signedIn
};
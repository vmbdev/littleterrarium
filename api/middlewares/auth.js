// only allow if it's signed in, and if the user modifying is him/herself or if he/she's an admin
const auth = async (req, res, next) => {
  function getUserId() {
    return (req.body.userId ? req.body.userId
      : req.params.userId ? req.params.userId
      : req.session.userId);
  }

  if (!req.session.signedIn) return res.status(403).send({ error: 'UNAUTHORISED' });
  else {
    const userId = getUserId();

    console.log(userId);

    if ((userId !== req.session.userId) && (req.session.role !== 'ADMIN')) {
      console.log('hola');
      return res.status(403).send({ error: 'UNAUTHORISED' });
    }

    next();
  }
}

export default auth;
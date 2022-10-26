export const generateParser = (req, res, next) => {
  req.parser = {};

  next();
}

// TODO: define body/params/query implicitly
export const integers = (list) => {
  return (req, res, next) => {
    for (const field in list) {
      let place = (
        req.body[field] ? req.body
        : req.params[field] ? req.params
        : null
      );
      if (place) {
        // avoid muitating params or body
        req.parser[field] = Number.parseInt(place[field]);
        if (!req.parser[field]) return next({ error: 'INVALID_VALUE', data: { field } })
      }
      else if (list[field]) return next({ error: 'MISSING_VALUE', data: { field } });
    }

    next();
  }
}

export default {
  generateParser,
  integers,
}
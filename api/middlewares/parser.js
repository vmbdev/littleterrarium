// TODO: somehow run it alongside multer or remove req.files, or make a script that removes /temp files

const integers = (list) => {
  return (req, res, next) => {
    for (const field in list) {
      let place = (
        req.body[field] ? req.body
        : req.params[field] ? req.params
        : null
      );
      if (place) {
        place[field] = Number.parseInt(place[field]);
        if (!place[field]) return next({ error: 'INVALID_VALUE', data: { field } })
      }
      else if (list[field]) return next({ error: 'MISSING_VALUE', data: { field } });
    }

    next();
  }
}

export default {
  integers,
}
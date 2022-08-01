const defaultMessages = {
  403: 'UNAUTHORISED',
  500: 'SERVER_ERROR',
}

const errorHandling = (err, req, res, next) => {
  const errorMsg = err.error ? err.error : defaultMessages[err.code];

  res.status(err.code).send({
    error: errorMsg,
    data: err.data
  });
}

export default errorHandling;
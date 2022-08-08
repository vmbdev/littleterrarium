const defaultMessages = {
  403: 'UNAUTHORISED',
  500: 'SERVER_ERROR',
}

const errorHandling = (err, req, res, next) => {
  const errorMsg = err.error ? err.error : defaultMessages[err.code];
  const data = (err.data && Object.keys(err.data).length > 0) ? err.data : undefined
  const code = err.code ? err.code : 400;

  res.status(code).send({
    error: errorMsg,
    data
  });
}

export default errorHandling;
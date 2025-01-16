const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  const { statusCode = 500, message = "An unexpected error occured" } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "Internal Server Error" : message,
  });
};

module.exports = errorHandler;

const winston = require('winston');
const expressWinston = require('express-winston');


//Creating the custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

//Creating a request logger
const requestLogger = expressWinston.logger({
  transport: [
    new winston.transports.Console({
      format: messageFormat
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

//error logger
const errorLogger = expressWinstonW.errorLogger({
  transports: [
    new winston.transports.file({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
}
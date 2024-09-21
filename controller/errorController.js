const AppError = require('../utils/appError');
// handleCast Error

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    el.message;
  });

  return new AppError(errors, 400);
};
const handleTokenErrorJWT = () =>
  new AppError('Invalid token provided. Please login in again.', 401);
const handleTokenExpiredJWT = () =>
  new AppError('Token provided is expired. Please login in again.', 401);
const handleDuplicateFieldDB = (err) => {
  const message = `Duplicate field value : ${err.keyValue.name}`;
  return new AppError(message, 400);
};

// Global Error handler
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, tursted errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming errors dont' leak details
  } else {
    // log error
    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // operational, trusted error: send message to client
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === 'JsonWebTokenError') error = handleTokenErrorJWT();
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredJWT();

    sendErrorProd(error, res);
  }
};

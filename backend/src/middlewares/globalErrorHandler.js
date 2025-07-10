import createError from 'http-errors'


const globalErrorHandler = (err, req, res, next) => {

  // Check if the error object has a status property (HTTP status code)
  if (!err.status) {
    // If not, create a new error with status 500 (Internal Server Error)
    err = createError(500, "Internal Server Error")
  }
  // Send the error response to the client with the status code and message
  res.status(err.status).json({
    success: false,
    message: err.message || "Something Went Wrong!" // Send the error message, or a default message if not provided
  })
}

// Export the globalErrorHandler middleware so it can be used in other files
export default globalErrorHandler;

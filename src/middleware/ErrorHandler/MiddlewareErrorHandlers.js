exports.RouterAsyncErrorHandler = (middleware) => (req, res, next) => Promise.resolve(middleware(req, res, next)).catch(next)


exports.ErrorHandlerMiddleware = (error, req, res, next) => {
    // console.log(error)
    return res.status(400).json({
        type: error.name,
        message: error.message,
        path: error.path
    })
}
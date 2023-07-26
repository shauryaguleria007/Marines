exports.Authorizer = (AuthorizedRoles) => {
    return (req, res, next) => {
        if (AuthorizedRoles.includes(req.user?.role)) return next()
        throw new Error("ff")
    }
}
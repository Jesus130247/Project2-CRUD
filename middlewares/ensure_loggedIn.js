function ensureLoggedIn(req, res,next) {
    if (req.session.userId) {
        next()
    } else {
        res.render('login', {errorMessage: "Please Login first"})
    }
}
module.exports = ensureLoggedIn
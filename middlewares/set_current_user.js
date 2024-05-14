const db = require('../db')

function setCurrentUser(req, res, next) {
    // making current user object available in every template
    res.locals.currentUser = {}
    res.locals.isLoggedIn = false

    // guard condition: if user is not logged in, skip
    if (!req.session.userId) {
        return next()
    }
    // lets fetch user record from the db
    const sql = `
    SELECT * FROM users WHERE id = $1
    `
    db.query(sql, [req.session.userId], (err, result) => {
        if (err) {console.log(err)}
        let user = result.rows // {id:1, username:...email:...}
        //set the current user
        res.locals.currentUser = user[0]
        res.locals.isLoggedIn = true
        next()
    })
}
module.exports = setCurrentUser
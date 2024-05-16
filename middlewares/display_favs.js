const db = require('../db')

function displayFavourites(req, res, next) {
    if (!req.session.userId) {
        return next()
    }
    // lets fetch favourites record from the db
    const sql = `
    SELECT * FROM favourites WHERE user_id = $1
    `
    db.query(sql, [req.session.userId], (err, result) => {
        if (err) {console.log(err)}
        let favs = result.rows 
        res.locals.favs = favs
        next()
    })
}

module.exports = displayFavourites
// Hier maken we gebruik van jsonwebtoken om te controleren of een gebruiker is ingelogd
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
module.exports = function(req, res, next)  {
    // Pak de token van de header
    const token = req.header('x-auth-token')
    // Loop om te kijken of het geen token/ geen geldige token is
    if(!token){
        return res.status(401).json({ msg: 'geen token, toegang geweigerd' })
    }
    try {
        const decoded  = jwt.verify(token, JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Token is niet geldig' })
    }
}
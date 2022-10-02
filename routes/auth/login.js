const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const User = require('../../models/User')
const JWT_SECRET = process.env.JWT_SECRET
const auth = require('../../middleware/auth')
// POST api/v1/sign-in | public | login user
router.post('/sign-in', async (req, res) => {
    try {
        const {name, email, password} = req.body
        // Controleert al de verschillende bestanden
        if(!email || !password){
            return res.status(400).json({ msg: 'Vul alstublief al uw gegevens in' })
        }

        let user = await User.findOne({email})
        if(!user ) return res.status(400).json({ msg: 'Gebruiker bestaat niet' })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch ) return res.status(400).json({ msg: 'Ongeldige gegevens' })
        
        const payload = {
            user: {
                id: user._id
            }
        }
        jwt.sign(payload, JWT_SECRET, {
            expiresIn: 36000 
        }, (err, token) => {
            if(err) throw err 
            res.status(200).json({
                token
            })
        })
    } catch (err) {
        console.log(err)
    }
})

// Gebruiker authenticatie
router.get('/user', auth,  async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json({
            user
        }) 
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg:'SERVER ERROR'  })
    }
})

// historie van inloggen
router.get('/history',auth, async (req, res, next) => {
    const {word} = req.query
    try {
        const history = await User.updateOne({ _id: req.user.id }, { $push: { history: word} });
        console.log(`add to history: ${history}`);
        
        const historyvalues = await User.findById(req.user.id)

        return res.json({
            success: true,
            history: historyvalues.history
        })
        
    } catch (err) {
        console.log(err)
    }
});







module.exports = router
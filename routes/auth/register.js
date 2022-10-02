const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const User = require('../../models/User')
const JWT_SECRET = process.env.JWT_SECRET

// POST api/v1/sign-up | public | een nieuwe gebruiker registreren en ingelogd blijven
router.post('/sign-up', async (req, res) => {
    try {
        const {name, email, password} = req.body
        // Alle velden controleren
        if(!name || !email || !password){
            return res.status(400).json({ msg: 'Vul alstublief al uw velden in' })
        }

        // Bestaat de gebruiker JA / NEE
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ msg: 'Gebruiker bestaat al' })
        }

        let date_info = new Date;
        let date_into = (date_info.getMonth()+1) + '/' + date_info.getDate() + '/' +  date_info.getFullYear();


        user = new User({
            name,
            email,
            password,
            cleatedAt: date_into
        })

        // Genereer SALT en hash het wachtwoord
        const slat =await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, slat)
        await user.save()
        
        const payload = { 
            user: {
                id: user._id
            }
        }
        // Duur van inloggen
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

module.exports = router
const express = require('express')
const router = express.Router()
const request = require('request')
const cheerio = require('cheerio')
// Domein keywords | GET: /api/v1/domainkeyword?domain= | public
router.get('/domainkeyword',  (req, res) => {
    const {domain} = req.query
    let results = []
    request(domain, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            const disc = $('meta[name="description"]').attr('content')
            const title = $('meta[property="og:title"]').attr('content')
            if(title !== undefined) results.push(title) //titel
            if(disc !== undefined) results.push(disc) //beschrijving
            
            $("h1, h2, h3, h4, h5, h6").map((_,element) => {
                const heading = $(element).text()
                // heading.replace(/^\s*\n/gm, "") 
                if(heading.length === 0) return
                results.push(heading.replace(/^\s*\n/gm, "").replace(/\s/g, ' '))
            });

            return res.json({
                success: true,
                results
            })
        }
    })

})

module.exports = router
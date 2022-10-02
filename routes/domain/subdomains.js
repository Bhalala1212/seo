const express = require('express')
const router = express.Router()
const request = require('request')
const cheerio = require('cheerio')

// SUBDOMAINS | GET: /api/v1/subdomains?domain= | public
router.get('/subdomains',  (req, res) => {
    const {domain} = req.query
    let results =[]
    request(domain, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            let $ = cheerio.load(html)
            links = $('a')
            $(links).each((i, link) => {
                let link_url = $(link).attr('href')
                
                // WITH HTTPS:// or HTTP://
                // isSubdomain(link_url) ?  (
                //     results.push(link_url)
                // ) : null

                isSubdomain(link_url) ?  (
                    results.push(link_url.replace(/(https?:\/\/)?(www.)?/i, ''))
                ) : null
                    
            });

            
            // RETURN OR DO SOMETHING
            return res.json({
                success: true,
                results
            })

        }
    })

    const isSubdomain = links => {
        links = links || domain; 
        var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
        return !!links.match(regex)
    }

})

module.exports = router
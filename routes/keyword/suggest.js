// google voorgestelde keywords | v2
const express = require('express')
const router = express.Router()
const request = require("request")
const cheerio = require("cheerio")
const suggestURL = process.env.SUGGESTURL

// Voorgestelde keywords | GET: /api/v1/keywords?keyword= | public
router.get('/keywords', (req, res) => {
    const {keyword} = req.query
    const url = suggestURL+keyword
    
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html)
            
            /*
            const sendrequest = async (result) => {
                try {
                    console.log(result.length)
                    // return res.json({success: true, result})

                    setTimeout(() => { 
                        return res.json({success: true, result})
                    }, 1500);

                } catch (err) {
                    console.log(err)
                }
            }
            */
           
            let executed = false
            const sendrequest =  (result) => {
                if (!executed) {
                    executed = true;
                    return res.json({success: true, result})

                    // setTimeout(() => { 
                    //     return res.json({success: true, result})
                    // }, 1500);
                }
            }
            

            let firstlist = []
            $('suggestion').each( (index, value) => {
                const sugg = $(value).attr('data');
                // console.log(sugg)
                firstlist.push(sugg)
            });
            
            let result = []
            firstlist.forEach(term => {
                const url2 = suggestURL+term
                let promise = new Promise((resolve, reject) => {
                    request(url2, function (error, response, body) {
                        if(!error && response.statusCode == 200) {
                            let $ = cheerio.load(body)
        
                            links = $('suggestion'); 
                            $(links).each((i, link) => {
                                let word = $(link).attr('data')
                                result.push(word)
                                // return res.json({success: true})
                            })
                        }
                        resolve(result)
                    })
                })

                promise.then(result => {

                    setTimeout(() => { 
                        sendrequest(result)
                    }, 1500);

                    // sendrequest(result)

                 
                })
            })
            
        }
    })
})

module.exports = router
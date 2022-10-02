const express = require('express')
const router = express.Router()
const rp = require('request-promise');
const instaurl = process.env.INSTAURL

// SUGGESTIONS KWYWORD | GET: /api/v1/instagram?keyword= | public
router.get('/instagram', (req, res) => {
    const {keyword} = req.query
    const url = instaurl+keyword

    /*
    rp(url)
    .then((html) => {
        let hashtags = scrapeHashtags(html);
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele)

        // console.log(hashtags.slice(0, 100));
        console.log(hashtags.length)
        res.json({
            success: true,
            result: hashtags.slice(0, 100)
        })
    })
    .catch((err) => {
        console.log(err);
    });

        
    const scrapeHashtags = (html) => {  
        var regex = /(?:^|\ssss)(?:#)([a-zA-Z\d]+)/gm;
        var matches = [];
        var match;
    
        while ((match = regex.exec(html))) {
            matches.push(match[1]);
        }
    
        return matches;
    }
    
    const removeDuplicates = (arr) => {
        let newArr = [];
        
        arr.map(ele => {
            if (newArr.indexOf(ele) == -1){
                newArr.push(ele)
            }
        })
        
        return newArr;
    }
    */

    // --------------------------------------------------
    
    rp(url)
    .then((html) => {
        let hashtags = scrapeHashtags(html);
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele)
       
        // setTimeout(() => { 
        //     res.json({
        //         success: true,
        //         result: hashtags.slice(0, 60)
        //     })    
        // }, 1500);

        res.json({
            success: true,
            result: hashtags.slice(0, 60)
        })   
    })
    .catch((err) => {
        console.log(err);
    });

    
    const scrapeHashtags = (html) => {  
        var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
        var matches = [];
        var match;

        while ((match = regex.exec(html))) {
            matches.push(match[1]);
        }

        return matches;
    }

    const removeDuplicates = (arr) => {
        let newArr = [];

        arr.map(ele => {
            if (newArr.indexOf(ele) == -1){
                newArr.push(ele)
            }
        })
        
        return newArr;
    }

})

module.exports = router
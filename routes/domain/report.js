// Het creeren van de rapportage uit de Lighthouse API
const express = require('express')
const router = express.Router()
const lighthousePersist = require('@foo-software/lighthouse-persist').default;

// Domein Audit | GET: /api/v1/report?domain= | public
router.get('/report', async (req, res) => {
    const {domain} = req.query
    try {
        const {localReport,result} = await lighthousePersist({url: domain,})
// ophalen van de specifieke waarde uit de console log
        report = {
            performance: {
                title: result.categories.performance.id,
                score: result.categories.performance.score,
                _score: (result.categories.performance.score * 100).toFixed(0)
            },
            accessibility: {
                title: result.categories.accessibility.id,
                score: result.categories.accessibility.score,
                _score: (result.categories.accessibility.score * 100).toFixed(0)
            },
            seo: {
                title: result.categories.seo.id,
                score: result.categories.seo.score,
                _score: (result.categories.seo.score * 100).toFixed(0)
            },
            pwa: {
                title: result.categories.pwa.id,
                score: result.categories.pwa.score,
                _score: (result.categories.pwa.score * 100).toFixed(0)
            }
        }

        // Pakt het audit report en verstuurd het naar front end
        return res.json({
            success: true,
            report
        })

    } catch (err) {
        console.log(err)
    }
})

module.exports = router
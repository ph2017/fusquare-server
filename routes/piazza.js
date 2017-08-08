const express = require('express')
const router = express.Router()
const Piazza = require('../models/mongo/piazza')

router.route('')
    .post((req, res, next) => {
        (async () => {
            let newPiazza = await Piazza.create({
                mac: req.body.mac,
                points: req.body.points,
                description: req.body.description,
            })

            return {
                code: 0,
                message: newPiazza
            }
        })()
            .then((result) => {
                res.json(result)
            })
            .catch((error => {
                next(error)
            }))
        })

module.exports = router
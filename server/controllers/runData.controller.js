const RunData = require('../models/rundata.model');

module.exports = {
    
    allRuns: (req, res) => {
        RunData.find({})
        .then(allRuns => {
            allRuns.sort((a, b) => {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
                return dateB - dateA
            })
            res.json(allRuns)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },
    
    findOneRun: (req, res) => {
        RunData.findOne({_id:req.params.id})
        .then(oneRun => {
            res.json(oneRun)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    createRun: (req, res) => {
        RunData.create(req.body)
            .then(newRun => {
                res.json(newRun)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    updateRun: (req, res) => {
        RunData.findByIdAndUpdate(req.params.id, req.body, { new:true })
            .then(updatedRun => {
                res.json(updatedRun)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },

    deleteRun: (req, res) => {
        RunData.findByIdAndDelete(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
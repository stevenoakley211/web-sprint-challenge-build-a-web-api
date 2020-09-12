const express = require('express')
const actions = require('../data/helpers/actionModel')
const projects = require('../data/helpers/projectModel')
const router = express.Router()

// Create
router.post('/',validProjectId,validAction,(req,res) =>{
    actions.insert(req.body)
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})
// Read
router.get('/',(req,res) =>{
    actions.get()
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})


router.get('/:id',(req,res) =>{
    actions.get(req.params.id)
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})

// Update
router.put('/:id',validProjectId, validAction,(req,res) =>{
    actions.insert(req.body)
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})

// Delete
router.delete('/:id',(req,res) =>{
    actions.remove(req.params.id)
        .then(actionsList =>{
            res.status(200).json(actionsList)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
            )
        })
})

function validProjectId (req,res,next){
    const project = projects.get(req.body.project_id)
    if (!project){
        res.status(404).json({message: "invalid project id"})
    }
    else {
        next();
    }
}

function validAction (req, res, next){
    if(!req.body.description || !req.body.notes){
        res.status(404).json({message: "missing action description or notes"})
    }
    else {
        next();
    }
}
module.exports = router
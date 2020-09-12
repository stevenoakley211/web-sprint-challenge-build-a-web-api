const express = require('express')
const projects = require('../data/helpers/projectModel')
const router = express.Router()

// Create
router.post('/',validateProject,(req,res) =>{
    projects.insert(req.body)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})
// Read
router.get('/',(req,res) =>{
    projects.get()
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
              )
          })
})

router.get('/:id', validateProjectId,(req,res) =>{
    projects.get(req.params.id)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
            )
        })
})

router.get('/:id/actions', validateProjectId,(req,res) =>{
    projects.getProjectActions(req.params.id)
        .then(projectActions =>{
            res.status(200).json(projectActions)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
            )
        })
})
// Update
router.put('/:id', validateProject,validateProjectId, (req,res) => {
    projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
            )
        })
})
// Delete
router.delete('/:id',validateProjectId,(req,res) =>{
    projects.remove(req.params.id)
        .then(projectsList =>{
            res.status(200).json(projectsList)
        })
        .catch(err => {
            res.status(500).json(
                { error: err, message: err.message }
            )
        })
})

function validateProject(req,res,next) {
    if(!req.body.name || !req.body.description) {
        res.status(404).json({message:"missing project name or description"})
    }
    else {
        next()
    }
}
       
function validateProjectId (req,res,next) {
    const project = projects.get(req.params.id)
    if (!project){
        res.status(404).json(
            { message: "invalid project id" }
        )
    }
    else {
        next()
    }
}

module.exports = router
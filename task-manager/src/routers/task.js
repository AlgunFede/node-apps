const express = require('express')
const router = express.Router();
const Task = require('../models/task');


// Handleing task requests 

// Saveing new task
router.post('/task', async (req, res) => {
    const newTsk = new Task(req.body)

    try {
        await newTsk.save()
        res.send(newTsk)
    } catch(e) {
        res.status(400).send()
    }

})

// Getting all tasks
router.get('/task', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(400).send(e)
    }

})

// Getting individual task
router.get('/task/:id', async (req, res) => {
    const _id = req.params.id; 

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    
})

// Edit existing resource

router.patch('/task/:id', async (req, res) => {
    const _id = req.params.id;
    const validation = { new: true, runValidators: true};

    const allowUpdates = ['description', 'completed'];
    const changes = Object.keys(req.body)

    const isValidate = changes.every((change) => allowUpdates.includes(change))

    if(!isValidate) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findById(_id);

        changes.forEach((change) => {
            task[change] = req.body[change]
        })

        await task.save()

        if(!task) {
            return res.status(404).send({error: 'Failed! Task doesn\'t finded'})
        }
        res.send(task)

    } catch(e) {
        res.status(400).send()
    }

}) 

// Delete task

router.delete('/task/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if(!task) {
            return res.status(404).send({error: 'Task doesn\'t exist'})
        }
        res.send(task)
        
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router;
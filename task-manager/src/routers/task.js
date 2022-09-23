const express = require('express')
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middlewares/auth');
const { translateAliases } = require('../models/task');

// Handleing task requests 

// Saveing new task
router.post('/task', auth, async (req, res) => {
    const newTsk = new Task({
        ...req.body,
        owner: req.user._id
    }) 
    try {
        await newTsk.save()
        res.send(newTsk)
    } catch(e) {
        res.status(400).send(e)
    }

})

// Getting all tasks
router.get('/task', auth, async (req, res) => {

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // Altenativa con virtuals
        await req.user.populate('tasks');
        res.send(req.user.tasks)
    } catch(e) {
        res.status(400).send(e)
    }

})

// Getting individual task
router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id; 

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    
})

// Edit existing resource

router.patch('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const validation = { new: true, runValidators: true};

    const allowUpdates = ['description', 'completed'];
    const changes = Object.keys(req.body)

    const isValidate = changes.every((change) => allowUpdates.includes(change))

    if(!isValidate) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne( {_id: _id, owner: req.user._id}  );
        // const task = await Task.findById(_id);

        if(!task) {
            return res.status(404).send({error: 'Failed! Task doesn\'t finded'})
        }

        changes.forEach((change) => {
            task[change] = req.body[change]
        })

        await task.save()
        res.send(task)

    } catch(e) {
        res.status(400).send(e)
    }

}) 

// Delete task

router.delete('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id: _id, owner: req.user._id })

        if(!task) {
            return res.status(404).send({error: 'Task doesn\'t exist'})
        }
        res.send(task)
        
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router;

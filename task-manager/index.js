const express = require('express');
require('./src/db/mongoose');
const User = require('./src/models/user');
const Task = require('./src/models/task')


const app = express();
const port = process.env.PORT || 3000;

// Automatically parse json object 
app.use(express.json())

// Handleing users requests

// Create user
app.post('/users', async (req, res) => {
    const usr = new User(req.body)
    
    try {
        await usr.save()
        res.send(usr)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Getting all users
app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(400).send(e)
    }

})

// Getting user by ID
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id; 

    try {
        const user = await User.findById(_id)
        
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send(e);
    }
    
})

// Handleing task requests 

// Saveing new task
app.post('/task', async (req, res) => {
    const newTsk = new Task(req.body)

    try {
        await newTsk.save()
        res.send(newTsk)
    } catch(e) {
        res.status(400).send()
    }

})

// Getting all tasks
app.get('/task', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(400).send(e)
    }

})

// Getting individual task
app.get('/task/:id', async (req, res) => {
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


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


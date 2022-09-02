const express = require('express');
const User = require('../models/user');
const router = express.Router();


// Handleing users requests

// Create user
router.post('/users', async (req, res) => {
    const usr = new User(req.body)
    
    try {
        await usr.save()
        res.send(usr)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Getting all users
router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(400).send(e)
    }

})

// Getting user by ID
router.get('/users/:id', async (req, res) => {
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

// Edit user information
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const validation = { new: true, runValidators: true};

    //Validate if property exist
    const allowUpdates = ['name', 'email', 'password', 'age']
    const changes = Object.keys(req.body)

    const isValidate = changes.every((change) => allowUpdates.includes(change));

    if (!isValidate) {
        return res.status(400).send({ error: 'Can not change the actual value'} )
    }

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, validation)
        
        const user = await User.findById(_id)
        
        changes.forEach((change) => {
            user[change] = req.body[change]
        })

        await user.save()

        if(!user) {
            return res.status(404).send({ error: 'Can not find user'})
        }
        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

})

// Delete user

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {

        const user = await User.findByIdAndDelete(_id)

        if(!user) {
            return res.status(404).send( { error: 'Can not find the user'} )
        }
        res.send(user)

    } catch(e) {
        res.status(500).send(e)
    }

});

module.exports = router;
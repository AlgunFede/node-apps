const express = require('express');
const User = require('../models/user');
const router = express.Router();
const auth = require('../middlewares/auth');


// Create user
router.post('/users/me', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send( {user, token} );
    } catch (e) {
        res.status(400).send(e)
    }
});

// Login user
router.post('/users/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token })

    } catch(e) {
        res.status(400).send({ error: "User not found" });
    } 

})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send({ success: 'User logout succesfully' })
    } catch(e) {
        res.status(500).send()
    }
});

// Logout all devices

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send({ success: 'Devices succesfully logouted' })

    } catch(e) {
        res.status(500).send()
    }
})

// Getting all users
router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)

})

// Edit user information
router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id;
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
        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

})

// Delete user

router.delete('/users/me', auth, async (req, res) => {
    const _id = req.user._id;

    try {
        req.user.remove()
        res.send(req.user)

    } catch(e) {
        res.status(500).send(e)
    }

});

module.exports = router;
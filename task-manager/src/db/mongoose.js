const mongoose = require('mongoose');
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Age must be positive')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    }
});

const me = new User({
    name: 'Fede',
    age: -23,
    email: 'test@gmail.com'
});

me.save().then(() => {
    console.log(me)
}).catch(() => {
    console.log('Error!')
})

// const Task = mongoose.model('Tasks', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const newTask = new Task({
//     description: 'Clean the house',
//     completed: false
// })

// newTask.save().then(() => {
//     console.log(newTask)
// }).catch((e) => {
//     console.log('Error!', e)
// })
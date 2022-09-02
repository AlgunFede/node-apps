const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6,
        trime: true,
        validate(value) {
            if(value.toLowerCase().includes('password') || value.length < 7) {
                throw new Error('Password cant be "password" or contained less than 6 characters')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Incorrect format email')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    }
})

userSchema.pre('save', function(next) {

    console.log('Just before saving!')

    next()

})

const User = mongoose.model('User', userSchema);

module.exports = User;
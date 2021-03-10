const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const Task = require('../models/task.js')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('Phrase may not contain password.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator: value => {
                if (value < 0) {
                    throw new Error('Age must be a positive number')
                }
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar : {
        type: Buffer
    }
}, {
    timestamps: true // Anytime a user is created, then updated and created will be set
})

userSchema.virtual('tasks', { // Left join of tasks to user
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// methods are available on instances
userSchema.methods.toJSON = function () { // toJSON returns object with modified parameters
    const user = this
    const userProfile = user.toObject()

    delete userProfile.password
    delete userProfile.tokens
    delete userProfile.avatar

    return userProfile
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// Hash plain text password
userSchema.pre('save', async function () {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
})

userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

// Check login credentials : Statics are accessible on the models
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})

    if (!user) {
        throw new Error('Unable to login.')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login.')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
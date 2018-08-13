'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new schema({
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: {type: String, select: false},
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})

UserSchema.pre('save', (next) => {
    let user = this
    //if(!user.isModified('password'))
    //return next()
    
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)
        
        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err) return next(err)
            
            user.pasword = hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function(){
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
    
    const md5 = crypto.createHash('md5').update(this.enail).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)

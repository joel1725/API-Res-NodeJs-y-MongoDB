'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const productSchema = schema({
    name: String,
    picture: String,
    precio: Number,
    category: {type: String, enum: ['computers', 'phones', 'accesories']},
    description: String
})


module.exports = mongoose.model('Product', productSchema)
'use strict'

const product = require('../models/products.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


function getProduct (req,res){
    let productID = req.params.productId
    
    product.findById(productID, (err, product) => {
        if(err) return res.status(500).send({message: `Error al realizar lapeticion ${err}`})
        if (!product) return res.status(404).send({message: `El producnto no existe`})
        
        res.status(200).send({product: product})
    })
}

function getProducts (req,res){
    product.find({},(err,products)=>{
        if(err) return res.status(500).send({message: `Error al realizar lapeticion ${err}`})
        if (!product) return res.status(404).send({message: `No existen productos`})
        res.status(200).send({products: products})  
    })
}

function saveProduct (req,res){
    console.log('POST /api/product')
    console.log(req.body)
    
    let pro = new product()
    
    pro.name = req.body.name
    pro.picture = req.body.picture
    pro.price = req.body.price
    pro.category = req.body.category
    pro.description = req.body.description
    
    pro.save((err,productStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos ${err}`})
        res.status(200).send({pro: productStored})
    })
}

function updateProduct (req,res){
    let productID = req.params.productId
    let update = req.body
    
    product.findByIdAndUpdate(productID, update, (err, productUpdate) => {
        if(err) return res.status(500).send({message: `Error al actualizar el producto ${err}`})

        res.status(200).send({product: productUpdate})
    })
}

function deleteProduct (req,res){
    let productID = req.params.productId
    
    product.findById(productID, (err, product) => {
        if(err) return res.status(500).send({message: `Error al borrar el producto ${err}`})
        if (!product) return res.status(404).send({message: `El producnto no existe`})
        
        product.remove(err => {
            if(err) return res.status(500).send({message: `Error al borrar el producto ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado correctamente'})
        }) 
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
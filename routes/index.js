'use strict'


const express = require('express')
const ProductCtrl = require('../controllers/products')
const userCtrl = require('../controllers/user')
const api = express.Router()
const auth = require('../middelwares/auth')

//TODOS LOS RECURSOS
api.get('/products', ProductCtrl.getProducts)

//RECURSO UNICO RECURSO
api.get('/product/:productId', ProductCtrl.getProduct)

//CREAR UNICO RECURSO
api.post('/product', ProductCtrl.saveProduct)

//MODIFICAR UNICO RECURSO
api.put('/product/:productId', ProductCtrl.updateProduct)

//MODIFICAR UNICO RECURSO
api.delete('/product/:productId', ProductCtrl.deleteProduct)

//LOGEO DE USUARIO
api.post('/signup', userCtrl.signUp)

//REGISTRO DE USUARIO
api.post('/signin', userCtrl.signIn)

//RUTA PARA PROBAR USUARIOS VIP
api.get('/private', auth, function(req, res){
    res.status(200).send({message: 'Tienes acceso'})
})

//TODOS LOS USUARIOS
api.get('/users', userCtrl.getUsers)

//BORRA TODOS LOS USUARIOS
api.delete('/users',userCtrl.deleteUsers)

module.exports = api
'use strict'

const User = require('../models/user')
const service = require('../services')


function signUp(req, res){
    const user = new User({
                    email: req.body.email,
                    displayName: req.body.displayName,
                    password: req.body.password
                 })
    user.save((err)=>{
        if(err) return res.status(500).send({message: `Error al crear usuario ${err}`})
        
        return res.status(201).send({token: service.createToken(user)})
    })
}

function signIn(req, res){
    User.find({email: req.body.email}, (err, user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})
        
        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

function getUsers(req,res){
    User.find({},(err,users)=>{
        if(err) return res.status(500).send({message: `Error al realizar lapeticion ${err}`})
        if (!users) return res.status(404).send({message: `No existen usuarios`})
        
        res.status(200).send({users: users})  
    })
}

function deleteUsers (req,res){    
    User.findById({}, (err, user) => {
        if(err) return res.status(500).send({message: `Error al borrar los usuaios ${err}`})
        if (!product) return res.status(404).send({message: `Los usuaios no existen`})
        
        user.remove(err => {
            if(err) return res.status(500).send({message: `Error al borrar los usuarios ${err}`})
            res.status(200).send({message: 'Los usuarios han sido eliminados correctamente'})
        }) 
    })
}


module.exports = {
    signUp,
    signIn,
    getUsers,
    deleteUsers
}

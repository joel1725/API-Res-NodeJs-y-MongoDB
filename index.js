'use strict'


const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')


mongoose.connect(config.db , (err, res) => {
    if(err) {
        return console.log(`Error al conectarse con la base de datos, recuerda siempre tener a mongo activo en otra consola ${err}`) 
    }
    
    app.listen(config.port, () => {
        console.log(`API REST EL PUERTO USADO ES ${config.port}`)
    })
})
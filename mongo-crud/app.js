const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')

const dburl = 'mongodb://localhost/UsersDB'

const app = express()

app.use(express.json())
app.use('/users', users)

mongoose.connect(dburl, {useNewUrlParser:true})
const con = mongoose.connection
con.on('open', () => {
    console.log('connected to database')
})

app.listen(9000, ()=>console.log("Server listening on 9000"))

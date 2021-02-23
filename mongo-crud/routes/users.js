const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')

router.get('/', async(req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        console.log("Error : " + err)
        res.send("Error")
    }
})


router.post('/', async(req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        isFriendly: req.body.isFriendly
    })
    try {
        const u1 = await user.save()
        res.json(u1)
    }catch(err){
        console.log("Error : " + err)
        res.send("Error")
    }
})

router.get('/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch(err){
        console.log("Error : " + err)
        res.send("Error")
    }
})


module.exports = router

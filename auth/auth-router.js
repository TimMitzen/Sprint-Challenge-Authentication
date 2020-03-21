const express = require('express')
const User = require('../users/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
router.post('/register', async (req, res, next) => {
  // implement registration
  try{
    const {username} = req.body //username

    const user = await User.findBy({username}).first()//uses helper from usermodel
    if(user){
      return res.status(409).json({
        errorMessage: 'Username is taken'//checks to see if username is taken
      })
    }
    res.status(201).json(await User.add(req.body))//registers the user
  }
  catch(error){
    next(error)
  }
  
  

});





router.post('/login', async (req, res, next) => {
  // implement login
  const authError = {
    errorMessage: 'Invalid Credentials'
  }
  try{
    const {username, password} = req.body
    const user = await User.findBy({username}).first()
    if(!user){
      return res.status(401).json(authError)
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if(!passwordValid){
      return res.status(401).json(authError)
    }
    const payload = {
      userId: user.Id,
      username: req.body
    }
    
    const token = jwt.sign(payload,' process.env.JWT_SECRET')
    res.cookie = ('token',token)
    res.json({
      
      message: `Welcome ${user.username}`,
      token: token,
      payload: payload,
      
      
    })
  }

  catch(error){
    next(error)
  }
})

module.exports = router;
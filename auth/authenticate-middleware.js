/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const User = require('../users/userModel')
const jwt = require('jsonwebtoken')

function authenticate(){
  const authError = {
    errorMessage: 'you shall not pass!' //standard errormessage
  }
  return async (req,res, next)=>{
   try{ 
     const token = req.headers.token //for the token in the header
    if(!token){
      res.status(401).json(authError)//if the token is wrong gives em
    }
    jwt.verify(token,process.env.JWT_SECRET, (error,decoded)=>{
      if(error){
      return res.status(401).json(authError)
      }//return message if token isnt verified
      req.token=decoded//can be accessed other places now
      next()
    })
    
  }

  catch(error){
    next(error)
  }
}
};

module.exports = authenticate
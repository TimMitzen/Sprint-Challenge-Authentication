/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const User = require("../users/userModel");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  authError = {
    errorMessage: "you shall not pass"
  };
  const token = req.headers.token;
  console.log(token, "token");
  if (!token) {
    console.log("1st");
    return res.status(401).json(authError);
  }
  jwt.verify(token, "process.env.JWT_SECRET", (error, decoded) => {
    if (error) {
      return res.status(401).json(authError);
    } else {
      req.token = decoded;

      next();
    }
  });
};

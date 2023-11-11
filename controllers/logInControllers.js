const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.logInUser = async (req, res,next) => {
    const { username,password } = req.body;
    // console.log(username, password);
    try {
      // Get the user information from database
      const user= await Users.findOne({where:{name: username}});
      //if user is not found
      if (!user) {
        res.redirect('/login?loggedIn=wrong_username');
        return;
      }
      
      const userPass=user.password;
      
      //decode the password
      bcrypt.compare( password,userPass, (err, result) => {
        if(err)
        {
          res.redirect('/login?loggedIn=failed');
        }else if (result) {
            //update the user state
            const token=jwt.sign({userId:user.userId},process.env.SECRET_KEY);
            //set as cookie
            res.cookie('token', token, { httpOnly: true});
            next();
        } else {
            // Passwords don't match
            res.redirect('/login?loggedIn=wrong_password');
        }
    });
    } catch (error) {
      console.log(error);
      //if error 
      res.redirect('/login?loggedIn=failed');
    }
};



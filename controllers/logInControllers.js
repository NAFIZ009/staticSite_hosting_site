const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.logInUser = async (req, res) => {
    const { username,password } = req.body;
    try {
      const user= await Users.findOne({where:{name: username}});
      const userPass=user.password;
      bcrypt.compare( password,userPass, (err, result) => {
        if (result) {
            const token=jwt.sign({username},process.env.SECRET_KEY);
            //set as cookie
            res.cookie('token', token, { httpOnly: true});
            // Passwords match
            res.redirect('/upload');
        } else {
            // Passwords don't match
            console.log('Password is incorrect');
        }
    });
    } catch (error) {
      console.log(error);
      res.status(400).send('Error creating user');
    }
};



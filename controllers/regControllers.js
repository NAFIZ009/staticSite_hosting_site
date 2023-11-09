const Users = require('../models/Users');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    let { username, password } = req.body;
    //encrypt password
    password =await bcrypt.hash(password, bcrypt.genSaltSync(10));
    
    try {
      const user = await Users.create({ name:username, password });
      res.redirect('/login?reg=complete');
    } catch (error) {
      res.redirect('?reg=failed');
    }
};
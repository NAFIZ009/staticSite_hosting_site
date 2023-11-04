const Users = require('../models/Users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const salt =bcrypt.genSaltSync(10);
exports.createUser = async (req, res) => {
    let { username, password } = req.body;
    password = await bcrypt.hash(password, salt);
    try {
      const user = await Users.create({ name:username, password });
      res.status(201).json(user);
    } catch (error) {
        console.log(error);
      res.status(400).send('Error creating user');
    }
};
const Users = require('../models/Users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    console.log(req.body);
    // const { username, password } = req.body;
    // password = await bcrypt.hash(password, 2231);
    // try {
    //   const user = await Users.create({ username, password });
    //   res.status(201).json(user);
    // } catch (error) {
    //   res.status(400).send('Error creating user');
    // }
};
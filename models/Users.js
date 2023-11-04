const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Users=sequelize.define('User',{
    userId:{
        type:DataTypes.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true,
    },
    name : {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

Users.sync();

module.exports=Users;
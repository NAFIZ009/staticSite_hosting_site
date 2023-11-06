const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const SiteURL = require('./SiteURL');

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

// Users.hasMany(SiteURL, { foreignKey: 'userId' });
// SiteURL.belongsTo(Users, { foreignKey: 'userId' });

module.exports=Users;
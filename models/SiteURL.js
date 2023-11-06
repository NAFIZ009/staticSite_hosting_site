const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const SiteURL=sequelize.define('siteURL',{
    userId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

SiteURL.sync();

module.exports=SiteURL;
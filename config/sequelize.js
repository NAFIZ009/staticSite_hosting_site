
const {Sequelize} = require('sequelize');
const {DB_NAME,DB_USERNAME,DB_PASSWORD}=process.env;
const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host: 'bvx8mjcqraovgaf4wi4m-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    pool: {
        max: 5, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
    }
});

module.exports=sequelize;
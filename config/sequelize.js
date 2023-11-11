const fs = require('fs');
const {Sequelize} = require('sequelize');
const {DB_NAME,DB_USERNAME,DB_PASSWORD}=process.env;
const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD,{
    host: 'mysql-2054b447-jalalahmednafiz-3971.a.aivencloud.com',
    // host:'localhost',
    dialect: 'mysql',
    port: 15741,
    ssl: true,
    dialectOptions: {
        ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('D:/Simple_Static_Site_Hosting_Project/config/ca.pem'),  // Path to the CA certificate (optional, if using SSL)
        },
    },
    logging: false,
    pool: {
        max: 25, // Maximum number of connection in pool
        min: 10, // Minimum number of connection in pool
        acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
    }
});

module.exports=sequelize;
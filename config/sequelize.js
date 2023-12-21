const fs = require('fs');
const path = require('path');
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
        // ca: fs.readFileSync(path.join(__dirname,'ca.pem')),  // Path to the CA certificate (optional, if using SSL)
        // },
        ca:process.env.ca
        }
    },
    logging: false,
    pool: {
        max: 35, // Maximum number of connection in pool
        min: 15, // Minimum number of connection in pool
        acquire: 1000000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 1000 // Maximum time, in milliseconds, that a connection can be idle before being released
    }
});

module.exports=sequelize;
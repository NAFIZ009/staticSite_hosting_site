// const fs = require('fs');
// const path = require('path');
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
        ca: `MIIEQTCCAqmgAwIBAgIUFcAoMrUgwnY2408Mxij2VPOadckwDQYJKoZIhvcNAQEM
        BQAwOjE4MDYGA1UEAwwvMjBjMjMyM2YtYTE2OS00ZGM4LWE0ZDctZmY1M2Y0MTNk
        MGJhIFByb2plY3QgQ0EwHhcNMjMxMTExMDgxODI2WhcNMzMxMTA4MDgxODI2WjA6
        MTgwNgYDVQQDDC8yMGMyMzIzZi1hMTY5LTRkYzgtYTRkNy1mZjUzZjQxM2QwYmEg
        UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKhRlaGd
        d7P8toHA2qdsIC5pGVRETBKDUUaC5d9DiPtTHXCiuh4avlGEU4GAXEPpD7mXfoIH
        lN3qCybRMDv0r8oNyTpzMrhAN5gStFunSGxeu73fFLdvYFTibFRNPRnO/2ewo6jO
        7yYrFOMLtx8lpeVtIqGOuSEhh2oKqRrduOF0ZdfDj3VT5wQQsnlngfDkSLMEdC7k
        E8eNcO8fI0shqFTZrwOHAM9615bOWBBBzDuyG14uUmSe5SPbyXcIR/FSjmUVR+wx
        aPsQ7HAj8F8rPcXnoZ3uB4wDDuhkgms2du8iI9Z4/muU51jY/KNGFiRryj3HRleG
        nmS1TAdPnkws+/joYI6mqw6iY4O56ZpgRz2oQjQjWeXtM+aSrDdBNRrkFFsjzQLM
        dNXhN0bYwgLFk3qPrXvhH9dSyyxZp6Cjoz9EOtJvlXz5Rd0YZ1v2kvlflk3jcK4w
        Gxp6ZaS3b+j6GeF6jwkVwl49mlN4AN6e0WafDi+eQtBPTvQNj8j766pEYQIDAQAB
        oz8wPTAdBgNVHQ4EFgQUATnpAKOWJcmmNsqxSm7ncop+0/EwDwYDVR0TBAgwBgEB
        /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAYHykrP5Hy8yhaQ
        BDAS4dZryp7DhRx88JkozigCVTtPPa7wFf9l5FFTlrWZ3XEYIPhQ/Y751hfEGZVF
        51bhpBQ2zWNEe9W4Ce4GVxVpJqHZg3F/NYU1G5VnKNOY09druJzUH4vsnidIXQQ8
        R40RAH1KGc5gBn/RMuWRkjCxccpVYVh+LI1p/k2zeYy27fKGtPd+CH1FO+QVLB7F
        ytvLQbBJXdCyvDTnoVh1HvsoSnFoMcQczEsS24DHDJFMr9UZDL0M9BEVmV1MXwWg
        HAqO/OAuBTfzzn+/Qo2sggt4a84tRK9SljiHPKDPdv1j7mq2zWz3lNweR2LW/sXM
        u3miz/An74CQ7QQZ+t1zSBILkkKJ4grQoOy0G+cQivL2yWmi+1GufZReZIwrhOwy
        rheLJXjyqZAz0RNGgNISbvgp1EJSN4NCFZFYjhodfEryIe/BUSEpQAQqJLhQJXZ1
        el1teEaGjCmHb99+lC261vtLUA8vXZtfZxvW72eLlTeOwWVXXA==`,  // Path to the CA certificate (optional, if using SSL)
        },
    },
    logging: false,
    pool: {
        max: 35, // Maximum number of connection in pool
        min: 15, // Minimum number of connection in pool
        acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10 // Maximum time, in milliseconds, that a connection can be idle before being released
    }
});

module.exports=sequelize;
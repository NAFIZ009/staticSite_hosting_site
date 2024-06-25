const admin = require('firebase-admin');

const config = {
  "type": "service_account",
  "project_id": "statichostingsite",
  "private_key_id": "04604765f763de0552b7b3ffffb63f99309eb554",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOeqH8a3rY9pJc\nK2nqMv+zDgAmd2FK7u4piGIXbbfsXqxr/hKxJmsgzHDVlPo7B5QuQkQInyX2An+/\ns7u1M6LMnj88E0PfEw7EfAMP7vskmWALONxPBX8BakOyUfP1T8MjK65F3YSZMn1x\nwLk4iAlqzh6/eIYKVYCGZhsg6a9mZ4M366ECRrZv+OkJFN57kg7q6I0khnnC4KKW\nfoqErqxtkUGXNQw4Lna2tJYFKjspSQl9BUiceJIYY/RwhD/PgLUtklSEKx9fDbK4\n+blqDEY/eGkUlLjk5PkRMiSt7NxZUm1UuKt9nkLeaCt/gqsECHmEWnjV8o1i/eSK\nKyllkmTBAgMBAAECggEAAakkfYwo8aHLdO9Zf3jIe8Oxrd2L6cTn2fqGM/PtxhwY\nY/T2vM/eKOhDzG0Sq2DOA7DofIt2WCT03j0MaIFJdmKpXrGOytr1ralJRaEM6627\nwveAlzgX9XBf+y7ksWWiuE86JHWqNBy0qIBwr1vj5m6wZUh/WiNC/s4K/ASrgbaZ\nmUGHe6y0ZjABEN0QS8pLgTM5Zayj/iys7Oxv4jeVgPXBvpVuyQNmtmYwrcXDWyQI\nLR2YWgFO2LT6uKbws6evo8qxe+0qQHTJNVPjAnuwOMEN/jgc26Xrhp/AHA/yu1Rt\nYos/8sjkuE6UpMXgDcRdNIvzHfI/kSiiE3Dp5X/FfQKBgQDAiJhjlWT8DcFqPGbu\n89cJ1bL6aw5Sr/HNOg+bgJ2i3acoiahD1WSDYTqJT5sHhA/h4he5cr+Zc8Km8Eju\nqEqrG4jivLgA1cNFTAukwAzylvITqlAI/5mbkTUwG9i5D18DUROLwjYHG4KT0TMo\nKuDbias7dWnV+r1BGbqKa0kvSwKBgQC9chDSv9GUedaiEcixPtjb63JKqzt+kSBc\njT2MYYWkut9S6nN8wiA+nkTsqUWw+l1REwRztG4tB5aVhx9FaRBeeV4tKxAV1pSt\nbxhXtuhp45nIAubmalb/x6ZlRfxDjdqZPVW4UKqRhiNY0bKLH3dGZFi9neOM0kWW\nMgkHLPbYowKBgHbl4/XblHlzpTYOByMZwnp4Vgb/heDaduDeMjU9wBuL9ma6XAdI\nCMJ5kMSrPHnvvD8qeKw1iM0jB9pAGUoI89OnNWmQUbFyURzCUY50a4qEXQp36uUj\ns6C2k7oZ+ESQkYRi1UdBsEvDWWgfkRAFKsdoxS363Fkgdy90zBYfGxrxAoGBAJY/\nhhovab+xFcn6AsqYRpO82ytfPNM3tIvStPLGUaEBWKdBLJDQwZQIIC/2XEBtgF8R\njyFZA1yRPRugS+vX1NSou0llct9vDQG0L4E5noCEs21O5+PsiM1ZgZ2mcNj/A1Uv\nsPF6gJzj3trNjSYLsaRRZ5QTSepgxjHFwyU+wxOzAoGAdBX7tDUGqGhzuWlRYaNw\nPOlU3ZJAvLf9QKws9VNDuP1nnIQ370zkOrMy5UvG5k5htDsgkLUb7D7Msl0H7e2c\nbz3m9jZc+g74b995GEQxj2UF2qmQcbcUzpKod0pvFh/ov0waGYOkEUcAoMvW2fD/\nz+HWC3HzRu8R86YS4n5z0Mo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hnxas@statichostingsite.iam.gserviceaccount.com",
  "client_id": "104757091471855836763",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hnxas%40statichostingsite.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

// Replace with the path to your service account key JSON file
const serviceAccount = config;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'statichostingsite.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = {bucket};
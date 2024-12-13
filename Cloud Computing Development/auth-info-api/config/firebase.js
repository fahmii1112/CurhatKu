const admin = require('firebase-admin');
const serviceAccount = require('./api-login-register-92735-firebase-adminsdk-d537a-2246f84f15.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({
    ignoreUndefinedProperties: true, 
});

const auth = admin.auth();

module.exports = { auth, db };
const admin = require('firebase-admin');
const dotenv = require('dotenv').config();
const {
  FIREBASE_SERVICE_ACCOUNT_TYPE,
  FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
} = process.env;

const serviceAccount = {
  type: FIREBASE_SERVICE_ACCOUNT_TYPE,
  project_id: FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url:
    FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
};
// initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// checkung the Authentication (is the user logged in or not)
// and adding the e-mail to the request

async function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    try {
      const auth = await admin.auth().verifyIdToken(req.headers.authtoken);
      if (auth) {
        req.email = auth.email;
        next();
      }
    } catch (error) {
      console.log('ERROR in controller/auth checkAuth:', error);
      res.send('Unauthorized');
      res.status(403);
    }
  } else {
    res.send('Unauthorized');
    res.status(403);
  }
}

module.exports = { checkAuth };

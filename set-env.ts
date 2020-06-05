const fs = require('fs');

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.prod.ts';
// Load node modules
const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: true,
  firebaseAPIKey: '${process.env.FIREBASE_API_KEY}',
  databaseUrl: '${process.env.DATABASE_URL}',
  signUpUrl: '${process.env.SIGNUP_URL}',
  signInUrl: '${process.env.SIGNIN_URL}',
  sendResetPasswordUrl: '${process.env.RESET_PASSWORD_URL}',
  refreshTokenUrl:'${process.env.REFRESH_TOKEN_URL}',
  authDataStoreKey: '${process.env.AUTH_DATA_STORE_KEY}'

};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});
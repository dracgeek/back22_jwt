const base64 = require('base64url');
const crypto = require('crypto');
const verifyToken = crypto.createVerify('RSA-SHA512');
const fs = require('fs');

const header = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9';
const payload = 'eyJzdWIiOiJJbml0aWFsaXplVmFsaWRhdGlvbiIsIm5hbWUiOiJKb2huIFJvZHJpZ3VleiIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9';
const signature = 'Xyw_W9H0n_9JiwUIPKt24guk_j2TUYrK_KP_zFulD89SimsnJwPcB4mxvIDU0V1q_DIbuyaGb8g-D0MRudIsd7sqnGR-qQ1kV5y04_KFe1bSWPz5xFuKBb8_mOZwzTfeww1UPWe_1hABvI6R2zYk-tubduf7Euiw-44aWeswju8';

const JWT = header + '.' + payload + '.' + signature;

const PUB_KEY = fs.readFileSync(__dirname + '/certificate.pem', 'utf8');

const jwtHeader = JWT.split('.')[0];
const jwtPayload = JWT.split('.')[1];
const jwtSignature = JWT.split('.')[2];

verifyToken.write(jwtHeader + '.' + jwtPayload);
verifyToken.end();

const jwtSignatureBase64 = base64.toBase64(jwtSignature);
const signatureIsValid = verifyToken.verify(PUB_KEY, jwtSignatureBase64, 'base64');


console.log(signatureIsValid); 
console.log('============= TOKEN =============');
console.log(JWT);
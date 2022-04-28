const base64 = require('base64url');
const crypto = require('crypto');
const signature = crypto.createSign('RSA-SHA512');
const fs = require('fs');

const header = {
    typ: 'JWT',
    alg: 'RS512'
};

const payload = {
   sub: "InitializeValidation",
   name: 'John Rodriguez',
   admin: true,
   iat: 1516239022
};

const headerString = JSON.stringify(header);
const payloadString = JSON.stringify(payload);

const base64UrlHeader = base64(headerString);
const base64UrlPayload = base64(payloadString);

console.log('Header');
console.log(base64UrlHeader); 
console.log('=============');

console.log('Payload');
console.log(base64UrlPayload); 
console.log('=============');

signature.write(base64UrlHeader + '.' + base64UrlPayload);
signature.end();


const PRIV_KEY = fs.readFileSync(__dirname + '/privatekey.pem', 'utf8');


const signatureBase64 = signature.sign(PRIV_KEY, 'base64');
const signatureBase64Url = base64.fromBase64(signatureBase64);

console.log(signatureBase64Url); 
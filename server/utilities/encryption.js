'use strict';
var crypto = require('crypto');

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}
exports.generateSalt = generateSalt;

function generateHashedPassword(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}
exports.generateHashedPassword = generateHashedPassword;

function encrypt(text, key) {
    var cipher = crypto.createCipher('aes192', key);
    var result = cipher.update(text, 'binary', 'hex');
    result += cipher.final('hex');
    return result;
}
exports.encrypt = encrypt;

function decrypt(text, key) {
    var decipher = crypto.createDecipher('aes192', key);
    var result = decipher.update(text, 'hex', 'binary');
    result += decipher.final('binary');
    return result;
}
exports.decrypt = decrypt;
//# sourceMappingURL=encryption.js.map

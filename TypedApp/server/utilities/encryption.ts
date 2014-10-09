'use strict';

import crypto = require('crypto');

export function generateSalt() {
	return crypto.randomBytes(128).toString('base64');
}

export function generateHashedPassword(salt: string, pwd: string) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}

export function encrypt(text: string, key: string) {
	var cipher = crypto.createCipher('aes192', key);
	var result = cipher.update(text, 'binary', 'hex');
	result += cipher.final('hex');
	return result;
}

export function decrypt(text: string, key: string) {
	var decipher = crypto.createDecipher('aes192', key);
	var result = decipher.update(text, 'hex', 'binary');
	result += decipher.final('binary');
	return result;
}
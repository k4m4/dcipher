'use strict'
const arrify     = require('arrify');
const pAny       = require('p-any');
const pify       = require('pify');
const pTimeout   = require('p-timeout');
const rp         = require('request-promise');
const cheerio    = require('cheerio');
const hashDetect = require('hash-detector');

const services = {
	'md5': ['https://hashtoolkit.com/decrypt-md5-hash/?hash=','https://md5.gromweb.com/?md5=','https://md5hashing.net/hash/md5/'],
	'sha1': ['https://hashtoolkit.com/decrypt-sha1-hash/?hash=','https://sha1.gromweb.com/?hash=','https://md5hashing.net/hash/sha1/'],
	'sha224': ['https://md5hashing.net/hash/sha224/'],
	'sha256': ['https://hashtoolkit.com/decrypt-sha256-hash/?hash=','https://md5hashing.net/hash/sha256/'],
	'sha384': ['https://hashtoolkit.com/decrypt-sha384-hash/?hash=','https://md5hashing.net/hash/sha384/'],
	'sha512': ['https://hashtoolkit.com/decrypt-sha512-hash/?hash=','https://md5hashing.net/hash/sha512/'],
	'ripemd320': ['https://md5hashing.net/hash/ripemd320/']
}

function retrieveHash (hash, type, uri) {
	const options = {
		uri: (uri + hash),
		headers: {
			'User-Agent': 'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)'
		}
	}
	return rp(options)
		.then(function(htmlString) {
			var $ = cheerio.load(htmlString);
			let plaintext = '';
			if (type == 'md5' || type == 'sha1') {
				if (uri == services[type][0]) plaintext = $('span[title="decrypted ' + type + ' hash"]').text();
				else if (uri == services[type][1]) plaintext = $('em[class="long-content string"]').text();
				else if (uri == services[type][2]) plaintext = $('span[id="decodedValue"]').text();
			} else if (type == 'sha224' || type == 'ripemd320') {
				if (uri == services[type][0]) plaintext = $('span[id="decodedValue"]').text();
			} else if (type == 'sha256' || type == 'sha384' || type == 'sha512') {
				if (uri == services[type][0]) plaintext = $('span[title="decrypted ' + type + ' hash"]').text();
				else if (uri == services[type][1]) plaintext = $('span[id="decodedValue"]').text();
			}
			return plaintext;
		})
		.catch(() => 'Hash could not be deciphered');
}

async function dcipherHash (hash, type) {
	for (const uri of services[type]) {
		var temp = await retrieveHash(hash, type, uri);
		if (temp !== undefined && temp !== '') {
			return temp;
		}
		else continue;
	}
	return 'Hash could not be deciphered'
}

async function dcipher (hash) {
	return await hashDetect(hash).then(type => {
		if (type != 'Hash type could not be detected') {
			if (type == 'base64') return Buffer.from(hash, 'base64').toString('utf8');
			else if (type == 'md5' || type =='sha1' || type == 'sha224' || type == 'sha256' || type == 'sha384' || type == 'sha512' || type == 'ripemd320') {
				var response = dcipherHash(hash, type);
				return response;
			}
			else return 'Hash type not supported';
		}
		else return 'Hash type not supported';
	});
}

module.exports = (dests, opts) => {
  opts = opts || {};
  opts.timeout = typeof opts.timeout === 'number' ? opts.timeout : 10000;

  const p = pAny(arrify(dests).map(dcipher));
  return pTimeout(p, opts.timeout).catch(() => 'Hash could not be deciphered');
};
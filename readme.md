# dcipher [![Build Status](https://travis-ci.org/k4m4/dcipher.svg?branch=master)](https://travis-ci.org/k4m4/dcipher)

> Decipher hashes using online rainbow table attack services.


## Install

```
~ ❯❯❯ npm install dcipher
```


## Usage

```js
const dcipher = require('dcipher');

dcipher('21232f297a57a5a743894a0e4a801fc3').then(plaintext => {
    console.log(plaintext);
    //=> 'admin'
});

dcipher('8843d7f92416211de9ebb963ff4ce28125932878').then(plaintext => {
    console.log(plaintext);
    //=> 'foobar'
});

dcipher('dW5pY29ybg==').then(plaintext => {
    console.log(plaintext);
    //=> 'unicorn'
});

```


## API

### dcipher(hash, [options])

Returns the plaintext value of a hash.

#### hash

Type: `string`

Hash to decipher.

#### options

##### timeout

Type: `number`

Timeout in milliseconds after which a request is considered failed. Default: `5000`.


## Supported Hashes

- [`Base64`](https://github.com/kevva/base64-regex)
- [`MD5`](https://github.com/k4m4/md5-regex)
- [`SHA1`](https://github.com/k4m4/sha-regex)
- [`SHA224`](https://github.com/k4m4/sha-regex)
- [`SHA256`](https://github.com/k4m4/sha-regex)
- [`SHA384`](https://github.com/k4m4/sha-regex)
- [`SHA512`](https://github.com/k4m4/sha-regex)


## Credits

- `dcipher` depends on the following online rainbow table services:
  - [Hash Toolkit](https://hashtoolkit.com) - Hash Toolkit Hash Decrypter enables you to decrypt/reverse a hash in various formats into their original text. Hashes are often used to store passwords securely in a database.
  - [GromWeb](https://md5.gromweb.com) - MD5 & SHA conversion and reverse lookup service.
  - [MD5Hashing](https://md5hashing.net) - Yet another hash conversion and reverse lookup service.


## Related

- [dcipher-cli](https://github.com/k4m4/dcipher-cli) - CLI for this module


## License

MIT © [Nikolaos Kamarinakis](https://nikolaskama.me)
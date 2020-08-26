[![Build Status](https://travis-ci.org/brick9527/simple-jwt.svg?branch=master)](https://travis-ci.org/brick9527/simple-jwt)
![NPM](https://img.shields.io/npm/l/fd-simple-jwt)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/brick9527/simple-jwt/master)
![GitHub last commit](https://img.shields.io/github/last-commit/brick9527/simple-jwt)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/brick9527/simple-jwt)

# Guide

[中文文档](./README.md)

# Introduction

`fd-simple-jwt` is a JWT tool developed with pure JS. It does not include any third-part packages, so it is good for keeping the tool at a high-level of source-level customization.

# Features

- ligh-weight
- easy using
- friendly for customization
- no third-part packages

# Install

```bash
npm install fd-simple-jwt --save
```

# Usage

```js
const SimpleJWT = require('fd-simple-jwt');
```

# API

`fd-simple-jwt` includes two methods:

- encodeJWT：encode data to JWT
- decodeJWT：decode JWT to data

## encodeJWT

Generating a JWT string from some data.

It accepts 2 or 3 parameters:

- options
  - options.secretKey(**required**): The secret key for encoding
- data(**required**): The data is used for encoding the JWT body.
  - data.expire(optional): How long the JWT keeps alive (ms). If this property exists, it will check if the JWT is valid when decoding the JWT. If the JWT is out of time, it will return `new Error('JWT expired.')`.
- callback(err, jwt) (optional): Callback function. The parameter `jwt` is the JWT generating by this method. If this parameter is undefined, this method will return the `jwt` directly.

#### Directly Way

```js
const { encodeJWT } = require('fd-simple-jwt');

const options = {
  secretKey: 'secret key', // please keep the key secretly
};
const data = {
  id: 123,
};

const jwt = encodeJWT(options, data);
```

#### Callback Way

```js
const { encodeJWT } = require('fd-simple-jwt');

const options = {
  secretKey: 'secret key',
};
const data = {
  id: 123,
};

encodeJWT(options, data, function(err, jwt) {
  console.log(jwt);
})
```

## decodeJWT

Decoding JWT string.

This method accepts 2 or 3 parameters:

- jwt(**required**): The JWT string for decoding.
- secretKey(**required**): The secretKey for decoding. This value is set when encoding the JWT.
- callback(err, data) (optional): Callback function.If this parameter is undefined, this method will return the data directly.

#### Directly Way

```js
const { decodeJWT } = require('fd-simple-jwt');

const jwt = '...'; // 该值为生成的jwt字符串
const options = {
  secretKey: 'secret key',
};

const result = decodeJWT(jwt, options.secretKey);
```

#### Callback Way

```js
const { decodeJWT } = require('fd-simple-jwt');

const jwt = '...'; // 该值为生成的jwt字符串
const options = {
  secretKey: 'secret key',
};

decodeJWT(jwt, options.secretKey, function(err, data) {
  console.log(data);
})
```
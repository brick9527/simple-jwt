[![Build Status](https://travis-ci.org/brick9527/simple-jwt.svg?branch=master)](https://travis-ci.org/brick9527/simple-jwt)
![NPM](https://img.shields.io/npm/l/simple-jwt)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/brick9527/simple-jwt/master)
![GitHub last commit](https://img.shields.io/github/last-commit/brick9527/simple-jwt)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/brick9527/simple-jwt)

# 简介

`fd-simple-jwt`是一款使用纯JS开发的简单JWT工具。无任何第三方依赖包，能够保持该工具处于一个高度源码级定制的水准。

# 特色

- 轻量级
- 使用方便
- 源码级定制
- 无第三方依赖

# 安装（Install）

```bash
npm install fd-simple-jwt --save
```

中国大陆地区请使用cnpm

```bash
cnpm install fd-simple-jwt --save
```

# 使用（Usage）

```js
const SimpleJWT = require('fd-simple-jwt');
```

# API

`fd-simple-jwt`共包含两个方法：

- encodeJWT：对数据进行JWT加密操作
- decodeJWT：对JWT格式的数据进行解密操作

### encodeJWT

生成JWT字符串。该方法支持同步/异步使用。

`encodeJWT`接受2~3个参数：
- （必须）options
- - options.secretKey：加密使用的秘钥
- （必须）data：所需要加密的数据（该数据将会添加到jwt数据体中在消息发送时一同发送）
- （可选）callback(err, jwt)：回调函数。`jwt`是成功加密之后的jwt字符串。若不传入该回调函数，则会将jwt数据直接return回来。

#### 同步

```js
const { encodeJWT } = require('fd-simple-jwt');

const options = {
  secretKey: 'secret key', // secret为JWT的秘钥，用户需自行配置妥善保管
};
const data = {
  id: 123,
};

const jwt = encodeJWT(options, data);
```

#### 异步

`fd-simple-jwt`方法第三个参数传入一个回调函数即为异步方法，回调函数贯彻**错误先行原则**，第一个参数为`err`，如果在方法执行过程中出现错误，该`err`参数为一个`Error`实例；否则为`null`。第二个参数为成功生成的jwt。（如果失败或错误，则回调函数不会存在第二个形参，此时的`jwt`变量为`undefined`）

```js
const { encodeJWT } = require('fd-simple-jwt');

const options = {
  secretKey: 'secret key', // secret为JWT的秘钥，用户需自行配置妥善保管
};
const data = {
  id: 123,
};

encodeJWT(options, data, function(err, jwt) {
  console.log(jwt);
})
```

### decodeJWT

解密JWT字符串。该方法支持同步/异步使用。

`decodeJWT`接收2~3个参数：
- （必须）jwt：所需解密的jwt字符串。
- （必须）secretKey：加密/解密的秘钥。
- （可选）callback(err, data)：回调函数。`data`是成功解密之后，jwt数据体中的数据。若不传入该回调函数，则会将解密的数据直接return回来。

#### 同步

```js
const { decodeJWT } = require('fd-simple-jwt');

const jwt = '...'; // 该值为生成的jwt字符串
const options = {
  secretKey: 'secret key',
};

const result = decodeJWT(jwt, options.secretKey);
```

#### 异步

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

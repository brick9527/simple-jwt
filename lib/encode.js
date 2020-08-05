const crypto = require('crypto');

const { errorHandler, getType } = require('../util/functions');

/**
 * 
 * @param {Object} options - 加密设置
 * @property {String} secretKey - 加密秘钥
 * @param {String | Object} data - 加密数据
 */
const encode = function(options, data = {}, callback = null) {
  if (!options) {
    const error = new Error('Param \'options\' is required.');
    errorHandler(error, callback);
  }

  if (!Object.keys(options).includes('secretKey')) {
    const error = new Error('Param \'options.secretKey\' is required.');
    errorHandler(error, callback);
  }

  if (getType(options.secretKey) !== 'String') {
    const error = new Error(`Invalid type of param 'options.secretKey', expect 'string' but got ${getType(options.secretKey)}.`);
    errorHandler(error, callback);
  }

  let dataObj;
  if (getType(data) === 'String') {
    dataObj = JSON.parse(data);
  } else if (getType(data) === 'Object') {
    dataObj = JSON.parse(JSON.stringify(data));
  } else {
    const error = new Error(`Invalid param 'data', expect 'string' or 'object' but got ${getType(data)}.`)
    errorHandler(error, callback);
  }

  const jwtArr = [];
  // 第一部分加密
  const jwtHeader = {
    alg: 'sha256',
    typ: 'JWT',
  };
  const jwtHeaderStr = Buffer.from(JSON.stringify(jwtHeader)).toString('base64');
  jwtArr.push(jwtHeaderStr);

  // 第二部分加密
  const jwtBody = {
    ...data,
    startTime: new Date().toString(),
  };
  const jwtBodyStr = Buffer.from(JSON.stringify(jwtBody)).toString('base64');
  jwtArr.push(jwtBodyStr);

  // 第三部分加密
  const cryptoStr = jwtArr.join('.');
  const HmacOBJ = crypto.createHmac(jwtHeader.alg, options.secretKey);
  const cryptoResult = HmacOBJ.update(cryptoStr).digest('hex');
  const verifier = Buffer.from(cryptoResult).toString('base64');
  jwtArr.push(verifier);
  if (getType(callback) === 'Function') {
    callback(null, jwtArr.join('.'));
  }
  return jwtArr.join('.');
}

module.exports = {
  encode,
};

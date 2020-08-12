const crypto = require('crypto');

const { errorHandler, getType } = require('../util/functions');

/**
 * 根据jwt进行解密，验证jwt是否正确.（异步方法）
 * @param {String} jwt - 用户传来的jwt
 * @param {String} secretKey - 用于解密的秘钥
 * @return {Boolean | undefined} - 验证结果(false: 验证不通过)
 */
const decode = function (jwt, secretKey, callback = null) {
  if (getType(jwt) !== 'String') {
    const error = new Error(`Invalid type of second param 'jwt', expect 'string' but got ${getType(jwt)}.`);
    return errorHandler(error, callback);
  }

  if (getType(secretKey) !== 'String') {
    const error = new Error(`Invalid type of second param 'secretKey', expect 'string' but got ${getType(secretKey)}.`);
    return errorHandler(error, callback);
  }

  const jwtArr = jwt.split('.');
  if (jwtArr.length !== 3) {
    const error = new Error('Invalid jwt format.');
    return errorHandler(error, callback);
  }

  const jwtHeader = JSON.parse((Buffer.from(jwtArr[0], 'base64')).toString());
  const jwtBody = JSON.parse((Buffer.from(jwtArr[1], 'base64')).toString());
  const validatePart = jwtArr[0] + '.' + jwtArr[1];
  const HmacOBJ = crypto.createHmac(jwtHeader.alg, secretKey);
  const cryptoResult = HmacOBJ.update(validatePart).digest('hex');
  const validateResult = Buffer.from(cryptoResult).toString('base64');
  if (validateResult !== jwtArr[2]) {
    const error = new Error('Invalid jwt format.');
    return errorHandler(error, callback);
  }

  // 判断是否过期
  if (Object.keys(jwtBody).includes('expire')) {
    const pendingTime = new Date() - new Date(jwtBody.startTime);
    console.log(pendingTime, jwtBody.expire * 1000, jwtBody.expire * 1000 < pendingTime);
    if (jwtBody.expire * 1000 < pendingTime) {
      const error = new Error('JWT expired.');
      return errorHandler(error, callback);
    }
  }

  if (getType(callback) === 'Function') {
    callback(null, JSON.parse(JSON.stringify(jwtBody)));
    return true;
  }
  return { ...jwtBody };
};

module.exports = {
  decode,
};

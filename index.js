const { encode } = require('./lib/encode');
const { decode } = require('./lib/decode');

module.exports = {
  encodeJWT: encode,
  decodeJWT: decode,
};

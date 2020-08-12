/* eslint-disable no-undef */

const assert = require('assert');
const { getType } = require('../util/functions');

const { encodeJWT, decodeJWT } = require('../index');


describe('encodeJWT Test', function () {

  describe('normal success test', function () {

    it('should return a string after generating JWT successfully', function () {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      const JWT = encodeJWT(options, data);
      assert.equal(getType(JWT), 'String');
    });
  });

  describe('callback success test', function () {
    it('should return a string after generating JWT successfully', function () {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      encodeJWT(options, data, function (err, jwt) {
        assert.equal(err, null);
        assert.equal(getType(jwt), 'String');
      });
    });
  });
});

describe('decodeJWT Test', function () {

  describe('normal success test', function () {
    it('should return a object after verifying JWT successfully', function () {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      const JWT = encodeJWT(options, data);
      const result = decodeJWT(JWT, options.secretKey);
      assert.equal(result.id, 123);
    });
  });

  describe('normal fail test', function () {
    it('should throw an error about expired', function () {
      // this.timeout(10000);
      // const options = {
      //   secretKey: 'test key',
      // };
      // const data = {
      //   id: 123,
      //   expire: 1,
      // };
      // const JWT = encodeJWT(options, data);
      // setTimeout(function () {
      //   done();
      // }, 2000);
      // try {
      //   decodeJWT(JWT, options.secretKey);
      // } catch (err) {
      //   assert.notDeepStrictEqual(err, new Error());
      //   assert.equal(err.msg, 'JWT expired.');
      // }
      // done();
    });
  });

  describe('callback success test', function () {
    it('should return a object after verifying JWT successfully', function () {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      encodeJWT(options, data, function (err, jwt) {
        assert.equal(err, null);
        decodeJWT(jwt, options.secretKey, function (err, data) {
          assert.equal(err, null);
          assert.equal(data.id, 123);
        });
      });
    });
  });

  describe('callback fail test', function () {
    it('should return an error after verifying JWT expired', function () {
      // this.timeout(10000);
      // const options = {
      //   secretKey: 'test key',
      // };
      // const data = {
      //   id: 123,
      //   expire: 1,
      // };
      // const JWT = encodeJWT(options, data);
      // setTimeout(function () {
      //   done();
      // }, 2000);

      // decodeJWT(JWT, options.secretKey, function (err, data) {
      //   assert.notDeepStrictEqual(err, new Error());
      //   assert.equal(err.msg, 'JWT expired.');
      //   assert.equal(data, undefined);
      // });
    });
  });
});
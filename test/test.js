const assert = require('assert');
const { getType } = require('../util/functions');

const { encodeJWT, decodeJWT } = require('../index');


describe('encodeJWT Test', function() {

  describe('normal success test', function() {

    it('should return a string after generating JWT successfully', function() {
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

  describe('callback success test', function() {
    it('should return a string after generating JWT successfully', function() {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      encodeJWT(options, data, function(err, jwt) {
        assert.equal(err, null);
        assert.equal(getType(jwt), 'String');
      });
    });
  });
});

describe('decodeJWT Test', function() {

  describe('normal success test', function() {
    it('should return a object after verifying JWT successfully', function() {
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

  describe('callback success test', function() {
    it('should return a object after verifying JWT successfully', function() {
      const options = {
        secretKey: 'test key',
      };
      const data = {
        id: 123,
      };
      encodeJWT(options, data, function(err, jwt) {
        assert.equal(err, null);
        decodeJWT(jwt, options.secretKey, function(err, data) {
          assert.equal(err, null);
          assert.equal(data.id, 123);
        })
      });
    });
  });
});
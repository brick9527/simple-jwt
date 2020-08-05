/**
 * 错误处理器
 * @param {Error} error - Error实例
 * @param {Function} callback - 回调函数
 * @return {Boolean} - 如果出错，将返回false，否则没有返回值
 */
const errorHandler = function(error, callback) {
  if (!error || getType(error) !== 'Error') {
    const err = new Error('Invalid param error');
    errorHandler(err);
  }
  if (getType(callback) === 'Function') {
    callback(error);
    return false;
  }
  throw error;
};

/**
 * 获取数据的真实类型
 * @param {any} param - 要检测类型的数据
 * @return {String} - 数据的真实类型。['Number', 'String', 'Object', 'Array', 'Function', 'Symbol', 'Error', 'undefined', 'Null']
 */
const getType = function(param) {
  return Object.prototype.toString.call(param).replace(']', '').replace('[object ', '');
};

module.exports = {
  errorHandler,
  getType,
};

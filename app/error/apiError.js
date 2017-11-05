const ApiErrorNames = require('./ApiErrorNames');
class ApiError extends Error {
  constructor(error_name, error_code, error_message) {
    super();
    var error_info = ApiErrorNames.getErrorInfo(error_name);
    this.name = error_name;
    this.code = error_info.code;
    this.message = error_info.message;
  }
}

module.exports = ApiError;
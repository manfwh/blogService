var ApiErrorNames = {};
ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.USER_NOT_EXIST = 'userNotExist';
ApiErrorNames.USER_EXIST = 'userExist';
ApiErrorNames.INVALID_REQUEST = 'invalidRequest';
ApiErrorNames.UNAUTHORIZED = 'unauthorized';

const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOW_ERROR, {code: -1, message: '未知错误'});
error_map.set(ApiErrorNames.USER_NOT_EXIST, {code: 101, message: '用户不存在'});
error_map.set(ApiErrorNames.USER_EXIST, {code: 102, message: '用户已存在'});
error_map.set(ApiErrorNames.INVALID_REQUEST, {code: 103, message: '请求操作失败'});
error_map.set(ApiErrorNames.UNAUTHORIZED, {code: 104, message: '没有权限'});


ApiErrorNames.getErrorInfo = (error_name) =>{
  var error_info;
  if(error_name) {
    error_info = error_map.get(error_name)
  }
  if(!error_info) {
    error_name = ApiErrorNames.UNKNOW_ERROR;
    error_info = error_map.get(error_name);
  }
  return error_info;
}

module.exports = ApiErrorNames;
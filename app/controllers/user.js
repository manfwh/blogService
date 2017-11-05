const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//获取用户
exports.get = async (ctx, next) => {
  //如果id != 1抛出API 异常
  console.log(ctx.query)
  // if (ctx.params.id != 1) {
  //   throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
  // }
  ctx.body = {
    username: '阿，希爸',
    age: 30
  }
};
exports.save = async (ctx, next) => {
  let user = ctx.request.body;
  console.log(ctx.request.body);
  let _user = await User.findOne({ name: user.name })
  if (_user) {
    throw new ApiError(ApiErrorNames.USER_EXIST);
  }
  let userModel = new User(user);
  // _user.token = jwt.sign(_user;
  try {
    let user = await userModel.save();
    user.token = jwt.sign(user, 'shhhhh')
    let _user = await user.save();
    ctx.body = _user;
  } catch (err) {
    throw new ApiError(ApiErrorNames.INVALID_REQUEST);
  }
}
exports.all = async (ctx, next) => {
  await next();
  if (ctx.status == 401) {
    throw new ApiError(ApiErrorNames.UNAUTHORIZED);
  }
  
  let allUser = await User.find({}).populate('posts', 'title content pv').exec();
  ctx.body = allUser
};

exports.remove = async (ctx, next) => {
  let id = ctx.params.id;
  console.log(id)
  try {
    let x = await User.remove({ _id: id });
    ctx.status = 204;
  } catch (err) {
    throw new ApiError(ApiErrorNames.INVALID_REQUEST);
  };
};

exports.check = async (ctx) => {
  switch (ctx.params.type) {
    case 'username':
      let name = ctx.request.body.name;
      console.log(name)
      let user = await User.findOne({ name: name });
      let isUnique = user ? false : true;
      ctx.body = {
        isUnique: isUnique
      }
      break;
  }
};

exports.authenticate = async (ctx) => {
  console.log(ctx.request.body)
  let body = ctx.request.body;
  try {
    let user = await User.findOne({ name: body.name, password: body.password });
    if (user) {
      ctx.body = {
        user: user,
        token: user.token
      };
    } else {
      throw new ApiError(ApiErrorNames.INVALID_REQUEST);
    };
  } catch (error) {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
  }


}





exports.getAll = async (ctx, next) => {
  var users = await User.find()
  console.log(users)
  // User
  // 	.find()
  // 	.populate('posts', 'title')
  // 	.exec(function(err, users){
  // 	  if(err){
  // 		 	console.log(err)
  // 		 	next(err)
  // 		  }else{  
  // 		   	res.render('list', {users: users})
  // 		  }
  // 	})

}

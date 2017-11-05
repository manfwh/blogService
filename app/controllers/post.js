const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

exports.detail = async(ctx) => {
  var postId = ctx.params.id;
  console.log(postId)
  try{
    await Post.update({_id: postId}, {$inc: {pv: 1}});
    let post = await Post.findById(postId).populate('author', 'name').exec();
    ctx.body = post;
  } catch (error) {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR);
  }
};

exports.save = async(ctx, next) =>{
  try{
    // 验证用户是否登录，并把用户token，保存到ctx.body.token中
    await next();
    // 解码并验证 token
    let reqUser = jwt.verify(ctx.body.token, 'shhhhh');
    // 获取客户端请求主体
    let reqPost = ctx.request.body;
    // 根据请求的主体，把数据存为模型
    let postModel = new Post({
      title: reqPost.title,
      content: reqPost.content,
      author: reqUser._doc._id
    });
    // 保存在数据库
    let newPost = await postModel.save();
    // 找到用户，并把文章id添加到user.posts
    let user = await User.findById(newPost.author);
    user.posts.push(newPost._id);
    await user.save();
   
    ctx.body = newPost;
    
  } catch(err) {

  }
  
  // let post = new Post(_postObj);
  // try{
  //   let _post = await post.save();
  //   let user = await User.findById(_post.author);
  //   user.posts.push(_post._id);
  //   await user.save();
  // } catch(error) {
  //   throw new ApiError(ApiErrorNames.UNKNOW_ERROR);    
  // }
}

/**
 * 根据文章id删除一篇文章
 */
exports.remove = async (ctx) =>{
  let id = ctx.params.id;
  try{
    await Post.remove({_id: id});
    ctx.status = 204;
  } catch(error) {
    throw new ApiError(ApiErrorNames.UNKNOW_ERROR);            
  }
}
// 查找所有文章
exports.all = async (ctx) =>{
  let posts = await Post.find({}).populate('author', 'name')
		.exec();
  ctx.body = posts;
}
# blogService
基于koa2，restful风格的博客API服务

以下路径均已```/api```为前缀
## user
### get /users 获取所有user
### get /users/:id 获取user详情
### post /users 注册user
  接收 post 参数
  -  name ```String``` 用户名
  -  password ```String``` 用户密码
  
  返回值示例
  ```
  {}
  ```
  ### delete /users/:id 删除user
  ### post /users/authenticate 登录 
  接收 post 参数 同注册
  
  ## 文章
  ### get /posts/:id 获取文章详情
  ### post /posts 保存文章
  接收 post 参数
  -  title ```String``` 文章标题
  -  content ```String``` 文章内容
  ### delete /posts/:id 删除一篇文章
  ### get /posts 获取所有文章



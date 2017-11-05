const router = require('koa-router')();
const Post = require('../../app/controllers/post');
const ensureAuthorized = require('../../middlewares/ensureAuthorized');


// router.get('/', User.all, ensureAuthorized);
// router.post('/', User.save);
// router.delete('/:id', User.remove);
// router.get('/:id', User.get);
// router.post('/check/:type', User.check);
// router.post('/authenticate', User.authenticate);


// 根据id获取文章详情
router.get('/:id', Post.detail);
// 保存文章
router.post('/', Post.save, ensureAuthorized);
// 根据ID删除一篇文章
router.delete('/:id', Post.remove);
// 查找所有文章
router.get('/', Post.all);

// 更新文章
// router.put('/:id', Post.update());

module.exports = router;
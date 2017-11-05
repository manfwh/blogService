const router = require('koa-router')();

const user_router = require('./users');
const post_router = require('./post');

router.prefix('/api')
router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use('/posts', post_router.routes(), post_router.allowedMethods());

module.exports = router;
const router = require('koa-router')();
const User = require('../../app/controllers/user');
const ensureAuthorized = require('../../middlewares/ensureAuthorized');


router.get('/', User.all, ensureAuthorized);
router.post('/', User.save);
router.delete('/:id', User.remove);
router.get('/:id', User.get);
router.post('/check/:type', User.check);
router.post('/authenticate', User.authenticate);

module.exports = router;
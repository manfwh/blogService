const Koa = require('koa')
const app = new Koa()
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')


const api = require('./routes/api');
const response_formatter = require('./middlewares/response_formatter')

// const logUtil = require('./utils/log_util');
// onerror(app)

// middlewares
app.use(logger())
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(require('koa-static')(__dirname + '/public'))



app.use(response_formatter('^/api'));
app.use(api.routes(), api.allowedMethods());

module.exports = app;

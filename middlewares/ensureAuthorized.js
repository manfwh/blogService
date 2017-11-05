module.exports = async (ctx) => {
  let bearerToken;
  let bearerHeader = ctx.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];
    ctx.body = {
      token: bearerToken
    }
  } else {
    ctx.status = 401;
  }
};

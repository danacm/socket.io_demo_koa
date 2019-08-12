const koa = require('koa'),
  koaBody = require('koa-body'),
  logger = require('koa-logger'),
  json = require('koa-json'),
  cors = require('@koa/cors'),
  static = require('koa-static'),
  koaViews = require('koa-views'),
  koaNunjucks = require('koa-nunjucks-2'),
  path = require('path'),
  router = require('./api'),
  app = new koa(),
  server = require('http').createServer(app.callback()),
  creatSocket = require('./socket');
//io = require('socket.io')(app);

// 使用各种中间件
app.use(logger()); //控制台日志
app.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, 'uploads')
  }
}));
app.use(json()); //响应json化
app.use(cors()); //设置跨域cors
//静态文件
app.use(static(
  path.join(__dirname, './')
));
//模板渲染
// app.use(koaViews(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }));//ejs模板
app.use(koaNunjucks({
  ext: 'njk', //njk,html
  path: path.join(__dirname, './views'),
  nunjucksConfig: {
    trimBlocks: true
  }
})); //Nunjucks模板
//使用路由
app.use(router.routes());
//websocket
creatSocket(server);

server.listen(3500);
console.log(`-----------服务运行成功，本地端口：3500----------`);

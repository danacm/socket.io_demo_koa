const Router = require('koa-router'),
    Mock = require('mockjs'),
    fs = require('fs'),
    path = require('path'),
    Random = Mock.Random,
    address = require('../mysql/doctor/addressInfos');
let doctor = new Router();

doctor.get('/addressInfos', async (ctx, next) => {
    let req_query = ctx.request.query;
    //console.log('req_query:', req_query.pageSize);\
    let data = await address.getAddressInfos({
        pageSize: req_query.pageSize,
        pageNum: req_query.pageNum
    });
    ctx.response.status = 200;
    ctx.body = data;       
    await next();
});


module.exports = doctor;
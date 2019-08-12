const queryDB = require('../../config/db'),
db = 'biz_doctor';
let getAddressInfos = async function (para = {
    pageSize: 10,
    pageNum: 1,
}) {
    let sql = `SELECT * FROM t_address_info LIMIT ${(para.pageNum-1)*para.pageSize}, ${(para.pageNum*para.pageSize)};`;
    let res = await queryDB(sql, {},db);
    //console.log('result',JSON.stringify(res))
    return res;
}
module.exports = {
    getAddressInfos
};
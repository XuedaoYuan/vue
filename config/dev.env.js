'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   BASE_API: '"localhost:8080"'
// })

module.exports = {
    NODE_ENV: '"development"',
    // BASE_API: '"http://localhost:8080/src"',
    // BASE_API: '"http://192.168.1.112:8080/cotton-web/"',
    // BASE_API: '"http://10.22.209.249:8080/cotton-web/"',  //欧珀全
    // BASE_API: '"http://10.22.208.255:8080/cotton-web/"',  //钱凯
    // BASE_API: '"http://cottontest.zjmiec.cn/cotton/"',  //测试服务器
    BASE_API: '"http://10.22.209.240:8080/cotton-web/"',  //勇平
}
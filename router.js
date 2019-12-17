// 二、路由
const fs = require('fs')
const urlm = require('url')//url模块
const path = require('path')//拼接路径模块
const Show = require('./controller')//业务的实现
//封装
function router(req, res) {//服务器中传的req,res
    let url = req.url//路径
    let method = req.method//方式
    let query = urlm.parse(url, true).query//get请求?后面的值
    let pathname = urlm.parse(url, true).pathname//get请求?前面的地址

    if ((pathname === '/' || pathname === '/index.html' || pathname === '/index') && method === 'GET') {//首页的判断
        Show.showIndex(null,res)
    } else if ((pathname === '/add' || pathname === '/add.html') && method === 'GET') {//英雄添加页
        Show.showAdd(null,res)

    } else if ((pathname === '/edit' || pathname === '/edit.html') && method === 'GET') {//英雄编辑页

        Show.showEdit(null,res)
    } else if ((pathname === '/info' || pathname === '/info.html') && method === 'GET') {//英雄查看页
        Show.showInfo(null,res)

    } else if (pathname.startsWith('/node_modules') && method === 'GET') {// 样式以node开头的
       Show.loadStaticResource(req, res,pathname)
    } else {
        res.end('404')
    }
}
//暴露方法
module.exports = router;
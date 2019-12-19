// 二、路由
const fs = require('fs')
const urlm = require('url')//url模块
const path = require('path')//拼接路径模块
const Show = require('./controller')//业务的实现
//封装
function router(req, res) {//服务器中传的req,res
    let url = req.url//路径
    let method = req.method//方式
    let query = urlm.parse(url, true).query//get请求   ?后面的值
    let pathname = urlm.parse(url, true).pathname//get请求 ?前面的地址
    //暴露 query pathname
    req.query = query
    req.pathname = pathname;
    if ((pathname === '/' || pathname === '/index.html' || pathname === '/index') && method === 'GET') {//首页的判断
        Show.showIndex(req, res)
    } else if ((pathname === '/add' || pathname === '/add.html') && method === 'GET') {//英雄添加页
        Show.showAdd(req, res)

    } else if ((pathname === '/edit' || pathname === '/edit.html') && method === 'GET') {//英雄编辑页

        Show.showEdit(req, res)
    } else if ((pathname === '/info' || pathname === '/info.html') && method === 'GET') {//英雄查看页
        Show.showInfo(req, res)

    } else if (pathname === '/xinjianyingxiong' && method === 'POST') {//添加英雄
        Show.xinjianyingxiong(req, res)
    } else if (pathname === '/yingxiongbianji' && method === 'POST') {//英雄编辑
        Show.yingxiongbianji(req, res)
    } else if (pathname.startsWith('/node_modules') && method === 'GET') {// 样式以node开头的
        Show.loadStaticResource(req, res)
    } else if (pathname === '/shanchuyingxiong' && method === 'GET') {//删除英雄
        Show.shanchuyingxiong(req, res)
    } else {
        res.end('404')
    }
}
//暴露方法
module.exports = router;
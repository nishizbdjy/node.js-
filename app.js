const http = require('http')//http
const fs = require('fs')//读写文件
const path = require('path')//拼接路径模块
const template = require('art-template')//模板引擎
const urlm = require('url')//url模块
const bindRender = require('./bindRender')//读取数据渲染页面

const server = http.createServer()//创建一个web服务器

server.listen(3010, () => {//监听端口
    console.log('http://127.0.0.1:3010')
})

server.on('request', (req, res) => {//监听用户请求
    let url = req.url//路径
    let method = req.method//方式
    let query = urlm.parse(url, true).query//get请求&后面的值
    let pathname = urlm.parse(url, true).pathname//get请求&前面的地址

    if ((pathname === '/' || pathname === '/index.html' || pathname === '/index') && method === 'GET') {//首页的判断

        fs.readFile(path.join(__dirname, './heros.json'), 'utf-8', (err, data) => {//读取数据
            if (err) return console.log(err.message);
            let shuju = JSON.parse(data)            //转换为数组   [{}{}{}]   换{obj : [{},{},{}]}
            // let str = template(path.join(__dirname, './views/index.html'), { data: shuju })//渲染模板
            // res.end(str)                           //返回
            bindRender('index',{data:shuju},res)
        })
    } else if ((pathname === '/add' || pathname === '/add.html') && method === 'GET') {//英雄添加页
        // fs.readFile(path.join(__dirname, './views/add.html'), 'utf-8', (err, data) => {
        //     if (err) return console.log(err.message)
        //     res.end(data)
        // })
        bindRender('add',{},res)
    } else if ((pathname === '/edit' || pathname === '/edit.html') && method === 'GET') {//英雄编辑页
        // fs.readFile(path.join(__dirname, './views/edit.html'), 'utf-8', (err, data) => {
        //     if (err) return console.log(err.message)
        //     res.end(data)
        // })
        bindRender('edit',{},res)
    } else if ((pathname === '/info' || pathname === '/info.html') && method === 'GET') {//英雄查看页
        // fs.readFile(path.join(__dirname, './views/info.html'), 'utf-8', (err, data) => {
        //     if (err) return console.log(err.message)
        //     res.end(data)
        // })
        bindRender('info',{},res)
    } else if (pathname.startsWith('/node_modules') && method === 'GET') {// 样式以node开头的
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) return console.log(err.message)
            if (pathname.endsWith('.css')) { //如果是 css 就设置响应头以css解析
            res.writeHeader(200, {
             'Content-Type': 'text/css;charset=utf-8;'
            })
            }
            res.end(data)
        })
    }  else {
        res.end('404')
    }
})

    // else if ((url === '/add' || url === '/add.html') && method === 'GET') {//add
    //     fs.readFile(path.join(__dirname, './views/add.html'), 'utf-8', (err, data) => {
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
    // } else if ((url === '/edit' || url === '/edit.html') && method === 'GET') {//edit
    //     fs.readFile(path.join(__dirname, './views/edit.html'), 'utf-8', (err, data) => {
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
    // } else if ((url === '/info' || url === '/info.html') && method === 'GET') {//info
    //     fs.readFile(path.join(__dirname, './views/info.html'), 'utf-8', (err, data) => {
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
    // } else if (url === '/node_modules/bootstrap/dist/css/bootstrap.css' && method === 'GET') {//bootstrap
    //     fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), 'utf-8', (err, data) => {
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
    // } else if (url === '/node_modules/jquery/dist/jquery.js' && method === 'GET') {
    //     fs.readFile(path.join(__dirname, './node_modules/jquery/dist/jquery.js'), 'utf-8', (err, data) => {//jQuery
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
/*}*/



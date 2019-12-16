const http = require('http')//http
const fs = require('fs')//读写文件
const path = require('path')
const template = require('art-template')//模板引擎
const server = http.createServer()//创建一个web服务器
server.listen(3010, () => {//监听端口
    console.log('http://127.0.0.1:3010')
})
server.on('request', (req, res) => {//监听用户请求
    let url = req.url//路径
    let method = req.method//方式
    if ((url === '/' || url === '/index.html' || url === '/index') && method === 'GET') {//首页的判断
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf-8', (err, data) => {
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if ((url === '/add' || url === '/add.html') && method === 'GET') {//add
        fs.readFile(path.join(__dirname, './views/add.html'), 'utf-8', (err, data) => {
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if ((url === '/edit' || url === '/edit.html') && method === 'GET') {//edit
        fs.readFile(path.join(__dirname, './views/edit.html'), 'utf-8', (err, data) => {
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if ((url === '/info' || url === '/info.html') && method === 'GET') {//info
        fs.readFile(path.join(__dirname, './views/info.html'), 'utf-8', (err, data) => {
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if (url === '/node_modules/bootstrap/dist/css/bootstrap.css' && method === 'GET') {//bootstrap
        fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), 'utf-8', (err, data) => {
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if (url === '/node_modules/jquery/dist/jquery.js' && method === 'GET') {
        fs.readFile(path.join(__dirname, './node_modules/jquery/dist/jquery.js'), 'utf-8', (err, data) => {//jQuery
            if (err) return console.log(err.massage)
            res.end(data)
        })
    } else if (url === '/favicon.ico' && method === 'GET') {
        res.end('')
    }
    // else {
    //     console.log(path.join(__dirname, url))
    //     fs.readFile(path.join(__dirname, url), 'utf-8', (err, data) => {
    //         if (err) return console.log(err.massage)
    //         res.end(data)
    //     })
    // }
})



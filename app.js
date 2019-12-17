const http = require('http')//http

const router = require('./router')//路由模块

const server = http.createServer()//创建一个web服务器

server.listen(3010, () => {//监听端口
    console.log('http://127.0.0.1:3010')
})

server.on('request', (req, res) => {//监听用户请求
    router(req,res)
})

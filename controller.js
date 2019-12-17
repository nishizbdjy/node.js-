//三、实现业务逻辑
const fs = require('fs')//读写文件
const path = require('path')//拼接路径模块
const bindRender = require('./bindRender')//读取数据渲染页面
Show = {   //使用es6新语法
    showIndex(req, res) {//首页
        fs.readFile(path.join(__dirname, './heros.json'), 'utf-8', (err, data) => {//读取数据
            if (err) return console.log(err.message);
            let shuju = JSON.parse(data)
            bindRender('index', { data: shuju }, res)
        })
    },
    showAdd(req, res) {//英雄添加页

        bindRender('add', {}, res)
    },
    showEdit(req, res) {//英雄编辑页

        bindRender('edit', {}, res)
    },
    showInfo(req, res) {//英雄查看页

        bindRender('info', {}, res)
    },
    //js、css 的业务
    loadStaticResource(req, res,pathname) {//传入req,res请求的路径
        fs.readFile(path.join(__dirname, pathname), 'utf-8', (err, data) => {
            if (err) return console.log(err.message)
            if (pathname.endsWith('.css')) { //如果是 css 就设置响应头以css解析
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8;'
                })
            }
            res.end(data)
        })
    }
}

//暴露接口
module.exports = Show;
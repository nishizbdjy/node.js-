//三、实现业务逻辑
const fs = require('fs')//读写文件
const path = require('path')//拼接路径模块
const bindRender = require('./bindRender')//读取数据渲染页面
Show = {   //使用es6新语法
    showIndex(req,res) {//首页
        fs.readFile(path.join(__dirname, './heros.json'), 'utf-8', (err, data) => {//读取数据
            if (err) return console.log(err.message);
            let shuju = JSON.parse(data)
            bindRender('index', { data: shuju }, res)
        })
    },
    showAdd(req,res) {//英雄添加页

        bindRender('add', {}, res)
    },
    showEdit(req,res) {//英雄编辑

        bindRender('edit', {}, res)
    },
    showInfo(req,res) {//英雄查看

        bindRender('info', {}, res)
    },
}

//暴露接口
module.exports = Show;
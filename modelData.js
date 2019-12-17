//查看页面  增删改查逻辑的实现 
const path = require('path')
const fs = require('fs')
module.exports = {

    huoQuQuanBu(callback) {//传入一个回调函数
        //获取全部数据
        fs.readFile(path.join(__dirname , './heros.json'), 'utf-8', (err, data) => {//读取文件
            if (err) return callback(err)//如果失败执行回调函数 返回失败数据
            callback(null, data)//否则将成功的数据返回
        })
    },
    xunhuan(id, callback) {//将全部数据循环
        //执行上面的函数
        console.log(id)
        this.huoQuQuanBu((err, data) => {//回调函数
            if (err) return callback(err)//如果有说明上面获取全部数据失败,使用回调返回失败数据
            let datadx = JSON.parse(data)//否则成功 转换为对象 循环数组
            let obj;//存储数据
            datadx.some(item => {
                if (id === item.id) {
                    obj = item
                }
            })
            //如果成功返回数据
            callback(null, obj)//?????????为什么要放在回调函数里面
        })

    }
}//暴露
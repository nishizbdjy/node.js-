//查看页面  增删改查逻辑的实现 
const path = require('path')
const fs = require('fs')
const moment = require('moment')//日期模块
module.exports = {
    //获取全部数据
    huoQuQuanBu(callback) {//传入一个回调函数
        //获取全部数据
        fs.readFile(path.join(__dirname, './heros.json'), 'utf-8', (err, data) => {//读取文件
            if (err) return callback(err)//如果失败执行回调函数 返回失败数据
            callback(null, data)//否则将成功的数据返回
        })
    },
    xunhuan(id, callback) {//将全部数据循环
        //执行上面的函数
        this.huoQuQuanBu((err, data) => {//回调函数
            if (err) return callback(err)//如果有说明上面获取全部数据失败,使用回调返回失败数据
            let datadx = JSON.parse(data)//否则成功 转换为对象 循环数组
            let obj;//存储数据
            datadx.some(item => {
                if (id === item.id) {
                    obj = item;
                }
            })
            //如果成功返回数据
            callback(null, obj)//
        })
    },
    //新增英雄
    xinjianyingxiong(shuju, callback) {//传入数据
        //获取全部数据
        this.huoQuQuanBu((err, data) => {
            if (err) return callback(false)//没用获取到json数据
            let datadx = JSON.parse(data)//转换为对象
            shuju.date = moment().format('YYYY-MM-DD HH:mm:ss')//时间 
            shuju.id = (+datadx[datadx.length - 1].id + 1).toString()//ID = 数组的长度-1:最后一个,的ID+1
            datadx.push(shuju)//将新英雄数据添加到数组    id要转换为字符串
            //重新写到
            fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(datadx), (err) => {//写入进去要在转换为字符串 
                if (err) return callback(false)
                callback(true)
            })
        })
    },
    //英雄编辑
    yingxiongbianji(shuju, callback) {
        this.huoQuQuanBu((err, data) => {//data所有的数据
            if (err) return callback(false)
            let datadx = JSON.parse(data)
            shuju.date = moment().format('YYYY-MM-DD HH:mm:ss')//添加时间
            let { id } = shuju;//拿到请求的ID
            datadx.some((item, index) => {
                if (id == item.id) {
                    datadx.splice(index, 1, shuju)//从哪里截取，截取多少个，替换的数据
                    return
                }
            })
            fs.writeFile(path.join(__dirname, './heros.json'), JSON.stringify(datadx), 'utf-8', (err) => {
                if (err) return callback(false)
                callback(true)
            }) //将数据写回去 
        })
    },
    //删除英雄
    shanchuyingxiong(id,callback){
    this.huoQuQuanBu((err,data)=>{
        if(err) return callback(false)
        let datadx = JSON.parse(data)
        datadx.some((item,index)=>{
         if(id === item.id){
            datadx.splice(index,1)//找到符合ID的索引，删除
            return;
         }
        })
        //填回去
        fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(datadx),'utf-8',(err)=>{
            if(err) return callback(false)
            callback(true)
        })
    })
    }
}//暴露
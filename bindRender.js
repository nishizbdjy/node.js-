//第三方模块
               //一、读取数据渲染页面
//引入
const path = require('path')//拼接路径模块
const template = require('art-template')//模板引擎

//读取数据渲染页面
function bindRender (file,shuju,res){
 let str = template(path.join(__dirname, './views/'+file+'.html'),shuju)//渲染模板
 res.end(str)                 //返回
}

//暴露方法给外部使用
module.exports = bindRender;
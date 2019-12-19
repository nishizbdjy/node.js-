//三、实现业务逻辑
const fs = require('fs')//读写文件
const path = require('path')//拼接路径模块
const bindRender = require('./bindRender')//读取数据渲染页面
const modeData = require('./modelData')//引入处理逻辑
const querystring = require('querystring')//post请求获取url后内容
Show = {   //使用es6新语法
    showIndex(req, res) {//首页
        modeData.huoQuQuanBu((err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 404,
                msg: '数据获取失败'
            }))
            let shuju = JSON.parse(data)
            bindRender('index', { data: shuju }, res)
        })
    },
    showAdd(req, res) {//英雄添加页
        bindRender('add', {}, res)
    },
    xinjianyingxiong(req, res) {//英雄添加
        let shuju = '';//必须要赋值不然是undefined+
        req.on('data', chunk => {// post 请求的方式
            shuju += chunk;
        })
        req.on('end', () => {//数据接受完成
            shuju = querystring.parse(shuju)//将数据转换为对象
            modeData.xinjianyingxiong(shuju, (sfcg) => {
                if (sfcg) res.end(JSON.stringify({
                    code: 200,
                    msg: '新增成功'
                }))
                res.end(JSON.stringify({
                    code: 404,
                    msg: '新增失败'
                }))
            })
        })
    },
    showEdit(req, res) {//英雄编辑页 
        let { id } = req.query
        modeData.xunhuan(id, (err,data) => {
            if (err) return console.log('数据加载失败')
            bindRender('edit', data, res)            
        })
    },
    yingxiongbianji(req,res){//英雄编辑
      let str = '';
      req.on('data',chunk=>{
        str+=chunk
      })
      req.on('end',()=>{
          let shuju = querystring.parse(str)
          modeData.yingxiongbianji(shuju,(err)=>{
              if(err) return res.end(JSON.stringify({
                  code : 200,
                  msg : '修改成功'
              }))
              res.end(JSON.stringify({
                  code : 401,
                  msg : '修改失败'
              }))
          })
      })
    
    },
    showInfo(req, res) {//英雄查看页
        let id = req.query.id// 获取id
        modeData.xunhuan(id, (err, data) => {//调用
            if (err) return res.end(JSON.stringify({//如果有错误信息 返回错误
                code: 401,
                msg: '你查找的英雄不存在'
            }))
            bindRender('info', data, res)//没有错误信息说明成功 渲染到页面
        })
    },
    //英雄删除
    shanchuyingxiong(req,res){
     let {id} = req.query
     modeData.shanchuyingxiong(id,(err)=>{
         if(err) return res.end(JSON.stringify({
             code : 200,
             msg : '删除成功',
         }))
         res.end(JSON.stringify({
             code : 401,
             msg : '删除失败',
         }))

     })
    },
    //js、css 的业务
    loadStaticResource(req, res) {//传入req, req.pathname = pathname 暴露的
        fs.readFile(path.join(__dirname, req.pathname), 'utf-8', (err, data) => {
            if (err) return console.log(err.message)
            if (req.pathname.endsWith('.css')) { //如果是 css 就设置响应头以css解析
                res.writeHeader(200, {
                    'Content-Type': 'text/css;charset=utf-8;',
                })
            }
            res.end(data)
        })
    }
}

//暴露接口
module.exports = Show;
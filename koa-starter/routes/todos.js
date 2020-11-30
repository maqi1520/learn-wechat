const router = require('koa-router')()

const cloudbase = require('@cloudbase/node-sdk')

const app = cloudbase.init({
  secretId: process.env.secretId,
  secretKey: process.env.secretKey,
  env: 'next-5g925nky83ece5ae',
})

// 1. 获取数据库引用
var db = app.database()

router.prefix('/todos')

router.get('/', async function (ctx, next) {
  const { openid } = ctx.request.query
  let where = {}
  if (openid) {
    where.openid = openid
  }
  // 2. 构造查询语句
  const res = await db
    // collection() 方法获取一个集合的引用
    .collection('todos')
    // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
    .where(where)
    // get() 方法会触发网络请求，往数据库取数据
    .get()
  ctx.body = res
})

router.post('/', async function (ctx, next) {
  const { name, openid } = ctx.request.body
  const res = await db.collection('todos').add({
    openid,
    completed: false,
    name,
    updateTime: new Date(),
    createTime: new Date(),
  })
  ctx.body = res
})

router.put('/:id', async function (ctx, next) {
  const { id } = ctx.params
  const res = await db
    .collection('todos')
    .doc(id)
    .update({ ...ctx.request.body, updateTime: new Date() })
  ctx.body = res
})

router.post('/toggle', async function (ctx, next) {
  const { openid, completed } = ctx.request.body
  let where = {}
  if (openid) {
    where.openid = openid
  }
  const res = await db
    .collection('todos')
    .where(where)
    .update({ completed: !completed, updateTime: new Date() })
  ctx.body = res
})

router.delete('/:id', async function (ctx, next) {
  const { id } = ctx.params
  const res = await db.collection('todos').doc(id).remove()
  ctx.body = res
})

router.post('/clearCompleted', async function (ctx, next) {
  const { openid } = ctx.request.body
  let where = {
    completed: true,
  }
  if (openid) {
    where.openid = openid
  }
  const res = await db.collection('todos').where(where).remove()
  ctx.body = res
})

module.exports = router

const router = require('koa-router')()
const axios = require('axios')

const AppID = process.env.AppID
const AppSecret = process.env.AppSecret

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Tencent CloudBase + Koa',
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/login', async (ctx, next) => {
  const { JSCODE } = ctx.request.body
  const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: AppID,
      secret: AppSecret,
      js_code: JSCODE,
      grant_type: 'authorization_code',
    },
  })

  ctx.body = res.data
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
})

module.exports = router

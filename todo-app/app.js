//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    var openid = wx.getStorageSync('openid')
    
    console.log(openid);
    
    if (!openid) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/login',
            method: 'POST',
            data: {
              "JSCODE": res.code
            },
            success: (res) => {
              const openid=res.data.openid
              this.globalData.openid=openid
              wx.setStorageSync('openid', openid)
              console.log(openid);

            }
          })
        }
      })

    }else{
      this.globalData.openid=openid
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    openid:null,
    userInfo: null
  }
})
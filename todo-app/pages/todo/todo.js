const app = getApp()

Page({
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
  },

  load: function () {
    wx.request({
      url: 'https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos',
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        const todos = res.data.data
        if (todos) {
          const leftCount = todos.filter((item) => !item.completed).length
          const allCompleted = todos.every((item) => item.completed)
          this.setData({
            todos,
            leftCount,
            allCompleted
          })
        }
      }
    })
  },

  onLoad: function () {
    this.load()
  },

  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    wx.request({
      method: 'POST',
      url: 'https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos',
      data: {
        openid: app.globalData.openid,
        name: this.data.input.trim()
      },
      success: (res) => {
        this.load()
        this.setData({
          input: '',
        })
      }
    })
  },

  removeTodoHandle: function (e) {
    var id = e.currentTarget.dataset.id
    wx.request({
      method: 'DELETE',
      url: `https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos/${id}`,
      success: (res) => {
        this.load()
      }
    })
  },

  toggleAllHandle: function (e) {
    wx.request({
      method: 'POST',
      url: `https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos/toggle`,
      data: {
        openid: app.globalData.openid,
        completed: this.data.allCompleted
      },
      success: (res) => {
        this.load()
      }
    })
  },

  clearCompletedHandle: function (e) {
    wx.request({
      method: 'post',
      url: `https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos/clearCompleted`,
      data: {
        openid: app.globalData.openid
      },
      success: (res) => {
        this.load()
      }
    })
  }
})
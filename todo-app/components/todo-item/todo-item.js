// components/todo-item/todo-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeTodoHandle: function (e) {
      var id = e.currentTarget.dataset.id
      wx.request({
        method: 'DELETE',
        url: `https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos/${id}`,
        success: (res) => {
          this.triggerEvent('reload')
        }
      })
    },
    toggleTodoHandle: function (e) {
      var id = e.currentTarget.dataset.id
      var item = e.currentTarget.dataset.item
        
      wx.request({
        method: 'PUT',
        url: `https://next-5g925nky83ece5ae.service.tcloudbase.com/koa-starter/todos/${id}`,
        data: {
          openid: app.globalData.openid,
          completed: !item.completed
        },
        success: (res) => {
          this.triggerEvent('reload')
        }
      })
    },

  }
})

const app = getApp()

Page({
  data: {
    },
  toPerson:function(){
    wx.navigateTo({
      url: '../person/person'
    })
  },
  toDetail:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {

  }
})

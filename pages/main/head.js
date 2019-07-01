// pages/main/head.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDown:3,
    num:0
  },
  jump:function(){
    clearInterval(this.data.num);
    wx.reLaunch({
      url: '../main/main'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var cd = 4;
    var num = setInterval(function () {
      cd = cd-1;
      that.setData({
        countDown: cd
      });
      if (cd == 0) {
        wx.reLaunch({
          url: '../main/main'
        })
      }
    }, 1000);
    that.setData({
      num:num
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
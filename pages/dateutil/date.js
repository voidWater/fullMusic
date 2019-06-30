// pages/dateutil/date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days_style:[
      { month: 'current', day: 3, color: 'white', background: '#b49eeb' },
      { month: 'current', day: 4, color: 'white', background: '#b49eeb' },
      { month: 'current', day: 5, color: 'white', background: '#b49eeb' },
      { month: 'current', day: 6, color: 'white', background: '#b49eeb' }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dateData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
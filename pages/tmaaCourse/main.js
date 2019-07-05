// pages/tmaaCourse/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'kcb',
    kcb:false,
    yk:true,
    jl:true,
    detail:true
  },
  toXk:function(){
    wx.navigateTo({
      url: '../tmaaCourse/toMakeAnApp'
    })
  },
  openDetail:function(){
    this.allHidden();
    this.setData({
      detail: false
    });
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    this.allHidden();
    if (detail.key == 'kcb'){
      this.setData({
        kcb: false
      });
    } else if (detail.key == 'yk'){
      this.setData({
        yk: false
      });
    } else if (detail.key == 'jl'){
      this.setData({
        jl: false
      });
    }
  },
  allHidden:function(){
    this.setData({
      kcb: true
    });
    this.setData({
      yk: true
    });
    this.setData({
      jl: true
    });
    this.setData({
      detail: true
    });
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
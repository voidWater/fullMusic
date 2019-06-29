// pages/rankingList/rankingList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rk:0,
    userId:"",
    me:{},
    rankingList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    var that = this;
    wx.request({
      url: 'https://www.fullmusic.club:444/xcx/getRankingList',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          rankingList: res.data.list
        });
        for (let i = 0; i < res.data.list.length;i++){
          if (res.data.list[i].vc_user_id == that.data.userId){
            console.log("we")
            that.setData({
              rk: i+1
            });
            break;
          }
        }
      }
    });
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
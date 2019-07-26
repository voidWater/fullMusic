// pages/main/toMakeAnApp.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruit: [{
      id: 1,
      name: '钢琴',
    }, {
      id: 2,
      name: '声乐'
    }],
    current: '钢琴',
    position: 'left',
    teacher:null,
    dataList:[]
  },
  handleFruitChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },
  setDateList:function(val){
    var tmp = new Array();
    for(let i =0;i<4;i++){
      //val[i].split(",")
      tmp.push(val[i].split(",")[0]);
    }
    this.setData({
      dataList:tmp
    })
    console.log(this.data.dataList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teacher: app.globalData.chooseTeacher
    });
    var that = this;
    wx.request({
      url: 'https://fullmusic.club/xk/getDateList',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setDateList(res.data.list);
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
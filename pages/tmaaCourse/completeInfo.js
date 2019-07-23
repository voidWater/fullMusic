// pages/tmaaCourse/completeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: '',
    phone: '',
    jc: 1,
    yq:1,
    fruit: [{
      id: 1,
      name: '零基础',
    }, {
      id: 2,
      name: '不到一年'
    }, {
      id: 3,
      name: '一年以上'
    }],
    animal:[{
      id: 1,
      name: "是"
    }, {
      id: 2,
      name: "否"
    }],
    current: '零基础',
    animal_current: '是',
    position: 'left'
  },
  handleFruitChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
    this.setData({
      jc: detail.key
    });
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
      animal_current: detail.value
    });
    this.setData({
      yq: detail.key
    });
  },
  goToIn:function(){
    console.log(this.data.name);
    console.log(this.data.age);
    console.log(this.data.phone);
    console.log(this.data.jc);
    console.log(this.data.yq);
    wx.request({
      url: 'https://fullmusic.club/xk/complementInfo?userId=' + app.globalData.openId + "&studentName=" + this.data.name + "&age=" + this.data.age + "&phone=" + this.data.phone+
        "&lTime=" + this.data.jc + "&hPiano=" + this.data.yq,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 2) {
          wx.navigateTo({
            url: '../tmaaCourse/completeInfo'
          })
        } else {
          wx.navigateTo({
            url: '../tmaaCourse/test'
          })
        }
      }
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
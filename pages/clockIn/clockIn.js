// pages/clockIn/clockIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    src:""
  },
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          src: res.tempFilePath,
        })
      }
    })
  },
  test1:function(){
    console.log(1)
  },
  test:function(){
    var src = this.data.src;
    wx.uploadFile({
      url: 'https://www.fullmusic.club:444/xcx/clock?userId=voidfire&content='+this.data.content,//服务器接口
      method: 'POST',//这句话好像可以不用
      filePath: src,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'file',//服务器定义的Key值
      success: function () {
        console.log('视频上传成功')
      },
      fail: function () {
        console.log('接口调用失败')
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  clocking:function(){

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
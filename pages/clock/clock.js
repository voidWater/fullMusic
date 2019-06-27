// pages/clock/clock.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isSignIn:false,
    qrcode:"",
    clockInList:[]
  },
  clockInPage:function(){//进入打卡页面
    wx.navigateTo({
      url: '../clockIn/clockIn'
    })
  },
  getUserInfo: function (e) {//获取用户信息
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindKeyInput:function(e){
    console.log(e.currentTarget.dataset.id)
    console.log(e.detail.value);
  },
  pusgComment: function (event){
    console.log(event.currentTarget.dataset.id)
    // var that = this;
    // wx.request({
    //   url: 'https://www.fullmusic.club:444/xcx/comment?clockInId=123&content=12312sssss',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res)
    //   }
    // })
  },
  getcomment:function(){
    var that = this;
    wx.request({
      url: 'https://www.fullmusic.club:444/xcx/login?userId=' + this.data.userInfo.nickName,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  login: function(){//登录
    console.log("login")
    var that = this;
    wx.request({
      url: 'https://www.fullmusic.club:444/xcx/login?userId=' + this.data.userInfo.nickName,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code==22){
          that.setData({
            isSignIn: true
          })
          that.getClockInList();
        }
      }
    })
  },
  getClockInList:function(){//获取打卡列表
    var that = this;
    wx.request({
      url: 'https://www.fullmusic.club:444/xcx/clockInList?userId=' + this.data.userInfo.nickName +'&currPage=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          console.log(res.data)
          that.setData({
            clockInList: res.data.list
          })
        }
      }
    })
  },
  openScan:function(){//扫码注册
    var that = this;
    console.log(this.data.userInfo);
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.request({
          url: 'https://www.fullmusic.club:444/xcx/loginIn?userId=' + that.data.userInfo.nickName + "&password=" + res.result,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.code == 33) {
              that.setData({
                isSignIn: true
              })
            }else{
              that.setMessage("("+res.data.msg+")");
            }
          }
        })
      }
    })
  },
  setMessage:function(msg){//test消息
    this.setData({
      qrcode: msg
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.login();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.login();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          this.login();
        }
      })
    }
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
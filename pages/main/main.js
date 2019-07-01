// pages/main/main.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignIn:true
  },
  toClockin:function(){//to小打卡
   
    if(!this.data.isSignIn){
        return;
    }
    wx.navigateTo({
      url: '../clock/clock'
    })
  },
  toIntro:function(){//to中心简介
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  login: function(){//登录
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'https://fullmusic.club/xcx/getOpenId?code=' + res.code,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              app.globalData.openId = res.data.openid;
              wx.request({
                url: 'https://fullmusic.club/xcx/login?userId=' + app.globalData.openId,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  if (res.data.code == 22) {
                    app.globalData.isLogin = true;
                    that.setData({
                      isSignIn:true
                    });
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }else{
                    that.setData({
                      isSignIn: false
                    });
                  }
                }
              });
            }
          })
        } else {
          console.log('登录失败！')
        }
      }
    });
  },
  siginIn:function(){//扫码注册
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.request({
          url: 'https://fullmusic.club/xcx/loginIn?userId=' + app.globalData.openId + "&password=" + res.result,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.code == 33) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                isSignIn: true
              })
            } else {
              that.setMessage("(" + res.data.msg + ")");
            }
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login();
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
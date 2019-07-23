// pages/main/main.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignIn:false
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
  toTmaaCourse:function(){//在线约课
    if (this.data.isSignIn==false){
      wx.showToast({
        title:  '请先注册',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.isFirst();
    }
    /*wx.navigateTo({
      url: '../tmaaCourse/test'
    })*/
  },
  isFirst:function(){
    wx.request({
      url: 'https://fullmusic.club/xk/isFirst?id=' + app.globalData.openId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 2){
          wx.navigateTo({
            url: '../tmaaCourse/completeInfo'
          })
        }else{
          wx.navigateTo({
            url: '../tmaaCourse/test'
          })
        }
      }
    });
  },
  login: function(){//登录
    //用户信息固化
    console.log(getApp().globalData.userInfo);
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
                url: 'https://fullmusic.club/xcx/login?userId=' + app.globalData.openId + "&name=" + getApp().globalData.userInfo.nickName + "&icon=" + getApp().globalData.userInfo.avatarUrl,
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
                      title: getApp().globalData.userInfo.nickName+'登录成功',
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
          url: 'https://fullmusic.club/xcx/loginIn?userId=' + app.globalData.openId + "&password=" + res.result + "&name=" + getApp().globalData.userInfo.nickName + "&icon=" + getApp().globalData.userInfo.avatarUrl, 
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
    //this.login();
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
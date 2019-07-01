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
    qrcode:"",
    clockInList:[],
    conmms:"",
    updateConmmsClockinId:"",
    arr:[]
  },
  clockInPage:function(){//进入打卡页面
    wx.navigateTo({
      url: '../clockIn/clockIn?userId=' + this.data.userInfo.nickName
    })
  },
  toMe: function () {//进入打开界面
    wx.navigateTo({
      url: '../dateutil/date' 
    })
  },
  toRankingList:function(){//进入打开界面
    wx.navigateTo({
      url: '../rankingList/rankingList?userId=' + this.data.userInfo.nickName
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
    //console.log(e.currentTarget.dataset.id)
    //console.log(e.detail.value);
    this.setData({
      conmms: e.detail.value
    })
  },
  pusgComment: function (event){//评论
    console.log(event.currentTarget.dataset.id)
    var that = this;
    wx.request({
      url: 'https://fullmusic.club/xcx/comment?userId=' + this.data.userInfo.nickName+'&clockInId=' + event.currentTarget.dataset.id + '&content=' + this.data.conmms,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
      }
    })
  },
  getcomment:function(id){//更新评论
    var that = this;
    console.log(id)
    var iis =id
    wx.request({
      url: 'https://fullmusic.club/xcx/getComment?clockInId=' + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var comms = that.data.clockInList;
        for (let i = 0; i < comms.length;i++){
          
          if (comms[i].id==id){
            comms[i].coommsList = res.data.list;
          }
          comms.input="";
        }
        
        that.setData({
          clockInList:comms
        });
      }
    })
  },
  login: function(){//登录
    this.getClockInList();
  },
  getClockInList:function(){//获取打卡列表
    var that = this;
    wx.request({
      url: 'https://fullmusic.club/xcx/clockInList?userId=' + this.data.userInfo.nickName +'&currPage=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          console.log(res.data)
          for (let i = 0; i < res.data.list.length; i++) {
            //console.log(res.data.list);
            res.data.list[i].vcResourceUrl = "https://fullmusic.club/" + res.data.list[i].vcResourceUrl;
            res.data.list[i].input = "";
          }
          that.setData({
            clockInList: res.data.list
          })
          for (let i = 0; i < res.data.list.length; i++) {
            //console.log(res.data.list);
            that.getcomment(res.data.list[i].id);
          }
          console.log(that.data.clockInList);
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
          url: 'https://fullmusic.club/xcx/loginIn?userId=' + that.data.userInfo.nickName + "&password=" + res.result,
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
    wx.connectSocket({
      url: 'wss://fullmusic.club/fullmusic',
      success: function (res) {
        console.log("连接服务器成功")
      },
      fail: function (res) {
        console.log("连接服务器失败")
      }
    });
    var myThis = this;
    wx.onSocketMessage(function (res) {
      console.log(res.data)
      if (res.data.indexOf("有") != -1){
        console.log(res.data);
      }else{
        myThis.getcomment(res.data)
      }
     
      /*wx.showToast({
        title: myThis.data.updateConmmsClockinId,
        icon: 'none',
        duration: 2000
      })*/
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
    this.getClockInList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
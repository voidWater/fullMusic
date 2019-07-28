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
    dataList:[],
    during: [{
      id: 1,
      name: '上午第一节课',
    }, {
      id: 2,
        name: '上午第二节课'
    }, {
      id: 3,
        name: '下午第一节课'
    }, {
      id: 4,
        name: '下午第二节课',
    },{
        id: 5,
        name: '晚上第一节课',
      }],
    duringCurrent:"",
    chooDate:""  
  },
  handleddChange({ detail = {} }) {
    this.setData({
      duringCurrent: detail.value
    });
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
      if(i==0){
        tmp.push({ "d": val[i].split(",")[0], "x": "kks" });
      }else{
        tmp.push({ "d": val[i].split(",")[0], "x": "" });
      }
      
    }
    this.setData({
      dataList:tmp
    })
    console.log(this.data.dataList);
  },
  handleClick:function(){
    console.log(this.data.teacher);
    console.log(app.globalData);
    console.log(this.data.current); 
    console.log(this.data.chooDate);
    console.log(this.data.duringCurrent);
    wx.request({
      url: 'https://fullmusic.club/xk/xk/?teacherId='+
        this.data.teacher.id
        + '&studentId=' + app.globalData.openId+'&course='+
        this.data.current
        +'&date='+
        this.data.chooDate
        +'&orderByCourse=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        //that.setDateList(res.data.list);
      }
    });
  },
  chooseDate:function(val){
    console.log(val.currentTarget.dataset.dated.d)
    this.setData({
      chooDate: val.currentTarget.dataset.dated.d
    });
    var ds = this.data.dataList;
    for(let i = 0;i<ds.length;i++){
      if (ds[i].d == val.currentTarget.dataset.dated.d){
        ds[i].x="kks"
      }else{
        ds[i].x = ""
      }
    }
    this.setData({
      dataList:ds
    });
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
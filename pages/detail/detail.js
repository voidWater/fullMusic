const app = getApp()

Page({
  data: {
    showBar:{
      imgUrls: [
        '../../img/head.jpg',
        '../../img/IMG_3955.jpg'
      ],
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      circular: true,
      interval: 6000,
      duration: 2000,
      previousMargin: 0,
      nextMargin: 0
    },
    envir:[
      {}
    ]
  },
  toCourse:function(){
    wx.navigateTo({
      url: '../course/course'
    })
  },
  toPerson:function(){
    wx.navigateTo({
      url: '../person/person'
    })
  },
  onLoad: function () {

  }
})

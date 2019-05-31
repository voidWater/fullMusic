const app = getApp()

Page({
  data: {
    showBar:{
      imgUrls: [
        '../../img/987.png',
        '../../img/IMG_3955.jpg',
        '../../img/987.png'
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
  onLoad: function () {

  }
})

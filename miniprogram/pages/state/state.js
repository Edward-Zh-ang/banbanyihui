// pages/state/state.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
      title: '通讯状态',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
      url: '/state/matestate/matestate'
    },
    {
      title: '活动动态',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
      url: '/state/activity/activity'
    }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages' + e.currentTarget.dataset.url
      })
    },
  }
});

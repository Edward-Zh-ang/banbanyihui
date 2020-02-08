//index.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function() {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(0),
          forksCount: that.coutNum(1),
          visitTotal: that.coutNum(18)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    onGetUserInfo: function (e) {
      if (!this.logged && e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
      }
    },
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://6261-banbanyihui-rzvml-1301142674.tcb.qcloud.la/images/moneyt.png?sign=5d513bf913344e7e8c04342fb6f9405d&t=1581175743'],
        current: 'https://6261-banbanyihui-rzvml-1301142674.tcb.qcloud.la/images/moneyt.png?sign=5d513bf913344e7e8c04342fb6f9405d&t=1581175743' // 当前显示图片的http链接      
      })
    },
  }
})
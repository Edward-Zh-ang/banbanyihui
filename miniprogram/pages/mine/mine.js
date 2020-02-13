//index.js
const app = getApp();
const db = wx.cloud.database();
const member = db.collection('userInfo')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    memberCount: 0,
    actCount: 0,
    fundTotal: 0,
    avatarUrl: '',
  },
  attached() {
    console.log("success")
    let that = this;
    that.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            memberCount: i,
            actCount: i,
            fundTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        member.get().then(res => {
          that.setData({
            memberCount: res.data.length,
            actCount: that.coutNum(1),
            fundTotal: that.coutNum(0)
          })
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
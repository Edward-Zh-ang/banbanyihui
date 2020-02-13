// pages/index/index.js
const app = getApp();
const db = wx.cloud.database();
const location = db.collection('userInfo')
Page({
  data: {
    longitude: [114.3612250000],
    latitude: [36.0896300000],
    markers: [],
    scrollTop: 0
  },

  updateLo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.navigateTo({
        url: '../updatelocation/updatelocation',
      })
    } else if (!e.detail.userInfo) {
      wx.showModal({
        title: '班班易会',
        content: '请您到‘会空间’-微信登录',
        confirmText: '马上登录',
        success: res => {}
      })
    }
  },

  renewPage: function() {
    var that = this
    wx.pageScrollTo({
      scrollTop: 300
    })
    location.get().then(res => {
      var list = res.data;
      var tempArr = [];
      var includeArr = [];
      var item = {};
      var includeItem = {};
      for (var i = 0; i < res.data.length; i++) {
        item = {
          iconPath: list[i].userURL,
          _id: list[i]._id,
          latitude: list[i].marker[1],
          longitude: list[i].marker[0],
          width: 40,
          height: 40,
          alpha: 0.8,
          callout: {
            'display': 'BYCLICK',
            'fontSize': '30rpx',
            'content': list[i].username,
            'padding': '8rpx',
            'boxShadow': '0 0 5rpx #333',
            'borderRadius': '4rpx'
          }
        }
        includeItem = {
          latitude: list[i].latitude,
          longitude: list[i].longitude,
        }
        tempArr.push(item);
        includeArr.push(includeItem);
      }
      that.setData({
        markers: tempArr,
        includepoints: includeArr,
      })
      console.log(that.data.markers)
    })
    wx.showModal({
      title: '班班易会',
      content: '请先添加位置，再到圈状态-通讯状态-+更新信息。本页面点击头像可显示人名。',
      confirmText: '知道了',
      success: res => {
      }
    })
  },

  /*
    getBlessing: function () {
      var that = this;
      var getUserPic = function (pic_url, i) {
        let cachePath;
        if (pic_url == null || pic_url == '') return;
        wx.downloadFile({
          url: pic_url,
          success: (pathInfo) => {
            // pathInfo.path 这是下载成的缓存链接，模拟器marker有时不支持http开头，真机不影响，得去掉http:/
            cachePath = pathInfo.tempFilePath.replace("http:/", '').replace("https:/", '')//真机中无需replace，都支持，
            var mak = "markers[" + i + "].iconPath";
            that.setData({
              [mak]: cachePath
            })
          }
        })
      }

              var pic = getUserPic(list[i].user.user_pic, i);
      wx.request({
        url: '你的后台请求地址',
        method: 'POST',
       
    },
   */
  onLaunch() {

  },
  onLoad: function() {
    wx.getSetting({
      success: res => { // 拒绝授权后再次进入重新授权
        if (res.authSetting['scope.userInfo'] == undefined || res.authSetting['scope.userInfo'] != true) {
          wx.showModal({
            title: '班班易会',
            content: '请您到‘会空间’-微信登录',
            confirmText: '马上登录',
            success: res => {}
          })
          wx.navigateTo({
            url: '../mine/mine',
          })
        }
      }
    })
  },
  onReady: function() {

  },


  onShow: function() {
    let that = this
    location.get().then(res => {
      var list = res.data;
      var tempArr = [];
      var includeArr = [];
      var item = {};
      var includeItem = {};
      for (var i = 0; i < res.data.length; i++) {
        item = {
          iconPath: list[i].userURL,
          _id: list[i]._id,
          latitude: list[i].marker[1],
          longitude: list[i].marker[0],
          width: 40,
          height: 40,
          alpha: 0.8,
          callout: {
            'display': 'BYCLICK',
            'fontSize': '30rpx',
            'content': list[i].username,
            'padding': '8rpx',
            'boxShadow': '0 0 5rpx #333',
            'borderRadius': '4rpx'
          }
        }

        includeItem = {
          latitude: list[i].latitude,
          longitude: list[i].longitude,
        }
        tempArr.push(item);
        includeArr.push(includeItem);
      }
      that.setData({
        markers: tempArr,
        includepoints: includeArr,
      })
      console.log(that.data.markers)
    })
    wx.startPullDownRefresh()
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onPageScroll: function(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})
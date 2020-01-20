// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: [],
    latitude: [],
    markers: []
  },
 /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

  },


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

    wx.request({
      url: '你的后台请求地址',
      method: 'POST',
      success: function (res) {
        var list = res.data.list;
        var tempArr = [];
        var includeArr = [];
        var item = {};
        var includeItem = {};
        for (var i = 0; i < list.length; i++) {
          var pic = getUserPic(list[i].user.user_pic, i);
          item = {
            iconPath: '/images/icon/small-logo.png',
            id: list[i].id,
            latitude: list[i].latitude,
            longitude: list[i].longitude,
            width: 30,
            height: 30,
            alpha: 0.8,
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
          count: res.data.count
        })
        console.log(that.data.markers)
      }
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
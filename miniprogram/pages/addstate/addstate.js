const app = getApp();
const db = wx.cloud.database();
const userInfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    username: '',
    phone: '',
    college: '',
    plan: '',
    userURL: '',
    date: '2020-02-10',
    region: ['广东省', '广州市', '天河区'],
    imgList: [],
    openid: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  },

  _username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  _phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  _college: function (e) {
    this.setData({
      college: e.detail.value
    })
  },
  _plan: function (e) {
    this.setData({
      plan: e.detail.value
    })
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '兄弟/姐妹',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '绝情',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  handon: function (e) {
    this.setData({
      userURL: app.globalData.userInfo.avatarUrl,
    })
    wx.showModal({
      title: '亲爱的同学',
      content: '确定要上传这段通讯状态吗？',
      cancelText: '再看看',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          userInfo.where({ _openId:openId }).update({
            // data 字段表示需新增的 JSON 数据
            data: {
              username: this.data.username,
              userURL: this.data.userURL,
              phone: this.data.phone,
              college: this.data.college,
              plan: this.data.plan,
              birthday: new Date(this.data.date),
              place: this.data.region,
              pictures: this.data.imgList,
            },
            success: res => {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              wx.showToast({
                title: '新增通讯成功',
              })
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              wx.navigateBack({
                url: '../state/matestate/matestate'
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增通讯失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        }
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
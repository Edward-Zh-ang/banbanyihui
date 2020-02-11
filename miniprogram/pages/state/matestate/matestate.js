// pages/state/matestate/matestate.js
const app = getApp();
const db = wx.cloud.database();
const infoM = db.collection('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 0,
    infoMa: [],
    addflag: true, //判断是否显示搜索框右侧部分
    addimg: '../../images/plus.png',
    searchstr: '',
    activeNames: ['1'],
    username: '',
    phone: '',
    college: '',
    plan: '',
    birthday: '',
    place: [],
    userURL: 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

  },

  tap(e) {

  },

  // 搜索框右侧 事件
  addhandle() {
    wx.navigateTo({
      url: '../../addstate/addstate',
    })
  },

  //搜索框输入时触发
  searchList(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //搜索回调
  endsearchList(e) {
    console.log('查询数据')
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //清空搜索框
  activity_clear(e) {
    this.setData({
      searchstr: ''
    })
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this
    infoM.get({
      success: res => {
        this.setData({
          infoMa: res.data,
        })
      }
    });
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})
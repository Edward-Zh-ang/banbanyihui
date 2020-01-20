const db = wx.cloud.database();
const todos = db.collection('todos');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tasks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(res => {});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {

  },
  onReachBottom:function(){
    this.getData();
  },

  onPullDownRefresh:function(){
    this.getData(res => {
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;
    });
  },

  getData:function(callback){
    if(!callback){
      callback = res => {}
    }
    wx.showLoading({
      title: '内容加载中···',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      // let oldData = ;
      this.setData({
        tasks: this.data.tasks.concat(res.data)
      },res =>{
        this.pageData.skip = this.pageData.skip + 3
        wx.hideLoading()
        callback();
      })
    })
  },
  pageData:{
    skip:0
  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
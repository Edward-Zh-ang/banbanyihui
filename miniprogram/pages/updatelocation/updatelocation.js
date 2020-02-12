const app = getApp();
const db = wx.cloud.database();
const userin = db.collection('userInfo')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userURL: null,
    address: '',
    longitude: 0,
    latitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户信息
  getUserLocation: function (e) {
    let vm = this
    wx.getSetting({
      success: res => { // 拒绝授权后再次进入重新授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
          wx.showModal({
            title: '',
            content: '班班易会需要获取你的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none'
                })
                setTimeout(() => {
                  wx.navigateBack()
                }, 1500)
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    // console.log('dataAu:success', dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation(dataAu)
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                      })
                      setTimeout(() => {
                        wx.navigateBack()
                      }, 1500)
                    }
                  }
                })
              }
            }
          })
        }
        // 初始化进入，未授权
        else if (res.authSetting['scope.userLocation'] == undefined) {
          // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res)
        }
        // 已授权
        else if (res.authSetting['scope.userLocation']) {
          // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
          //调用wx.getLocation的API
          vm.getLocation(res)
        }
      }
    })
  },

  // 微信获得经纬度
  getLocation: function (userLocation) {
    let vm = this
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log('getLocation:success', res)
        vm.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        wx.showModal({
          title: '请选择',
          content: '初次添加或者更新之前的记录（添加的地点不会自动改变）',
          cancelText: '初次添加',
          confirmText: '位置更新',
          success: function (res) {
            if (res.cancel) {
              userin.add({
                data: {
                  userURL: app.globalData.userInfo.avatarUrl,
                  marker: [vm.data.longitude, vm.data.latitude],
                }
              })
              wx.showToast({
                title: '位置添加完成！',
              })
            } else if (res.confirm) {
              userin.where({
                _openId: app.globalData.openid
              }).update({
                data: {
                  userURL: app.globalData.userInfo.avatarUrl,
                  marker: [vm.data.longitude, vm.data.latitude],
                }
              })
              wx.showToast({
                title: '位置更新完成！',
              })
            }
          }
        })
      },
      fail: function (res) {
        // console.log('getLocation:fail', res)
        if (res.errMsg === 'getLocation:fail:auth denied') {
          wx.showToast({
            title: '拒绝授权',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
          return
        }
        if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
          vm.getUserLocation()
        } else if (userLocation.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '',
            content: '请在系统设置中打开定位服务',
            showCancel: false,
            success: result => {
              if (result.confirm) {
                wx.navigateBack()
              }
            }
          })
        } else {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
    wx.navigateBack({
      url: "../index/index"
    })
  },
  addnewLoc: function (e) {
    let vm = this
    wx.showModal({
      title: '亲爱的GGMM',
      content: '请在地图上选点',
      cancelText: '不用了',
      confirmText: '下一步',
      success: res => {
        if (res.confirm) {
          wx.chooseLocation({
            success: function (res) {
              console.log(res);
              if (res.address) {
                vm.setData({
                  address: res.name,
                  latitude: res.latitude,
                  longitude: res.longitude,
                })
                wx.showModal({
                  title: '请选择',
                  content: '初次添加或者更新之前的记录（添加的地点不会自动改变）',
                  cancelText: '初次添加',
                  confirmText: '位置更新',
                  success: function (res) {
                    if (res.cancel) {
                      userin.add({
                        data: {
                          userURL: app.globalData.userInfo.avatarUrl,
                          marker: [vm.data.longitude, vm.data.latitude],
                        }
                      })
                      wx.showToast({
                        title: '位置添加完成！',
                      })
                    } else if (res.confirm) {
                      userin.where({
                        _openId: app.globalData.openid
                      }).update({
                        data: {
                          userURL: app.globalData.userInfo.avatarUrl,
                          marker: [vm.data.longitude, vm.data.latitude],
                        }
                      })
                      wx.showToast({
                        title: '位置更新完成！',
                      })
                    }
                    wx.navigateBack({
                      url: "../index/index"
                    })
                  }
                })
              }
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
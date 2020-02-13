// index.js
const cloud = require('wx-server-sdk')
wx.cloud.init({
  env: 'banbanyihui-rzvml',
  traceUser: true,
})
exports.main = (event, context) => {
  // 这里获取到的 openId、 appId 和 unionId 是可信的，注意 unionId 仅在满足 unionId 获取条件时返回
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()

  return {
    OPENID,
    APPID,
    UNIONID,
  }
}
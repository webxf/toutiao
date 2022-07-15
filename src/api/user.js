// 用户请求数据接口
import request from '@/utils/request'
// import store from "@/store";
// 导出
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations/',
    data: data
  })
}
// 发送验证码请求数据

export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   //该接口需要授权才能访问
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export const addusers = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注
export const deleteusers = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

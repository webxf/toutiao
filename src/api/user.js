// 用户请求数据接口
import request from '@/utils/request'

// 导出
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations/',
    data: data
  })
}

import request from '@/utils/request'

export const addComment = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
// 评论
export const addCommentList = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: data
  })
}

import request from '@/utils/request'

// 获取文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的文章列表
export function getArticlesFeed (token) {
  return function (params) {
    return request({
      method: 'GET',
      url: '/api/articles/feed',
      params,
      headers: {
        Authorization: 'Token ' + token
      }
    })
  }
}

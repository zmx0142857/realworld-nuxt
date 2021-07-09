import { request } from '@/plugins/request'

// 获取文章列表
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的文章列表
export function getArticlesFeed (params) {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
  })
}

// 点赞
export function addFavorite (slug) {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export function deleteFavorite (slug) {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export function getArticle (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export function getComments (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

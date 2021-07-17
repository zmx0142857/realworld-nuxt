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

// 点赞或取消点赞
export async function toggleFavorite (article) {
  const fav = article.favorited
  article.favorited = null // pending
  if (fav === true) { // 取消点赞
    await deleteFavorite(article.slug)
    --article.favoritesCount
    article.favorited = false
  } else if (fav === false) { // 添加点赞
    await addFavorite(article.slug)
    ++article.favoritesCount
    article.favorited = true
  }
}

// 获取文章详情
export function getArticle (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 新建文章
export function addArticle (article) {
  return request({
    method: 'POST',
    url: '/api/articles',
    data: { article }
  })
}

// 修改文章
// 修改 article.title 后 slug 也会更新
export function setArticle (slug, article) {
  return request({
    method: 'PUT',
    url: '/api/articles/' + slug,
    data: { article }
  })
}

// 删除文章
export function delArticle (slug) {
  return request({
    method: 'DELETE',
    url: '/api/articles/' + slug
  })
}

// 获取文章评论
export function getComments (slug) {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发表评论
export function addComment (slug, body) {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: { comment: { body } }
  })
}

// 删除评论
export function delComment (slug, id) {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

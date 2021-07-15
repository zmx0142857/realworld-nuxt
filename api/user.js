import { request } from '@/plugins/request'

// 用户登录
export function login (data) {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export function register (data) {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 获取用户资料
export function getProfile (username) {
  return request({
    method: 'GET',
    url: '/api/profiles/' + username
  })
}

// 修改用户资料
export function setProfile (user) {
  return request({
    method: 'PUT',
    url: '/api/user',
    data: { user }
  })
}

// 关注用户
export function followUser (username) {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消关注用户
export function unfollowUser (username) {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}

// 关注或取关
export async function toggleFollow (user) {
  const following = user.following
  user.following = null // pending
  if (following === true) { // 取消关注
    await unfollowUser(user.username)
    user.following = false
  } else if (following === false) { // 关注
    await followUser(user.username)
    user.following = true
  }
}

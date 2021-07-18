# realworld nuxt demo

利用 vue + nuxt 技术栈实现的 realworld 前端应用.

我的网址: 👉 http://106.75.9.115:3000/

官方 demo: https://demo.realworld.io/

## scripts

- `npm install`: 安装依赖
- `npm run dev`: 运行开发服务器
- `npm run build`: 构建应用
- `npm run start`: 构建完毕后, 以生产模式运行应用

## 功能

- [x] 注册/登录/退出
- [x] 列表/分页/标签
- [x] 点赞/取消点赞, 关注/取消关注
- [x] 文章详情/留言
- [x] settings - 个人信息更新
- [x] 文章发表/修改/删除
- [x] 个人中心/我的文章/我点赞的文章

## 部署方法

- 购买服务器
- 在 web 控制台设置外网防火墙规则, 保留需要的 22 端口和 3000 端口即可
- 用 ssh 登陆服务器, 安装必要的软件 `nodejs >= 14`, `npm`, `firewalld` 等
- 启动服务器自己的防火墙（区别于外网防火墙）
  ```
  sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
  sudo firewall-cmd --reload
  sudo firewall-cmd --list-ports
  ```
- 编辑 `/etc/hosts` 文件, 加入 github 地址
- 压缩项目, 传到服务端的一个新目录中, 再解压
  ```
  zip realworld-nuxt.zip -r .nuxt/ static/ nuxt.config.js package.json package-lock.json
  ```
- 执行 `npm install` 安装依赖, `sudo npm install -g pm2` 安装 pm2.
  启动应用 `pm2 reload pm2.config.json`:
  ```
  {
    "apps": [{
      "name": "RealWorld",
      "script": "npm",
      "args": "start"
    }]
  }
  ```

## 持续集成/持续部署

- 生成 [github access token](https://github.com/settings/tokens), 勾选第一类 repo 权限即可. 该 token 只显示一次, 记得及时复制下来.
- 配置到项目的 settings/secrets (https://github.com/zmx0142857/realworld-nuxt/settings/secrets) 中
- 配置 [github action 脚本](https://gist.github.com/lipengzhou/b92f80142afa37aea397da47366bd872): `.github/workflows/main.yml`
- 将标签推送到远程仓库, 这将触发 github action:
  ```
  $ git tag v0.1.0
  $ git push origin v0.1.0
  ```

<!--
**要求**

- 首先到 demo 地址注册一个自己的账号, 方便自己代码调测
- 实现功能包括: 注册/登录/退出、文章发表/修改/列表/分页/标签/详情/点赞/取消点赞、个人中心，个人信息更新
- 本作业需要 放在 **github** 个人仓库, 并且**实现自动化部署**
- 作业提交 「仓库代码地址」，在 README.md 中 输出「部署成功的服务器地址」

**说明**

作业所需服务器, 可以到下面地址购买,  0.1元使用3个月 (需要拉勾学员电话号码注册)

https://www.ucloud.cn/site/active/lagou.html

#### 可能出现问题 ( 建议提前做好 )

**服务器端口访问设置:  界面设置 + 服务器防火墙服务设置**

参考:  https://juejin.cn/post/6904234342575407111#heading-0

**服务器上安装 nvm 和 node**

```shell
# 1)编辑文件
vim  /etc/hosts

# 2)文件中添加内容
199.232.28.133  raw.githubusercontent.com

# 3)保存退出
ESC   :wq

# 4)在服务器上安装 nvm   参考: https://github.com/nvm-sh/nvm
curl -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# 5)重启ssh终端后, 查看 nvm 版本
nvm --version

# 6)安装 Node.js lts 长期支持版
nvm install --lts
```

**服务器上安装 pm2**

```shell
npm i pm2 -g
```

pm2  list         查看应用列表
pm2  start      启动应用
pm2  stop      停止应用
pm2  reload   重载应用
pm2  restart   重启应用
pm2  delete    删除应用
pm2  log   xx   查看出错日志    xx为应用名称

**找不到 npm、pm2**
-->

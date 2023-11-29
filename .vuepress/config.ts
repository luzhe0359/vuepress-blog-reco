import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import navbar from './navbar'
import series from './series'
import friendshipLinks from './link'

export default defineUserConfig({
  base: '/vuepress-blog-reco/',
  title: '足各路的博客',
  description: '足各路的博客,专注前端开发,记录学习生活中的点滴。',
  theme: recoTheme({
    primaryColor: '#42b883', // 主题的基础色
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'zugelu',
    authorAvatar: '/logo.png',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    // lastUpdatedText: '',
    catalogTitle: '目录',
    series, // 侧边栏，原 sidebar
    navbar, // 导航栏
    bulletin: {
      body: [
        {
          type: 'text',
          content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr'
        },
        {
          type: 'title',
          content: 'GitHub'
        },
        {
          type: 'text',
          content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
          style: 'font-size: 12px;'
        }
      ]
    },
    commentConfig: {
      type: 'Waline',
      options: {
        serverURL: 'https://vuepress-blog-comment.vercel.app',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        verify: true // 验证码服务
        // hideComments: true // 隐藏评论
      }
    },
    friendshipLinks
  })
})

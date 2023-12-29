import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
import navbar from './navbar'
import series from './series'
import bulletin from './bulletin'
import friendshipLinks from './link'

export default defineUserConfig({
  // base: '/vuepress-blog-reco/',
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
    // editLink: false, // 是否启用 编辑此页 链接
    catalogTitle: '目录',
    lastUpdatedText: '最后更新时间',
    series, // 侧边栏，原 sidebar
    navbar, // 导航栏
    bulletin, // 公告
    // 评论
    commentConfig: {
      type: 'waline',
      options: {
        serverURL: 'https://reco.zugelu.com', // your serverURL
        appId: 'JFI5xT9u451pAZ0hOPOHQKog-MdYXbMMI', // your appId
        appKey: 'qxsn1YfUmsHiBicbtudHWkRb', // your appKey
        lang: 'zh-CN', // 设置语言
        pageview: true, // 浏览量统计
        comment: true // 评论数统计
      }
    },
    // 搜索
    // algolia: {
    //   appId: 'xxx',
    //   apiKey: 'xxx',
    //   indexName: 'xxx',
    //   inputSelector: '### REPLACE ME ####',
    //   algoliaOptions: { facetFilters: ['lang:$LANG'] },
    //   debug: false // Set debug to true if you want to inspect the dropdown
    // },
    friendshipLinks
  })
})

module.exports = {
    base: '/',
    lang: 'zh-CN',
    title: '组件库',
    description: '内部业务组件库文档',
    plugins: [['vuepress-plugin-code-copy', true]],
    themeConfig: {
        logo: 'https://excalidraw.com/apple-touch-icon.png',
        nav: [
            { text: '首页', link: '/' },
            { text: '组件分类', link: '/guild/desc/1.html' },
            { text: 'API', link: 'https://u1s1.vip' },
        ],
        subSidebar: 'auto',
        sidebar: {
            '/guild/': [ '/guild/desc/1.html', '/guild/desc/2.html']
        }
    },
}
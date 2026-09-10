# Interactive Minimal Luxury Resume

此项目在仓库根目录下包含一个单页交互式个人简历示例，风格为极简轻奢（低饱和莫兰迪深空蓝配色，米白背景，哑光藏青点缀），支持鼠标悬浮、点击展开详情、平滑滚动与模块淡入动画，适配桌面全屏展示。

文件说明：

- index.html — 主页面
- styles.css — 样式表（CSS 变量，响应式）
- script.js — 交互逻辑（平滑滚动、弹窗、可见性淡入）

快速预览：
1. 将仓库克隆到本地
2. 在项目目录运行一个静态服务器，例如：

   python -m http.server 8000

3. 浏览器打开 http://localhost:8000

设计哲学与注意事项：
- 视觉主打低饱和、护眼的配色，避免高饱和或廉价渐变。
- 动效尽量轻量、使用 CSS 过渡与 IntersectionObserver 实现，保持流畅无卡顿。
- 已考虑无障碍与降低动画偏好（prefers-reduced-motion）。

如果你希望我：
- 将该页面按你的真实个人信息定制；
- 增加打印友好（PDF 导出）样式；
- 或将简历部署到 GitHub Pages（我可以帮你创建 gh-pages 分支并配置），
请告诉我下一步。
# Interactive Minimal Luxury Resume

此项目在仓库根目录下包含一个单页交互式个人简历示例，风格为极简轻奢（低饱和莫兰迪深空蓝配色，米白背景，哑光藏青点缀），支持鼠标悬浮、点击展开详情、平滑滚动与模块淡入动画，适配桌面全屏展示。

文件说明：

- index.html — 主页面
- styles.css — 样式表（CSS 变量，响应式）
- resume-data.js — 简历内容数据，后期更新个人信息时优先修改此文件
- resume-data.template.js — 可复制的简历数据模板
- script.js — 数据驱动渲染与交互逻辑（平滑滚动、弹窗、可见性淡入）
- app.html — 独立 App 展示子页面

模块化维护：
- 修改姓名、联系方式、经历、项目、奖项等内容：编辑 `resume-data.js`
- 修改页面结构或渲染方式：编辑 `script.js`
- 修改视觉样式和响应式布局：编辑 `styles.css`
- 修改 App 子页面内容：编辑 `app.html`

简历数据结构：

| 模块 | 主要字段 | 更新方式 |
| --- | --- | --- |
| `profile` | `name`、`role`、`avatar`、`intro`、`contact` | 修改个人基本信息和简介 |
| `navigation` | `id`、`label`、`href` | 调整模块顺序或增加外部页面 |
| `skills` | `title`、`detail` | 在数组中增加技能卡片 |
| `work.jobs` | `title`、`period`、`highlights`、`results` | 在数组中增加工作经历 |
| `projects.items` | `id`、`title`、`role`、`period`、`description` | 在数组中增加项目，`id` 必须唯一 |
| `education` | `school`、`period`、`gpa`、`courses` | 修改教育信息 |
| `awards.items` | 字符串数组 | 在数组中增加荣誉 |
| `campus` | `subtitle`、`role`、`detail` | 修改校园经历和自我评价 |

动态更新模板：

1. 更新已有内容：直接编辑 `resume-data.js` 对应字段。
2. 增加同类型内容：复制同一数组中的对象，修改字段后放入 `skills`、`work.jobs` 或 `projects.items`。
3. 增加全新模块：在 `script.js` 中新增 `renderXxx()`，在 `renderContent()` 中加入它，并在 `resume-data.js` 增加对应数据对象。
4. 增加独立页面：新建 HTML 文件，在 `navigation` 中使用 `{ label, href }` 添加入口。

示例：新增一个项目只需要在 `projects.items` 中添加：

```js
{
   id: 'proj-new-1',
   title: '新的项目名称',
   role: '项目角色',
   period: '2025.01 — 2025.03',
   description: '项目背景、负责内容、设计方法和最终成果。'
}
```

字段模板详见 `resume-data.template.js`。

快速预览：
1. 将仓库克隆到本地
2. 在项目目录运行 Node 本地预览服务：

   node server.js

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
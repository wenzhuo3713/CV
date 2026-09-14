/*
 * 简历数据模板
 * 使用方式：复制需要的对象到 resume-data.js，再替换示例内容。
 * 同类内容直接新增数组项；全新模块需要同步增加 script.js 的渲染函数。
 */
window.resumeData = {
  profile: {
    name: '姓名',
    role: '职业 / 身份',
    avatar: './assets/avatar.webp',
    avatarAlt: '姓名照片',
    introTitle: '简介',
    intro: '用一段话概括你的专业方向、当前身份、核心能力和关注领域。',
    contact: [
      { label: '邮箱', value: 'name@example.com', href: 'mailto:name@example.com' },
      { label: '电话', value: '+86 000 0000 0000' },
      { label: '地点', value: '城市' }
    ],
    footer: '关键词 · 专业方向 · 个人特色'
  },

  navigation: [
    { id: 'intro', label: '概览' },
    { id: 'work', label: '工作' },
    { id: 'projects', label: '项目' },
    { id: 'edu', label: '教育' },
    { id: 'awards', label: '荣誉' },
    { id: 'skills', label: '技能' },
    { id: 'about', label: '校园' },
    { label: '外部页面', href: './app.html' }
  ],

  skills: [
    { title: '技能分类', detail: '软件、工具、方法或能力说明' },
    { title: '语言能力', detail: '语言水平或证书' }
  ],

  work: {
    title: '工作经历',
    jobs: [
      {
        title: '公司｜职位',
        period: '2024.01 — 至今',
        highlights: [
          '职责或工作内容 1。',
          '职责或工作内容 2。'
        ],
        resultTitle: '主要成果',
        results: [
          '量化成果或代表性结果 1。',
          '合作、增长或影响力结果 2。'
        ]
      }
    ]
  },

  projects: {
    title: '项目经验',
    items: [
      {
        id: 'proj-new-1',
        title: '项目名称',
        role: '项目角色',
        period: '2024.01 — 2024.03',
        description: '项目背景、目标、你的职责、方法和最终结果。'
      }
    ]
  },

  education: {
    title: '教育背景',
    school: '学校 — 专业，学位',
    period: '2020.09 — 2024.06',
    gpa: 'GPA：0.0 / 4.0',
    courses: '核心课程：课程 1、课程 2、课程 3'
  },

  awards: {
    title: '荣誉证书',
    items: [
      '奖项名称、等级、主办方和时间'
    ]
  },

  campus: {
    title: '自我评价',
    subtitle: '校园经历',
    role: '组织或社团｜职位（时间）',
    detail: '经历内容、承担职责和产生的影响。'
  }
};

/*
 * 新增一个工作经历：在 work.jobs 数组中继续添加同结构对象。
 * 新增一个项目：在 projects.items 数组中继续添加同结构对象，id 必须唯一。
 * 新增一个技能：在 skills 数组中继续添加 { title, detail }。
 * 新增一个导航外链：添加 { label, href }。
 */

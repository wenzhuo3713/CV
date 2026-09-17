(function () {
  'use strict';
  const data = window.resumeData;
  if (!data) return;
  const content = document.querySelector('[data-content]');
  const navigation = document.querySelector('[data-navigation]');
  const modal = document.getElementById('detailModal');
  const modalContent = modal.querySelector('.modal-content');
  const modalClose = modal.querySelector('.modal-close');

  renderProfile(); renderNavigation(); renderContent(); bindEvents(); observePanels(); initResumeMotion();

  function renderProfile() {
    document.querySelector('[data-profile="name"]').textContent = data.profile.name;
    document.querySelector('[data-profile="footer"]').textContent = data.profile.footer;
  }
  function renderNavigation() {
    navigation.innerHTML = data.navigation.map((item, index) => `<button class="nav-btn${index === 0 ? ' active' : ''}" data-target="${item.id}">${item.label}</button>`).join('');
  }
  function panel(id, inner, extra) {
    return `<section id="${id}" class="panel ${extra || ''}" tabindex="0"><div class="panel-inner">${inner}</div></section>`;
  }
  function renderContent() {
    content.innerHTML = [renderIntro(), renderWork(), renderEducation(), renderAwards(), renderSkills(), renderProjects(), renderCampus(), renderContact()].join('');
  }
  function renderIntro() {
    const beads = data.projects.items.map((project, index) => `<button class="bead-link" style="--project:${project.color}" data-detail="${project.id}" aria-label="查看 ${project.title}"><span class="bead-dot"></span><span class="bead-label">${String(index + 1).padStart(2, '0')} / ${project.title.split('：')[0]}</span></button>`).join('');
    return panel('intro', `<div class="hero-grid"><div class="hero-copy"><p class="eyebrow">JEWELLERY DESIGN · BRAND BUILDING · INTANGIBLE HERITAGE</p><h2 class="hero-title">以石为言，<br><em>穿线成光。</em></h2><p class="lead">${data.profile.intro}</p><div class="hero-actions"><button class="action action-primary" data-target="work">简历 <span>→</span></button><button class="action action-secondary" data-target="projects">展厅 <span>→</span></button></div></div><div class="hero-art"><div class="hero-orbit"></div><div class="hero-bead hero-bead-a"></div><div class="hero-bead hero-bead-b"></div><div class="hero-caption">WANG<br>WENZHUO <small>OBJECTS / STORIES / PEOPLE</small></div></div></div><div class="bead-nav-wrap"><div class="section-line"><span>selected works</span><span>01 — 05</span></div><div class="bead-nav">${beads}</div></div>`, 'hero-panel');
  }
  function renderProjects() {
    const filters = ['全部', '品牌 / 商业', '艺术首饰 / 情感', '批判设计 / 文创', '可持续 / 可穿戴艺术', '服务设计 / 公众参与'];
    const cards = data.projects.items.map((project, index) => `<article class="proj-card" data-category="${project.category}" data-detail="${project.id}" tabindex="0" style="--project:${project.color}"><div class="project-image" style="--image:url('${project.image}')"><span class="project-index">NO.${String(index + 1).padStart(2, '0')}</span><span class="project-open">↗</span></div><div class="project-card-body"><p class="specimen">${project.role} <span>·</span> ${project.period}</p><h3>${project.title}</h3><p>${project.description}</p><span class="card-bead"></span></div></article>`).join('');
    return panel('projects', `<div class="section-heading"><div><p class="eyebrow">THE EXHIBITION</p><h2>作品展厅</h2></div><p class="section-note">五个项目，五种材料与观看方式。<br>从品牌实践回到个人表达。</p></div><div class="filter-row">${filters.map((filter, index) => `<button class="filter-btn${index === 0 ? ' active' : ''}" data-filter="${filter}">${filter}</button>`).join('')}</div><div class="proj-grid">${cards}</div>`, 'works-panel');
  }
  function renderWork() {
    const timelineItems = [
      `<article class="resume-entry" data-reveal><span class="resume-bead"></span><p class="specimen">EDUCATION / 2026 — 至今</p><h3>香港岭南大学 · ATB（艺术科技与商业）硕士在读</h3><p class="resume-detail">在艺术、科技与商业的交叉处继续研究材料、品牌和当代生活方式。</p></article>`,
      ...data.work.jobs.map((job) => `<article class="resume-entry" data-reveal><span class="resume-bead"></span><p class="specimen">WORK / ${job.period}</p><h3>${job.title}</h3><ul>${job.highlights.map((item) => `<li>${item}</li>`).join('')}</ul><div class="results"><span class="seal">成果</span><ul>${job.results.map((item) => `<li>${item}</li>`).join('')}</ul></div></article>`),
      `<article class="resume-entry" data-reveal><span class="resume-bead"></span><p class="specimen">EDUCATION / ${data.education.period}</p><h3>${data.education.school}</h3><p class="resume-detail">${data.education.gpa}。${data.education.courses}</p></article>`,
      ...data.projects.items.slice(1).map((project) => `<article class="resume-entry" data-reveal><span class="resume-bead" style="--entry-color:${project.color}"></span><p class="specimen">PROJECT / ${project.period}</p><h3>${project.title}</h3><p class="resume-detail">${project.role}。${project.description}</p></article>`),
      `<article class="resume-entry" data-reveal><span class="resume-bead"></span><p class="specimen">CAMPUS / ${data.campus.role.match(/（(.+?)）/)?.[1] || '2022 — 2023'}</p><h3>${data.campus.subtitle}</h3><p class="resume-detail">${data.campus.role}。${data.campus.detail}</p></article>`
    ].join('');
    const contact = data.profile.contact.map((item) => `<a href="${item.href || '#'}">${item.value}</a>`).join('');
    return panel('work', `<div class="section-heading"><div><p class="eyebrow">THE RESUME</p><h2>简历 / Resume</h2></div><p class="section-note">经历不是清单，<br>而是一条正在生长的线。</p></div><div class="resume-layout"><aside class="profile-card"><div class="profile-orb">W</div><h3>${data.profile.name}</h3><p class="profile-role">${data.profile.role}</p><div class="profile-contact">${contact}</div><a class="resume-download" href="./assets/resume/王文卓-简历.pdf" target="_blank" rel="noopener noreferrer">下载简历 PDF ↓</a><p class="profile-skills">Rhino · Keyshot · Figma · PS / AI<br>珠宝工艺 · 非遗合作 · 小提琴六级</p></aside><div class="resume-timeline"><span class="timeline-line"></span>${timelineItems}</div></div><div class="resume-transition"><p>这些经历，最终都变成了这些作品 <span>→</span></p><button class="action action-secondary" data-target="projects">进入展厅</button></div>`, 'wide-panel');
  }
  function renderEducation() {
    return panel('edu', `<div class="section-heading"><div><p class="eyebrow">THE RESUME</p><h2>简历 / Resume</h2></div><a class="text-link" href="mailto:wangwenzhuo0045@163.com">预约交流 →</a></div><div class="resume-grid"><div><p class="specimen">EDUCATION</p><h3>${data.education.school}</h3><p class="muted">${data.education.period} · ${data.education.gpa}</p><p>${data.education.courses}</p></div><div><p class="specimen">AWARDS</p><ul class="awards-list">${data.awards.items.map((item) => `<li><span class="seal">奖</span>${item}</li>`).join('')}</ul></div></div>`, 'wide-panel');
  }
  function renderAwards() { return panel('awards', '<div class="mini-heading"><p class="eyebrow">MILESTONES</p><h2>把经历，变成可以被看见的东西。</h2></div><div class="milestone-row"><span>01</span><strong>5 项外观设计专利</strong><span>02</span><strong>天猫店铺 0 → 1</strong><span>03</span><strong>4.5 万元销售额</strong></div>', 'milestone-panel'); }
  function renderSkills() { return panel('skills', `<div class="section-heading"><div><p class="eyebrow">TOOLS & CRAFT</p><h2>技能与兴趣</h2></div></div><div class="skills-grid">${data.skills.map((skill, index) => `<article class="skill-card"><span class="skill-no">0${index + 1}</span><strong>${skill.title}</strong><span>${skill.detail}</span></article>`).join('')}</div>`, 'wide-panel'); }
  function renderCampus() { const campus = data.campus; return panel('about', `<div class="about-grid"><div><p class="eyebrow">ABOUT</p><h2>关于我</h2></div><div><h3>${campus.subtitle}</h3><p>${campus.role}</p><p class="muted">${campus.detail}</p><p class="about-quote">“我相信设计是把复杂的感受，变成可以被握住的东西。”</p></div></div>`, 'wide-panel'); }
  function renderContact() { return panel('contact', `<div class="contact-grid"><div><p class="eyebrow">KEEP IN TOUCH</p><h2>聊聊关于首饰、<br>非遗与品牌的事。</h2><p class="muted">欢迎求职、合作，也欢迎交换关于材料、地方与日常生活的想法。</p></div><div class="contact-list">${data.profile.contact.map((item) => `<a href="${item.href || '#'}"><span class="specimen">${item.label}</span><strong>${item.value}</strong><span>↗</span></a>`).join('')}</div></div>`, 'contact-panel'); }
  function bindEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('[data-target]');
      if (target) activatePanel(target.dataset.target);
      const card = event.target.closest('[data-detail]');
      if (card) openDetail(card.dataset.detail);
      const filter = event.target.closest('[data-filter]');
      if (filter) applyFilter(filter.dataset.filter);
      if (event.target === modal || event.target === modalClose) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      const card = event.target.closest('.proj-card');
      if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openDetail(card.dataset.detail); }
      if (event.key === 'Escape') closeModal();
    });
  }
  function activatePanel(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add('in');
    document.querySelectorAll('.panel').forEach((item) => item.classList.toggle('active', item === target));
    document.querySelectorAll('.nav-btn').forEach((button) => button.classList.toggle('active', button.dataset.target === id));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function applyFilter(filter) {
    document.querySelectorAll('.filter-btn').forEach((button) => button.classList.toggle('active', button.dataset.filter === filter));
    document.querySelectorAll('.proj-card').forEach((card) => { card.hidden = filter !== '全部' && card.dataset.category !== filter; });
  }
  function openDetail(id) {
    const project = data.projects.items.find((item) => item.id === id);
    if (!project) return;
    modalContent.innerHTML = `<p class="eyebrow" style="color:${project.color}">PROJECT / ${project.period}</p><h3>${project.title}</h3><p class="modal-subtitle">${project.subtitle}</p><p>${project.description}</p><div class="modal-meta"><span>角色：${project.role}</span><span>主色：${project.color}</span></div>`;
    modal.setAttribute('aria-hidden', 'false'); modalClose.focus();
  }
  function closeModal() { modal.setAttribute('aria-hidden', 'true'); }
  function observePanels() { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }), { threshold: 0.08 }); document.querySelectorAll('.panel, [data-reveal]').forEach((item) => observer.observe(item)); }
  function initResumeMotion() {
    document.querySelectorAll('[data-reveal]').forEach((entry, index) => { entry.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`); });
    const beadLinks = [...document.querySelectorAll('.bead-link')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const resetBeads = () => beadLinks.forEach((bead) => { bead.style.setProperty('--push-x', '0px'); bead.style.setProperty('--push-y', '0px'); });
    document.querySelector('.bead-nav-wrap')?.addEventListener('mousemove', (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      beadLinks.forEach((bead) => {
        const rect = bead.getBoundingClientRect();
        const distanceX = event.clientX - (rect.left + rect.width / 2);
        const distanceY = event.clientY - (rect.top + rect.height / 2);
        const distance = Math.hypot(distanceX, distanceY);
        const strength = Math.max(0, 1 - distance / 120);
        bead.style.setProperty('--push-x', `${distanceX ? (-distanceX / Math.abs(distanceX)) * strength * 12 : 0}px`);
        bead.style.setProperty('--push-y', `${distanceY ? (-distanceY / Math.abs(distanceY)) * strength * 8 : 0}px`);
      });
      if (event.clientX < bounds.left || event.clientX > bounds.right) resetBeads();
    });
    document.querySelector('.bead-nav-wrap')?.addEventListener('mouseleave', resetBeads);
  }
}());

(function () {
  'use strict';

  const data = window.resumeData;
  if (!data) return;

  const content = document.querySelector('[data-content]');
  const navigation = document.querySelector('[data-navigation]');
  const modal = document.getElementById('detailModal');
  const modalContent = modal.querySelector('.modal-content');
  const modalClose = modal.querySelector('.modal-close');

  renderProfile();
  renderNavigation();
  renderContent();
  bindModalEvents();
  bindKeyboardNavigation();
  observePanels();

  function renderProfile() {
    document.querySelector('[data-profile="name"]').textContent = data.profile.name;
    document.querySelector('[data-profile="role"]').textContent = data.profile.role;
    const avatar = document.querySelector('[data-profile="avatar"]');
    if (data.profile.avatar) avatar.src = data.profile.avatar;
    else avatar.removeAttribute('src');
    avatar.alt = data.profile.avatarAlt;
    document.querySelector('[data-profile="footer"]').textContent = data.profile.footer;
  }

  function renderNavigation() {
    navigation.innerHTML = data.navigation.map((item, index) => `
      ${item.href
        ? `<a href="${item.href}" class="nav-btn nav-link">${item.label}</a>`
        : `<button data-target="${item.id}" class="nav-btn${index === 0 ? ' active' : ''}">${item.label}</button>`}
    `).join('');
    navigation.addEventListener('click', (event) => {
      const button = event.target.closest('.nav-btn');
      if (button) activatePanel(button.dataset.target);
    });
  }

  function renderContent() {
    content.innerHTML = [
      renderIntro(), renderSkills(), renderWork(), renderProjects(),
      renderEducation(), renderAwards(), renderCampus()
    ].join('');
  }

  function panel(id, inner) {
    return `<section id="${id}" class="panel${id === 'intro' ? ' active' : ''}" tabindex="0"><div class="panel-inner">${inner}</div></section>`;
  }

  function renderIntro() {
    const contact = data.profile.contact.map((item) => {
      const value = item.href ? `<a href="${item.href}">${item.value}</a>` : item.value;
      return `<div>${item.label}：${value}</div>`;
    }).join('');
    return panel('intro', `<h2 class="panel-title">${data.profile.introTitle}</h2><p class="lead">${data.profile.intro}</p><div class="contact">${contact}</div>`);
  }

  function renderSkills() {
    const cards = data.skills.map((skill) => `<li class="skill-card"><strong>${skill.title}</strong><span>${skill.detail}</span></li>`).join('');
    return panel('skills', `<h2 class="panel-title">技能与兴趣</h2><ul class="skills-grid">${cards}</ul>`);
  }

  function renderWork() {
    const jobs = data.work.jobs.map((job) => `<article class="job"><header><div class="job-meta"><h3>${job.title}</h3><span class="muted">${job.period}</span></div></header><ul>${job.highlights.map((item) => `<li>${item}</li>`).join('')}</ul><h4>${job.resultTitle}</h4><ul>${job.results.map((item) => `<li>${item}</li>`).join('')}</ul></article>`).join('');
    return panel('work', `<h2 class="panel-title">${data.work.title}</h2><div class="timeline">${jobs}</div>`);
  }

  function renderProjects() {
    const projects = data.projects.items.map((project) => `<article class="proj-card" data-detail="${project.id}" tabindex="0" role="button"><h4>${project.title}</h4><p class="muted">${project.role} · ${project.period}</p></article>`).join('');
    return panel('projects', `<h2 class="panel-title">${data.projects.title}</h2><div class="proj-grid">${projects}</div>`);
  }

  function renderEducation() {
    const education = data.education;
    return panel('edu', `<h2 class="panel-title">${education.title}</h2><h3>${education.school}</h3><p class="muted">${education.period}</p><p><strong>${education.gpa}</strong></p><p>${education.courses}</p>`);
  }

  function renderAwards() {
    return panel('awards', `<h2 class="panel-title">${data.awards.title}</h2><ul class="awards-list">${data.awards.items.map((item) => `<li>${item}</li>`).join('')}</ul>`);
  }

  function renderCampus() {
    const campus = data.campus;
    return panel('about', `<h2 class="panel-title">${campus.title}</h2><h3>${campus.subtitle}</h3><p>${campus.role}</p><p>${campus.detail}</p>`);
  }

  function activatePanel(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    document.querySelectorAll('.panel').forEach((item) => item.classList.toggle('active', item === target));
    document.querySelectorAll('.nav-btn').forEach((button) => button.classList.toggle('active', button.dataset.target === targetId));
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function bindModalEvents() {
    content.addEventListener('click', (event) => {
      const card = event.target.closest('.proj-card');
      if (card) openDetail(card.dataset.detail);
    });
    content.addEventListener('keydown', (event) => {
      const card = event.target.closest('.proj-card');
      if (card && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openDetail(card.dataset.detail);
      }
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  }

  function openDetail(id) {
    const project = data.projects.items.find((item) => item.id === id);
    if (!project) return;
    modalContent.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
  }

  function bindKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) return;
      const focusedPanel = document.activeElement.closest('.panel');
      if (!focusedPanel) return;
      const panels = Array.from(document.querySelectorAll('.panel'));
      const currentIndex = panels.findIndex((item) => item.classList.contains('active'));
      const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
      const nextIndex = Math.max(0, Math.min(panels.length - 1, currentIndex + direction));
      activatePanel(panels[nextIndex].id);
    });
  }

  function observePanels() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.panel').forEach((item) => {
      item.setAttribute('data-animate', '');
      observer.observe(item);
    });
  }
})();

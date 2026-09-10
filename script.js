// script.js
// 交互逻辑：导航平滑滚动、面板切换、卡片详情弹窗、可见性淡入
(function(){
  'use strict';
  const navBtns = document.querySelectorAll('.nav-btn');
  const panels = Array.from(document.querySelectorAll('.panel'));
  const modal = document.getElementById('detailModal');
  const modalContent = modal.querySelector('.modal-content');
  const modalClose = modal.querySelector('.modal-close');

  // Smooth scroll and active state
  navBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const tgt = document.getElementById(btn.dataset.target);
      if(!tgt) return;
      panels.forEach(p=>p.classList.remove('active'));
      tgt.classList.add('active');
      navBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      tgt.focus({preventScroll:true});
      tgt.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  // Panel click: for project cards open modal
  document.querySelectorAll('.proj-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const id = card.dataset.detail;
      openDetail(id);
    });
    card.addEventListener('mouseenter', ()=>{card.style.zIndex=10});
    card.addEventListener('mouseleave', ()=>{card.style.zIndex=''});
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  function openDetail(id){
    let html='';
    if(id==='proj-1'){
      html = `<h3>管理后台组件库</h3><p>主导组件抽象与主题变量规范，使用 TypeScript + Storybook 提升团队交付效率；覆盖表单、表格、权限型组件，并编写示例与文档，支撑多个业务线的统一风格。</p>`;
    } else if(id==='proj-2'){
      html = `<h3>B2B 商城性能改造</h3><p>通过 SSR & 关键资源拆分、首屏缓存策略与懒加载组件，缩短首屏渲染 40%，显著提升转化率。</p>`;
    } else if(id==='proj-3'){
      html = `<h3>数据可视化平台</h3><p>与产品共同梳理可视化交互指标，使用 D3 与 Canvas 混合渲染，保证大数据下的交互流畅性与可读性。</p>`;
    } else {
      html = `<h3>详细信息</h3><p>更多内容可通过联系获取。</p>`;
    }
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); modalContent.innerHTML=''; }

  // IntersectionObserver 视差淡入
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('in'); observer.unobserve(en.target); }
    });
  },{threshold:0.06});

  document.querySelectorAll('[data-animate], .panel').forEach(el=>{
    // 给每个面板设置渐入
    if(!el.hasAttribute('data-animate')) el.setAttribute('data-animate','');
    observer.observe(el);
  });

  // Keyboard nav: arrow keys switch panels
  let currentIndex = panels.findIndex(p=>p.classList.contains('active'));
  if(currentIndex<0) currentIndex=0;
  document.addEventListener('keydown', (e)=>{
    if(['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].includes(e.key)){
      if(e.key==='ArrowLeft' || e.key==='ArrowUp') currentIndex = Math.max(0,currentIndex-1);
      if(e.key==='ArrowRight' || e.key==='ArrowDown') currentIndex = Math.min(panels.length-1,currentIndex+1);
      panels.forEach(p=>p.classList.remove('active'));
      panels[currentIndex].classList.add('active');
      // keep nav in sync
      const targetId = panels[currentIndex].id;
      navBtns.forEach(b=>b.classList.toggle('active', b.dataset.target===targetId));
      panels[currentIndex].scrollIntoView({behavior:'smooth',block:'center'});
    }
  });

  // Reduce motion respect
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){ document.documentElement.classList.add('reduced-motion'); }

})();

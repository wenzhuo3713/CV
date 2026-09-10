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
      html = `<h3>“珠联璧合”珠宝盲盒</h3><p>主导开发一款融合情感设计与互动体验的系列珠宝盲盒，目标人群为追求“寺庙祈福”体验的年轻消费者。负责从市场调研、概念设计到 3D 建模及测试的全流程管理，项目获得北京大学生工业设计竞赛优秀奖。</p>`;
    } else if(id==='proj-2'){
      html = `<h3>“印象派”模块化猫抓板</h3><p>以“人与宠物相互依存又彼此独立”为理念，设计可更换卷轴式色板的模块化猫抓板。猫咪玩耍时，爪痕自然累积形成独特的印象派画作，创造自然互动并美化家居空间。项目荣获第二届中国宠物产业工业设计竞赛“宠物造物节”优秀奖。</p>`;
    } else if(id==='proj-3'){
      html = `<h3>“青年绘团史”文创桌游</h3><p>参与庆祝建团百年的桌游设计，主要负责游戏机制和包装视觉设计。项目获得“青创北京”挑战杯首都大学生创业计划竞赛“青年绘团史”专项赛金奖（省级）。</p>`;
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

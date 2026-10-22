/* ============================================================
   Animações do site:
   1. Divide títulos marcados em palavras para animar entrada
   2. Observa elementos e dispara fade+slide quando entram na tela
   3. Fecha o menu mobile ao clicar fora e ao navegar
   ============================================================ */

(function () {
  'use strict';

  const prefereMenos = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------
  // 1. Split do título principal em palavras
  //    Aplica em todo elemento com data-split-palavras
  //    e nos títulos de hero/página-cabeçalho automaticamente.
  // -------------------------------------------------------
  function splitPalavras(el) {
    if (!el || el.dataset.jaSplit) return;
    const texto = el.textContent;
    const palavras = texto.trim().split(/\s+/);
    el.innerHTML = '';
    palavras.forEach((palavra, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'palavra-wrap';
      wrap.style.display = 'inline-block';
      wrap.style.overflow = 'hidden';
      wrap.style.verticalAlign = 'top';
      wrap.style.lineHeight = 'inherit';

      const span = document.createElement('span');
      span.className = 'palavra';
      span.style.setProperty('--i', i);
      span.textContent = palavra;

      wrap.appendChild(span);
      el.appendChild(wrap);
      if (i < palavras.length - 1) {
        const sp = document.createElement('span');
        sp.textContent = ' ';
        el.appendChild(sp);
      }
    });
    el.dataset.jaSplit = '1';
  }

  // Seletores de títulos que entram animados no load (viewport inicial)
  const seletoresHero = [
    '.hero__titulo',
    '.pagina-cabecalho__titulo',
    '.evento-hero__titulo',
    '[data-split-palavras]'
  ].join(', ');

  // -------------------------------------------------------
  // 2. IntersectionObserver — anima quando entra na tela
  // -------------------------------------------------------
  const seletoresAnima = [
    '.secao__cabecalho',
    '.secao__titulo',
    '.evento-card',
    '.clube-card',
    '.nota-item',
    '.nota-linha',
    '.atalho',
    '.numeros__item',
    '.video-card',
    '.doc-card',
    '.diretor-card',
    '.timeline-evento',
    '.demonstrativo-card',
    '.painel-resumo__item',
    '.hero__proximo',
    '.hero__frase',
    '.hero__acoes',
    '.pagina-cabecalho__frase',
    '.pagina-cabecalho__acoes',
    '.evento-hero__meta',
    '.evento-hero__acoes',
    '.aviso',
    '[data-anima]'
  ].join(', ');

  function prepararAnima(el, delay = 0) {
    el.classList.add('anima-entrada');
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  function iniciar() {
    // Split do título (sempre, mesmo com reduce motion a animação é curta)
    document.querySelectorAll(seletoresHero).forEach(splitPalavras);

    if (prefereMenos) {
      // Marca tudo como visível, zero animação
      document.querySelectorAll(seletoresAnima).forEach(el => {
        el.classList.add('anima-entrada', 'visivel');
      });
      return;
    }

    const alvos = document.querySelectorAll(seletoresAnima);

    // Agrupa por "linha" (mesma secao parent) para dar efeito cascata
    const grupos = new Map();
    alvos.forEach(el => {
      const parent = el.closest('section, aside, .site-footer') || document.body;
      if (!grupos.has(parent)) grupos.set(parent, []);
      grupos.get(parent).push(el);
    });

    grupos.forEach(itens => {
      itens.forEach((el, idx) => prepararAnima(el, Math.min(idx * 70, 420)));
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    alvos.forEach(el => {
      // Elementos no primeiro viewport já viram "visivel" imediatamente,
      // mas com animação (via transition), evitando salto feio.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        requestAnimationFrame(() => el.classList.add('visivel'));
      } else {
        obs.observe(el);
      }
    });
  }

  // -------------------------------------------------------
  // 3. Menu mobile: fecha ao navegar e ao clicar fora
  // -------------------------------------------------------
  function configurarMenu() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.site-nav__toggle');
    if (!nav || !toggle) return;

    // Fecha ao clicar num link do menu (navegação interna)
    nav.querySelectorAll('.site-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.dataset.aberto = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (nav.dataset.aberto !== 'true') return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.dataset.aberto = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Fecha com Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.dataset.aberto === 'true') {
        nav.dataset.aberto = 'false';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // -------------------------------------------------------
  // Boot
  // -------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { iniciar(); configurarMenu(); });
  } else {
    iniciar();
    configurarMenu();
  }
})();

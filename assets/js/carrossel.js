/* ============================================================
   Carrossel de destaques da home.
   - Autoplay 6s, pausa no hover e ao usar controles por teclado
   - Pontos indicadores com barra de progresso animada
   - Swipe no mobile (touch)
   - Respeita prefers-reduced-motion (desliga autoplay)
   ============================================================ */

(function () {
  'use strict';

  const carrossel = document.getElementById('carrossel');
  if (!carrossel) return;

  const pista = document.getElementById('carrossel-pista');
  const slides = pista.querySelectorAll('.carrossel__slide');
  const btnAnt = carrossel.querySelector('.carrossel__btn--anterior');
  const btnProx = carrossel.querySelector('.carrossel__btn--proximo');
  const pontosWrap = document.getElementById('carrossel-pontos');
  const indiceEl = document.getElementById('carrossel-indice');
  const totalEl = document.getElementById('carrossel-total');

  const total = slides.length;
  let atual = 0;
  let timer = null;
  const INTERVALO = 6000;
  const prefereMenos = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (totalEl) totalEl.textContent = String(total).padStart(2, '0');

  // Cria os pontos indicadores
  const pontos = [];
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'carrossel__ponto';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    btn.addEventListener('click', () => ir(i, true));
    pontosWrap.appendChild(btn);
    pontos.push(btn);
  }

  function atualizar() {
    pista.style.transform = `translateX(-${atual * 100}%)`;
    pontos.forEach((p, i) => {
      if (i === atual) p.setAttribute('aria-current', 'true');
      else p.removeAttribute('aria-current');
    });
    if (indiceEl) indiceEl.textContent = String(atual + 1).padStart(2, '0');
    slides.forEach((s, i) => {
      s.setAttribute('aria-hidden', i !== atual);
    });

    // Reinicia a animação do ponto ativo forçando reflow
    const ativo = pontos[atual];
    if (ativo && !prefereMenos) {
      ativo.style.setProperty('--restart', Date.now());
    }
  }

  function ir(indice, interacao = false) {
    atual = (indice + total) % total;
    atualizar();
    if (interacao) reiniciarTimer();
  }

  function proximo() { ir(atual + 1); }
  function anterior() { ir(atual - 1); }

  function iniciarTimer() {
    if (prefereMenos) return;
    pararTimer();
    timer = setInterval(proximo, INTERVALO);
  }

  function pararTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function reiniciarTimer() {
    pararTimer();
    iniciarTimer();
  }

  // Controles
  btnProx.addEventListener('click', () => { proximo(); reiniciarTimer(); });
  btnAnt.addEventListener('click', () => { anterior(); reiniciarTimer(); });

  // Teclado quando o carrossel tem foco
  carrossel.setAttribute('tabindex', '0');
  carrossel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); proximo(); reiniciarTimer(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); anterior(); reiniciarTimer(); }
  });

  // Pausa no hover e quando aba perde foco
  carrossel.addEventListener('mouseenter', () => {
    pararTimer();
    carrossel.classList.add('pausado');
  });
  carrossel.addEventListener('mouseleave', () => {
    carrossel.classList.remove('pausado');
    iniciarTimer();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pararTimer();
    else iniciarTimer();
  });

  // Swipe no mobile
  let touchX = null;
  pista.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    pararTimer();
  }, { passive: true });
  pista.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) proximo(); else anterior();
    }
    touchX = null;
    iniciarTimer();
  });

  // Inicialização
  atualizar();
  iniciarTimer();
})();

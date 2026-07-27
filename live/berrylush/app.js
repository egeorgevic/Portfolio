/* BerryLush prototype — cart, FAQ, toast, reveals.
   Behaviour is unchanged from the original inline script; handlers moved to
   delegated listeners with data-action attributes so the page needs no
   'unsafe-inline' in script-src. */
(function () {
  "use strict";

  const cart = [];
  const FREE_SHIP = 30;

  function money(n) { return '$' + n.toFixed(2) }

  function addToCart(name, variant, price, art) {
    const existing = cart.find(i => i.name === name && i.variant === variant);
    if (existing) { existing.qty++ }
    else { cart.push({ name, variant, price, art, qty: 1 }) }
    renderCart();
    const c = document.getElementById('cartCount');
    c.classList.remove('bounce'); void c.offsetWidth; c.classList.add('bounce');
    showToast('Added to your pouch 🍓');
  }

  function renderCart() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = count;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = money(total);
    const body = document.getElementById('cartBody');
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 220 260"><use href="#mascot"/></svg><p>Your pouch is empty.<br>Let\'s fix that.</p></div>';
    } else {
      body.innerHTML = cart.map((i, idx) => `
        <div class="line-item">
          <div class="li-art"><svg viewBox="0 0 160 220"><use href="#${i.art}"/></svg></div>
          <div class="li-info">
            <b>${i.name}</b><small>${i.variant} · ${money(i.price)}</small>
            <div class="qty">
              <button data-action="qty" data-idx="${idx}" data-delta="-1" aria-label="Decrease">−</button>
              <span>${i.qty}</span>
              <button data-action="qty" data-idx="${idx}" data-delta="1" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="li-remove" data-action="remove" data-idx="${idx}">Remove</button>
        </div>`).join('');
    }
    // ship bar
    const remain = FREE_SHIP - total;
    const fill = document.getElementById('shipFill');
    const msg = document.getElementById('shipMsg');
    fill.style.width = Math.min(100, (total / FREE_SHIP) * 100) + '%';
    msg.textContent = remain > 0 ? `Add ${money(remain)} for free shipping!` : '🎉 You unlocked free shipping!';
  }

  function chQty(i, d) { cart[i].qty += d; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart() }
  function removeItem(i) { cart.splice(i, 1); renderCart() }

  function openCart() { document.getElementById('drawer').classList.add('on'); document.getElementById('overlay').classList.add('on') }
  function closeCart() { document.getElementById('drawer').classList.remove('on'); document.getElementById('overlay').classList.remove('on') }

  function checkout() {
    if (!cart.length) { showToast('Add something juicy first 🍓'); return }
    showToast('Demo checkout — Apple Pay, Shop Pay & more at launch');
  }
  function notifyMe() { showToast('On the list! We\'ll ping you at drop time 🍓') }

  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('on'), 2600);
  }

  function toggleFaq(btn) {
    const item = btn.parentElement;
    const a = item.querySelector('.faq-a');
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
  }

  // One delegated listener covers every button, including the cart lines that
  // renderCart() rebuilds on each change.
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    switch (el.getAttribute('data-action')) {
      case 'add':
        addToCart(el.dataset.name, el.dataset.variant, parseFloat(el.dataset.price), el.dataset.art);
        break;
      case 'qty':
        chQty(parseInt(el.dataset.idx, 10), parseInt(el.dataset.delta, 10));
        break;
      case 'remove': removeItem(parseInt(el.dataset.idx, 10)); break;
      case 'open-cart': openCart(); break;
      case 'close-cart': closeCart(); break;
      case 'checkout': checkout(); break;
      case 'notify': notifyMe(); break;
      case 'faq': toggleFaq(el); break;
    }
  });

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.target.reset();
      document.getElementById('signupOk').style.display = 'block';
      showToast('Welcome to the pink side 🍓');
    });
  }

  // scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  renderCart();
})();

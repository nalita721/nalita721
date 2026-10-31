/* POS ร้านค้า — mobile point of sale (offline-first, data kept in localStorage) */
(function () {
  'use strict';

  // ---------------------------------------------------------------- storage
  var KEY = 'mpos.v1';
  var COLORS = ['#ccfbf1', '#dbeafe', '#fce7f3', '#fef3c7', '#e0e7ff', '#dcfce7', '#ffedd5', '#f3e8ff', '#e2e8f0'];
  var EMOJIS = ['☕', '🧋', '🥤', '🍵', '🧃', '🍞', '🥐', '🍰', '🍪', '🍜', '🍛', '🍚', '🍗', '🥗', '🍳', '🍔', '🍟', '🍦', '🍫', '🧴', '🧻', '👕', '📦', '🛍️'];

  function defaultDb() {
    return {
      settings: {
        shopName: 'ร้านของฉัน', address: '', taxId: '', promptpay: '',
        vatMode: 'none', vatRate: 7, lowStock: 5, footer: 'ขอบคุณที่อุดหนุนค่ะ 🙏'
      },
      categories: [], products: [], sales: [], held: [], seq: 0
    };
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      var base = defaultDb();
      d.settings = Object.assign(base.settings, d.settings || {});
      ['categories', 'products', 'sales', 'held'].forEach(function (k) { if (!Array.isArray(d[k])) d[k] = []; });
      d.seq = d.seq || 0;
      return d;
    } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { toast('บันทึกไม่สำเร็จ: พื้นที่เก็บข้อมูลเต็ม — โปรดสำรองแล้วล้างข้อมูลเก่า'); }
  }

  var db = load();
  var firstRun = !db;
  if (!db) db = defaultDb();

  // ---------------------------------------------------------------- helpers
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function r2(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }
  function money(n) { return '฿' + Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function money0(n) { return '฿' + Number(n || 0).toLocaleString('th-TH', { maximumFractionDigits: 0 }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n, l) { n = String(n); while (n.length < l) n = '0' + n; return n; }
  function dayKey(t) { var d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1, 2) + '-' + pad(d.getDate(), 2); }
  function fmtTime(t) { return new Date(t).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }); }
  function fmtDateTime(t) { return new Date(t).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }); }
  function catName(id) { var c = db.categories.find(function (x) { return x.id === id; }); return c ? c.name : 'ไม่มีหมวด'; }
  function product(id) { return db.products.find(function (p) { return p.id === id; }); }
  function tracked(p) { return p && p.stock !== null && p.stock !== undefined && p.stock !== ''; }
  var METHODS = { cash: { label: 'เงินสด', icon: '💵' }, promptpay: { label: 'พร้อมเพย์', icon: '📱' }, transfer: { label: 'โอนเงิน', icon: '🏦' }, card: { label: 'บัตร', icon: '💳' } };

  var toastTimer;
  function toast(msg) {
    var el = $('#toast'); el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.hidden = true; }, 2200);
  }
  function beep() {
    try {
      var A = window.AudioContext || window.webkitAudioContext; if (!A) return;
      beep.ctx = beep.ctx || new A();
      var o = beep.ctx.createOscillator(), g = beep.ctx.createGain();
      o.frequency.value = 1200; g.gain.value = 0.05; o.connect(g); g.connect(beep.ctx.destination);
      o.start(); o.stop(beep.ctx.currentTime + 0.07);
    } catch (e) { /* ignore */ }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // ---------------------------------------------------------------- modal
  var onModalClose = null;
  function openModal(title, html, onClose) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    $('#modal').hidden = false;
    onModalClose = onClose || null;
    return $('#modalBody');
  }
  function closeModal() {
    $('#modal').hidden = true; $('#modalBody').innerHTML = '';
    var cb = onModalClose; onModalClose = null; if (cb) cb();
  }
  $('#modalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', function (e) { if (e.target.id === 'modal') closeModal(); });

  // ---------------------------------------------------------------- navigation
  var currentView = 'sell';
  function show(view) {
    currentView = view;
    $$('.view').forEach(function (v) { v.classList.toggle('active', v.id === 'view-' + view); });
    $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.view === view); });
    closeCart();
    if (view === 'sell') renderCatalog();
    if (view === 'bills') renderBills();
    if (view === 'products') renderProducts();
    if (view === 'reports') renderReports();
    if (view === 'settings') renderSettings();
    window.scrollTo(0, 0);
  }
  $$('.tab').forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.view); }); });

  function tick() {
    $('#clock').textContent = new Date().toLocaleString('th-TH', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    var today = dayKey(Date.now());
    var sum = db.sales.filter(function (s) { return s.status === 'paid' && dayKey(s.time) === today; })
      .reduce(function (a, s) { return a + s.total; }, 0);
    $('#todayPill').textContent = 'วันนี้ ' + money0(sum);
    $('#shopNameTop').textContent = db.settings.shopName || 'ร้านของฉัน';
  }

  // ================================================================= SELL
  var cart = [];
  var discount = { type: 'amt', value: 0 };
  var activeCat = 'all';

  function totals() {
    var subtotal = r2(cart.reduce(function (a, i) { return a + i.price * i.qty; }, 0));
    var disc = discount.type === 'pct' ? r2(subtotal * discount.value / 100) : r2(discount.value);
    if (disc > subtotal) disc = subtotal;
    var base = r2(subtotal - disc);
    var rate = Number(db.settings.vatRate) || 0, vat = 0, total = base;
    if (db.settings.vatMode === 'include') { vat = r2(base * rate / (100 + rate)); }
    else if (db.settings.vatMode === 'exclude') { vat = r2(base * rate / 100); total = r2(base + vat); }
    return { subtotal: subtotal, discount: disc, vat: vat, total: total, items: cart.reduce(function (a, i) { return a + i.qty; }, 0) };
  }

  function renderChips() {
    var html = '<button class="chip' + (activeCat === 'all' ? ' active' : '') + '" data-cat="all">ทั้งหมด</button>';
    db.categories.forEach(function (c) {
      html += '<button class="chip' + (activeCat === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' + esc(c.name) + '</button>';
    });
    $('#categoryChips').innerHTML = html;
  }
  $('#categoryChips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    activeCat = b.dataset.cat; renderCatalog();
  });

  function stockBadge(p) {
    if (!tracked(p)) return '';
    var s = Number(p.stock), low = Number(db.settings.lowStock) || 0;
    var cls = s <= 0 ? 'out' : (s <= low ? 'low' : '');
    return '<span class="st ' + cls + '">' + (s <= 0 ? 'หมด' : 'เหลือ ' + s) + '</span>';
  }

  function renderCatalog() {
    renderChips();
    var q = $('#searchInput').value.trim().toLowerCase();
    var list = db.products.filter(function (p) {
      if (activeCat !== 'all' && p.categoryId !== activeCat) return false;
      if (q && p.name.toLowerCase().indexOf(q) < 0 && String(p.barcode || '').indexOf(q) < 0) return false;
      return true;
    });
    var inCart = {}; cart.forEach(function (i) { inCart[i.pid] = i.qty; });
    $('#productGrid').innerHTML = list.map(function (p) {
      var out = tracked(p) && Number(p.stock) <= 0;
      return '<div class="p-card' + (out ? ' out' : '') + '" data-id="' + p.id + '">' +
        (inCart[p.id] ? '<span class="qty-dot">' + inCart[p.id] + '</span>' : '') + stockBadge(p) +
        '<div class="emo" style="background:' + (p.color || COLORS[0]) + '">' + esc(p.emoji || '📦') + '</div>' +
        '<div class="nm">' + esc(p.name) + '</div><div class="pr">' + money(p.price) + '</div></div>';
    }).join('');
    $('#productEmpty').hidden = db.products.length > 0;
    renderCart();
  }

  $('#productGrid').addEventListener('click', function (e) {
    var c = e.target.closest('.p-card'); if (!c) return;
    addToCart(c.dataset.id);
  });

  function addToCart(pid, qty) {
    var p = product(pid); if (!p) return;
    qty = qty || 1;
    var line = cart.find(function (i) { return i.pid === pid; });
    var want = (line ? line.qty : 0) + qty;
    if (tracked(p) && want > Number(p.stock)) {
      if (!confirm('“' + p.name + '” มีสต๊อกเหลือ ' + p.stock + ' ชิ้น\nต้องการขายเกินสต๊อกหรือไม่?')) return;
    }
    if (line) line.qty = want;
    else cart.push({ pid: p.id, name: p.name, price: Number(p.price), cost: Number(p.cost) || 0, qty: qty });
    beep();
    renderCatalog();
  }

  function renderCart() {
    var t = totals();
    $('#cartList').innerHTML = cart.map(function (i, idx) {
      return '<li class="cart-item" data-idx="' + idx + '"><div><div class="nm">' + esc(i.name) + '</div>' +
        '<div class="meta">' + money(i.price) + ' / ชิ้น</div>' +
        '<div class="stepper"><button data-act="dec">−</button><span data-act="qty">' + i.qty + '</span><button data-act="inc">+</button></div></div>' +
        '<div class="line">' + money(i.price * i.qty) + '<br><button class="link danger" data-act="del">ลบ</button></div></li>';
    }).join('');
    $('#cartEmpty').hidden = cart.length > 0;
    $('#cartCount').textContent = t.items;
    $('#subtotalTxt').textContent = money(t.subtotal);
    $('#discountTxt').textContent = '-' + money(t.discount) + (discount.type === 'pct' && discount.value ? ' (' + discount.value + '%)' : '');
    var vm = db.settings.vatMode;
    $('#vatRow').hidden = vm === 'none';
    $('#vatLabel').textContent = 'VAT ' + db.settings.vatRate + '% ' + (vm === 'include' ? '(รวมในราคา)' : '');
    $('#vatTxt').textContent = money(t.vat);
    $('#totalTxt').textContent = money(t.total);
    $('#payBtn').disabled = cart.length === 0;
    $('#payBtn').textContent = cart.length ? 'ชำระเงิน ' + money(t.total) : 'ชำระเงิน';
    $('#fabCount').textContent = t.items;
    $('#fabTotal').textContent = money(t.total);
    if (cart.length) $('#cartFab').removeAttribute('data-empty'); else $('#cartFab').setAttribute('data-empty', '');
    var hc = $('#heldCount'); hc.textContent = db.held.length || '';
    if (db.held.length) hc.removeAttribute('data-zero'); else hc.setAttribute('data-zero', '');
  }

  $('#cartList').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var idx = Number(b.closest('.cart-item').dataset.idx), item = cart[idx];
    var act = b.dataset.act;
    if (act === 'inc') { addToCart(item.pid); return; }
    if (act === 'dec') { item.qty -= 1; if (item.qty <= 0) cart.splice(idx, 1); }
    if (act === 'del') cart.splice(idx, 1);
    if (act === 'qty') {
      var v = prompt('จำนวน “' + item.name + '”', item.qty);
      if (v === null) return;
      v = Math.floor(Number(v));
      if (!(v >= 0)) return toast('จำนวนไม่ถูกต้อง');
      if (v === 0) cart.splice(idx, 1); else item.qty = v;
    }
    renderCatalog();
  });

  $('#clearCartBtn').addEventListener('click', function () {
    if (!cart.length || !confirm('ล้างสินค้าในตะกร้าทั้งหมด?')) return;
    cart = []; discount = { type: 'amt', value: 0 }; renderCatalog();
  });

  function openCart() { $('#cartPanel').classList.add('open'); }
  function closeCart() { $('#cartPanel').classList.remove('open'); }
  $('#cartFab').addEventListener('click', openCart);
  $('#closeCartBtn').addEventListener('click', closeCart);

  $('#discountRow').addEventListener('click', function () {
    var body = openModal('ส่วนลดท้ายบิล',
      '<div class="seg" style="grid-template-columns:1fr 1fr"><button data-t="amt">บาท (฿)</button><button data-t="pct">เปอร์เซ็นต์ (%)</button></div>' +
      '<input class="big-input" id="discVal" type="number" inputmode="decimal" min="0" step="0.01" value="' + (discount.value || '') + '" placeholder="0" />' +
      '<div class="quick" id="discQuick"></div>' +
      '<div class="btn-row"><button class="btn ghost" id="discClear">ไม่มีส่วนลด</button><button class="btn primary" id="discOk">ตกลง</button></div>');
    var type = discount.type;
    function paint() {
      $$('.seg button', body).forEach(function (b) { b.classList.toggle('active', b.dataset.t === type); });
      var q = type === 'pct' ? [5, 10, 15, 20, 30, 50] : [5, 10, 20, 50, 100, 200];
      $('#discQuick').innerHTML = q.map(function (v) { return '<button data-v="' + v + '">' + (type === 'pct' ? v + '%' : '฿' + v) + '</button>'; }).join('');
    }
    paint();
    body.addEventListener('click', function (e) {
      var t = e.target.closest('[data-t]'); if (t) { type = t.dataset.t; paint(); }
      var q = e.target.closest('[data-v]'); if (q) $('#discVal').value = q.dataset.v;
    });
    $('#discClear').onclick = function () { discount = { type: 'amt', value: 0 }; closeModal(); renderCart(); };
    $('#discOk').onclick = function () {
      var v = Math.max(0, Number($('#discVal').value) || 0);
      if (type === 'pct' && v > 100) v = 100;
      discount = { type: type, value: v }; closeModal(); renderCart();
    };
  });

  // hold / recall
  $('#holdBtn').addEventListener('click', function () {
    if (!cart.length) return toast('ตะกร้าว่าง');
    var note = prompt('ชื่อบิลที่พัก (เช่น โต๊ะ 3 / คุณเอ)', 'บิล ' + (db.held.length + 1));
    if (note === null) return;
    db.held.push({ id: uid(), time: Date.now(), note: note, cart: cart, discount: discount });
    save(); cart = []; discount = { type: 'amt', value: 0 };
    toast('พักบิลแล้ว'); renderCatalog();
  });
  $('#recallBtn').addEventListener('click', function () {
    if (!db.held.length) return toast('ไม่มีบิลที่พักไว้');
    var body = openModal('บิลที่พักไว้', '<ul class="bill-list">' + db.held.map(function (h) {
      var sum = h.cart.reduce(function (a, i) { return a + i.price * i.qty; }, 0);
      return '<li class="bill" data-id="' + h.id + '"><div class="info"><div class="t">' + esc(h.note) + '</div><div class="s">' +
        fmtTime(h.time) + ' · ' + h.cart.length + ' รายการ</div></div><div class="amt">' + money(sum) + '</div>' +
        '<button class="link danger" data-del="1">ลบ</button></li>';
    }).join('') + '</ul>');
    body.addEventListener('click', function (e) {
      var li = e.target.closest('.bill'); if (!li) return;
      var i = db.held.findIndex(function (h) { return h.id === li.dataset.id; });
      if (e.target.dataset.del) {
        if (!confirm('ลบบิลที่พักนี้?')) return;
        db.held.splice(i, 1); save(); closeModal(); renderCart(); return;
      }
      if (cart.length && !confirm('ตะกร้าปัจจุบันจะถูกแทนที่ ดำเนินการต่อ?')) return;
      var h = db.held.splice(i, 1)[0]; save();
      cart = h.cart; discount = h.discount || { type: 'amt', value: 0 };
      closeModal(); renderCatalog(); openCart();
    });
  });

  // search + barcode
  $('#searchInput').addEventListener('input', renderCatalog);
  $('#searchInput').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var v = e.target.value.trim(); if (!v) return;
    var p = db.products.find(function (x) { return x.barcode && String(x.barcode) === v; });
    if (!p) {
      var matches = db.products.filter(function (x) { return x.name.toLowerCase().indexOf(v.toLowerCase()) >= 0; });
      if (matches.length === 1) p = matches[0];
    }
    if (p) { e.target.value = ''; addToCart(p.id); }
    else toast('ไม่พบสินค้า “' + v + '”');
  });

  $('#scanBtn').addEventListener('click', function () { scanBarcode(function (code) {
    var p = db.products.find(function (x) { return x.barcode && String(x.barcode) === code; });
    if (p) { addToCart(p.id); toast('เพิ่ม ' + p.name); }
    else toast('ไม่พบสินค้าบาร์โค้ด ' + code);
  }); });

  function scanBarcode(onCode) {
    if (!('BarcodeDetector' in window) || !navigator.mediaDevices) {
      toast('เบราว์เซอร์นี้ยังไม่รองรับการสแกนด้วยกล้อง — พิมพ์รหัส หรือใช้เครื่องสแกนบาร์โค้ดแทน');
      return;
    }
    var stream, stopped = false;
    openModal('สแกนบาร์โค้ด', '<div class="scanner"><video id="scanVideo" playsinline muted></video></div><p class="muted center small">เล็งกล้องไปที่บาร์โค้ด</p>', function () {
      stopped = true; if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
    });
    var detector = new window.BarcodeDetector();
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (s) {
      stream = s; if (stopped) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
      var v = $('#scanVideo'); v.srcObject = s; v.play();
      (function loop() {
        if (stopped) return;
        detector.detect(v).then(function (codes) {
          if (codes.length) { var c = codes[0].rawValue; beep(); closeModal(); onCode(c); }
          else requestAnimationFrame(loop);
        }).catch(function () { requestAnimationFrame(loop); });
      })();
    }).catch(function () { closeModal(); toast('ไม่สามารถเปิดกล้องได้'); });
  }

  // ---------------------------------------------------------------- payment
  $('#payBtn').addEventListener('click', openPayment);

  function openPayment() {
    if (!cart.length) return;
    var t = totals();
    var method = 'cash';
    var body = openModal('ชำระเงิน',
      '<div class="pay-total"><div class="muted">ยอดที่ต้องชำระ</div><div class="v">' + money(t.total) + '</div></div>' +
      '<div class="seg" id="methodSeg">' + Object.keys(METHODS).map(function (k) {
        return '<button data-m="' + k + '"><span>' + METHODS[k].icon + '</span>' + METHODS[k].label + '</button>';
      }).join('') + '</div><div id="payPane"></div>' +
      '<button class="btn primary big" id="confirmPay">ยืนยันการชำระเงิน</button>');

    function paint() {
      $$('#methodSeg button', body).forEach(function (b) { b.classList.toggle('active', b.dataset.m === method); });
      var pane = $('#payPane');
      if (method === 'cash') {
        var notes = [t.total, 20, 50, 100, 500, 1000].filter(function (v, i) { return i === 0 || v >= t.total; });
        var ceil = [Math.ceil(t.total / 10) * 10, Math.ceil(t.total / 100) * 100];
        var opts = []; notes.concat(ceil).forEach(function (v) { v = r2(v); if (opts.indexOf(v) < 0 && v >= t.total) opts.push(v); });
        opts.sort(function (a, b) { return a - b; }); opts = opts.slice(0, 6);
        pane.innerHTML = '<label class="muted small">รับเงินมา</label>' +
          '<input class="big-input" id="cashIn" type="number" inputmode="decimal" min="0" step="0.01" placeholder="' + t.total.toFixed(2) + '" />' +
          '<div class="quick">' + opts.map(function (v, i) { return '<button data-cash="' + v + '">' + (i === 0 && v === t.total ? 'พอดี' : money0(v)) + '</button>'; }).join('') + '</div>' +
          '<div class="change" id="changeTxt">เงินทอน <b>฿0.00</b></div>';
        var input = $('#cashIn');
        var upd = function () {
          var got = input.value === '' ? t.total : Number(input.value);
          var ch = r2(got - t.total), el = $('#changeTxt');
          el.classList.toggle('neg', ch < 0);
          el.innerHTML = (ch < 0 ? 'ขาดอีก ' : 'เงินทอน ') + '<b>' + money(Math.abs(ch)) + '</b>';
        };
        input.addEventListener('input', upd);
        pane.querySelector('.quick').addEventListener('click', function (e) {
          var b = e.target.closest('[data-cash]'); if (!b) return; input.value = b.dataset.cash; upd();
        });
        upd();
      } else if (method === 'promptpay') {
        var id = db.settings.promptpay;
        if (!id) {
          pane.innerHTML = '<div class="card center">ยังไม่ได้ตั้งค่าหมายเลขพร้อมเพย์<br><button class="btn" id="goSettings" style="margin-top:8px">ไปที่ตั้งค่า</button></div>';
          $('#goSettings').onclick = function () { closeModal(); show('settings'); };
        } else {
          pane.innerHTML = '<div class="qr-box"><div class="pp-head">PromptPay</div><div class="qr">' + qrSvg(promptPayPayload(id, t.total)) + '</div>' +
            '<div class="muted small">' + esc(maskPP(id)) + ' · ' + money(t.total) + '</div>' +
            '<div class="muted small">ให้ลูกค้าสแกนจ่าย แล้วตรวจสอบยอดเงินเข้าก่อนกดยืนยัน</div></div>';
        }
      } else {
        pane.innerHTML = '<label class="muted small">หมายเหตุ / เลขอ้างอิง (ถ้ามี)</label><input id="payRef" placeholder="เช่น 4 หลักท้ายบัตร หรือเลขที่สลิป" style="margin-bottom:14px" />';
      }
    }
    paint();
    $('#methodSeg').addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) return; method = b.dataset.m; paint();
    });

    $('#confirmPay').addEventListener('click', function () {
      var received = t.total, ref = '';
      if (method === 'cash') {
        var v = $('#cashIn').value;
        received = v === '' ? t.total : r2(Number(v));
        if (received < t.total) return toast('รับเงินไม่พอ');
      } else if (method === 'promptpay' && !db.settings.promptpay) {
        return toast('กรุณาตั้งค่าพร้อมเพย์ก่อน');
      } else if ($('#payRef')) ref = $('#payRef').value.trim();
      completeSale(t, method, received, ref);
    });
  }

  function completeSale(t, method, received, ref) {
    db.seq += 1;
    var now = Date.now();
    var sale = {
      id: uid(), no: 'R' + dayKey(now).replace(/-/g, '').slice(2) + '-' + pad(db.seq, 4), time: now,
      items: cart.map(function (i) { return { pid: i.pid, name: i.name, price: i.price, cost: i.cost, qty: i.qty }; }),
      subtotal: t.subtotal, discount: t.discount, vat: t.vat, vatMode: db.settings.vatMode, vatRate: Number(db.settings.vatRate) || 0,
      total: t.total, method: method, received: received, change: r2(received - t.total), ref: ref, status: 'paid'
    };
    sale.items.forEach(function (i) {
      var p = product(i.pid); if (tracked(p)) p.stock = Number(p.stock) - i.qty;
    });
    db.sales.push(sale); save();
    cart = []; discount = { type: 'amt', value: 0 };
    renderCatalog(); closeCart(); tick();

    var body = openModal('ชำระเงินสำเร็จ',
      '<div class="success"><div class="tick">✅</div><h2>' + money(sale.total) + '</h2>' +
      '<p class="muted">' + METHODS[method].label + (method === 'cash' ? ' · รับ ' + money(sale.received) + '</p><h2 style="color:var(--ok)">เงินทอน ' + money(sale.change) + '</h2>' : '</p>') +
      '</div>' + receiptHtml(sale) +
      '<div class="btn-row"><button class="btn ghost" data-a="print">🖨️ พิมพ์</button><button class="btn ghost" data-a="share">📤 ส่งใบเสร็จ</button></div>' +
      '<button class="btn primary big" data-a="new">ขายบิลถัดไป</button>');
    body.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'print') printReceipt(sale);
      if (a.dataset.a === 'share') shareReceipt(sale);
      if (a.dataset.a === 'new') closeModal();
    });
  }

  // ---------------------------------------------------------------- receipt
  function receiptHtml(s) {
    var st = db.settings;
    var h = '<div class="receipt"><div class="c b">' + esc(st.shopName) + '</div>';
    if (st.address) h += '<div class="c">' + esc(st.address).replace(/\n/g, '<br>') + '</div>';
    if (st.taxId) h += '<div class="c">เลขผู้เสียภาษี ' + esc(st.taxId) + '</div>';
    h += '<div class="c">' + (s.vatMode && s.vatMode !== 'none' ? 'ใบกำกับภาษีอย่างย่อ' : 'ใบเสร็จรับเงิน') + '</div><hr>';
    h += '<div class="r"><span>เลขที่ ' + esc(s.no) + '</span><span>' + fmtDateTime(s.time) + '</span></div><hr>';
    if (s.status === 'void') h += '<div class="void-mark">ยกเลิกแล้ว</div>';
    s.items.forEach(function (i) {
      h += '<div>' + esc(i.name) + '</div><div class="r"><span>&nbsp; ' + i.qty + ' x ' + i.price.toFixed(2) + '</span><span>' + (i.qty * i.price).toFixed(2) + '</span></div>';
    });
    h += '<hr><div class="r"><span>รวม</span><span>' + s.subtotal.toFixed(2) + '</span></div>';
    if (s.discount) h += '<div class="r"><span>ส่วนลด</span><span>-' + s.discount.toFixed(2) + '</span></div>';
    if (s.vatMode === 'include') h += '<div class="r"><span>มูลค่าก่อน VAT</span><span>' + (s.total - s.vat).toFixed(2) + '</span></div><div class="r"><span>VAT ' + s.vatRate + '%</span><span>' + s.vat.toFixed(2) + '</span></div>';
    if (s.vatMode === 'exclude') h += '<div class="r"><span>VAT ' + s.vatRate + '%</span><span>' + s.vat.toFixed(2) + '</span></div>';
    h += '<div class="r b"><span>สุทธิ</span><span>' + s.total.toFixed(2) + '</span></div>';
    h += '<div class="r"><span>' + METHODS[s.method].label + '</span><span>' + s.received.toFixed(2) + '</span></div>';
    if (s.method === 'cash') h += '<div class="r"><span>เงินทอน</span><span>' + s.change.toFixed(2) + '</span></div>';
    if (s.ref) h += '<div>อ้างอิง: ' + esc(s.ref) + '</div>';
    h += '<hr>';
    if (st.footer) h += '<div class="c">' + esc(st.footer) + '</div>';
    return h + '</div>';
  }
  function printReceipt(s) {
    $('#printArea').innerHTML = receiptHtml(s);
    setTimeout(function () { window.print(); }, 50);
  }
  function receiptText(s) {
    var st = db.settings, L = [];
    L.push(st.shopName, 'ใบเสร็จ ' + s.no, fmtDateTime(s.time), '------------------');
    s.items.forEach(function (i) { L.push(i.name + ' x' + i.qty + '  ' + (i.qty * i.price).toFixed(2)); });
    L.push('------------------');
    if (s.discount) L.push('ส่วนลด -' + s.discount.toFixed(2));
    if (s.vat) L.push('VAT ' + s.vat.toFixed(2));
    L.push('สุทธิ ' + s.total.toFixed(2) + ' บาท', 'ชำระโดย ' + METHODS[s.method].label);
    if (st.footer) L.push('', st.footer);
    return L.join('\n');
  }
  function shareReceipt(s) {
    var text = receiptText(s);
    if (navigator.share) { navigator.share({ title: 'ใบเสร็จ ' + s.no, text: text }).catch(function () {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function () { toast('คัดลอกใบเสร็จแล้ว — นำไปวางใน LINE ได้เลย'); }); }
    else toast('อุปกรณ์นี้ไม่รองรับการแชร์');
  }

  // ---------------------------------------------------------------- PromptPay (EMVCo / Thai QR)
  function tlv(id, v) { return id + pad(v.length, 2) + v; }
  function crc16(s) {
    var crc = 0xFFFF;
    for (var i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return ('0000' + crc.toString(16).toUpperCase()).slice(-4);
  }
  function promptPayPayload(id, amount) {
    var d = String(id).replace(/\D/g, ''), acc;
    if (d.length >= 15) acc = tlv('03', d);
    else if (d.length === 13) acc = tlv('02', d);
    else acc = tlv('01', ('0000000000000' + '66' + d.replace(/^0/, '')).slice(-13));
    var p = tlv('00', '01') + tlv('01', amount ? '12' : '11') +
      tlv('29', tlv('00', 'A000000677010111') + acc) + tlv('53', '764') +
      (amount ? tlv('54', Number(amount).toFixed(2)) : '') + tlv('58', 'TH') + '6304';
    return p + crc16(p);
  }
  function maskPP(id) { var d = String(id).replace(/\D/g, ''); return d.length > 4 ? d.slice(0, d.length - 4).replace(/\d/g, 'x') + d.slice(-4) : d; }
  function qrSvg(text) {
    if (typeof window.qrcode !== 'function') return '<div class="muted">โหลดตัวสร้าง QR ไม่สำเร็จ</div>';
    var q = window.qrcode(0, 'M'); q.addData(text); q.make();
    return q.createSvgTag(6, 0);
  }

  // ================================================================= BILLS
  $('#billDate').value = dayKey(Date.now());
  $('#billDate').addEventListener('change', renderBills);
  function renderBills() {
    var d = $('#billDate').value || dayKey(Date.now());
    var list = db.sales.filter(function (s) { return dayKey(s.time) === d; }).sort(function (a, b) { return b.time - a.time; });
    var paid = list.filter(function (s) { return s.status === 'paid'; });
    var sum = paid.reduce(function (a, s) { return a + s.total; }, 0);
    var cash = paid.filter(function (s) { return s.method === 'cash'; }).reduce(function (a, s) { return a + s.total; }, 0);
    $('#billSummary').innerHTML = stat('ยอดขาย', money(sum), true) + stat('จำนวนบิล', paid.length) +
      stat('เงินสดในลิ้นชัก', money(cash)) + stat('ยกเลิก', list.length - paid.length + ' บิล');
    $('#billList').innerHTML = list.map(function (s) {
      var n = s.items.reduce(function (a, i) { return a + i.qty; }, 0);
      return '<li class="bill' + (s.status === 'void' ? ' void' : '') + '" data-id="' + s.id + '"><div class="info"><div class="t">' + esc(s.no) +
        ' ' + (s.status === 'void' ? '<span class="tag red">ยกเลิก</span>' : '<span class="tag">' + METHODS[s.method].icon + ' ' + METHODS[s.method].label + '</span>') +
        '</div><div class="s">' + fmtTime(s.time) + ' · ' + n + ' ชิ้น · ' + esc(s.items.map(function (i) { return i.name; }).join(', ')) + '</div></div>' +
        '<div class="amt">' + money(s.total) + '</div></li>';
    }).join('');
    $('#billEmpty').hidden = list.length > 0;
  }
  function stat(k, v, hi) { return '<div class="stat' + (hi ? ' hi' : '') + '"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>'; }

  $('#billList').addEventListener('click', function (e) {
    var li = e.target.closest('.bill'); if (!li) return;
    var s = db.sales.find(function (x) { return x.id === li.dataset.id; }); if (!s) return;
    var body = openModal('บิล ' + s.no, receiptHtml(s) +
      '<div class="btn-row"><button class="btn ghost" data-a="print">🖨️ พิมพ์ซ้ำ</button><button class="btn ghost" data-a="share">📤 ส่งใบเสร็จ</button></div>' +
      (s.status === 'paid' ? '<button class="btn danger-ghost full" data-a="void">ยกเลิกบิล / คืนสินค้าเข้าสต๊อก</button>' : ''));
    body.addEventListener('click', function (ev) {
      var a = ev.target.closest('[data-a]'); if (!a) return;
      if (a.dataset.a === 'print') printReceipt(s);
      if (a.dataset.a === 'share') shareReceipt(s);
      if (a.dataset.a === 'void') {
        var reason = prompt('เหตุผลที่ยกเลิกบิล', 'ลูกค้าคืนสินค้า');
        if (reason === null) return;
        s.status = 'void'; s.voidReason = reason; s.voidTime = Date.now();
        s.items.forEach(function (i) { var p = product(i.pid); if (tracked(p)) p.stock = Number(p.stock) + i.qty; });
        save(); closeModal(); renderBills(); tick(); toast('ยกเลิกบิลแล้ว');
      }
    });
  });

  // ================================================================= PRODUCTS
  $('#prodSearch').addEventListener('input', renderProducts);
  $('#stockFilter').addEventListener('change', renderProducts);
  $('#addProductBtn').addEventListener('click', function () { editProduct(null); });

  function renderProducts() {
    var q = $('#prodSearch').value.trim().toLowerCase(), f = $('#stockFilter').value, low = Number(db.settings.lowStock) || 0;
    var list = db.products.filter(function (p) {
      if (q && p.name.toLowerCase().indexOf(q) < 0 && String(p.barcode || '').indexOf(q) < 0) return false;
      if (f === 'low') return tracked(p) && Number(p.stock) > 0 && Number(p.stock) <= low;
      if (f === 'out') return tracked(p) && Number(p.stock) <= 0;
      return true;
    });
    $('#prodList').innerHTML = list.length ? list.map(function (p) {
      var s = '';
      if (tracked(p)) {
        var n = Number(p.stock);
        s = n <= 0 ? '<span class="tag red">หมด</span>' : (n <= low ? '<span class="tag amber">เหลือ ' + n + '</span>' : '<span class="tag">คงเหลือ ' + n + '</span>');
      } else s = '<span class="tag">ไม่นับสต๊อก</span>';
      return '<li class="prod" data-id="' + p.id + '"><div class="emo" style="background:' + (p.color || COLORS[0]) + '">' + esc(p.emoji || '📦') + '</div>' +
        '<div class="info"><div class="t">' + esc(p.name) + '</div><div class="s">' + esc(catName(p.categoryId)) + (p.barcode ? ' · ' + esc(p.barcode) : '') + '</div></div>' +
        '<div class="right"><div><b>' + money(p.price) + '</b></div>' + s + '</div></li>';
    }).join('') : '<div class="empty">ไม่พบสินค้า</div>';
  }
  $('#prodList').addEventListener('click', function (e) {
    var li = e.target.closest('.prod'); if (li) editProduct(li.dataset.id);
  });

  function editProduct(id, prefill) {
    var p = id ? product(id) : null;
    var d = prefill ? Object.assign({}, prefill) : p ? Object.assign({}, p) : { name: '', price: '', cost: '', stock: '', categoryId: activeCat !== 'all' ? activeCat : '', barcode: '', emoji: '📦', color: COLORS[0] };
    var body = openModal(p ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า',
      '<form class="form" id="pForm">' +
      '<label>ชื่อสินค้า<input name="name" required value="' + esc(d.name) + '" /></label>' +
      '<div class="two"><label>ราคาขาย (฿)<input name="price" type="number" inputmode="decimal" step="0.01" min="0" required value="' + esc(d.price) + '" /></label>' +
      '<label>ต้นทุน (฿)<input name="cost" type="number" inputmode="decimal" step="0.01" min="0" value="' + esc(d.cost) + '" /></label></div>' +
      '<div class="two"><label>หมวดหมู่<select name="categoryId"><option value="">ไม่มีหมวด</option>' +
      db.categories.map(function (c) { return '<option value="' + c.id + '"' + (c.id === d.categoryId ? ' selected' : '') + '>' + esc(c.name) + '</option>'; }).join('') +
      '</select></label><label>สต๊อกคงเหลือ<input name="stock" type="number" inputmode="numeric" step="1" placeholder="เว้นว่าง = ไม่นับ" value="' + (tracked(d) ? esc(d.stock) : '') + '" /></label></div>' +
      (p && tracked(p) ? '<div class="btn-row"><button type="button" class="btn ghost" data-adj="in">+ รับสินค้าเข้า</button><button type="button" class="btn ghost" data-adj="out">− ตัดสต๊อก</button></div>' : '') +
      '<label>บาร์โค้ด<div class="search-row" style="margin:0"><input name="barcode" inputmode="numeric" value="' + esc(d.barcode) + '" /><button type="button" class="icon-btn" id="pScan">📷</button></div></label>' +
      '<label>ไอคอน<div class="emoji-row">' + EMOJIS.map(function (em) { return '<button type="button" data-emoji="' + em + '"' + (em === d.emoji ? ' class="active"' : '') + '>' + em + '</button>'; }).join('') + '</div></label>' +
      '<label>สีพื้น<div class="color-row">' + COLORS.map(function (c) { return '<button type="button" data-color="' + c + '" style="background:' + c + '"' + (c === d.color ? ' class="active"' : '') + '></button>'; }).join('') + '</div></label>' +
      '<button class="btn primary big" type="submit">บันทึก</button>' +
      (p ? '<button type="button" class="btn danger-ghost full" id="pDel">ลบสินค้า</button>' : '') + '</form>');
    var f = $('#pForm');
    body.addEventListener('click', function (e) {
      var em = e.target.closest('[data-emoji]');
      if (em) { d.emoji = em.dataset.emoji; $$('[data-emoji]', body).forEach(function (b) { b.classList.toggle('active', b === em); }); }
      var co = e.target.closest('[data-color]');
      if (co) { d.color = co.dataset.color; $$('[data-color]', body).forEach(function (b) { b.classList.toggle('active', b === co); }); }
      var adj = e.target.closest('[data-adj]');
      if (adj) {
        var n = prompt(adj.dataset.adj === 'in' ? 'จำนวนที่รับเข้า' : 'จำนวนที่ตัดออก (ชำรุด/สูญหาย)', '1');
        n = Math.floor(Number(n));
        if (n > 0) { f.stock.value = Number(f.stock.value || 0) + (adj.dataset.adj === 'in' ? n : -n); }
      }
    });
    $('#pScan').onclick = function () {
      var keep = collect(); scanBarcode(function (code) { keep.barcode = code; reopen(keep); });
    };
    function collect() {
      return Object.assign({}, d, { name: f.name.value, price: f.price.value, cost: f.cost.value, categoryId: f.categoryId.value, stock: f.stock.value, barcode: f.barcode.value });
    }
    function reopen(data) {
      // re-open the form after the scanner closed, keeping what was typed
      editProduct(p ? p.id : null, data);
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = normalize(collect());
      if (!data.name) return toast('กรุณาใส่ชื่อสินค้า');
      if (data.barcode && db.products.some(function (x) { return x.barcode === data.barcode && (!p || x.id !== p.id); })) return toast('บาร์โค้ดนี้ซ้ำกับสินค้าอื่น');
      if (p) Object.assign(p, data); else { data.id = uid(); db.products.push(data); }
      save(); closeModal(); renderProducts(); toast('บันทึกแล้ว');
    });
    if (p) $('#pDel').onclick = function () {
      if (!confirm('ลบ “' + p.name + '”? (บิลเก่ายังคงอยู่)')) return;
      db.products = db.products.filter(function (x) { return x.id !== p.id; });
      cart = cart.filter(function (i) { return i.pid !== p.id; });
      save(); closeModal(); renderProducts();
    };
  }
  function normalize(x) {
    return {
      name: String(x.name || '').trim(), price: r2(Number(x.price) || 0), cost: r2(Number(x.cost) || 0),
      categoryId: x.categoryId || '', stock: x.stock === '' || x.stock == null ? null : Math.floor(Number(x.stock)),
      barcode: String(x.barcode || '').trim(), emoji: x.emoji || '📦', color: x.color || COLORS[0]
    };
  }

  // ================================================================= REPORTS
  $('#reportRange').addEventListener('change', renderReports);
  function rangeStart(r) {
    var d = new Date(); d.setHours(0, 0, 0, 0);
    if (r === '7') d.setDate(d.getDate() - 6);
    if (r === '30') d.setDate(d.getDate() - 29);
    if (r === 'month') d.setDate(1);
    return d;
  }
  function renderReports() {
    var r = $('#reportRange').value, start = rangeStart(r);
    var sales = db.sales.filter(function (s) { return s.status === 'paid' && s.time >= start.getTime(); });
    var revenue = 0, cost = 0, vat = 0, disc = 0, items = 0, byProd = {}, byMethod = {};
    sales.forEach(function (s) {
      revenue += s.total; vat += s.vat; disc += s.discount;
      byMethod[s.method] = (byMethod[s.method] || 0) + s.total;
      s.items.forEach(function (i) {
        cost += (i.cost || 0) * i.qty; items += i.qty;
        var k = i.pid || i.name; byProd[k] = byProd[k] || { name: i.name, qty: 0, amt: 0 };
        byProd[k].qty += i.qty; byProd[k].amt += i.qty * i.price;
      });
    });
    var profit = revenue - vat - cost;
    $('#reportCards').innerHTML = stat('ยอดขายสุทธิ', money(revenue), true) + stat('จำนวนบิล', sales.length) +
      stat('เฉลี่ยต่อบิล', money(sales.length ? revenue / sales.length : 0)) + stat('สินค้าที่ขาย', items + ' ชิ้น') +
      stat('กำไรขั้นต้น', money(profit)) + stat('ส่วนลดรวม', money(disc));

    // bars: hourly for today, daily otherwise
    var buckets = [];
    if (r === 'today') {
      for (var h = 0; h < 24; h++) buckets.push({ label: h + '', v: 0 });
      sales.forEach(function (s) { buckets[new Date(s.time).getHours()].v += s.total; });
      var used = buckets.map(function (b, i) { return b.v ? i : -1; }).filter(function (i) { return i >= 0; });
      var from = used.length ? Math.max(0, Math.min.apply(null, used) - 1) : 8, to = used.length ? Math.min(23, Math.max.apply(null, used) + 1) : 20;
      buckets = buckets.slice(from, to + 1);
    } else {
      var d = new Date(start), end = new Date(), map = {};
      while (d <= end) { var k = dayKey(d); map[k] = { label: d.getDate() + '', v: 0 }; buckets.push(map[k]); d.setDate(d.getDate() + 1); }
      sales.forEach(function (s) { var b = map[dayKey(s.time)]; if (b) b.v += s.total; });
    }
    var max = Math.max.apply(null, buckets.map(function (b) { return b.v; }).concat([1]));
    $('#dailyBars').innerHTML = buckets.map(function (b) {
      return '<div class="bar" title="' + money(b.v) + '"><i style="height:' + (b.v / max * 100) + '%"></i><b>' + b.label + '</b></div>';
    }).join('');

    var top = Object.keys(byProd).map(function (k) { return byProd[k]; }).sort(function (a, b) { return b.qty - a.qty; }).slice(0, 10);
    $('#topProducts').innerHTML = top.length ? top.map(function (p) {
      return '<li><div><span>' + esc(p.name) + '</span><span><b>' + p.qty + '</b> ชิ้น · ' + money(p.amt) + '</span></div></li>';
    }).join('') : '<li class="muted" style="list-style:none;margin-left:-22px">ยังไม่มียอดขาย</li>';

    $('#payBreakdown').innerHTML = Object.keys(METHODS).map(function (k) {
      var v = byMethod[k] || 0, pct = revenue ? v / revenue * 100 : 0;
      return '<div class="row"><span>' + METHODS[k].icon + ' ' + METHODS[k].label + '</span><span>' + money(v) + ' (' + pct.toFixed(0) + '%)</span></div><div class="meter"><i style="width:' + pct + '%"></i></div>';
    }).join('');
  }

  $('#exportCsvBtn').addEventListener('click', function () {
    var start = rangeStart($('#reportRange').value).getTime();
    var rows = [['เลขที่', 'วันเวลา', 'สถานะ', 'สินค้า', 'จำนวน', 'ราคา/หน่วย', 'รวมรายการ', 'ส่วนลดบิล', 'VAT', 'สุทธิบิล', 'ชำระโดย']];
    db.sales.filter(function (s) { return s.time >= start; }).forEach(function (s) {
      s.items.forEach(function (i, idx) {
        rows.push([s.no, fmtDateTime(s.time), s.status === 'void' ? 'ยกเลิก' : 'ชำระแล้ว', i.name, i.qty, i.price, r2(i.qty * i.price),
          idx === 0 ? s.discount : '', idx === 0 ? s.vat : '', idx === 0 ? s.total : '', METHODS[s.method].label]);
      });
    });
    var csv = '﻿' + rows.map(function (r) { return r.map(function (c) { c = String(c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(','); }).join('\n');
    download('sales-' + dayKey(Date.now()) + '.csv', csv, 'text/csv;charset=utf-8');
  });
  function download(name, content, type) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type: type }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  // ================================================================= SETTINGS
  function renderSettings() {
    var f = $('#settingsForm'), s = db.settings;
    ['shopName', 'address', 'taxId', 'promptpay', 'vatMode', 'vatRate', 'lowStock', 'footer'].forEach(function (k) { f[k].value = s[k] == null ? '' : s[k]; });
    $('#catManage').innerHTML = db.categories.length ? db.categories.map(function (c) {
      return '<span class="chip" data-id="' + c.id + '">' + esc(c.name) + '<span class="x" data-del="1">✕</span></span>';
    }).join('') : '<span class="muted">ยังไม่มีหมวดหมู่</span>';
  }
  $('#settingsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, s = db.settings;
    s.shopName = f.shopName.value.trim() || 'ร้านของฉัน'; s.address = f.address.value.trim(); s.taxId = f.taxId.value.trim();
    s.promptpay = f.promptpay.value.replace(/\D/g, ''); s.vatMode = f.vatMode.value;
    s.vatRate = Number(f.vatRate.value) || 0; s.lowStock = Math.max(0, Number(f.lowStock.value) || 0); s.footer = f.footer.value.trim();
    var len = s.promptpay.length;
    if (len && len !== 10 && len !== 13 && len !== 15) toast('ตรวจสอบเลขพร้อมเพย์: ควรเป็นเบอร์ 10 หลัก หรือเลข 13 หลัก');
    else toast('บันทึกการตั้งค่าแล้ว');
    save(); tick(); renderSettings();
  });
  $('#addCatBtn').addEventListener('click', function () {
    var n = $('#newCatInput').value.trim(); if (!n) return;
    db.categories.push({ id: uid(), name: n }); $('#newCatInput').value = ''; save(); renderSettings();
  });
  $('#catManage').addEventListener('click', function (e) {
    if (!e.target.dataset.del) return;
    var id = e.target.closest('.chip').dataset.id;
    if (!confirm('ลบหมวดหมู่นี้? สินค้าในหมวดจะย้ายไป “ไม่มีหมวด”')) return;
    db.categories = db.categories.filter(function (c) { return c.id !== id; });
    db.products.forEach(function (p) { if (p.categoryId === id) p.categoryId = ''; });
    if (activeCat === id) activeCat = 'all';
    save(); renderSettings();
  });
  $('#backupBtn').addEventListener('click', function () {
    download('pos-backup-' + dayKey(Date.now()) + '.json', JSON.stringify(db, null, 1), 'application/json');
  });
  $('#restoreInput').addEventListener('change', function (e) {
    var file = e.target.files[0]; if (!file) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var d = JSON.parse(rd.result);
        if (!d || !Array.isArray(d.products) || !Array.isArray(d.sales)) throw new Error('bad');
        if (!confirm('กู้คืนจะเขียนทับข้อมูลปัจจุบันทั้งหมด (สินค้า ' + d.products.length + ' รายการ, บิล ' + d.sales.length + ' ใบ) ดำเนินการต่อ?')) return;
        localStorage.setItem(KEY, JSON.stringify(d)); db = load(); cart = [];
        toast('กู้คืนข้อมูลสำเร็จ'); tick(); renderSettings();
      } catch (err) { toast('ไฟล์ไม่ถูกต้อง'); }
      e.target.value = '';
    };
    rd.readAsText(file);
  });
  $('#demoBtn').addEventListener('click', function () {
    if (db.products.length && !confirm('เพิ่มสินค้าตัวอย่างต่อจากสินค้าที่มีอยู่?')) return;
    seedDemo(); toast('เพิ่มสินค้าตัวอย่างแล้ว'); show('sell');
  });
  $('#resetBtn').addEventListener('click', function () {
    if (!confirm('ล้างข้อมูลทั้งหมด (สินค้า บิล การตั้งค่า)? ไม่สามารถย้อนกลับได้')) return;
    if (prompt('พิมพ์คำว่า ลบ เพื่อยืนยัน') !== 'ลบ') return;
    db = defaultDb(); cart = []; save(); tick(); renderSettings(); toast('ล้างข้อมูลแล้ว');
  });

  function seedDemo() {
    var cats = { drink: 'เครื่องดื่ม', bakery: 'เบเกอรี่', food: 'อาหาร' }, ids = {};
    Object.keys(cats).forEach(function (k) {
      var ex = db.categories.find(function (c) { return c.name === cats[k]; });
      ids[k] = ex ? ex.id : uid(); if (!ex) db.categories.push({ id: ids[k], name: cats[k] });
    });
    [
      ['อเมริกาโน่เย็น', 55, 18, 'drink', '☕', 0], ['ลาเต้เย็น', 65, 22, 'drink', '☕', 3], ['ชาไทยเย็น', 50, 15, 'drink', '🧋', 6],
      ['ชาเขียวมัทฉะ', 60, 20, 'drink', '🍵', 5], ['น้ำส้มคั้น', 45, 18, 'drink', '🧃', 3], ['น้ำเปล่า', 10, 4, 'drink', '🥤', 1, 48, '8851234567890'],
      ['ครัวซองต์', 45, 18, 'bakery', '🥐', 6, 12], ['บราวนี่', 40, 14, 'bakery', '🍫', 7, 15], ['เค้กส้ม', 75, 28, 'bakery', '🍰', 2, 6],
      ['คุกกี้', 25, 8, 'bakery', '🍪', 3, 30], ['ข้าวกะเพราไก่', 60, 25, 'food', '🍛', 4], ['ข้าวผัด', 55, 22, 'food', '🍚', 5]
    ].forEach(function (x) {
      db.products.push({ id: uid(), name: x[0], price: x[1], cost: x[2], categoryId: ids[x[3]], emoji: x[4], color: COLORS[x[5]], stock: x[6] == null ? null : x[6], barcode: x[7] || '' });
    });
    save();
  }

  // ---------------------------------------------------------------- boot
  if (firstRun) seedDemo();
  tick(); setInterval(tick, 30000);
  show('sell');

  // expose for tests
  window.__pos = { promptPayPayload: promptPayPayload, crc16: crc16 };

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();

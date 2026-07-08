/* UQBS shared interaction pack (uqbs.js)
   Wires tabs, flashcards, self-check quiz and copy blocks.
   Byte-for-byte the canonical pack from uqbs-blackboard-standard.md.
   Every component degrades to readable static content without this file. */
(function () {
  'use strict';
  var uid = 0;
  function nextId(prefix) { uid += 1; return 'uqbs-' + prefix + '-' + uid; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text) { n.textContent = text; }
    return n;
  }

  /* ---- Tabs: builds the tablist from panel data-labels ---- */
  function initTabs(root) {
    var panels = Array.prototype.slice.call(root.querySelectorAll('.uqbs-tabs__panel'));
    if (!panels.length) { return; }
    var list = el('div', 'uqbs-tabs__list');
    list.setAttribute('role', 'tablist');
    if (root.getAttribute('aria-label')) { list.setAttribute('aria-label', root.getAttribute('aria-label')); }
    var tabs = panels.map(function (panel, i) {
      var tab = el('button', 'uqbs-tabs__tab', panel.getAttribute('data-label') || ('Tab ' + (i + 1)));
      tab.type = 'button';
      tab.setAttribute('role', 'tab');
      tab.id = nextId('tab');
      panel.id = panel.id || nextId('panel');
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.setAttribute('tabindex', '0');
      tab.setAttribute('aria-controls', panel.id);
      list.appendChild(tab);
      return tab;
    });
    function select(index) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.setAttribute('tabindex', on ? '0' : '-1');
        if (on) { panels[i].removeAttribute('hidden'); } else { panels[i].setAttribute('hidden', ''); }
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i); tab.focus(); });
      tab.addEventListener('keydown', function (e) {
        var to = null;
        if (e.key === 'ArrowRight') { to = (i + 1) % tabs.length; }
        if (e.key === 'ArrowLeft') { to = (i - 1 + tabs.length) % tabs.length; }
        if (e.key === 'Home') { to = 0; }
        if (e.key === 'End') { to = tabs.length - 1; }
        if (to !== null) { e.preventDefault(); select(to); tabs[to].focus(); }
      });
    });
    root.insertBefore(list, root.firstChild);
    select(0);
  }

  /* ---- Flashcards: deck with flip, previous, next ---- */
  function initFlashcards(root) {
    var cards = Array.prototype.slice.call(root.querySelectorAll('.uqbs-flashcard'));
    if (!cards.length) { return; }
    var current = 0;
    var controls = el('div', 'uqbs-flashcards__controls');
    var flipBtn = el('button', 'uqbs-btn uqbs-btn--quiet', 'Flip card');
    var prevBtn = el('button', 'uqbs-btn uqbs-btn--quiet', 'Previous');
    var nextBtn = el('button', 'uqbs-btn uqbs-btn--quiet', 'Next');
    var count = el('span', 'uqbs-flashcards__count');
    [flipBtn, prevBtn, nextBtn].forEach(function (b) { b.type = 'button'; });
    count.setAttribute('aria-live', 'polite');
    function faces(card) {
      return {
        front: card.querySelector('.uqbs-flashcard__side--front'),
        back: card.querySelector('.uqbs-flashcard__side--back')
      };
    }
    function setFlipped(card, flipped) {
      card.classList.toggle('is-flipped', flipped);
      var f = faces(card);
      if (f.front) { f.front.setAttribute('aria-hidden', flipped ? 'true' : 'false'); }
      if (f.back) { f.back.setAttribute('aria-hidden', flipped ? 'false' : 'true'); }
    }
    function show(index) {
      current = index;
      cards.forEach(function (card, i) {
        card.classList.toggle('is-current', i === index);
        setFlipped(card, false);
      });
      count.textContent = 'Card ' + (index + 1) + ' of ' + cards.length;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === cards.length - 1;
    }
    flipBtn.addEventListener('click', function () {
      var card = cards[current];
      setFlipped(card, !card.classList.contains('is-flipped'));
    });
    prevBtn.addEventListener('click', function () { if (current > 0) { show(current - 1); } });
    nextBtn.addEventListener('click', function () { if (current < cards.length - 1) { show(current + 1); } });
    cards.forEach(function (card) {
      card.setAttribute('aria-live', 'polite');
      card.addEventListener('click', function () { setFlipped(card, !card.classList.contains('is-flipped')); });
    });
    controls.appendChild(flipBtn);
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);
    controls.appendChild(count);
    root.appendChild(controls);
    show(0);
  }

  /* ---- Quiz: instant feedback, score, try again ---- */
  function initQuiz(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.uqbs-quiz__item'));
    if (!items.length) { return; }
    var answered = 0;
    var correct = 0;
    var summary = el('div', 'uqbs-quiz__summary');
    summary.hidden = true;
    var summaryText = el('p', '');
    summaryText.setAttribute('aria-live', 'polite');
    var resetBtn = el('button', 'uqbs-btn uqbs-btn--quiet', 'Try again');
    resetBtn.type = 'button';
    summary.appendChild(summaryText);
    summary.appendChild(resetBtn);
    root.appendChild(summary);

    function mark(option, ok, chosen) {
      option.classList.add(ok ? 'is-correct' : 'is-incorrect');
      var markSpan = el('span', 'uqbs-quiz__mark', ok ? '\u2713 ' : '\u2717 ');
      markSpan.setAttribute('aria-hidden', 'true');
      option.insertBefore(markSpan, option.firstChild);
      var vh = el('span', 'uqbs-vh', ok ? ' (correct answer)' : (chosen ? ' (your answer, incorrect)' : ''));
      if (vh.textContent) { option.appendChild(vh); }
    }
    function wireItem(item) {
      var options = Array.prototype.slice.call(item.querySelectorAll('.uqbs-quiz__option'));
      var status = el('p', 'uqbs-quiz__status');
      status.setAttribute('aria-live', 'polite');
      var optWrap = item.querySelector('.uqbs-quiz__options');
      if (optWrap) { optWrap.parentNode.insertBefore(status, optWrap.nextSibling); }
      options.forEach(function (option) {
        option.addEventListener('click', function () {
          if (item.classList.contains('is-answered')) { return; }
          item.classList.add('is-answered');
          answered += 1;
          var ok = option.hasAttribute('data-correct');
          if (ok) { correct += 1; }
          options.forEach(function (o) {
            o.disabled = true;
            if (o.hasAttribute('data-correct')) { mark(o, true, o === option); }
            else if (o === option) { mark(o, false, true); }
          });
          status.textContent = ok ? 'Correct.' : 'Not quite. The correct answer is marked.';
          if (answered === items.length) {
            summaryText.textContent = 'You got ' + correct + ' of ' + items.length + '.';
            summary.hidden = false;
          }
        });
      });
    }
    resetBtn.addEventListener('click', function () {
      answered = 0; correct = 0;
      summary.hidden = true;
      items.forEach(function (item) {
        item.classList.remove('is-answered');
        var status = item.querySelector('.uqbs-quiz__status');
        if (status) { status.textContent = ''; }
        Array.prototype.slice.call(item.querySelectorAll('.uqbs-quiz__option')).forEach(function (o) {
          o.disabled = false;
          o.classList.remove('is-correct', 'is-incorrect');
          var m = o.querySelector('.uqbs-quiz__mark'); if (m) { m.parentNode.removeChild(m); }
          var vh = o.querySelector('.uqbs-vh'); if (vh) { vh.parentNode.removeChild(vh); }
        });
      });
    });
    items.forEach(wireItem);
  }

  /* ---- Copy block: clipboard with select-text fallback ---- */
  function initCopy(root) {
    var btn = root.querySelector('.uqbs-copy__btn');
    var text = root.querySelector('.uqbs-copy__text');
    if (!btn || !text) { return; }
    var label = btn.textContent;
    function done(msg) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = label; }, 2000);
    }
    btn.addEventListener('click', function () {
      var value = text.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done('Copied'); }, function () { fallback(); });
      } else { fallback(); }
      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(text);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done('Press Ctrl+C to copy');
      }
    });
  }

  var wiring = { tabs: initTabs, flashcards: initFlashcards, quiz: initQuiz, copy: initCopy };
  function init() {
    Array.prototype.slice.call(document.querySelectorAll('[data-uqbs]')).forEach(function (root) {
      if (root.getAttribute('data-uqbs-wired')) { return; }
      var kind = root.getAttribute('data-uqbs');
      if (wiring[kind]) {
        root.setAttribute('data-uqbs-wired', 'true');
        root.classList.add('uqbs-js');
        wiring[kind](root);
      }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();

/* ══════════════════════════════════════════
   RUBRIC DESIGN COURSE — SHARED JAVASCRIPT
   State management, interaction components,
   progress tracking, reveal animations
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  const TOTAL_MODULES = 20;
  const STORAGE_KEYS = {
    progress: 'rubric-course-progress',
    rubric:   'rubric-course-rubric',
    exercises:'rubric-course-exercises'
  };

  /* ─────────────────────────────────────
     1. LOCAL-STORAGE HELPERS
     ───────────────────────────────────── */
  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
  }

  /* ─────────────────────────────────────
     2. PROGRESS STATE
     ───────────────────────────────────── */
  const defaultProgress = {
    modules: {},
    currentModule: 1,
    startedAt: null
  };

  const Progress = {
    _data: null,
    load() {
      this._data = loadJSON(STORAGE_KEYS.progress, { ...defaultProgress });
      if (!this._data.modules) this._data.modules = {};
      return this._data;
    },
    save() { saveJSON(STORAGE_KEYS.progress, this._data); },
    get data() { if (!this._data) this.load(); return this._data; },

    isCompleted(mod) {
      return !!(this.data.modules[mod] && this.data.modules[mod].completed);
    },
    completeModule(mod) {
      if (!this.data.modules[mod]) this.data.modules[mod] = {};
      this.data.modules[mod].completed = true;
      this.data.modules[mod].completedAt = new Date().toISOString();
      if (mod >= this.data.currentModule) this.data.currentModule = mod + 1;
      this.save();
    },
    completedCount() {
      return Object.values(this.data.modules).filter(m => m && m.completed).length;
    },
    percent() {
      return Math.round((this.completedCount() / TOTAL_MODULES) * 100);
    },
    setCurrent(mod) {
      if (!this.data.startedAt) this.data.startedAt = new Date().toISOString();
      if (mod > this.data.currentModule) this.data.currentModule = mod;
      this.save();
    },
    isAvailable(/* mod */) {
      return true;   // free navigation — no gates
    },
    reset() {
      this._data = { ...defaultProgress, modules: {} };
      this.save();
    }
  };

  /* ─────────────────────────────────────
     3. RUBRIC STATE (persistent rubric)
     ───────────────────────────────────── */
  const defaultRubric = {
    courseName: 'MGTS2501 Organisational Behaviour',
    assessmentName: 'Case Study Analysis',
    assessmentWeighting: 30,
    gaMapping: [],
    criteria: [
      { name: 'Introduction', weighting: 10, isGA: false, gaRef: null,
        descriptors: {
          HD:'Excellent introduction', D:'Very good introduction',
          C:'Good introduction', P:'Satisfactory introduction',
          MF:'', F:'Poor introduction', LF:''
        }, lever: null, voiValues: [], soloTarget: {} },
      { name: 'Analysis', weighting: 40, isGA: false, gaRef: null,
        descriptors: {
          HD:'Demonstrates excellent critical analysis',
          D:'Demonstrates very good critical analysis',
          C:'Demonstrates good critical analysis',
          P:'Demonstrates satisfactory analysis',
          MF:'', F:'Does not demonstrate analysis', LF:''
        }, lever: null, voiValues: [], soloTarget: {} },
      { name: 'Recommendations', weighting: 30, isGA: false, gaRef: null,
        descriptors: {
          HD:'Provides excellent recommendations',
          D:'Provides very good recommendations',
          C:'Provides good recommendations',
          P:'Provides satisfactory recommendations',
          MF:'', F:'Fails to provide recommendations', LF:''
        }, lever: null, voiValues: [], soloTarget: {} },
      { name: 'Referencing & Presentation', weighting: 20, isGA: false, gaRef: null,
        descriptors: {
          HD:'Excellent referencing and presentation',
          D:'Very good referencing and presentation',
          C:'Good referencing and presentation',
          P:'Satisfactory referencing and presentation',
          MF:'', F:'Poor referencing and presentation', LF:''
        }, lever: null, voiValues: [], soloTarget: {} }
    ]
  };

  const Rubric = {
    _data: null,
    load() {
      this._data = loadJSON(STORAGE_KEYS.rubric, JSON.parse(JSON.stringify(defaultRubric)));
      return this._data;
    },
    save() { saveJSON(STORAGE_KEYS.rubric, this._data); },
    get data() { if (!this._data) this.load(); return this._data; },

    updateCriterion(index, updates) {
      if (!this.data.criteria[index]) return;
      Object.assign(this.data.criteria[index], updates);
      this.save();
    },
    updateDescriptor(criterionIndex, grade, text) {
      if (!this.data.criteria[criterionIndex]) return;
      this.data.criteria[criterionIndex].descriptors[grade] = text;
      this.save();
    },
    replaceCriteria(newCriteria) {
      this.data.criteria = newCriteria;
      this.save();
    },
    setGAMapping(gaList) {
      this.data.gaMapping = gaList;
      this.save();
    },
    /** Update the primary lever for criteria by name. Pass an object: { 'Criterion Name': 'lever' } */
    updateCriterionLevers(leverMap) {
      if (!leverMap || typeof leverMap !== 'object') return;
      this.data.criteria.forEach(c => {
        if (leverMap[c.name]) c.lever = leverMap[c.name];
      });
      this.save();
    },
    reset() {
      this._data = JSON.parse(JSON.stringify(defaultRubric));
      this.save();
    },
    /** Render a live rubric preview table into a container */
    renderPreview(container, options) {
      options = options || {};
      const grades = ['HD','D','C','P','MF','F','LF'];
      const criteria = this.data.criteria;
      let html = '<table><colgroup><col style="width:12%"><col style="width:5%">';
      grades.forEach(() => { html += '<col>'; });
      html += '</colgroup><thead><tr><th>Criteria</th><th>Weight</th>';
      grades.forEach(g => { html += '<th>' + g + '</th>'; });
      html += '</tr></thead><tbody>';
      criteria.forEach(c => {
        html += '<tr><td class="criteria-cell">' + esc(c.name);
        if (c.isGA && c.gaRef) html += ' <span class="ga-marker">*' + esc(c.gaRef) + '</span>';
        html += '</td><td>' + c.weighting + '%</td>';
        grades.forEach(g => {
          const d = (c.descriptors && c.descriptors[g]) || '';
          if (d) {
            html += '<td>' + esc(d) + '</td>';
          } else {
            html += '<td style="color:#b8b0a8;font-style:italic;background:#f5f2ef;">No descriptor</td>';
          }
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
      if (this.data.gaMapping && this.data.gaMapping.length) {
        html += '<p style="font-size:11px;color:#6b6460;margin-top:8px;">* Denotes GA-mapped criterion (' + esc(this.data.gaMapping.join(', ')) + ')</p>';
      }
      container.innerHTML = html;
    }
  };

  /* ─────────────────────────────────────
     4. EXERCISE STATE
     ───────────────────────────────────── */
  const Exercises = {
    _data: null,
    load() { this._data = loadJSON(STORAGE_KEYS.exercises, {}); return this._data; },
    save() { saveJSON(STORAGE_KEYS.exercises, this._data); },
    get data() { if (!this._data) this.load(); return this._data; },

    get(key) { return this.data[key] || null; },
    set(key, value) { this.data[key] = value; this.save(); },
    setField(key, field, value) {
      if (!this.data[key]) this.data[key] = {};
      this.data[key][field] = value;
      this.save();
    },
    reset() { this._data = {}; this.save(); }
  };

  /* ─────────────────────────────────────
     5. UTILITY HELPERS
     ───────────────────────────────────── */
  function esc(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ─────────────────────────────────────
     6. REVEAL-ON-SCROLL OBSERVER
     ───────────────────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => obs.observe(el));
  }

  /* ─────────────────────────────────────
     7. HEADER PROGRESS BAR
     ───────────────────────────────────── */
  function updateHeaderProgress() {
    const fill = $('.header-progress-fill');
    const text = $('.header-progress-text');
    if (!fill) return;
    const pct = Progress.percent();
    fill.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  /* ─────────────────────────────────────
     8. MODULE COMPLETION
     ───────────────────────────────────── */
  /**
   * Call this per module page to track activity completion.
   * Pass the module number and total activity count.
   * Returns an object with methods to mark activities done.
   */
  function ModuleTracker(moduleNum, totalActivities) {
    const completed = new Set();
    const completeBtn = $('.btn-complete-module');

    function checkReady() {
      const ready = completed.size >= totalActivities;
      if (completeBtn) {
        completeBtn.disabled = !ready;
        if (ready) completeBtn.classList.add('ready');
      }
      return ready;
    }

    // Always enable next-module navigation (free navigation)
    const next = $('.nav-next');
    if (next) {
      next.classList.remove('disabled');
      next.removeAttribute('aria-disabled');
    }

    if (completeBtn) {
      completeBtn.addEventListener('click', function () {
        if (completed.size >= totalActivities) {
          Progress.completeModule(moduleNum);
          updateHeaderProgress();
          completeBtn.textContent = 'Module Complete ✓';
          completeBtn.disabled = true;
          completeBtn.classList.add('btn-success');
        }
      });
      // If already completed, update button
      if (Progress.isCompleted(moduleNum)) {
        completeBtn.textContent = 'Module Complete ✓';
        completeBtn.disabled = true;
        completeBtn.classList.add('btn-success');
      }
    }

    Progress.setCurrent(moduleNum);

    return {
      markDone(activityId) {
        completed.add(activityId);
        // Mark the activity container
        const el = document.getElementById(activityId);
        if (el) el.classList.add('completed');
        checkReady();
      },
      isDone(activityId) { return completed.has(activityId); },
      get readyToComplete() { return completed.size >= totalActivities; }
    };
  }

  /* ═══════════════════════════════════════
     9. INTERACTION COMPONENTS
     ═══════════════════════════════════════ */

  /* ── 9a. MULTIPLE CHOICE ── */
  /**
   * container: element with .mc-options children
   * config: { correctIndex, feedback:{correct,incorrect}, onComplete }
   */
  function MultipleChoice(container, config) {
    const options = $$('.mc-option', container);
    const feedbackEl = $('.feedback', container);
    let answered = false;

    // Restore saved answer
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved !== null && saved.selected !== undefined) {
      answered = true;
      options.forEach((opt, i) => {
        if (i === saved.selected) opt.classList.add('selected');
        if (i === config.correctIndex) opt.classList.add('correct');
        else if (i === saved.selected && i !== config.correctIndex) opt.classList.add('incorrect');
      });
      showFeedback(saved.selected === config.correctIndex);
    }

    options.forEach((opt, i) => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        opt.classList.add('selected');
        const isCorrect = i === config.correctIndex;
        if (isCorrect) opt.classList.add('correct');
        else {
          opt.classList.add('incorrect');
          options[config.correctIndex].classList.add('correct');
        }
        showFeedback(isCorrect);
        if (config.saveKey) Exercises.set(config.saveKey, { selected: i, correct: isCorrect });
        if (config.onComplete) config.onComplete(isCorrect);
      });
    });

    function showFeedback(correct) {
      if (!feedbackEl) return;
      feedbackEl.className = 'feedback show ' + (correct ? 'correct' : 'incorrect');
      feedbackEl.innerHTML = correct
        ? (config.feedback && config.feedback.correct) || 'Correct!'
        : (config.feedback && config.feedback.incorrect) || 'Not quite.';
    }
  }

  /* ── 9b. DRAG-SORT ── */
  /**
   * container: element containing .drag-zone (drop targets) and .drag-item (draggable items)
   * config: {
   *   pairs: [{item:'itemId', zone:'zoneId'}],  // correct pairings
   *   onComplete, saveKey
   * }
   */
  function DragSort(container, config) {
    const items = $$('.drag-item', container);
    const zones = $$('.drag-zone', container);
    let draggedEl = null;

    // Restore saved state
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved && saved.placements) {
      Object.entries(saved.placements).forEach(([itemId, zoneId]) => {
        const item = document.getElementById(itemId);
        const zone = document.getElementById(zoneId);
        if (item && zone) {
          zone.appendChild(item);
          item.classList.add('placed');
        }
      });
      if (saved.checked) checkAll();
    }

    items.forEach(item => {
      item.draggable = true;
      item.addEventListener('dragstart', e => {
        draggedEl = item;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.id);
        item.style.opacity = '0.5';
      });
      item.addEventListener('dragend', () => {
        item.style.opacity = '';
        draggedEl = null;
      });

      // Touch support
      let touchStartX, touchStartY, touchClone;
      item.addEventListener('touchstart', e => {
        draggedEl = item;
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchClone = item.cloneNode(true);
        touchClone.style.cssText = 'position:fixed;pointer-events:none;opacity:0.8;z-index:9999;width:' + item.offsetWidth + 'px;';
        touchClone.style.left = t.clientX - item.offsetWidth / 2 + 'px';
        touchClone.style.top = t.clientY - 20 + 'px';
        document.body.appendChild(touchClone);
      }, { passive: true });
      item.addEventListener('touchmove', e => {
        if (!touchClone) return;
        const t = e.touches[0];
        touchClone.style.left = t.clientX - touchClone.offsetWidth / 2 + 'px';
        touchClone.style.top = t.clientY - 20 + 'px';
        // Highlight zone under finger
        zones.forEach(z => z.classList.remove('over'));
        const elBelow = document.elementFromPoint(t.clientX, t.clientY);
        if (elBelow) {
          const zone = elBelow.closest('.drag-zone');
          if (zone) zone.classList.add('over');
        }
        e.preventDefault();
      }, { passive: false });
      item.addEventListener('touchend', e => {
        if (touchClone) { touchClone.remove(); touchClone = null; }
        zones.forEach(z => z.classList.remove('over'));
        if (!draggedEl) return;
        const t = e.changedTouches[0];
        const elBelow = document.elementFromPoint(t.clientX, t.clientY);
        if (elBelow) {
          const zone = elBelow.closest('.drag-zone');
          if (zone) {
            zone.appendChild(draggedEl);
            draggedEl.classList.add('placed');
            savePlacements();
          }
        }
        draggedEl = null;
      });
    });

    zones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        if (draggedEl) {
          zone.appendChild(draggedEl);
          draggedEl.classList.add('placed');
          savePlacements();
        }
      });
    });

    function savePlacements() {
      if (!config.saveKey) return;
      const placements = {};
      items.forEach(item => {
        const parentZone = item.closest('.drag-zone');
        if (parentZone && parentZone.id) placements[item.id] = parentZone.id;
      });
      Exercises.set(config.saveKey, { placements, checked: false });
    }

    function checkAll() {
      if (!config.pairs) return;
      let allCorrect = true;
      config.pairs.forEach(pair => {
        const item = document.getElementById(pair.item);
        const zone = document.getElementById(pair.zone);
        if (!item || !zone) return;
        if (item.closest('.drag-zone') === zone) {
          item.classList.add('correct');
          item.classList.remove('incorrect');
        } else {
          item.classList.add('incorrect');
          item.classList.remove('correct');
          allCorrect = false;
        }
      });
      // Mark zones
      zones.forEach(z => {
        const hasCorrect = !!$('.drag-item.correct', z);
        const hasIncorrect = !!$('.drag-item.incorrect', z);
        if (hasCorrect && !hasIncorrect) z.classList.add('correct-drop');
      });
      if (config.saveKey) Exercises.setField(config.saveKey, 'checked', true);
      return allCorrect;
    }

    return {
      check: checkAll,
      reset() {
        items.forEach(item => {
          item.classList.remove('placed', 'correct', 'incorrect');
          // Move back to source pool
          const pool = $('.drag-pool', container) || container;
          pool.appendChild(item);
        });
        zones.forEach(z => z.classList.remove('correct-drop'));
      }
    };
  }

  /* ── 9c. TEXT TRANSFORM ── */
  /**
   * container: element with .transform-input, .model-answer, .self-rate
   * config: { modelText, saveKey, onComplete }
   */
  function TextTransform(container, config) {
    const input = $('textarea.transform-input', container) || $('.transform-input', container);
    const modelEl = $('.model-answer', container);
    const showBtn = $('.btn-show-model', container);
    const rateButtons = $$('.self-rate-btn', container);
    let revealed = false;

    // Restore
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved) {
      if (saved.input && input) input.value = saved.input;
      if (saved.revealed && modelEl) { modelEl.classList.add('show'); revealed = true; }
      if (saved.selfRating) {
        rateButtons.forEach(b => {
          if (b.dataset.rating === saved.selfRating) b.classList.add('selected');
        });
      }
    }

    // Auto-save input
    if (input) {
      input.addEventListener('input', debounce(() => {
        if (config.saveKey) Exercises.setField(config.saveKey, 'input', input.value);
      }, 500));
    }

    // Show model answer
    if (showBtn) {
      showBtn.addEventListener('click', () => {
        if (!input || !input.value.trim()) {
          input.style.borderColor = '#d9534f';
          setTimeout(() => { input.style.borderColor = ''; }, 1500);
          return;
        }
        if (modelEl) {
          if (config.modelText) {
            const lbl = $('.label', modelEl);
            modelEl.innerHTML = '';
            if (lbl) modelEl.appendChild(lbl);
            else {
              const span = document.createElement('span');
              span.className = 'label';
              span.textContent = 'Model Answer';
              modelEl.appendChild(span);
            }
            modelEl.appendChild(document.createTextNode(config.modelText));
          }
          modelEl.classList.add('show');
          revealed = true;
        }
        if (config.saveKey) Exercises.setField(config.saveKey, 'revealed', true);
      });
    }

    // Self-rate traffic light
    rateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        rateButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const rating = btn.dataset.rating;
        if (config.saveKey) Exercises.setField(config.saveKey, 'selfRating', rating);
        if (config.onComplete) config.onComplete(rating);
      });
    });
  }

  /* ── 9d. CLICK HIGHLIGHT ── */
  /**
   * container: element with .highlight-passage containing .hw spans
   * config: { targets:['wordId1','wordId2',...], saveKey, onComplete, counterEl }
   */
  function ClickHighlight(container, config) {
    const words = $$('.hw', container);
    const countEl = config.counterEl ? $(config.counterEl, container) || $('.highlight-count', container) : $('.highlight-count', container);
    let highlighted = new Set();

    // Restore
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved && saved.highlighted) {
      saved.highlighted.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add('highlighted');
          highlighted.add(id);
        }
      });
      updateCount();
    }

    words.forEach(w => {
      w.addEventListener('click', () => {
        if (w.classList.contains('highlighted')) {
          w.classList.remove('highlighted');
          highlighted.delete(w.id);
        } else {
          w.classList.add('highlighted');
          highlighted.add(w.id);
        }
        updateCount();
        if (config.saveKey) Exercises.set(config.saveKey, { highlighted: Array.from(highlighted) });
      });
    });

    function updateCount() {
      if (countEl) {
        const total = highlighted.size;
        countEl.textContent = total + ' word' + (total !== 1 ? 's' : '') + ' highlighted';
      }
    }

    return {
      check() {
        let correct = 0, incorrect = 0;
        words.forEach(w => {
          const isTarget = config.targets.includes(w.id);
          if (highlighted.has(w.id)) {
            if (isTarget) { w.classList.add('highlighted-good'); w.classList.remove('highlighted'); correct++; }
            else { incorrect++; }
          } else if (isTarget) {
            w.classList.add('highlighted'); // show missed
          }
        });
        if (config.onComplete) config.onComplete(correct, incorrect);
        return { correct, incorrect, total: config.targets.length };
      },
      reset() {
        words.forEach(w => { w.classList.remove('highlighted', 'highlighted-good'); });
        highlighted.clear();
        updateCount();
      }
    };
  }

  /* ── 9e. SLIDER INPUT ── */
  /**
   * container: element with .slider-row elements
   * config: { targetTotal:100, saveKey, onComplete }
   */
  function SliderInput(container, config) {
    const rows = $$('.slider-row', container);
    const totalEl = $('.slider-total', container);
    const targetTotal = config.targetTotal || 100;

    // Restore
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;

    rows.forEach(row => {
      const slider = $('input[type="range"]', row) || $('.slider-input', row);
      const valEl = $('.slider-value', row);
      if (!slider) return;

      if (saved && saved.values && saved.values[slider.name || slider.id]) {
        slider.value = saved.values[slider.name || slider.id];
      }
      if (valEl) valEl.textContent = slider.value + '%';

      slider.addEventListener('input', () => {
        if (valEl) valEl.textContent = slider.value + '%';
        updateTotal();
        saveValues();
      });
    });

    updateTotal();

    function getValues() {
      const vals = {};
      rows.forEach(row => {
        const slider = $('input[type="range"]', row) || $('.slider-input', row);
        if (slider) vals[slider.name || slider.id] = parseInt(slider.value);
      });
      return vals;
    }

    function updateTotal() {
      const vals = getValues();
      const sum = Object.values(vals).reduce((a, b) => a + b, 0);
      if (totalEl) {
        totalEl.textContent = 'Total: ' + sum + '%' + (sum !== targetTotal ? ' (must equal ' + targetTotal + '%)' : '');
        totalEl.classList.toggle('valid', sum === targetTotal);
        totalEl.classList.toggle('invalid', sum !== targetTotal);
      }
    }

    function saveValues() {
      if (!config.saveKey) return;
      Exercises.set(config.saveKey, { values: getValues() });
    }

    return {
      isValid() {
        const vals = getValues();
        return Object.values(vals).reduce((a, b) => a + b, 0) === targetTotal;
      },
      getValues
    };
  }

  /* ── 9f. SIDE-BY-SIDE ── */
  /* Mostly CSS-driven; this adds optional highlight toggling */
  function SideBySide(container) {
    const toggleBtn = $('.sbs-toggle', container);
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
      container.classList.toggle('highlight-diffs');
    });
  }

  /* ── 9g. RECIPE CARD ── */
  /**
   * container: element with selects/inputs for VoI, SOLO, lever
   * config: { saveKey, onComplete }
   */
  function RecipeCard(container, config) {
    const inputs = $$('select, input', container);

    // Restore
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved && saved.values) {
      inputs.forEach(inp => {
        if (saved.values[inp.name || inp.id] !== undefined) {
          inp.value = saved.values[inp.name || inp.id];
        }
      });
    }

    inputs.forEach(inp => {
      inp.addEventListener('change', saveAll);
      inp.addEventListener('input', debounce(saveAll, 400));
    });

    function saveAll() {
      if (!config.saveKey) return;
      const values = {};
      inputs.forEach(inp => { values[inp.name || inp.id] = inp.value; });
      Exercises.set(config.saveKey, { values });
    }
  }

  /* ── 9h. RUBRIC PREVIEW (live render) ── */
  function RubricPreview(container) {
    Rubric.renderPreview(container);
  }

  /* ── 9i. CHECKLIST WALKTHROUGH ── */
  /**
   * container: element with .checklist-item elements
   * config: { saveKey, onComplete }
   */
  function ChecklistWalkthrough(container, config) {
    const items = $$('.checklist-item', container);
    const checked = new Set();

    // Restore
    const saved = config.saveKey ? Exercises.get(config.saveKey) : null;
    if (saved && saved.checked) {
      saved.checked.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.add('checked'); checked.add(id); }
      });
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        if (item.classList.contains('checked')) checked.add(item.id);
        else checked.delete(item.id);
        if (config.saveKey) Exercises.set(config.saveKey, { checked: Array.from(checked) });
        if (checked.size === items.length && config.onComplete) config.onComplete();
      });
    });
  }

  /* ─────────────────────────────────────
     10. DEBOUNCE UTILITY
     ───────────────────────────────────── */
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  /* ─────────────────────────────────────
     11. INIT ON DOM READY
     ───────────────────────────────────── */
  function init() {
    Progress.load();
    Rubric.load();
    Exercises.load();
    initReveal();
    updateHeaderProgress();

    // Free navigation: remove all nav gates on page load
    $$('.nav-next.disabled').forEach(el => {
      el.classList.remove('disabled');
      el.removeAttribute('aria-disabled');
    });

    // Auto-init any rubric preview containers
    $$('.rubric-preview-auto').forEach(el => RubricPreview(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ─────────────────────────────────────
     12. PUBLIC API
     ───────────────────────────────────── */
  window.RubricCourse = {
    Progress,
    Rubric,
    Exercises,
    ModuleTracker,
    // Components
    MultipleChoice,
    DragSort,
    TextTransform,
    ClickHighlight,
    SliderInput,
    SideBySide,
    RecipeCard,
    RubricPreview,
    ChecklistWalkthrough,
    // Utilities
    esc,
    shuffle,
    $,
    $$,
    updateHeaderProgress,
    initReveal
  };

})();

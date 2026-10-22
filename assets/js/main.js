/* Asfaw Gedamu, portfolio. Vanilla JavaScript, no build step. */
(() => {
  "use strict";

  /* ----- Settings you may want to edit ----------------------------------- */
  const CONFIG = {
    github: "asfawgedamu",
    // Set an address to show an "Email me" button in the Contact section, e.g. "name@example.com".
    // It stays empty here so your address is not published until you choose to.
    email: "",
    // Repositories to leave out of the live list.
    hideRepos: ["asfawgedamu", "asfawgedamu.github.io"],
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Theme ----------------------------------------------------------- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const metaTheme = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (metaTheme) metaTheme.setAttribute("content", theme === "dark" ? "#0F1D1F" : "#ECEFEA");
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", String(theme === "dark"));
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Use light theme" : "Use dark theme");
    }
  }
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ----- Mobile menu ----------------------------------------------------- */
  const nav = $("#siteNav");
  const menuBtn = $("#menuBtn");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    $$("#navLinks a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
    });
  }

  /* ----- Scrollspy ------------------------------------------------------- */
  const navLinks = $$('#navLinks a[href^="#"]');
  if ("IntersectionObserver" in window && navLinks.length) {
    const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.removeAttribute("aria-current"));
        const link = byId.get(entry.target.id);
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ----- Fidel chart ----------------------------------------------------- */
  const fidel = $("#fidel");
  const fidelOut = $("#fidelOut");
  if (fidel && fidelOut) {
    const COLS = 7;
    const glyphs = $$(".g", fidel);
    const idleText = fidelOut.textContent;
    let active = -1;

    glyphs.forEach((g, i) => g.style.setProperty("--i", String(i)));
    requestAnimationFrame(() => fidel.classList.add("is-ready"));

    function show(i) {
      active = i;
      const r = Math.floor(i / COLS);
      const c = i % COLS;
      glyphs.forEach((g, j) => {
        g.classList.toggle("is-active", j === i);
        g.classList.toggle("is-line", Math.floor(j / COLS) === r || j % COLS === c);
      });
      fidel.classList.add("has-active");
      const g = glyphs[i];
      fidelOut.textContent = "";
      const big = document.createElement("span");
      big.className = "g-big";
      big.setAttribute("lang", "gez");
      big.textContent = g.textContent;
      fidelOut.append(big, `reads "${g.dataset.s}"`);
    }
    function clear() {
      active = -1;
      glyphs.forEach((g) => g.classList.remove("is-active", "is-line"));
      fidel.classList.remove("has-active");
      fidelOut.textContent = idleText;
    }

    glyphs.forEach((g, i) => {
      g.addEventListener("pointerenter", () => show(i));
      g.addEventListener("pointerdown", () => show(i));
    });
    fidel.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && document.activeElement !== fidel) clear(); });
    fidel.addEventListener("blur", clear);
    fidel.addEventListener("keydown", (e) => {
      const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLS, ArrowUp: -COLS };
      if (e.key === "Home") { e.preventDefault(); show(0); return; }
      if (e.key === "End") { e.preventDefault(); show(glyphs.length - 1); return; }
      if (e.key === "Escape") { clear(); return; }
      if (!(e.key in moves)) return;
      e.preventDefault();
      const from = active < 0 ? 0 : active;
      let next = active < 0 ? 0 : from + moves[e.key];
      if (e.key === "ArrowLeft" && from % COLS === 0 && active >= 0) next = from;
      if (e.key === "ArrowRight" && from % COLS === COLS - 1 && active >= 0) next = from;
      if (next < 0 || next >= glyphs.length) next = from;
      show(next);
    });
  }

  /* ----- API level tabs -------------------------------------------------- */
  const levels = $("#levels");
  if (levels) {
    const tabs = $$('[role="tab"]', levels);
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); next.focus(); select(next); }
      });
    });
  }

  /* ----- Copy BibTeX ----------------------------------------------------- */
  const copyBtn = $("#copyBib");
  const bib = $("#bibtex");
  if (copyBtn && bib) {
    copyBtn.addEventListener("click", async () => {
      const text = bib.textContent;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        ta.remove();
      }
      copyBtn.textContent = ok ? "Copied" : "Press Ctrl+C to copy";
      setTimeout(() => { copyBtn.textContent = "Copy citation"; }, 2000);
    });
  }

  /* ----- Email button (only when configured) ----------------------------- */
  const emailBtn = $("#emailBtn");
  if (emailBtn && CONFIG.email) {
    emailBtn.href = "mailto:" + CONFIG.email;
    emailBtn.hidden = false;
  }

  /* ----- Live repositories ----------------------------------------------- */
  const listEl = $("#repoList");
  const statusEl = $("#repoStatus");
  const searchEl = $("#repoSearch");
  const langEl = $("#repoLang");
  const forksEl = $("#repoForks");

  const LANG_COLORS = {
    Python: "#3572A5", "Jupyter Notebook": "#DA5B0B", Shell: "#89E051", JavaScript: "#F1E05A",
    TypeScript: "#3178C6", HTML: "#E34C26", CSS: "#563D7C", SQL: "#E38C00", "PLpgSQL": "#336790",
    Java: "#B07219", "C++": "#F34B7D", C: "#555555", Go: "#00ADD8", Rust: "#DEA584", PHP: "#4F5D95",
  };

  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    if (props) Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => c && node.append(c));
    return node;
  }

  async function loadRepos() {
    const key = "gh-repos-v1";
    try {
      const cached = JSON.parse(sessionStorage.getItem(key) || "null");
      if (cached && Date.now() - cached.t < 10 * 60 * 1000) return cached.d;
    } catch (e) { /* ignore */ }
    const res = await fetch(`https://api.github.com/users/${CONFIG.github}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error("GitHub responded with " + res.status);
    const data = await res.json();
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch (e) { /* ignore */ }
    return data;
  }

  const fmtDate = (iso) => new Date(iso).toLocaleDateString("en", { month: "short", year: "numeric" });

  function renderRepo(r) {
    const name = el("a", { href: r.html_url, rel: "noopener", class: "repo__name", text: r.name });
    const desc = r.description
      ? el("p", { class: "repo__desc", text: r.description })
      : el("p", { class: "repo__desc repo__desc--empty", text: "No description yet." });
    const left = el("div", null, name, desc);
    if (r.topics && r.topics.length) left.append(el("p", { class: "repo__topics", text: r.topics.join(", ") }));

    const meta = el("div", { class: "repo__meta" });
    if (r.language) {
      const lang = el("span", { class: "lang", text: r.language });
      lang.style.setProperty("--dot", LANG_COLORS[r.language] || "var(--muted)");
      meta.append(lang);
    }
    if (r.fork) meta.append(el("span", { text: "Fork" }));
    if (r.stargazers_count) meta.append(el("span", { text: r.stargazers_count + (r.stargazers_count === 1 ? " star" : " stars") }));
    if (r.pushed_at) meta.append(el("span", { text: "Updated " + fmtDate(r.pushed_at) }));
    return el("li", { class: "repo" }, left, meta);
  }

  if (listEl && statusEl) {
    let repos = [];

    const apply = () => {
      const q = (searchEl.value || "").trim().toLowerCase();
      const lang = langEl.value;
      const showForks = forksEl.checked;
      const shown = repos.filter((r) => {
        if (r.fork && !showForks) return false;
        if (lang && r.language !== lang) return false;
        if (!q) return true;
        const hay = [r.name, r.description || "", (r.topics || []).join(" ")].join(" ").toLowerCase();
        return hay.includes(q);
      });
      listEl.replaceChildren(...shown.map(renderRepo));
      const total = repos.filter((r) => showForks || !r.fork).length;
      statusEl.textContent = shown.length
        ? `Showing ${shown.length} of ${total} repositories.`
        : "No repositories match. Clear the search or choose another language.";
    };

    loadRepos().then((data) => {
      repos = data
        .filter((r) => !CONFIG.hideRepos.includes(r.name))
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      const langs = Array.from(new Set(repos.map((r) => r.language).filter(Boolean))).sort();
      langs.forEach((l) => langEl.append(el("option", { value: l, text: l })));
      apply();
      searchEl.addEventListener("input", apply);
      langEl.addEventListener("change", apply);
      forksEl.addEventListener("change", apply);
    }).catch(() => {
      statusEl.textContent = "";
      statusEl.append(
        "GitHub did not respond, which usually means a temporary rate limit. ",
        el("a", { href: `https://github.com/${CONFIG.github}?tab=repositories`, rel: "noopener", text: "Open the repositories on GitHub" }),
        "."
      );
      $(".repo-tools").hidden = true;
    });
  }

  /* ----- Footer year ----------------------------------------------------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

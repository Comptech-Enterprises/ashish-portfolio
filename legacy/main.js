(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover)").matches;

  $("#yr").textContent = new Date().getFullYear();

  // stars
  const stars = $("#stars");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("i");
    s.className = "star";
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 60}%;--d:${2 + Math.random() * 4}s;animation-delay:-${Math.random() * 4}s`;
    stars.appendChild(s);
  }

  // preloader
  const bar = $("#loaderBar"), pct = $("#loaderPct"), loader = $("#loader");
  document.body.classList.add("is-loading");
  let p = 0;
  const t0 = performance.now();
  (function load(now) {
    p = Math.min(100, ((now - t0) / (reduce ? 200 : 2300)) * 100);
    bar.style.width = p + "%";
    pct.textContent = Math.round(p);
    if (p < 100) return requestAnimationFrame(load);
    setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");
      $("#hero").classList.add("is-in");
    }, 250);
  })(t0);

  // reveal on scroll
  // clipped (mask) elements report zero intersection, so observe their parent
  const targets = new Map();
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = targets.get(e.target);
    const d = el.dataset.delay;
    if (d) el.style.transitionDelay = d + "ms";
    el.classList.add("is-visible");
    io.unobserve(e.target);
  }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => {
    const t = el.dataset.variant === "mask" ? el.parentElement : el;
    targets.set(t, el);
    io.observe(t);
  });

  // count up
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, t = performance.now();
    (function tick(n) {
      const k = Math.min(1, (n - t) / 1800);
      el.textContent = Math.round((1 - Math.pow(1 - k, 4)) * end);
      if (k < 1) requestAnimationFrame(tick);
    })(t);
  }), { threshold: 0.5 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  // menu
  const burger = $("#burger");
  const toggleMenu = (open) => document.body.classList.toggle("menu-open", open);
  burger.addEventListener("click", () => toggleMenu());
  $$("#menu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  // scroll-driven
  const nav = $("#nav"), progress = $("#progress"), sky = $("#sky");
  const track = $("#areasTrack"), areas = $("#areas"), meter = $("#areasMeter");
  const steps = $("#steps"), fill = $("#stepsFill");
  const par = $$("[data-parallax]");
  let lastY = 0, ticking = false;

  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-stuck", y > 40);
    nav.classList.toggle("is-hidden", y > lastY && y > 400 && !document.body.classList.contains("menu-open"));
    lastY = y;
    sky.style.setProperty("--sky", Math.max(0, 1 - y / (vh * 0.9)).toFixed(3));

    if (!reduce) {
      par.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const sp = parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0,${(y * sp).toFixed(1)}px,0)`;
      });

      // horizontal scroll for areas
      const ar = areas.getBoundingClientRect();
      const span = ar.height - vh;
      const prog = Math.min(1, Math.max(0, -ar.top / span));
      const dist = track.scrollWidth - innerWidth + 80;
      track.style.transform = `translate3d(${(-prog * dist).toFixed(1)}px,0,0)`;
      meter.style.transform = `scaleX(${prog})`;
    }

    // steps line fill
    const sr = steps.getBoundingClientRect();
    const sp2 = Math.min(1, Math.max(0, (vh * 0.6 - sr.top) / sr.height));
    fill.style.height = sp2 * 100 + "%";
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();

  // custom cursor
  if (fine && !reduce) {
    const c = $("#cursor"), lab = $("#cursorLabel");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(loop);
    })();
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => { lab.textContent = el.dataset.cursor; c.classList.add("is-big"); });
      el.addEventListener("mouseleave", () => c.classList.remove("is-big"));
    });
    $$("a,button").forEach((el) => {
      el.addEventListener("mouseenter", () => c.classList.add("is-link"));
      el.addEventListener("mouseleave", () => c.classList.remove("is-link"));
    });
  }

  // magnetic buttons
  if (fine && !reduce) {
    $$("[data-magnet]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    // 3D tilt + spotlight
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg)`;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }
})();

/* Portfolio interactions: nav, reveal, lightbox */
(function () {
  "use strict";

  // Sticky nav shade
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox for zoomable images
  var zoomables = document.querySelectorAll("[data-zoom]");
  if (zoomables.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="close" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    function open(src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
    }
    zoomables.forEach(function (img) {
      img.addEventListener("click", function () { open(img.getAttribute("src"), img.getAttribute("alt")); });
    });
    lb.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Work showcase carousel — native scroll-snap, JS only for controls + state
  var vp = document.querySelector("[data-sc-viewport]");
  if (vp) {
    var slides = Array.prototype.slice.call(vp.querySelectorAll(".sc-slide"));
    var dotsWrap = document.querySelector("[data-sc-dots]");
    var live = document.querySelector("[data-sc-live]");
    var prevBtn = document.querySelector("[data-sc-prev]");
    var nextBtn = document.querySelector("[data-sc-next]");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var AUTOPLAY_MS = 7000;
    var index = 0, timer = null, autoplayOff = reduced;

    var dots = slides.map(function (slide, i) {
      var title = slide.querySelector("h2");
      var name = title ? title.textContent.trim() : "Project " + (i + 1);
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "sc-dot";
      dot.setAttribute("aria-label", "Show " + name);
      dot.addEventListener("click", function () { stopAutoplay(); goTo(i, true); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function setActive(i) {
      index = i;
      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === i);
        if (n === i) { d.setAttribute("aria-current", "true"); } else { d.removeAttribute("aria-current"); }
      });
      if (live) {
        var t = slides[i].querySelector("h2");
        live.textContent = "Slide " + (i + 1) + " of " + slides.length + (t ? ": " + t.textContent.trim() : "");
      }
    }

    function goTo(i, smooth) {
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      vp.scrollTo({
        left: slides[i].offsetLeft - slides[0].offsetLeft,
        behavior: (smooth && !reduced) ? "smooth" : "auto"
      });
      setActive(i);
    }

    function startAutoplay() {
      if (autoplayOff || timer || slides.length < 2) return;
      timer = window.setInterval(function () { goTo(index + 1, true); }, AUTOPLAY_MS);
    }
    function pauseAutoplay() { if (timer) { window.clearInterval(timer); timer = null; } }
    function stopAutoplay() { autoplayOff = true; pauseAutoplay(); }

    if (prevBtn) prevBtn.addEventListener("click", function () { stopAutoplay(); goTo(index - 1, true); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopAutoplay(); goTo(index + 1, true); });

    vp.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); stopAutoplay(); goTo(index + 1, true); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); stopAutoplay(); goTo(index - 1, true); }
    });

    // Keep the dots honest when the user swipes or scrolls the track directly
    if ("IntersectionObserver" in window) {
      var scIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(slides.indexOf(e.target));
        });
      }, { root: vp, threshold: 0.6 });
      slides.forEach(function (s) { scIo.observe(s); });
    }

    vp.addEventListener("pointerdown", stopAutoplay);
    vp.addEventListener("mouseenter", pauseAutoplay);
    vp.addEventListener("mouseleave", startAutoplay);
    vp.addEventListener("focusin", pauseAutoplay);
    vp.addEventListener("focusout", startAutoplay);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { pauseAutoplay(); } else { startAutoplay(); }
    });

    setActive(0);
    startAutoplay();
  }

  // Contact form — posts to Web3Forms via fetch, no page reload, no email exposed
  var cform = document.getElementById("contactForm");
  if (cform) {
    var status = document.getElementById("cf-status");
    var btn = cform.querySelector(".cf-submit");
    cform.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "cf-status";
      status.textContent = "Sending…";
      if (btn) btn.disabled = true;
      fetch(cform.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(cform)
      }).then(function (r) { return r.json(); }).then(function (json) {
        if (json.success) {
          status.textContent = "Thanks — your message has been sent. I'll get back to you soon.";
          status.className = "cf-status ok";
          cform.reset();
        } else {
          status.textContent = (json && json.message) || "Something went wrong. Please try again, or reach me on LinkedIn.";
          status.className = "cf-status err";
        }
      }).catch(function () {
        status.textContent = "Network error. Please try again, or reach me on LinkedIn.";
        status.className = "cf-status err";
      }).finally(function () { if (btn) btn.disabled = false; });
    });
  }
})();

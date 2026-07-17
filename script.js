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

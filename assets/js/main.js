/* Nick Cook — portfolio behaviour. No dependencies. */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  var navLabel = navToggle ? navToggle.querySelector(".nav-toggle-label") : null;

  /* ---------------------------------------------------------------------
     Header state
     --------------------------------------------------------------------- */

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (navLabel) navLabel.textContent = "Menu";
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    header.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    if (navLabel) navLabel.textContent = "Close";
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Current year
     --------------------------------------------------------------------- */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------------------------------------------------------------------
     Subtle reveal. Content is visible without JavaScript; classes are
     only added when motion is allowed and the observer is available.
     --------------------------------------------------------------------- */

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canObserve = "IntersectionObserver" in window;

  if (!reduceMotion && canObserve) {
    var targets = document.querySelectorAll(
      ".section-head, .feature-card, .card, .experiments, .about-copy, .capability, .contact-copy, .contact-form-wrap"
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach(function (el, index) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min((index % 3) * 70, 140) + "ms";
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     Contact form
     ---------------------------------------------------------------------
     Posts to Formspree when a real form ID is configured. Until then it
     falls back to a pre-filled email so the form is never a dead end.
     --------------------------------------------------------------------- */

  var form = document.querySelector("[data-contact-form]");
  var status = form ? form.querySelector("[data-form-status]") : null;

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (state) status.classList.add(state);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      var endpoint = form.getAttribute("action") || "";
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var email = String(data.get("email") || "").trim();
      var message = String(data.get("message") || "").trim();

      /* The placeholder means Formspree has not been connected yet. */
      if (endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        event.preventDefault();
        var subject = encodeURIComponent("Portfolio enquiry from " + (name || "your website"));
        var body = encodeURIComponent(message + "\n\n— " + (name || "") + "\n" + email);
        window.location.href =
          "mailto:NickCookCS@gmail.com?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app with the message filled in.", "is-success");
        return;
      }

      event.preventDefault();
      setStatus("Sending…", null);

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed");
          form.reset();
          setStatus("Thanks — your message is on its way. I'll get back to you soon.", "is-success");
        })
        .catch(function () {
          setStatus(
            "Something went wrong. Please email NickCookCS@gmail.com directly.",
            "is-error"
          );
        });
    });
  }
})();

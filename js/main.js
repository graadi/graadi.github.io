(function () {
   "use strict";

   if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
   }

   var nav = document.getElementById("nav");
   var navToggle = document.getElementById("nav-toggle");
   var navLinks = document.getElementById("nav-links");
   var progressBar = document.getElementById("progress-bar");
   var sections = document.querySelectorAll("section[id], header[id]");
   var navAnchors = document.querySelectorAll("[data-section]");

   /* Mobile nav toggle */
   navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
   });

   navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
         navLinks.classList.remove("open");
         navToggle.setAttribute("aria-expanded", "false");
      });
   });

   /* Solid nav background + scroll progress + active nav link, batched on scroll */
   var sectionList = Array.prototype.slice.call(sections);

   function updateActiveNav() {
      var activeId = sectionList[0].id;
      var threshold = 140;
      sectionList.forEach(function (section) {
         if (section.getBoundingClientRect().top - threshold <= 0) {
            activeId = section.id;
         }
      });
      navAnchors.forEach(function (a) {
         a.classList.toggle("active", a.getAttribute("data-section") === activeId);
      });
   }

   function onScroll() {
      nav.classList.toggle("solid", window.scrollY > 60);

      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";

      updateActiveNav();
   }
   window.addEventListener("scroll", onScroll, { passive: true });
   window.addEventListener("resize", updateActiveNav);
   onScroll();

   var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
         if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
         }
      });
   }, { threshold: 0.15 });

   document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
   });
})();

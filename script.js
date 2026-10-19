// ✅ Initialize AOS
if (window.AOS) {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Navigation menu toggle (mobile)
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("header .nav-links");

  if (burger && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("nav-active", open);
      burger.classList.toggle("toggle", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Mbyll menunë" : "Hap menunë");
    };

    burger.addEventListener("click", () => {
      setMenu(!nav.classList.contains("nav-active"));
    });

    // Close the menu after choosing a link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  // ✅ Smooth scrolling for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", id);
      }
    });
  });

  // ✅ Doctors Slider (scroll-based)
  const track = document.getElementById("doctorsTrack");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  if (track && prevBtn && nextBtn) {
    const scrollStep = () => {
      const card = track.querySelector(".doctor-card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.offsetWidth + gap : 320;
    };

    const updateArrows = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    };

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollStep(), behavior: "smooth" });
    });

    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  // ✅ Keep the copyright year current
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});

// ✅ Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Navigation menu toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");

      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      burger.classList.toggle("toggle");
    });
  }

  // ✅ Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ✅ Form submission handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      showNotification("Mesazhi juaj u dërgua me sukses!", "success");
      this.reset();
    });
  }

  // ✅ Add hover animation to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // ✅ Doctors Slider (scroll-based)
  const track = document.getElementById("doctorsTrack");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 320;

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  // ✅ Inject CSS styles for notifications and nav toggle
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification.success {
            border-left: 4px solid #4CAF50;
        }
        .notification.success i {
            color: #4CAF50;
        }
        .notification.info {
            border-left: 4px solid #2196F3;
        }
        .notification.info i {
            color: #2196F3;
        }
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .burger.toggle .line2 {
            opacity: 0;
        }
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
  document.head.appendChild(style);
});

// ✅ Notification system (global scope so it's accessible in form submission)
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

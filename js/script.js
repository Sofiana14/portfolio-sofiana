document.addEventListener("DOMContentLoaded", () => {
  // 1. Loading Screen Management
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1200);

  // 2. Initialize AOS (Animate on Scroll)
  AOS.init({
    once: true,
    offset: 80,
    duration: 800,
    easing: "ease-out-cubic",
  });

  // 3. Dark/Light Mode Default & Toggle Logic
  const html = document.documentElement;
  const themeToggles = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ];

  // Default is dark mode per prompt requirement.
  if (localStorage.getItem("theme") === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }

  themeToggles.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      html.classList.toggle("dark");
      if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  });

  // 4. Sticky Navbar
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // 5. Mobile Menu Handling
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("opacity-0", "invisible");
      backToTopBtn.classList.add("opacity-100", "visible");
    } else {
      backToTopBtn.classList.add("opacity-0", "invisible");
      backToTopBtn.classList.remove("opacity-100", "visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 7. Particles.js Configuration
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 900 } },
        color: { value: "#F59E0B" }, // Gold Accent
        shape: { type: "circle" },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#F59E0B",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  // ==========================================
  // 8. FUNGSI KIRIM EMAIL (EMAILJS)
  // ==========================================

  // Inisialisasi EmailJS (PASTIKAN MENGGANTI INI DENGAN PUBLIC KEY ANDA)
  emailjs.init("nxBlI9ZXQLkPPRWWg");

  const btn = document.getElementById("submit-btn");
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Ubah teks tombol saat proses pengiriman
      btn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin ml-2"></i>';

      // GANTI 'SERVICE_ID_ANDA' DAN 'TEMPLATE_ID_ANDA'
      emailjs.sendForm("service_7mfskxs", "template_anlls8r", this).then(
        () => {
          btn.innerHTML = 'Terkirim! <i class="fas fa-check ml-2"></i>';
          alert("Pesan Anda berhasil dikirim! Sofiana akan segera merespons.");
          form.reset();

          // Kembalikan tombol ke teks semula setelah 3 detik
          setTimeout(() => {
            btn.innerHTML =
              'Kirim Pesan <i class="fas fa-paper-plane ml-2"></i>';
          }, 3000);
        },
        (err) => {
          btn.innerHTML = 'Gagal <i class="fas fa-times ml-2"></i>';
          alert("Gagal mengirim pesan: " + JSON.stringify(err));

          setTimeout(() => {
            btn.innerHTML =
              'Kirim Pesan <i class="fas fa-paper-plane ml-2"></i>';
          }, 3000);
        },
      );
    });
  }
});

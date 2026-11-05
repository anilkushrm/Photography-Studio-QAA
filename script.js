/**
 * Naina Wedding Film Studio — Homepage Interactions
 * - Accessible mobile navigation toggle + Escape key support
 * - Service card "Inquire for Details" pre-selection in the inquiry form
 * - Portfolio category filtering
 * - Accessible inquiry form validation & status feedback
 * - Automatic current year in footer copyright
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Current Year in Footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const primaryNav = document.getElementById("primary-navigation");

  if (navToggle && primaryNav) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      primaryNav.classList.toggle("is-open", !isExpanded);
    });

    // Close mobile menu when a link is clicked
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 960) {
          closeMenu();
        }
      });
    });

    // Close mobile menu on Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  // 3. Service Cards -> Pre-select Service in Contact Form
  const serviceLinks = document.querySelectorAll(".service-cta[data-service]");
  const serviceSelect = document.getElementById("service-select");
  const clientNameInput = document.getElementById("client-name");

  serviceLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const selectedService = link.getAttribute("data-service");
      if (serviceSelect && selectedService) {
        Array.from(serviceSelect.options).forEach((option) => {
          if (option.value === selectedService) {
            serviceSelect.value = selectedService;
          }
        });
      }
      if (clientNameInput) {
        setTimeout(() => clientNameInput.focus({ preventScroll: true }), 350);
      }
    });
  });

  // 4. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  const portfolioItems = document.querySelectorAll(".portfolio-item[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const matches = filterValue === "all" || category === filterValue;
        item.hidden = !matches;
      });
    });
  });

  // 5. Contact Form Handling (Client-side validation & clear placeholder notice)
  const inquiryForm = document.getElementById("inquiry-form");
  const formStatus = document.getElementById("form-status");

  if (inquiryForm && formStatus) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = inquiryForm.elements.namedItem("name")?.value.trim();
      const phone = inquiryForm.elements.namedItem("phone")?.value.trim();
      const eventDate = inquiryForm.elements.namedItem("eventDate")?.value.trim();
      const location = inquiryForm.elements.namedItem("location")?.value.trim();
      const service = inquiryForm.elements.namedItem("service")?.value;

      if (!name || !phone || !eventDate || !location) {
        formStatus.hidden = false;
        formStatus.className = "form-status is-error";
        formStatus.textContent =
          "Please fill in all required fields (Name, Phone/WhatsApp Number, Event Date, and Venue/City).";
        return;
      }

      formStatus.hidden = false;
      formStatus.className = "form-status is-success";
      formStatus.textContent = `Thank you, ${name}! Your inquiry for "${service}" on ${eventDate} (${location}) has been prepared. [Connect your backend or WhatsApp number to receive live submissions].`;
      inquiryForm.reset();
    });
  }
});


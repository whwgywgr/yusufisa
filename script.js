(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const themeColours = {
    light: "#f5f4ef",
    dark: "#0d100e"
  };

  /* -----------------------------------------------------------------------
     Theme
     ----------------------------------------------------------------------- */

  function readStoredTheme() {
    try {
      return localStorage.getItem("yi-theme");
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme, persist = false) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", nextTheme);

    if (themeToggle) {
      const isDark = nextTheme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      themeToggle.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    }

    if (themeMeta) {
      themeMeta.setAttribute("content", themeColours[nextTheme]);
    }

    if (persist) {
      try {
        localStorage.setItem("yi-theme", nextTheme);
      } catch (error) {
        // The theme still works when storage is unavailable.
      }
    }
  }

  applyTheme(root.getAttribute("data-theme"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark", true);
    });
  }

  const handleSystemTheme = (event) => {
    if (!readStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof prefersDark.addEventListener === "function") {
    prefersDark.addEventListener("change", handleSystemTheme);
  } else if (typeof prefersDark.addListener === "function") {
    prefersDark.addListener(handleSystemTheme);
  }

  /* -----------------------------------------------------------------------
     Kuala Lumpur time and copyright year
     ----------------------------------------------------------------------- */

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  function updateClock() {
    let time = "—:—";
    try {
      time = timeFormatter.format(new Date());
    } catch (error) {
      // Keep the placeholder if the browser cannot resolve the time zone.
    }

    document.querySelectorAll("[data-clock]").forEach((clock) => {
      clock.textContent = time;
      clock.setAttribute("datetime", new Date().toISOString());
    });
  }

  updateClock();
  window.setInterval(updateClock, 30_000);

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------------------------------------
     Header and current section
     ----------------------------------------------------------------------- */

  const header = document.querySelector("[data-header]");
  const navLinks = Array.from(document.querySelectorAll("[data-section-link]"));
  const navSectionIds = new Set(navLinks.map((link) => link.dataset.sectionLink));
  const sections = Array.from(document.querySelectorAll("main > section[id]")).filter((section) =>
    navSectionIds.has(section.id)
  );
  let scrollFrame = 0;

  function updateScrollState() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle("is-stuck", scrollY > 8);
    }

    if (sections.length && navLinks.length) {
      const probe = scrollY + Math.min(window.innerHeight * 0.38, 320);
      let activeId = sections[0].id;

      sections.forEach((section) => {
        if (probe >= section.offsetTop) {
          activeId = section.id;
        }
      });

      navLinks.forEach((link) => {
        if (link.dataset.sectionLink === activeId) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    scrollFrame = 0;
  }

  function requestScrollUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  updateScrollState();

  /* -----------------------------------------------------------------------
     Quiet scroll reveals
     ----------------------------------------------------------------------- */

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* -----------------------------------------------------------------------
     Mobile menu
     ----------------------------------------------------------------------- */

  const menu = document.getElementById("site-menu");
  const menuOpen = document.querySelector("[data-menu-open]");

  if (menu && menuOpen && typeof menu.showModal === "function") {
    const menuClose = menu.querySelector("[data-menu-close]");
    const menuLinks = Array.from(menu.querySelectorAll("[data-menu-link]"));

    const openMenu = () => {
      if (menu.open) return;
      menu.showModal();
      menuOpen.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");

      if (menuClose) {
        menuClose.focus({ preventScroll: true });
      } else {
        menu.focus({ preventScroll: true });
      }
    };

    const closeMenu = () => {
      if (menu.open) menu.close();
    };

    menuOpen.addEventListener("click", openMenu);

    if (menuClose) {
      menuClose.addEventListener("click", closeMenu);
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    menu.addEventListener("click", (event) => {
      if (event.target === menu) closeMenu();
    });

    menu.addEventListener("close", () => {
      menuOpen.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 840 && menu.open) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Copy email address
     ----------------------------------------------------------------------- */

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");
  let copyResetTimer = 0;

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "-1000px";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    let succeeded = false;
    try {
      succeeded = document.execCommand("copy");
    } catch (error) {
      succeeded = false;
    }

    textArea.remove();
    return succeeded;
  }

  async function copyEmail(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        return fallbackCopy(text);
      }
    }

    return fallbackCopy(text);
  }

  if (copyButton) {
    const copyLabel = copyButton.querySelector("[data-copy-label]");
    const email = copyButton.dataset.copyValue || "hello@yusufisa.my";

    copyButton.addEventListener("click", async () => {
      const succeeded = await copyEmail(email);

      window.clearTimeout(copyResetTimer);
      copyButton.classList.toggle("is-copied", succeeded);
      copyButton.setAttribute(
        "aria-label",
        succeeded ? "Email address copied" : "Copy email address"
      );

      if (copyLabel) {
        copyLabel.textContent = succeeded ? "Copied" : "Try again";
      }

      if (copyStatus) {
        copyStatus.textContent = succeeded
          ? "Email address copied to clipboard."
          : "Could not copy automatically. The address is hello@yusufisa.my.";
      }

      copyResetTimer = window.setTimeout(() => {
        copyButton.classList.remove("is-copied");
        copyButton.setAttribute("aria-label", "Copy email address");
        if (copyLabel) copyLabel.textContent = "Copy";
        if (copyStatus) copyStatus.textContent = "";
      }, 2400);
    });
  }
})();

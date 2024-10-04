console.log("main.js");

// Carousel
// --------------------------------------------

$(document).ready(function () {
  $(".cards").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  });
});

// Scroll behavior
// --------------------------------------------

// Get the site header element
const siteHeader = document.querySelector(".site-header");

// Function to get the height of the site header
function getHeaderHeight() {
  return siteHeader.offsetHeight;
}

// Function to update the header theme based on the intersecting section
function updateHeaderTheme(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio < 1) {
      const section = entry.target;
      siteHeader.classList.remove(
        "site-header--theme-white",
        "site-header--theme-black",
        "site-header--theme-gradient"
      );

      if (section.classList.contains("theme-white")) {
        siteHeader.classList.add("site-header--theme-white");
      } else if (section.classList.contains("theme-black")) {
        siteHeader.classList.add("site-header--theme-black");
      } else if (section.classList.contains("theme-gradient")) {
        siteHeader.classList.add("site-header--theme-gradient");
      }
    }
  });
}

// Function to initialize or update the Intersection Observer
function setupIntersectionObserver() {
  // Remove any existing observers
  if (window.sectionObserver) {
    window.sectionObserver.disconnect();
  }

  const headerHeight = getHeaderHeight();

  // Create a new Intersection Observer
  window.sectionObserver = new IntersectionObserver(updateHeaderTheme, {
    rootMargin: `-${headerHeight}px 0px -${
      window.innerHeight - headerHeight - 1
    }px 0px`,
    threshold: [0, 1],
  });

  // Observe all sections
  document.querySelectorAll(".section").forEach((section) => {
    window.sectionObserver.observe(section);
  });
}

// Function to check if the header is fixed
function isHeaderFixed() {
  return window.getComputedStyle(siteHeader).position === "fixed";
}

// Initial setup
if (isHeaderFixed()) {
  setupIntersectionObserver();
}

// Update on window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (isHeaderFixed()) {
      setupIntersectionObserver();
    }
  }, 250);
});

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var galleryGrid = document.querySelector(".gallery-grid");
  var lightbox = document.getElementById("gallery-lightbox");
  if (!galleryGrid || !lightbox) return;

  var images = Array.from(galleryGrid.querySelectorAll("img"));
  if (!images.length) return;

  var lightboxImg = lightbox.querySelector(".lightbox-image");
  var closeBtn = lightbox.querySelector(".lightbox-close");
  var backdrop = lightbox.querySelector(".lightbox-backdrop");

  // Shuffle images each time page loads
  var shuffled = images.slice().sort(function () {
    return Math.random() - 0.5;
  });
  shuffled.forEach(function (img) {
    galleryGrid.appendChild(img);
  });
  images = shuffled;

  var currentIndex = 0;
  var sliderTimer = null;

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    startAutoSlide();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    stopAutoSlide();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    sliderTimer = setInterval(showNext, 4000); // 4 seconds
  }

  function stopAutoSlide() {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  images.forEach(function (img, index) {
    img.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", function (evt) {
    if (!lightbox.classList.contains("is-open")) return;
    if (evt.key === "Escape") {
      closeLightbox();
    } else if (evt.key === "ArrowRight") {
      showNext();
    } else if (evt.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var backBtn = document.getElementById("backToTop");
  if (!backBtn) return;

  var scrollTimer = null;

  function updateBackButton() {
    if (window.scrollY > 350) {
      backBtn.classList.add("is-visible");
      backBtn.classList.remove("is-hidden");
    } else {
      backBtn.classList.add("is-hidden");
      backBtn.classList.remove("is-visible");
    }
  }

  function onScroll() {
    backBtn.classList.add("is-hidden");
    backBtn.classList.remove("is-visible");
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(updateBackButton, 260);
  }

  window.addEventListener("scroll", onScroll);
  updateBackButton();

  backBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var backBtn = document.getElementById("backToTop");
  if (!backBtn) return;

  var scrollTimer = null;

  function updateBackButton() {
    if (window.scrollY > 350) {
      backBtn.classList.add("is-visible");
      backBtn.classList.remove("is-hidden");
    } else {
      backBtn.classList.add("is-hidden");
      backBtn.classList.remove("is-visible");
    }
  }

  function onScroll() {
    backBtn.classList.add("is-hidden");
    backBtn.classList.remove("is-visible");
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(updateBackButton, 260);
  }

  window.addEventListener("scroll", onScroll);
  updateBackButton();

  backBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// --- Fix: stop gallery & fan-photo cards from acting like full-page links ---
document.addEventListener('DOMContentLoaded', function () {
  const problematicCards = document.querySelectorAll(
    '.gallery-card, .fan-photo-card'
  );

  problematicCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      // Allow clicks on actual links or buttons inside the card
      if (e.target.closest('a, button')) {
        return;
      }
      // Block the "hidden" link behaviour
      e.preventDefault();
    });
  });
});

const slider = document.querySelector(".highlight-slider");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".highlight-slide"));
  const dotsContainer = slider.querySelector(".slider-dots");
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  let activeIndex = 0;
  let timerId;

  const dots = slides.map((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show highlight ${index + 1}`);
    dot.addEventListener("click", () => {
      showSlide(index);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
    });
  }

  function nextSlide() {
    showSlide(activeIndex + 1);
  }

  function startTimer() {
    timerId = window.setInterval(nextSlide, 5500);
  }

  function stopTimer() {
    window.clearInterval(timerId);
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  prevButton.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    restartTimer();
  });

  nextButton.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    restartTimer();
  });

  slider.addEventListener("mouseenter", stopTimer);
  slider.addEventListener("mouseleave", startTimer);

  showSlide(0);
  startTimer();
}

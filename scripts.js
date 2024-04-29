let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function animateValue(element, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(function () {
    current += increment;
    element.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

function startCountAnimationOnScroll() {
  valueDisplays.forEach((valueDisplay) => {
    if (isElementInViewport(valueDisplay) && !valueDisplay.dataset.animated) {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      animateValue(valueDisplay, startValue, endValue, duration);
      valueDisplay.dataset.animated = true; // Marca o elemento como animado
    }
  });
}

window.addEventListener("scroll", startCountAnimationOnScroll);

document.addEventListener("DOMContentLoaded", startCountAnimationOnScroll);

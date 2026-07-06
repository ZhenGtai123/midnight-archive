const progress = document.querySelector(".reading-progress");
const cursorGlow = document.querySelector(".cursor-glow");

function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal, .story-card, .source-list article, .author-card");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function wireCardGlow() {
  document.querySelectorAll(".story-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener(
  "pointermove",
  (event) => {
    if (!cursorGlow) return;
    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  },
  { passive: true }
);

updateProgress();
revealOnScroll();
wireCardGlow();

const progress = document.querySelector(".reading-progress");
const cursorGlow = document.querySelector(".cursor-glow");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function motionAllowed() {
  return !motionQuery.matches;
}

function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 18);
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal, .story-card, .theme-card, .source-list article, .author-card");
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
  document.querySelectorAll(".story-card, .theme-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);

      if (!motionAllowed()) return;
      const rotateY = ((x / rect.width) - 0.5) * 4.5;
      const rotateX = ((0.5 - y / rect.height) * 4.5);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

function wireHeroDepth() {
  if (!hero) return;

  hero.addEventListener(
    "pointermove",
    (event) => {
      if (!motionAllowed()) return;
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
      hero.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
    },
    { passive: true }
  );

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0px");
    hero.style.setProperty("--hero-y", "0px");
  });
}

function wireReadingFocus() {
  const paragraphs = document.querySelectorAll(".article-body p");
  if (!paragraphs.length || !("IntersectionObserver" in window)) return;

  let active = null;
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible || visible.target === active) return;
      active?.classList.remove("is-reading");
      active = visible.target;
      active.classList.add("is-reading");
    },
    {
      rootMargin: "-18% 0px -48% 0px",
      threshold: [0.2, 0.42, 0.68]
    }
  );

  paragraphs.forEach((paragraph) => observer.observe(paragraph));
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener(
  "pointermove",
  (event) => {
    if (!cursorGlow || !motionAllowed()) return;
    cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  },
  { passive: true }
);

updateProgress();
revealOnScroll();
wireCardGlow();
wireHeroDepth();
wireReadingFocus();

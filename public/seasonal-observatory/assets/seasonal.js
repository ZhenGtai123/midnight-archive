const progress = document.querySelector(".reading-progress");
const calendarData = readJson("seasonal-calendar-data", []);
const poemData = readJson("seasonal-poem-data", []);

function updateProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

function readJson(id, fallback) {
  const node = document.getElementById(id);
  if (!node) return fallback;
  try {
    return JSON.parse(node.textContent || "");
  } catch {
    return fallback;
  }
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function dateLabel(dateValue) {
  const date = new Date(`${dateValue}T00:00:00+08:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function currentTerm(calendar) {
  if (!calendar.length) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dated = calendar.map((term) => ({
    ...term,
    time: new Date(`${term.date}T00:00:00+08:00`).getTime()
  }));
  let current = dated[0];
  let next = dated[1] || dated[0];

  for (let index = 0; index < dated.length; index += 1) {
    if (dated[index].time <= today) {
      current = dated[index];
      next = dated[index + 1] || dated[0];
    }
  }

  return {
    current,
    next,
    daysToNext: Math.max(0, Math.ceil((next.time - today) / 86400000))
  };
}

function syncToday() {
  const snapshot = currentTerm(calendarData);
  if (!snapshot) return;
  const poem = poemData.find((item) => snapshot.current.poemIds?.includes(item.id)) || poemData[0];

  setText("[data-today-term]", snapshot.current.name);
  setText("[data-today-season]", snapshot.current.seasonLabel);
  setText("[data-today-date]", dateLabel(snapshot.current.date));
  setText("[data-today-focus]", snapshot.current.focus);
  setText("[data-today-observe]", snapshot.current.observe);
  setText("[data-next-term]", snapshot.next.name);
  setText("[data-days-next]", String(snapshot.daysToNext));
  if (poem) setText("[data-today-poem]", poem.excerpt);

  document.querySelectorAll(".term-dot").forEach((node) => {
    node.classList.toggle("is-current", node.dataset.termSlug === snapshot.current.slug);
  });
}

function syncPoemFilter() {
  document.querySelectorAll("[data-poem-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.poemFilter;
      document.querySelectorAll("[data-poem-filter]").forEach((node) => node.classList.remove("is-active"));
      button.classList.add("is-active");
      document.querySelectorAll(".poem-card").forEach((card) => {
        const seasons = card.dataset.poemSeasons || "";
        card.hidden = filter !== "all" && !seasons.split(" ").includes(filter);
      });
    });
  });
}

function selectedPoem() {
  const select = document.querySelector("[data-poem-select]");
  return poemData.find((poem) => poem.id === select?.value) || poemData[0];
}

function syncCardPreview() {
  const poem = selectedPoem();
  if (!poem) return;
  setText("[data-card-kicker]", `${poem.dynasty} · ${poem.author}`);
  setText("[data-card-title]", poem.title);
  setText("[data-card-excerpt]", poem.excerpt);
  setText("[data-card-note]", poem.note);
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = [...text];
  let line = "";
  let currentY = y;
  for (const char of chars) {
    const test = `${line}${char}`;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

function downloadPoemCard() {
  const poem = selectedPoem();
  if (!poem) return;
  const style = document.querySelector("[data-card-style]")?.value || "warm";
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  const palettes = {
    warm: ["#fff7e6", "#f2c46d", "#17231d"],
    green: ["#eef6e8", "#6fbf9b", "#17231d"],
    night: ["#17213a", "#8fb3d9", "#fffaf0"]
  };
  const [background, accent, ink] = palettes[style] || palettes.warm;

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.arc(880, 180, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 1120, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = ink;
  ctx.font = '700 42px "Microsoft YaHei", serif';
  ctx.fillText(`${poem.dynasty} · ${poem.author}`, 90, 130);
  ctx.font = '800 84px "SimSun", "Noto Serif SC", serif';
  ctx.fillText(poem.title, 90, 250);
  ctx.font = '700 66px "SimSun", "Noto Serif SC", serif';
  const afterVerseY = wrapCanvasText(ctx, poem.excerpt, 90, 420, 860, 92);
  ctx.font = '400 34px "Microsoft YaHei", sans-serif';
  wrapCanvasText(ctx, poem.note, 90, afterVerseY + 84, 840, 54);
  ctx.fillStyle = accent;
  ctx.fillRect(90, 1180, 220, 8);
  ctx.fillStyle = ink;
  ctx.font = '600 30px "Microsoft YaHei", sans-serif';
  ctx.fillText("节气诗历 · Seasonal Observatory", 90, 1248);

  const link = document.createElement("a");
  link.download = `${poem.id}-seasonal-card.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
document.querySelector("[data-poem-select]")?.addEventListener("change", syncCardPreview);
document.querySelector("[data-card-style]")?.addEventListener("change", syncCardPreview);
document.querySelector("[data-download-card]")?.addEventListener("click", downloadPoemCard);
syncToday();
syncPoemFilter();
syncCardPreview();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

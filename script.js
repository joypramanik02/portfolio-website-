// Portfolio interactions: typing effect, scroll reveal, counters, filters, marquee.
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Typing effect for hero roles
  const roles = [
    "Aspiring Software Developer",
    "AI & Machine Learning Learner",
    "Web Developer",
    "Robotics Enthusiast",
    "Problem Solver",
  ];
  const typedEl = document.getElementById("typed");
  let roleIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    if (!typedEl) return;
    const role = roles[roleIdx];
    typedEl.textContent = role.slice(0, charIdx);
    let delay = 75;
    if (!deleting) {
      charIdx++;
      if (charIdx > role.length) { deleting = true; delay = 1600; charIdx = role.length; }
    } else {
      charIdx--;
      delay = 35;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 350; }
    }
    setTimeout(tick, delay);
  }
  tick();

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => revealObserver.observe(el));

  // Animated stat counters
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1100;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => counterObserver.observe(el));

  // Project filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // Skills marquee (duplicate list for a seamless loop)
  const skills = ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Node.js", "Express.js", "Python", "PHP", "MySQL", "C", "ESP32", "Arduino", "Git", "GitHub", "Machine Learning"];
  const track = document.getElementById("marquee-track");
  if (track) {
    const html = skills.map((s) => `<span><i>✦</i>${s}</span>`).join("");
    track.innerHTML = html + html;
  }

  // Back to top
  const toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

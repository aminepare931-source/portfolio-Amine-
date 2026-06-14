/* ══════════════════════════════════════
   PROJECTS.JS — Supabase
══════════════════════════════════════ */
const SB_URL  = 'https://btjdrlmudyfjkztfzkss.supabase.co';
const SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0amRybG11ZHlmamt6dGZ6a3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MzY5MTEsImV4cCI6MjA5NzAxMjkxMX0.AaCJhrRtS2gxnlI0YEqPPyTXv9Z_dPvSPAYvtEXA5XE';

async function fetchProjects() {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/projects?select=*&order=position.asc,created_at.asc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

function hexToRgb(hex) {
  try {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
  } catch { return '255,77,0'; }
}

function buildCard(p) {
  const color  = p.color || '#FF4D00';
  const desc   = p.description || p.desc || '';
  const hasImg = !!p.img;

  const thumb = hasImg
    ? `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block"/>`
    : `<div style="display:flex;align-items:center;justify-content:center;height:100%;position:relative;z-index:1">
        ${p.emoji
          ? `<span style="font-size:3rem">${p.emoji}</span>`
          : `<span style="font-family:'Bebas Neue',sans-serif;font-size:2.6rem;color:${color};text-shadow:0 0 30px ${color}55;padding:0 1rem;text-align:center">${p.name.toUpperCase()}</span>`
        }
       </div>`;

  const bgStyle = hasImg
    ? ''
    : `background:linear-gradient(135deg,#080808 0%,rgba(${hexToRgb(color)},.08) 60%,#0a0a0a 100%)`;

  const tags = (p.tags || []).map(t =>
    `<span class="project-tag">${t}</span>`
  ).join('');

  const linkHtml = p.url
    ? `<a href="${p.url}" target="_blank" rel="noopener" class="project-link">
         Voir le projet
         <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
       </a>`
    : '';

  const badge = p.featured
    ? `<div style="position:absolute;top:.8rem;right:.8rem;background:${color};color:#000;font-family:'DM Mono',monospace;font-size:.54rem;letter-spacing:.12em;text-transform:uppercase;padding:.25rem .65rem;z-index:2">★ Vedette</div>`
    : '';

  return `
    <div class="project-card ${p.size || 'wide'} rv" data-project-id="${p.id}">
      <div class="project-no-img" style="${bgStyle};position:relative">
        ${thumb}${badge}
      </div>
      <div class="project-info">
        ${tags ? `<div class="project-tags">${tags}</div>` : ''}
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${desc}</p>
        ${linkHtml}
      </div>
    </div>`;
}

async function renderDynamicProjects() {
  const projects = await fetchProjects();
  if (!projects.length) return;

  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  // Supprimer les anciennes cartes dynamiques
  grid.querySelectorAll('[data-project-id]').forEach(el => el.remove());

  // Injecter les nouvelles
  grid.insertAdjacentHTML('beforeend', projects.map(buildCard).join(''));

  // Observer pour animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 80);
    });
  }, { threshold: 0.07 });

  grid.querySelectorAll('[data-project-id].rv').forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', renderDynamicProjects);
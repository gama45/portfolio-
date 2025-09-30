// Mobile menu toggle with ARIA
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll (native scroll-behavior in CSS; this handles older browsers + focus)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      el.setAttribute('tabindex','-1');
      el.focus({preventScroll:true});
      setTimeout(()=>el.removeAttribute('tabindex'), 500);
    }
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
document.querySelectorAll('.reveal-up, .card').forEach(el=>io.observe(el));

// Project filters
const filterButtons = document.querySelectorAll('.filters .chip');
filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(b=>b.setAttribute('aria-pressed','false'));
    btn.setAttribute('aria-pressed','true');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card=>{
      card.style.display = (cat==='all' || card.dataset.cat===cat) ? '' : 'none';
    });
  });
});

// Modal with focus trapping
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');
let lastFocusedEl = null;

const projectDetails = {
  p1: {
    title: 'Analytics Dashboard',
    body: `
      <p>Built a real‑time dashboard with accessible components, keyboard‑navigable charts, and lazy‑loaded modules.</p>
      <ul>
        <li>Role: Frontend</li>
        <li>Stack: HTML, CSS, JS</li>
        <li>Focus: A11y, performance</li>
      </ul>
    `
  },
  p2: {
    title: 'Dev CLI',
    body: `
      <p>Command‑line tool to scaffold projects with linting, tests, and CI presets for rapid start.</p>
      <ul>
        <li>Role: Author</li>
        <li>Stack: Node.js</li>
        <li>Focus: DX, automation</li>
      </ul>
    `
  }
};

function openModal(id){
  lastFocusedEl = document.activeElement;
  const data = projectDetails[id];
  modalContent.innerHTML = `<h3>${data.title}</h3>${data.body}`;
  modal.showModal();
  closeModalBtn.focus();
}
function closeModal(){
  modal.close();
  if(lastFocusedEl) lastFocusedEl.focus();
}
document.addEventListener('click', e=>{
  if(e.target.closest('.open-modal')) openModal(e.target.closest('.open-modal').dataset.id);
  if(e.target.id==='closeModal') closeModal();
});
modal.addEventListener('cancel', e=>{ e.preventDefault(); closeModal(); });
modal.addEventListener('click', e=>{
  const rect = modal.querySelector('article').getBoundingClientRect();
  const inDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if(!inDialog) closeModal();
});

// Contact form (demo)
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Thanks, ${data.name}! Message received.`);
    form.reset();
  });
}

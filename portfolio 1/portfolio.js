// Simple interactivity: mobile nav toggle, active nav on scroll, small form client feedback

document.addEventListener('DOMContentLoaded', function() {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // Smooth scroll and active link
  const sections = document.querySelectorAll('main .section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  // IntersectionObserver to highlight nav links
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if(!id) return;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if(entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, {root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0});

  document.querySelectorAll('section[id]').forEach(s => io.observe(s));

// Anchor link close mobile menu
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      // if mobile open, close nav
      navList.classList.remove('open');
    });
  });

  // contact form fake handler
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  sendBtn.addEventListener('click', () => {
    sendBtn.textContent = 'Copied Email ✓';
    sendBtn.classList.add('sent');
    navigator.clipboard && navigator.clipboard.writeText('joewinarulraj@email.com');
    setTimeout(()=> sendBtn.textContent = 'Send (client-only)', 2500);
  });

  // small reveal on scroll (no libraries)
  const revealEls = document.querySelectorAll('.card-block, .skill, .project, .education-item, .experience-item');
  const revealIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.style.transform = 'translateY(0)'; e.target.style.opacity = 1; obs.unobserve(e.target); }
    });
  }, {threshold:0.08});
  revealEls.forEach(el => {
    el.style.transform = 'translateY(18px)';
    el.style.opacity = 0;
    el.style.transition = 'all 700ms cubic-bezier(.2,.9,.2,1)';
    revealIO.observe(el);
  });
});
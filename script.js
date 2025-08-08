document.addEventListener('DOMContentLoaded', function() {
  // -------- Typing Effect ---------
  const roles = [
    "Computer Engineer",
    "Full Stack Developer",
    "Cloud Enthusiast",
    "AI/ML Practitioner",
    "Quick Learner",
    "Programmer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  const typingElement = document.querySelector('.typing-effect');

  function type() {
    if (charIndex < roles[roleIndex].length) {
      typingElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 500);
    }
  }
  type();

  // --------- Scroll Animations ----------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.skill-card, .project-card, .experience-item, .timeline-item, .certificate-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // --------- Fix Navbar Anchor Offset ----------
  // Only adjust anchor links for relative anchors (not external links)
  document.querySelectorAll('.nav-links a[href^="#"], a[href^="#"][class*="nav"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      // Make sure it's a proper id
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 70; // fallback to 70px if not found
        // Calculate y-position for scroll
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

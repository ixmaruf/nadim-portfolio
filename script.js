/**
 * AL NADIM NABIL — WEB3 GROWTH ARCHITECT & CREATIVE PRODUCER
 * Executive Procedural Web3 Animation Suite & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Web Audio API SFX Synthesizer (Bespoke Micro-Audio Tones)
     ========================================================================== */
  let sfxEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq = 440, type = 'sine', duration = 0.12, gainVal = 0.04) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playRadarPing() {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const freqs = [587.33, 880.00, 1174.66];
      freqs.forEach((f, idx) => {
        setTimeout(() => {
          playTone(f, 'sine', 0.18, 0.04);
        }, idx * 85);
      });
    } catch(e) {}
  }

  // SFX Toggle
  const sfxBtn = document.getElementById('sfxToggle');
  const sfxStatus = document.getElementById('sfxStatus');
  if (sfxBtn && sfxStatus) {
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxStatus.textContent = sfxEnabled ? 'ACTIVE' : 'MUTED';
      sfxStatus.style.color = sfxEnabled ? 'var(--color-cobalt)' : 'inherit';
      if (sfxEnabled) playTone(659.25, 'sine', 0.1);
    });
  }


  /* ==========================================================================
     2. Procedural Web3 Background Canvas (Neural Matrix + 3D Wireframe Crypto Node)
     ========================================================================== */
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = window.scrollY;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    }, { passive: true });

    // Neural Grid Particles
    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const maxDistance = 145;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Interactive elastic repulsion from cursor
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          this.x -= (dx / dist) * force * 3.5;
          this.y -= (dy / dist) * force * 3.5;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 3D Mathematical Polyhedron (Octahedron Crypto Node)
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // 3D Vertices for an Octahedron
    const octaVertices = [
      { x:  0, y: -1, z:  0 },
      { x:  1, y:  0, z:  0 },
      { x:  0, y:  0, z:  1 },
      { x: -1, y:  0, z:  0 },
      { x:  0, y:  0, z: -1 },
      { x:  0, y:  1, z:  0 }
    ];

    const octaEdges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1]
    ];

    function draw3DPolyhedron() {
      // Position the 3D node in upper right hero area
      const nodeCenterX = width * 0.72;
      const nodeCenterY = Math.min(height * 0.42, 340);
      const scale = Math.min(width * 0.12, 110);

      // Rotate continuously and respond slightly to mouse
      rotX += 0.004;
      rotY += 0.006;
      const targetTiltY = (mouseX - width / 2) * 0.0003;
      const targetTiltX = (mouseY - height / 2) * 0.0003;

      // Project vertices to 2D
      const projected = octaVertices.map(v => {
        // Rotate Y
        let y1 = v.y;
        let x1 = v.x * Math.cos(rotY + targetTiltY) - v.z * Math.sin(rotY + targetTiltY);
        let z1 = v.x * Math.sin(rotY + targetTiltY) + v.z * Math.cos(rotY + targetTiltY);

        // Rotate X
        let x2 = x1;
        let y2 = y1 * Math.cos(rotX + targetTiltX) - z1 * Math.sin(rotX + targetTiltX);
        let z2 = y1 * Math.sin(rotX + targetTiltX) + z1 * Math.cos(rotX + targetTiltX);

        // Isometric perspective projection
        const focal = 3.5;
        const p = focal / (focal + z2);
        return {
          px: nodeCenterX + x2 * scale * p,
          py: nodeCenterY + y2 * scale * p,
          depth: z2
        };
      });

      // Draw Edges
      ctx.lineWidth = 1.2;
      octaEdges.forEach(([i, j]) => {
        const v1 = projected[i];
        const v2 = projected[j];
        const avgDepth = (v1.depth + v2.depth) / 2;
        const alpha = Math.max(0.12, Math.min(0.45, 0.28 + avgDepth * 0.15));

        ctx.beginPath();
        ctx.moveTo(v1.px, v1.py);
        ctx.lineTo(v2.px, v2.py);
        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.stroke();
      });

      // Draw Vertex Dots
      projected.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.px, v.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(11, 15, 25, 0.4)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(v.px, v.py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.9)';
        ctx.fill();
      });
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Crypto Node
      draw3DPolyhedron();

      // 2. Draw Neural Constellation
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const distToMouse = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2);

            let strokeColor = `rgba(11, 15, 25, ${0.05 * (1 - dist / maxDistance)})`;
            let lineWidth = 0.8;

            if (distToMouse < 130) {
              const boost = (130 - distToMouse) / 130;
              strokeColor = `rgba(37, 99, 235, ${0.15 + boost * 0.45})`;
              lineWidth = 0.8 + boost * 1.2;
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }


  /* ==========================================================================
     3. Click Particle Spark Physics Explosion Emitter
     ========================================================================== */
  document.addEventListener('click', (e) => {
    // Burst 18 sparks on click
    const sparkCount = 18;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;

      const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 65 + 30;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 650);
    }
  });


  /* ==========================================================================
     4. Interactive 3D Perspective Card Tilt & Specular Glare Follower
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.growth-card, .service-card, .eco-card, .media-card, #portraitCardTarget, #mascotPodCard');
  
  tiltCards.forEach(card => {
    card.classList.add('card-3d');
    
    // Create specular glare overlay if not present
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    const glare = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 3D Perspective Angles
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -5.0;
      const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 5.0;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(37, 99, 235, 0.14), transparent 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ==========================================================================
     5. Mascot Sentinel 3D Gaze Tracking & Protocol Telemetry Scanner
     ========================================================================== */
  const mascotSprite = document.getElementById('mascotCleanSprite');
  const mascotScanBeam = document.getElementById('mascotScanBeam');
  const mascotSpeech = document.getElementById('mascotSpeechContent');
  const runScanBtn = document.getElementById('runScanBtn');
  const mascotTrigger = document.getElementById('mascotInteractiveTrigger');

  const telemetryQuotes = [
    "Protocol mindshare scan: 100% active. 8,000+ targeted audience verified.",
    "Injective, exSat, Bluwhale & Tria ecosystem telemetry: Optimal.",
    "KOL distribution matrix: Verified 3.8M+ impressions delivered.",
    "4K cinematic motion graphics & high-signal threads ready for deployment.",
    "Community retention framework calibrated. Active onboarding funnels primed.",
    "Direct inquiry channel open. Click Transmit Brief to initiate partnership."
  ];
  let quoteIndex = 0;

  // 3D Parallax Gaze: The mascot smoothly tracks the user's cursor
  if (mascotSprite) {
    window.addEventListener('mousemove', (e) => {
      const rect = mascotSprite.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const tiltX = Math.max(Math.min(deltaX * 12, 14), -14);
      const tiltY = Math.max(Math.min(-deltaY * 10, 10), -10);

      mascotSprite.style.transform = `perspective(600px) rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateY(-4px)`;
    });

    window.addEventListener('mouseleave', () => {
      mascotSprite.style.transform = '';
    });
  }

  function triggerMascotScan() {
    playRadarPing();

    if (mascotScanBeam) {
      mascotScanBeam.classList.remove('scan-active');
      void mascotScanBeam.offsetWidth;
      mascotScanBeam.classList.add('scan-active');
    }

    quoteIndex = (quoteIndex + 1) % telemetryQuotes.length;
    if (mascotSpeech) {
      mascotSpeech.style.opacity = '0';
      setTimeout(() => {
        mascotSpeech.textContent = telemetryQuotes[quoteIndex];
        mascotSpeech.style.opacity = '1';
      }, 250);
    }
  }

  if (runScanBtn) {
    runScanBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerMascotScan();
    });
  }

  if (mascotTrigger) {
    mascotTrigger.addEventListener('click', () => {
      triggerMascotScan();
    });
  }

  /* ==========================================================================
     6. Magnetic Elastic Button Physics
     ========================================================================== */
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  /* ==========================================================================
     7. Scroll-Driven Reveal & Cascading Entrance Engine
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-init, .growth-card, .service-card, .eco-card, .media-card');
  revealElements.forEach((el, idx) => {
    if (!el.classList.contains('reveal-init')) {
      el.classList.add('reveal-init');
      const staggerIndex = (idx % 4) + 1;
      el.classList.add(`stagger-${staggerIndex}`);
    }
  });

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================================================
     8. Cybernetic Text Scramble Decoder
     ========================================================================== */
  const glyphs = '01X_/#<>-*~[]';
  const scrambleEls = document.querySelectorAll('.scramble-text');

  scrambleEls.forEach(el => {
    const originalText = el.textContent;
    let scrambleInterval = null;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      if (scrambleInterval) clearInterval(scrambleInterval);
      playTone(1100, 'sine', 0.03, 0.015);

      scrambleInterval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '/') return char;
            if (index < iteration) {
              return originalText[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(scrambleInterval);
          el.textContent = originalText;
        }

        iteration += 1 / 2;
      }, 25);
    });
  });


  /* ==========================================================================
     9. Bespoke Web3 Fluid Cursor (Desktop Engine)
     ========================================================================== */
  const cursorDot = document.getElementById('customCursorDot');
  const cursorRing = document.getElementById('customCursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isCursorVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        isCursorVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .growth-card, .service-card, .eco-card, .media-card, #companionDock');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('is-hovering');
        cursorDot.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('is-hovering');
        cursorDot.classList.remove('is-hovering');
      });
    });

    window.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isCursorVisible = false;
    });

    window.addEventListener('mousedown', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0.65)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(0.85)';
    });

    window.addEventListener('mouseup', () => {
      cursorDot.style.transform = '';
      cursorRing.style.transform = '';
    });
  }


  /* ==========================================================================
     10. 5-Stage Protocol Live Cascading Simulator
     ========================================================================== */
  const simBtn = document.getElementById('simulateProtocolBtn');
  const simSteps = document.querySelectorAll('.protocol-step');
  let isSimulating = false;

  if (simBtn) {
    simBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isSimulating) return;
      isSimulating = true;
      playTone(440, 'sine', 0.15, 0.05);

      simSteps.forEach(s => {
        s.classList.remove('pipeline-pulse-active');
      });

      simSteps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add('pipeline-pulse-active');
          playTone(520 + (index * 110), 'sine', 0.18, 0.05);

          if (index === simSteps.length - 1) {
            setTimeout(() => {
              isSimulating = false;
              playTone(1046.50, 'sine', 0.35, 0.07);
              showToast('5-Stage Protocol Simulation Complete: 100% Adoption Velocity!');
            }, 600);
          }
        }, index * 420);
      });
    });
  }


  /* ==========================================================================
     11. Interactive Quantitative Counters
     ========================================================================== */
  const counters = document.querySelectorAll('.counter-val');
  let counted = false;

  function runCounters() {
    if (counted) return;
    const heroSec = document.getElementById('hero');
    if (!heroSec) return;

    const r = heroSec.getBoundingClientRect();
    if (r.top <= window.innerHeight && r.bottom >= 0) {
      counted = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1600;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            counter.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(start).toLocaleString() + suffix;
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();


  /* ==========================================================================
     12. Toast Notification & Copy-to-Clipboard Engine
     ========================================================================== */
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('toast-active');
    playTone(880, 'sine', 0.12, 0.04);

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-active');
    }, 2800);
  }

  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Direct access: ${textToCopy}`);
        });
      }
    });
  });


  /* ==========================================================================
     13. Strategic Inquiry Brief Submission
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value || 'Client';
      const contact = document.getElementById('senderContact')?.value || '';
      const scope = document.getElementById('inquiryScope')?.value || 'Growth Strategy';
      const brief = document.getElementById('projectBrief')?.value || '';

      const mailtoSubject = encodeURIComponent(`Web3 Strategic Partnership Brief: ${name} (${scope})`);
      const mailtoBody = encodeURIComponent(`Inquiry from: ${name}\nProtocol/Organization: ${contact}\nScope: ${scope}\n\nProject Brief & Deliverable Goals:\n${brief}\n\n---\nTransmitted via Al Nadim Nabil Web3 Executive Portfolio`);
      
      showToast('Brief generated! Opening direct email client...');
      playTone(659.25, 'sine', 0.2, 0.05);

      setTimeout(() => {
        window.location.href = `mailto:nadimskip035@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }, 500);

      contactForm.reset();
    });
  }


  /* ==========================================================================
     14. Mobile Menu Drawer Navigation
     ========================================================================== */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileDrawer.classList.contains('hidden');
      if (isHidden) {
        mobileDrawer.classList.remove('hidden');
        playTone(523.25, 'sine', 0.08);
      } else {
        mobileDrawer.classList.add('hidden');
        playTone(392.00, 'sine', 0.08);
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }


  /* ==========================================================================
     15. Scroll Progress Indicator & Companion Radar Status
     ========================================================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  const companionStatus = document.getElementById('companionStatus');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    let currentSection = 'Hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollTop >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    if (companionStatus) {
      const labelMap = {
        'hero': 'Hero Terminal',
        'about': 'About Nadim',
        'experience': 'Track Record',
        'services': 'Services Matrix',
        'media': 'Media Lab',
        'framework': '5-Stage Protocol',
        'audience': 'Audience Reach',
        'contact': 'Brief Dispatch'
      };
      companionStatus.textContent = labelMap[currentSection] || 'Radar Active';
    }
  }, { passive: true });


  /* ==========================================================================
     16. Kinetic Hero Headline Word Rotator with Spring Physics
     ========================================================================== */
  const kineticWord = document.getElementById('kineticHeroWord');
  if (kineticWord) {
    const words = [
      "Market Leaders.",
      "Viral Ecosystems.",
      "Liquid Economies.",
      "Global Communities."
    ];
    let wordIdx = 0;

    setInterval(() => {
      kineticWord.style.opacity = '0';
      kineticWord.style.transform = 'translateY(10px) scale(0.96)';

      setTimeout(() => {
        wordIdx = (wordIdx + 1) % words.length;
        kineticWord.textContent = words[wordIdx];
        kineticWord.style.opacity = '1';
        kineticWord.style.transform = 'translateY(0px) scale(1)';
        playTone(980, 'sine', 0.05, 0.015);
      }, 240);
    }, 3400);
  }


  /* ==========================================================================
     17. Procedural 60FPS Code-Drawn Motion Graphics Studio Engine
     Inspired by anidoodle & awesome-opus-videos motion design principles
     ========================================================================== */
  const studioCanvas = document.getElementById('motionStudioCanvas');
  if (studioCanvas) {
    const sCtx = studioCanvas.getContext('2d');
    
    // Virtual 16:9 canvas dimensions (1280 x 720) for crisp vector scaling
    const vW = 1280;
    const vH = 720;
    studioCanvas.width = vW;
    studioCanvas.height = vH;

    let isPlaying = true;
    let playbackSpeed = 1.0;
    let currentFrame = 0;
    const totalFrames = 1120; // 4 scenes x 280 frames = 18.67 seconds at 60 fps
    let currentScene = 0; // 0: Launch Teaser, 1: Network Flow, 2: Mindshare Surge, 3: AI Sentinel Engine

    const playPauseBtn = document.getElementById('studioPlayPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const playStatusText = document.getElementById('playStatusText');
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineScrubber = document.getElementById('timelineScrubber');
    const currentTimeText = document.getElementById('studioCurrentTime');
    const sceneTabBtns = document.querySelectorAll('.scene-tab-btn');
    const speedBtns = document.querySelectorAll('.speed-btn');

    // Controls: Play / Pause
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
          playStatusText.textContent = 'PAUSE';
          playTone(660, 'sine', 0.1);
        } else {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
          playStatusText.textContent = 'PLAY';
          playTone(440, 'sine', 0.1);
        }
      });
    }

    // Controls: Scene Selector Tabs
    sceneTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sceneTabBtns.forEach(b => {
          b.classList.remove('active', 'bg-cobalt');
          b.classList.add('bg-white/10');
        });
        btn.classList.add('active', 'bg-cobalt');
        btn.classList.remove('bg-white/10');

        const sceneIdx = parseInt(btn.getAttribute('data-scene'));
        currentScene = sceneIdx;
        currentFrame = sceneIdx * 280;
        playTone(740, 'sine', 0.12, 0.04);
      });
    });

    // Controls: Speed Selector
    speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        speedBtns.forEach(b => {
          b.classList.remove('bg-cobalt', 'text-white', 'font-bold');
          b.classList.add('text-white/70');
        });
        btn.classList.add('bg-cobalt', 'text-white', 'font-bold');
        btn.classList.remove('text-white/70');

        playbackSpeed = parseFloat(btn.getAttribute('data-speed'));
        playTone(820, 'sine', 0.08);
      });
    });

    // Timeline Scrubber Click & Drag
    if (timelineScrubber) {
      function seek(e) {
        const rect = timelineScrubber.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const fraction = clickX / rect.width;
        currentFrame = Math.floor(fraction * totalFrames);
        currentScene = Math.floor(currentFrame / 280);

        // Update active scene tab button
        sceneTabBtns.forEach(b => {
          if (parseInt(b.getAttribute('data-scene')) === currentScene) {
            b.classList.add('active', 'bg-cobalt');
            b.classList.remove('bg-white/10');
          } else {
            b.classList.remove('active', 'bg-cobalt');
            b.classList.add('bg-white/10');
          }
        });
      }

      timelineScrubber.addEventListener('click', seek);
    }

    // 3D Hexagon Matrix for Scene 0
    let hexRotX = 0;
    let hexRotY = 0;

    // Draw Function for Scene 0: Launch Teaser
    function drawSceneLaunchTeaser(f) {
      // Background Radial Ambient Glow
      const grad = sCtx.createRadialGradient(vW / 2, vH / 2, 50, vW / 2, vH / 2, vW * 0.65);
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
      grad.addColorStop(1, 'rgba(7, 10, 17, 1)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, vW, vH);

      // Fast streaming hyperspace motion streaks
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      sCtx.lineWidth = 1;
      for (let i = 0; i < 28; i++) {
        const x = (i * 47 + f * 12) % vW;
        const y = (i * 31 + Math.sin(f * 0.05 + i) * 60) % vH;
        sCtx.beginPath();
        sCtx.moveTo(x, y);
        sCtx.lineTo(x + 50, y);
        sCtx.stroke();
      }

      // 3D Wireframe Hexagonal Token in Center
      hexRotX += 0.015;
      hexRotY += 0.02;
      const hexScale = 140;
      const hX = vW / 2;
      const hY = vH * 0.44;

      const corners = 6;
      const topPts = [];
      const botPts = [];
      for (let i = 0; i < corners; i++) {
        const angle = (Math.PI * 2 / corners) * i + hexRotY;
        const x = Math.cos(angle) * hexScale;
        const z = Math.sin(angle) * hexScale;
        const yTop = -60 + Math.sin(hexRotX) * 25;
        const yBot = 60 + Math.sin(hexRotX) * 25;
        topPts.push({ x: hX + x, y: hY + yTop });
        botPts.push({ x: hX + x, y: hY + yBot });
      }

      // Draw 3D Hexagon Edges
      sCtx.strokeStyle = '#2563EB';
      sCtx.lineWidth = 2.2;
      sCtx.beginPath();
      for (let i = 0; i < corners; i++) {
        const next = (i + 1) % corners;
        sCtx.moveTo(topPts[i].x, topPts[i].y);
        sCtx.lineTo(topPts[next].x, topPts[next].y);
        sCtx.moveTo(botPts[i].x, botPts[i].y);
        sCtx.lineTo(botPts[next].x, botPts[next].y);
        sCtx.moveTo(topPts[i].x, topPts[i].y);
        sCtx.lineTo(botPts[i].x, botPts[i].y);
      }
      sCtx.stroke();

      // Glowing Vertices
      topPts.concat(botPts).forEach(pt => {
        sCtx.beginPath();
        sCtx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        sCtx.fillStyle = '#FFFFFF';
        sCtx.fill();
      });

      // Kinetic Typography with Spring Scale
      const springProg = Math.min(1, f / 40);
      const titleScale = 0.85 + Math.sin(springProg * Math.PI * 0.5) * 0.15;
      
      sCtx.save();
      sCtx.translate(vW / 2, vH * 0.78);
      sCtx.scale(titleScale, titleScale);
      
      sCtx.font = '900 48px Syne, sans-serif';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.textAlign = 'center';
      sCtx.fillText("SCALING WEB3 PROTOCOLS", 0, 0);

      sCtx.font = '600 20px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#2563EB';
      sCtx.fillText("MONAD • INJECTIVE • EXSAT • SOLANA • BASE", 0, 36);
      sCtx.restore();

      // Audio Beat Visualizer at bottom
      const bars = 32;
      const barWidth = 14;
      const barGap = 8;
      const totalBarW = bars * (barWidth + barGap);
      const startX = (vW - totalBarW) / 2;

      for (let b = 0; b < bars; b++) {
        const barH = Math.abs(Math.sin(f * 0.15 + b * 0.35)) * 48 + 8;
        sCtx.fillStyle = b % 2 === 0 ? '#2563EB' : 'rgba(255, 255, 255, 0.7)';
        sCtx.fillRect(startX + b * (barWidth + barGap), vH - 30 - barH, barWidth, barH);
      }
    }

    // Draw Function for Scene 1: Multi-Chain Network Flow
    function drawSceneNetworkFlow(f) {
      sCtx.fillStyle = '#070A11';
      sCtx.fillRect(0, 0, vW, vH);

      // Central Hub
      const cX = vW / 2;
      const cY = vH / 2;

      // Concentric Expanding Radar Waves
      for (let w = 0; w < 3; w++) {
        const waveRadius = ((f * 3 + w * 110) % 360) + 40;
        const waveAlpha = Math.max(0, 1 - waveRadius / 380) * 0.45;
        sCtx.beginPath();
        sCtx.arc(cX, cY, waveRadius, 0, Math.PI * 2);
        sCtx.strokeStyle = `rgba(37, 99, 235, ${waveAlpha})`;
        sCtx.lineWidth = 1.5;
        sCtx.stroke();
      }

      // Satellite Protocol Nodes
      const protocols = [
        { name: "MONAD", angle: 0 },
        { name: "INJECTIVE", angle: (Math.PI * 2 / 5) },
        { name: "EXSAT BTC", angle: (Math.PI * 2 / 5) * 2 },
        { name: "SOLANA", angle: (Math.PI * 2 / 5) * 3 },
        { name: "BASE L2", angle: (Math.PI * 2 / 5) * 4 }
      ];

      const orbitRadius = 240;

      protocols.forEach((p, idx) => {
        const nx = cX + Math.cos(p.angle + f * 0.008) * orbitRadius;
        const ny = cY + Math.sin(p.angle + f * 0.008) * (orbitRadius * 0.75);

        // Connection Beziers
        sCtx.beginPath();
        sCtx.moveTo(cX, cY);
        sCtx.quadraticCurveTo((cX + nx) / 2, (cY + ny) / 2 - 30, nx, ny);
        sCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        sCtx.lineWidth = 1.5;
        sCtx.stroke();

        // Streaming Packet
        const packetT = ((f * 0.02 + idx * 0.2) % 1);
        const px = cX + (nx - cX) * packetT;
        const py = cY + (ny - cY) * packetT - Math.sin(packetT * Math.PI) * 30;

        sCtx.beginPath();
        sCtx.arc(px, py, 5, 0, Math.PI * 2);
        sCtx.fillStyle = '#2563EB';
        sCtx.shadowColor = '#2563EB';
        sCtx.shadowBlur = 10;
        sCtx.fill();
        sCtx.shadowBlur = 0;

        // Node Circle
        sCtx.beginPath();
        sCtx.arc(nx, ny, 26, 0, Math.PI * 2);
        sCtx.fillStyle = 'rgba(11, 15, 25, 0.9)';
        sCtx.fill();
        sCtx.strokeStyle = '#2563EB';
        sCtx.lineWidth = 2;
        sCtx.stroke();

        // Label
        sCtx.font = '700 13px "JetBrains Mono", monospace';
        sCtx.fillStyle = '#FFFFFF';
        sCtx.textAlign = 'center';
        sCtx.fillText(p.name, nx, ny + 5);
      });

      // Center Hub Circle
      sCtx.beginPath();
      sCtx.arc(cX, cY, 44, 0, Math.PI * 2);
      sCtx.fillStyle = '#2563EB';
      sCtx.fill();
      sCtx.strokeStyle = '#FFFFFF';
      sCtx.lineWidth = 2.5;
      sCtx.stroke();

      sCtx.font = '800 14px Syne, sans-serif';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.textAlign = 'center';
      sCtx.fillText("NADIM", cX, cY - 2);
      sCtx.font = '700 10px "JetBrains Mono", monospace';
      sCtx.fillText("ENGINE", cX, cY + 14);

      // Live Telemetry Banner
      const tps = Math.min(12480, Math.floor((f % 280) * 48 + 1200));
      sCtx.font = '700 16px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.textAlign = 'center';
      sCtx.fillText(`ON-CHAIN VELOCITY: ${tps.toLocaleString()} TPS • FINALITY: 400MS`, vW / 2, vH - 45);
    }

    // Draw Function for Scene 2: Mindshare & Community Surge
    function drawSceneMindshareSurge(f) {
      sCtx.fillStyle = '#070A11';
      sCtx.fillRect(0, 0, vW, vH);

      // Grid Lines
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      sCtx.lineWidth = 1;
      for (let y = 140; y <= 560; y += 70) {
        sCtx.beginPath();
        sCtx.moveTo(120, y);
        sCtx.lineTo(vW - 120, y);
        sCtx.stroke();
      }

      // Animated Rising Area Chart
      const chartPoints = [
        { x: 140, y: 520 },
        { x: 300, y: 480 },
        { x: 480, y: 440 },
        { x: 660, y: 360 },
        { x: 840, y: 260 },
        { x: 1020, y: 190 },
        { x: 1140, y: 160 }
      ];

      const surgeProg = Math.min(1, (f % 280) / 120);

      sCtx.beginPath();
      sCtx.moveTo(chartPoints[0].x, chartPoints[0].y);

      for (let i = 1; i < chartPoints.length; i++) {
        const cur = chartPoints[i];
        const prev = chartPoints[i - 1];
        const targetY = 560 - (560 - cur.y) * surgeProg;
        const targetPrevY = 560 - (560 - prev.y) * surgeProg;
        const cpX = (prev.x + cur.x) / 2;
        sCtx.bezierCurveTo(cpX, targetPrevY, cpX, targetY, cur.x, targetY);
      }

      // Stroke Line
      sCtx.strokeStyle = '#2563EB';
      sCtx.lineWidth = 4;
      sCtx.stroke();

      // Area Fill
      sCtx.lineTo(chartPoints[chartPoints.length - 1].x, 560);
      sCtx.lineTo(chartPoints[0].x, 560);
      sCtx.closePath();
      const fillGrad = sCtx.createLinearGradient(0, 160, 0, 560);
      fillGrad.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
      fillGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');
      sCtx.fillStyle = fillGrad;
      sCtx.fill();

      // Peak Indicator Crosshair
      const peakX = chartPoints[chartPoints.length - 1].x;
      const peakY = 560 - (560 - chartPoints[chartPoints.length - 1].y) * surgeProg;

      sCtx.beginPath();
      sCtx.arc(peakX, peakY, 8, 0, Math.PI * 2);
      sCtx.fillStyle = '#FFFFFF';
      sCtx.fill();
      sCtx.strokeStyle = '#2563EB';
      sCtx.lineWidth = 3;
      sCtx.stroke();

      // Target Label
      sCtx.font = '800 24px Syne, sans-serif';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.textAlign = 'right';
      sCtx.fillText("+380% MINDSHARE ACCELERATION", vW - 140, 120);

      sCtx.font = '700 15px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#2563EB';
      sCtx.fillText("3.8M+ VERIFIED VIEWS • 8,000+ DEDICATED X AUDIENCE", vW - 140, 150);
    }

    // Image Sprite for Owl Sentinel in Scene 4
    const sentinelSprite = new Image();
    sentinelSprite.src = 'owl_clean.png';

    // Draw Function for Scene 3: AI Sentinel Engine
    function drawSceneSentinelEngine(f) {
      sCtx.fillStyle = '#070A11';
      sCtx.fillRect(0, 0, vW, vH);

      const cX = vW / 2;
      const cY = vH * 0.44;

      // Ambient Cyber Grid in Background
      sCtx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      sCtx.lineWidth = 1;
      const gridSize = 44;
      for (let x = 0; x <= vW; x += gridSize) {
        sCtx.beginPath();
        sCtx.moveTo(x, 0);
        sCtx.lineTo(x, vH);
        sCtx.stroke();
      }
      for (let y = 0; y <= vH; y += gridSize) {
        sCtx.beginPath();
        sCtx.moveTo(0, y);
        sCtx.lineTo(vW, y);
        sCtx.stroke();
      }

      // Outer Rotating Radar HUD Ring with Angle Indicators
      const outerRad = 195;
      sCtx.save();
      sCtx.translate(cX, cY);
      sCtx.rotate(f * 0.012);
      sCtx.strokeStyle = 'rgba(37, 99, 235, 0.45)';
      sCtx.lineWidth = 2;
      sCtx.setLineDash([14, 18]);
      sCtx.beginPath();
      sCtx.arc(0, 0, outerRad, 0, Math.PI * 2);
      sCtx.stroke();
      sCtx.setLineDash([]);

      // Degree cross ticks
      for (let d = 0; d < 4; d++) {
        const ang = (Math.PI / 2) * d;
        sCtx.beginPath();
        sCtx.moveTo(Math.cos(ang) * (outerRad - 12), Math.sin(ang) * (outerRad - 12));
        sCtx.lineTo(Math.cos(ang) * (outerRad + 12), Math.sin(ang) * (outerRad + 12));
        sCtx.stroke();
      }
      sCtx.restore();

      // Counter-rotating Inner Compass Brackets
      const innerRad = 155;
      sCtx.save();
      sCtx.translate(cX, cY);
      sCtx.rotate(-f * 0.016);
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      sCtx.lineWidth = 1.8;
      sCtx.beginPath();
      sCtx.arc(0, 0, innerRad, 0, Math.PI * 0.45);
      sCtx.stroke();
      sCtx.beginPath();
      sCtx.arc(0, 0, innerRad, Math.PI, Math.PI * 1.45);
      sCtx.stroke();
      sCtx.restore();

      // Radar Sweep Cone
      const sweepAngle = (f * 0.035) % (Math.PI * 2);
      sCtx.save();
      sCtx.translate(cX, cY);
      const sweepGrad = sCtx.createRadialGradient(0, 0, 10, 0, 0, outerRad);
      sweepGrad.addColorStop(0, 'rgba(37, 99, 235, 0.55)');
      sweepGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');
      sCtx.fillStyle = sweepGrad;
      sCtx.beginPath();
      sCtx.moveTo(0, 0);
      sCtx.arc(0, 0, outerRad, sweepAngle - 0.45, sweepAngle);
      sCtx.closePath();
      sCtx.fill();
      sCtx.restore();

      // Render the Clean Owl Sentinel Avatar Bust
      if (sentinelSprite.complete && sentinelSprite.naturalWidth > 0) {
        const spriteSize = 220;
        const floatY = Math.sin(f * 0.08) * 5;
        sCtx.drawImage(sentinelSprite, cX - spriteSize / 2, cY - spriteSize / 2 + floatY, spriteSize, spriteSize);
      }

      // Laser Scanner Beam passing over the Sentinel
      const scanY = cY - 95 + ((f * 3.6) % 190);
      sCtx.strokeStyle = 'rgba(37, 99, 235, 0.9)';
      sCtx.lineWidth = 2.5;
      sCtx.shadowColor = '#2563EB';
      sCtx.shadowBlur = 14;
      sCtx.beginPath();
      sCtx.moveTo(cX - 120, scanY);
      sCtx.lineTo(cX + 120, scanY);
      sCtx.stroke();
      sCtx.shadowBlur = 0;

      // Telemetry Data Box: Left
      sCtx.fillStyle = 'rgba(11, 15, 25, 0.9)';
      sCtx.strokeStyle = 'rgba(37, 99, 235, 0.5)';
      sCtx.lineWidth = 1.2;
      sCtx.fillRect(60, cY - 95, 250, 160);
      sCtx.strokeRect(60, cY - 95, 250, 160);

      sCtx.font = '700 11px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#2563EB';
      sCtx.textAlign = 'left';
      sCtx.fillText("// AI AGENT SENTINEL", 75, cY - 70);

      sCtx.font = '600 12px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.fillText("STATUS: AUTONOMOUS SCAN", 75, cY - 42);
      sCtx.fillText("ACCURACY: 99.8% VERIFIED", 75, cY - 18);
      sCtx.fillText("KOL INTEL: LIVE MONITOR", 75, cY + 6);
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      sCtx.fillText("LATENCY: < 40MS SYNC", 75, cY + 30);
      sCtx.fillText("INTELLIGENCE: ACTIVE", 75, cY + 50);

      // Telemetry Data Box: Right
      sCtx.fillStyle = 'rgba(11, 15, 25, 0.9)';
      sCtx.strokeStyle = 'rgba(37, 99, 235, 0.5)';
      sCtx.lineWidth = 1.2;
      sCtx.fillRect(vW - 310, cY - 95, 250, 160);
      sCtx.strokeRect(vW - 310, cY - 95, 250, 160);

      sCtx.font = '700 11px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#2563EB';
      sCtx.textAlign = 'left';
      sCtx.fillText("// CAMPAIGN PERFORMANCE", vW - 295, cY - 70);

      sCtx.font = '600 12px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.fillText("CAMPAIGN: MULTI-CHAIN", vW - 295, cY - 42);
      sCtx.fillText("IMPACT: 3.8M+ VIEWS", vW - 295, cY - 18);
      sCtx.fillText("RETENTION: PROTOCOL LEAD", vW - 295, cY + 6);
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      sCtx.fillText("TARGET: GLOBAL WEB3", vW - 295, cY + 30);
      sCtx.fillText("CONVERSION: EXPONENTIAL", vW - 295, cY + 50);

      // Kinetic Typography Headline
      sCtx.font = '800 36px Syne, sans-serif';
      sCtx.fillStyle = '#FFFFFF';
      sCtx.textAlign = 'center';
      sCtx.fillText("AUTONOMOUS MARKETING SENTINEL", vW / 2, vH * 0.81);

      sCtx.font = '700 15px "JetBrains Mono", monospace';
      sCtx.fillStyle = '#2563EB';
      sCtx.fillText("PAIRING CREATIVE PRODUCTION WITH PROTOCOL ADOPTION", vW / 2, vH * 0.87);

      // Audio Oscilloscope Waveform at Bottom
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      sCtx.lineWidth = 1.6;
      sCtx.beginPath();
      for (let x = 0; x < vW; x += 6) {
        const wave = Math.sin(x * 0.02 + f * 0.12) * Math.cos(x * 0.006 + f * 0.06) * 20;
        if (x === 0) sCtx.moveTo(x, vH - 26 + wave);
        else sCtx.lineTo(x, vH - 26 + wave);
      }
      sCtx.stroke();
    }

    // =========================================================================
    // Generative Web Audio Ambient Lo-Fi Synth Loop (Zero External Files)
    // =========================================================================
    const audioToggleBtn = document.getElementById('studioAudioToggleBtn');
    const soundOffIcon = document.getElementById('soundOffIcon');
    const soundOnIcon = document.getElementById('soundOnIcon');
    const soundStatusText = document.getElementById('soundStatusText');
    const fullscreenBtn = document.getElementById('studioFullscreenBtn');

    let isSynthActive = false;
    let synthAudioContext = null;
    let synthTimer = null;
    let synthChordIndex = 0;

    // Harmonic progression: Cm9 -> Abmaj7 -> Bb9 -> Gm7
    const synthChords = [
      [130.81, 196.00, 246.94, 311.13, 392.00], // C3, G3, B3, Eb4, G4
      [103.83, 164.81, 207.65, 261.63, 311.13], // Ab2, E3, Ab3, C4, Eb4
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb2, F3, Bb3, D4, F4
      [98.00, 146.83, 196.00, 246.94, 293.66]   // G2, D3, G3, B3, D4
    ];

    function playSynthChord() {
      if (!isSynthActive || !synthAudioContext) return;
      if (synthAudioContext.state === 'suspended') {
        synthAudioContext.resume();
      }

      const chord = synthChords[synthChordIndex];
      synthChordIndex = (synthChordIndex + 1) % synthChords.length;

      const now = synthAudioContext.currentTime;
      const duration = 2.4;

      // Master low-pass filter to keep it lush, warm and subtle
      const filter = synthAudioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 1.0);
      filter.frequency.exponentialRampToValueAtTime(600, now + duration);
      filter.connect(synthAudioContext.destination);

      chord.forEach((freq, idx) => {
        const osc = synthAudioContext.createOscillator();
        const gain = synthAudioContext.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.025 / chord.length, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(filter);

        osc.start(now);
        osc.stop(now + duration);
      });

      // Subtle percussive tick on beat
      const noiseBuffer = synthAudioContext.createBuffer(1, synthAudioContext.sampleRate * 0.03, synthAudioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = synthAudioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      const noiseGain = synthAudioContext.createGain();
      noiseGain.gain.setValueAtTime(0.008, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(synthAudioContext.destination);
      whiteNoise.start(now);
    }

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        if (!synthAudioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            synthAudioContext = new AudioContextClass();
          }
        }

        isSynthActive = !isSynthActive;
        if (isSynthActive) {
          if (soundOffIcon) soundOffIcon.classList.add('hidden');
          if (soundOnIcon) soundOnIcon.classList.remove('hidden');
          if (soundStatusText) soundStatusText.textContent = 'SYNTH: ON';
          audioToggleBtn.classList.add('bg-cobalt', 'text-white');
          audioToggleBtn.classList.remove('bg-white/10', 'text-white/80');

          playSynthChord();
          synthTimer = setInterval(playSynthChord, 2400);
        } else {
          if (soundOffIcon) soundOffIcon.classList.remove('hidden');
          if (soundOnIcon) soundOnIcon.classList.add('hidden');
          if (soundStatusText) soundStatusText.textContent = 'SYNTH: OFF';
          audioToggleBtn.classList.remove('bg-cobalt', 'text-white');
          audioToggleBtn.classList.add('bg-white/10', 'text-white/80');

          if (synthTimer) clearInterval(synthTimer);
          synthTimer = null;
        }
      });
    }

    // Fullscreen Stage Toggle
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const stageContainer = studioCanvas.parentElement;
        if (!document.fullscreenElement) {
          if (stageContainer.requestFullscreen) {
            stageContainer.requestFullscreen();
          } else if (stageContainer.webkitRequestFullscreen) {
            stageContainer.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // IntersectionObserver to pause rendering when scrolled offscreen (100% 60FPS Battery & CPU Saving)
    let isStudioInView = true;
    const studioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isStudioInView = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    studioObserver.observe(studioCanvas);

    // Main Studio Render Loop
    function renderStudio() {
      if (isPlaying && isStudioInView) {
        currentFrame += playbackSpeed;
        if (currentFrame >= totalFrames) {
          currentFrame = 0;
        }

        currentScene = Math.floor(currentFrame / 280);

        // Update active scene tab button
        sceneTabBtns.forEach(b => {
          if (parseInt(b.getAttribute('data-scene')) === currentScene) {
            b.classList.add('active', 'bg-cobalt');
            b.classList.remove('bg-white/10');
          } else {
            b.classList.remove('active', 'bg-cobalt');
            b.classList.add('bg-white/10');
          }
        });

        // Update timeline progress bar
        const progressPct = (currentFrame / totalFrames) * 100;
        if (timelineProgress) timelineProgress.style.width = `${progressPct}%`;

        // Update current time display
        const totalSecs = Math.floor(currentFrame / 60);
        const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
        const secs = String(totalSecs % 60).padStart(2, '0');
        if (currentTimeText) currentTimeText.textContent = `${mins}:${secs}`;
      }

      // Render Scene
      if (isStudioInView) {
        if (currentScene === 0) {
          drawSceneLaunchTeaser(currentFrame % 280);
        } else if (currentScene === 1) {
          drawSceneNetworkFlow(currentFrame % 280);
        } else if (currentScene === 2) {
          drawSceneMindshareSurge(currentFrame % 280);
        } else {
          drawSceneSentinelEngine(currentFrame % 280);
        }
      }

      requestAnimationFrame(renderStudio);
    }
    requestAnimationFrame(renderStudio);
  }

  
});

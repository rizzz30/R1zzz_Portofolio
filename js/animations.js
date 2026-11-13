/**
 * R1ZZZ Elite Creative Portfolio - Advanced Animation Suite v3.5
 * Architecture: Modular GSAP + Lenis + Three.js Orchestration
 */

(function () {
    'use strict';

    const R1zzzAnimations = {
        config: {
            smoothDuration: 1.4,
            staggerSpeed: 0.08,
            easePrimary: "power4.out",
            easeElastic: "elastic.out(1, 0.3)"
        },

        init() {
            this.initPreloader();
            this.initLenisScroll();
            this.initSplitTextHero();
            this.initScrollTriggers();
            this.initMagneticElements();
            this.initCardTilt3D();
            this.initClickRipple();
            this.initAmbientGlow();
            this.initProjectFilters();
            this.initCounterStats();
            this.initParallaxElements();
            console.info("%c[R1zzz Engine] %cAnimation Suite Active (Elite Level)", "color: #c86d51; font-weight: bold;", "color: #fff;");
        },

        // 1. Preloader Cinematic Exit
        initPreloader() {
            const preloader = document.getElementById("preloader");
            if (!preloader) return;

            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" }
            });

            tl.to(".progress-bar", { width: "100%", duration: 0.8 })
              .to(".preloader-percentage", { 
                  innerHTML: "100%", 
                  duration: 0.5,
                  snap: { innerHTML: 1 } 
              }, "-=0.6")
              .to(preloader, { 
                  opacity: 0, 
                  yPercent: -100, 
                  duration: 0.8, 
                  delay: 0.2,
                  onComplete: () => {
                      preloader.style.display = "none";
                      this.triggerHeroEntrance();
                  } 
              });
        },

        // 2. Lenis Smooth Scroll Setup
        initLenisScroll() {
            if (typeof Lenis === 'undefined') return;

            const lenis = new Lenis({
                duration: this.config.smoothDuration,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            // Hubungkan Lenis dengan GSAP ScrollTrigger
            if (typeof ScrollTrigger !== 'undefined') {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            }

            window.lenisInstance = lenis;
        },

        // 3. Split Text & Kinetic Hero Animation
        initSplitTextHero() {
            const titleLines = document.querySelectorAll(".hero-title .line");
            titleLines.forEach(line => {
                const text = line.textContent;
                line.innerHTML = "";
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement("span");
                    span.className = "char-reveal";
                    span.textContent = text[i] === " " ? "\u00A0" : text[i];
                    line.appendChild(span);
                }
            });
        },

        triggerHeroEntrance() {
            if (typeof gsap === 'undefined') return;

            const heroTl = gsap.timeline({ defaults: { ease: this.config.easePrimary } });
            
            heroTl.from(".hero-badge", { opacity: 0, y: -40, duration: 1 })
                  .to(".hero-title .char-reveal", {
                      y: "0%",
                      skewY: 0,
                      opacity: 1,
                      duration: 1.4,
                      stagger: 0.02,
                  }, "-=0.6")
                  .from(".hero-subgrid", { opacity: 0, y: 50, duration: 1 }, "-=0.9")
                  .from(".hero-footer-meta", { opacity: 0, y: 30, duration: 0.8 }, "-=0.7");
        },

        // 4. Advanced ScrollTriggers (Sections, Cards, Headers)
        initScrollTriggers() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            gsap.registerPlugin(ScrollTrigger);

            // Header section reveal
            gsap.utils.toArray('.section-header').forEach((header) => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 60,
                    skewX: 3,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // Skills cards stagger scale
            gsap.from(".skill-card", {
                scrollTrigger: {
                    trigger: ".skills-grid",
                    start: "top 80%"
                },
                opacity: 0,
                y: 80,
                scale: 0.8,
                duration: 0.9,
                stagger: 0.06,
                ease: "back.out(1.4)"
            });

            // Projects cards stagger 3D rotation
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%"
                },
                opacity: 0,
                y: 120,
                rotationX: 15,
                duration: 1.2,
                stagger: 0.12,
                ease: "power3.out"
            });

            // Services cards entrance
            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 85%"
                },
                opacity: 0,
                y: 70,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            });

            // Scroll Progress Line Top
            window.addEventListener('scroll', () => {
                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                const progressLine = document.querySelector('.scroll-progress-line');
                if (progressLine) progressLine.style.width = scrolled + '%';
            });
        },

        // 5. Magnetic Physics on Buttons & Nav
        initMagneticElements() {
            if (typeof gsap === 'undefined') return;

            const magneticElements = document.querySelectorAll(".magnetic, .btn, .nav-logo, .theme-toggle");
            magneticElements.forEach((el) => {
                el.addEventListener("mousemove", (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(el, {
                        x: x * 0.4,
                        y: y * 0.4,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                el.addEventListener("mouseleave", () => {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: this.config.easeElastic
                    });
                });
            });
        },

        // 6. Holographic 3D Card Tilt Effect
        initCardTilt3D() {
            if (typeof gsap === 'undefined') return;

            const tiltCards = document.querySelectorAll(".project-card, .skill-card, .service-card");
            tiltCards.forEach(card => {
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = -((y - centerY) / 8);
                    const rotateY = (x - centerX) / 8;

                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        transformPerspective: 1000,
                        scale: 1.02,
                        duration: 0.2,
                        ease: "power1.out"
                    });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.4)"
                    });
                });
            });
        },

        // 7. Click Ripple Energy Wave
        initClickRipple() {
            window.addEventListener("click", (e) => {
                const ripple = document.createElement("div");
                ripple.className = "click-ripple";
                ripple.style.left = `${e.clientX}px`;
                ripple.style.top = `${e.clientY}px`;
                document.body.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        },

        // 8. Ambient Light Glow Follower
        initAmbientGlow() {
            if (typeof gsap === 'undefined') return;

            const glowOrb = document.createElement("div");
            glowOrb.className = "ambient-glow";
            document.body.appendChild(glowOrb);

            window.addEventListener("mousemove", (e) => {
                gsap.to(glowOrb, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        },

        // 9. Interactive Project Filtering Animation
        initProjectFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        if (filterValue === 'all' || category === filterValue) {
                            card.style.display = 'block';
                            if (typeof gsap !== 'undefined') {
                                gsap.fromTo(card, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" });
                            }
                        } else {
                            if (typeof gsap !== 'undefined') {
                                gsap.to(card, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                                    card.style.display = 'none';
                                }});
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });
        },

        // 10. Number Counter Stats (jika ada elemen statistik)
        initCounterStats() {
            // Placeholder modular untuk penambahan statistik masa depan
        },

        // 11. Parallax Floating Background Elements
        initParallaxElements() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

            gsap.utils.toArray('[data-speed]').forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 1;
                gsap.to(el, {
                    y: () => -100 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }
    };

    // Auto-initialize pada DOM Ready
    document.addEventListener("DOMContentLoaded", () => {
        R1zzzAnimations.init();
    });
})();
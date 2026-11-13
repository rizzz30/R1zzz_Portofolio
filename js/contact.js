// js/contact.js
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const successMsg = document.getElementById("form-success-msg");
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailText = document.getElementById("user-email-text");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            successMsg.classList.remove("hidden");
            contactForm.reset();
            setTimeout(() => {
                successMsg.classList.add("hidden");
            }, 5000);
        });
    }

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(emailText.textContent);
            copyEmailBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
            setTimeout(() => {
                copyEmailBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Email`;
            }, 2500);
        });
    }
});

// js/playground.js (Interactive Canvas Particle Lab)
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("playground-canvas-container");
    if (!container) return;

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, particles;
    const particleCount = 60;

    function resize() {
        width = canvas.width = container.clientWidth;
        height = canvas.height = container.clientHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 3 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#B96D4D";
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    const resetBtn = document.getElementById("reset-particles-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", initParticles);
    }
});
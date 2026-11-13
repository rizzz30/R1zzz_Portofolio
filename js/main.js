document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Progress Simulation
    let progress = 0;
    const progressBar = document.querySelector(".progress-bar");
    const progressPercentage = document.querySelector(".preloader-percentage");
    const preloader = document.getElementById("preloader");

    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 400);
        }
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}%`;
    }, 60);

    // 2. Real-time Local Clock (Sinkron Sesuai Waktu Nyata Perangkat)
    function updateClock() {
        const now = new Date();
        // Menggunakan jam, menit, dan detik lokal perangkat secara real-time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Format pemisah menggunakan titik (.) agar sesuai dengan estetika minimalis Swiss design di navbar
        const timeString = `${hours}.${minutes}.${seconds}`;
        
        const clockEl = document.getElementById("clock-time");
        if (clockEl) clockEl.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. Dynamic Current Year
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 4. Scroll Progress Bar & Sticky Header
    const siteHeader = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const scrollLine = document.querySelector(".scroll-progress-line");
        if (scrollLine) scrollLine.style.width = `${scrollPercent}%`;

        if (scrollTop > 50) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    });

    // 5. Fullscreen Mobile Menu Toggle
    const menuTrigger = document.querySelector(".menu-trigger");
    const fullscreenMenu = document.querySelector(".fullscreen-menu");
    const menuLinks = document.querySelectorAll(".menu-link");

    function toggleMenu() {
        fullscreenMenu.classList.toggle("active");
        document.body.style.overflow = fullscreenMenu.classList.contains("active") ? "hidden" : "";
    }

    if (menuTrigger) menuTrigger.addEventListener("click", toggleMenu);
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            fullscreenMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // 6. Back to Top
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

   // 7. Audio Ambient Toggle (Integrasi YouTube IFrame API - Dunia Yang Nanti)
    const audioToggle = document.querySelector(".audio-toggle");
    let ytPlayer;
    let isPlaying = false;
    let isPlayerReady = false;

    // Muat script YouTube API secara otomatis
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Fungsi wajib dari YouTube API saat script siap
    window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player('youtube-audio-player', {
            height: '0',
            width: '0',
            // ID Video resmi lagu Raim Laode (bisa diganti ID video resmi lagu Dunia Yang Nanti di YouTube)
            videoId: 'u20n2K2uB2U', 
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'loop': 1,
                'playlist': 'u20n2K2uB2U' // Wajib sama dengan videoId agar lagu berulang terus (loop)
            },
            events: {
                'onReady': () => {
                    isPlayerReady = true;
                    ytPlayer.setVolume(45); // Atur volume latar di 45% agar nyaman didengar
                }
            }
        });
    };

    if (audioToggle) {
        audioToggle.addEventListener("click", () => {
            if (!isPlayerReady) {
                alert("Pemutar musik sedang memuat, silakan klik lagi dalam 1-2 detik.");
                return;
            }

            isPlaying = !isPlaying;
            if (isPlaying) {
                ytPlayer.playVideo();
                audioToggle.querySelector("i").className = "fa-solid fa-volume-high";
            } else {
                ytPlayer.pauseVideo();
                audioToggle.querySelector("i").className = "fa-solid fa-volume-xmark";
            }
        });
    }

    // 8. Keyboard Shortcuts Handler
    document.addEventListener("keydown", (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        const key = e.key.toUpperCase();
        if (key === 'H') {
            document.getElementById("home").scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'A') {
            document.getElementById("about").scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'P') {
            document.getElementById("projects").scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'S') {
            document.getElementById("skills").scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'C') {
            document.getElementById("contact").scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'T') {
            const terminalModal = document.getElementById("terminal-modal");
            terminalModal.classList.toggle("hidden");
            document.getElementById("terminal-input").focus();
        } else if (e.key === 'Escape') {
            document.getElementById("terminal-modal").classList.add("hidden");
            document.getElementById("project-modal").classList.remove("active");
            fullscreenMenu.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});
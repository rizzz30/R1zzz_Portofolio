document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Posisi langsung untuk titik tengah
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Posisi dengan efek kejar (lagging halus) menggunakan GSAP jika ada
        if (typeof gsap !== 'undefined') {
            gsap.to(cursorOutline, {
                left: posX,
                top: posY,
                duration: 0.15,
                ease: "power2.out"
            });
        } else {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }
    });

    // Tambahkan efek hover pada semua tombol dan link
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .skill-card");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
});
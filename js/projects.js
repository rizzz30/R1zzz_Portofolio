document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const projectModal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-dynamic-body");
    const modalClose = document.querySelector(".modal-close-btn");
    const modalBackdrop = document.querySelector(".modal-backdrop");

    // Filtering logic
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Project Data Case Studies (Bahasa Indonesia)
    const projectDetails = {
        "1": {
            title: "R1zzz_Al-Qur'an",
            subtitle: "Platform Digital • Vanilla JS & Integrasi API",
            overview: "Aplikasi web tersaring yang didedikasikan untuk memberikan pengalaman membaca dan mendengarkan Al-Qur'an secara imersif dan bebas gangguan.",
            goals: "Menciptakan penampil kitab suci digital yang cepat dan mudah diakses dengan tipografi yang akurat.",
            technologies: ["HTML5", "CSS3", "JavaScript ES6+", "REST API"],
            features: ["Indeks & pencarian surah", "Pemutar audio tilawah", "Sistem penanda (bookmark)", "Mode baca Gelap/Terang"],
            challenges: "Mengoptimalkan streaming audio asinkron dan memastikan pergeseran tata letak nol (CLS) pada berbagai ukuran layar.",
            results: "Keterlibatan pengguna yang tinggi dengan pujian khusus pada desain tipografi yang bersih dan kecepatan akses."
        },
        "2": {
            title: "Mama AL Food Ordering Website",
            subtitle: "Aplikasi Web • Desain UI/UX & Frontend",
            overview: "Platform kuliner digital intuitif yang memungkinkan pelanggan menjelajahi menu, menyesuaikan pesanan, dan melakukan checkout dengan mulus.",
            goals: "Menyederhanakan alur pemesanan online dengan tetap mempertahankan estetika yang menggugah selera.",
            technologies: ["HTML5", "CSS Grid", "Vanilla JavaScript", "LocalStorage"],
            features: ["Penyaringan menu interaktif", "Manajemen keranjang dinamis", "Modal ringkasan pesanan"],
            challenges: "Membangun sistem manajemen state keranjang yang lancar tanpa ketergantungan pada framework berat.",
            results: "Menghadirkan alur pemesanan yang bebas hambatan dengan responsivitas instan."
        },
        "3": {
            title: "R1zzz Coding Learning Platform",
            subtitle: "Pusat Edukasi • UI Interaktif",
            overview: "Portal pembelajaran interaktif yang dirancang untuk mengajarkan pengembangan web modern melalui modul terstruktur dan latihan kode.",
            goals: "Mempermudah pemula memahami pengembangan web dengan peta jalan terstruktur dan contoh interaktif.",
            technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Intersection Observer"],
            features: ["Peta jalan interaktif", "Visualisasi cuplikan kode", "Pelacak pencapaian progress"],
            challenges: "Menyusun volume data edukasi yang besar ke dalam kartu antarmuka yang bersih dan mudah dicerna.",
            results: "Memberdayakan pembelajar dengan antarmuka yang bersih dan intuitif."
        },
        "4": {
            title: "Employee Attendance System",
            subtitle: "Portal Perusahaan • Sistem Dasbor",
            overview: "Portal manajemen tenaga kerja perusahaan yang handal untuk melacak kehadiran harian, absensi geofence, dan laporan.",
            goals: "Mengotomatiskan pembuatan lembar waktu (timesheet) dan menyederhanakan pengawasan HR.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Integrasi Grafik"],
            features: ["Simulasi check-in geofence", "Lembar waktu otomatis", "Tinjauan analitik ringkas"],
            challenges: "Memastikan penanganan data yang aman dan tabel data responsif pada perangkat kecil.",
            results: "Menyederhanakan pelacakan kehadiran korporat dengan kinerja tanpa hambatan."
        },
        "5": {
            title: "Personal Developer Portfolio",
            subtitle: "Pengalaman Kreatif • WebGL & GSAP",
            overview: "Portofolio interaktif mutakhir yang merepresentasikan tingkat keahlian teknis dan filosofi desain R1zzz.",
            goals: "Menciptakan jejak digital berkesan yang mematuhi standar desain Swiss editorial dan minimalis brutalist.",
            technologies: ["Three.js", "GSAP ScrollTrigger", "Lenis Scroll", "Vanilla JS"],
            features: ["Kanvas 3D interaktif", "Shell terminal developer", "Kursor magnetik kustom"],
            challenges: "Menyeimbangkan efek grafis berat sekaligus mempertahankan performa stabil di 60FPS.",
            results: "Pengalaman portofolio berkaliber penghargaan internasional."
        }
    };

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-project-id");
            const data = projectDetails[id];
            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-body-content">
                        <h2>${data.title}</h2>
                        <p class="modal-subtitle">${data.subtitle}</p>
                        <h3>Ringkasan</h3>
                        <p>${data.overview}</p>
                        <h3>Tujuan Proyek</h3>
                        <p>${data.goals}</p>
                        <h3>Teknologi yang Digunakan</h3>
                        <p>${data.technologies.join(" • ")}</p>
                        <h3>Fitur Utama</h3>
                        <p>${data.features.join(", ")}</p>
                        <h3>Tantangan & Solusi</h3>
                        <p>${data.challenges}</p>
                        <h3>Hasil</h3>
                        <p>${data.results}</p>
                    </div>
                `;
                projectModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    function closeModal() {
        projectModal.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
});
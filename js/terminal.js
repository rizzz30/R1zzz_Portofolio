/**
 * R1ZZZ Elite Portfolio - Interactive Developer Terminal Shell v2.6
 */

document.addEventListener("DOMContentLoaded", () => {
    const terminalModal = document.getElementById("terminal-modal");
    const openTerminalBtns = document.querySelectorAll("#open-terminal-btn, #floating-terminal-btn");
    const closeTerminalBtn = document.getElementById("close-terminal, .terminal-close");
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalWindow = document.querySelector(".terminal-window");

    if (!terminalModal) return;

    // Buka Tutup Terminal
    const toggleTerminal = (open) => {
        if (open) {
            terminalModal.classList.remove("hidden");
            if (terminalInput) terminalInput.focus();
        } else {
            terminalModal.classList.add("hidden");
            terminalWindow.classList.remove("matrix-mode");
        }
    };

    openTerminalBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            toggleTerminal(true);
        });
    });

    if (closeTerminalBtn) {
        closeTerminalBtn.addEventListener("click", () => toggleTerminal(false));
    }

    // Shortcut Keyboard 'T' untuk membuka terminal
    window.addEventListener("keydown", (e) => {
        if ((e.key === 't' || e.key === 'T') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            const isHidden = terminalModal.classList.contains("hidden");
            toggleTerminal(isHidden);
        }
        if (e.key === 'Escape') {
            toggleTerminal(false);
        }
    });

    // Logger Utility ke dalam Terminal Body
    const appendOutput = (text, type = "normal") => {
        const p = document.createElement("p");
        p.className = `terminal-line ${type}`;
        p.innerHTML = text;
        terminalOutput.appendChild(p);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    // Daftar Perintah Perangkat (Commands Registry)
    const commands = {
        help: () => {
            appendOutput("Perintah Sistem yang Tersedia:", "system");
            appendOutput("&nbsp;&nbsp;<b>about</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Menampilkan ringkasan profil Syafrizal");
            appendOutput("&nbsp;&nbsp;<b>skills</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Daftar tumpukan teknologi & keahlian");
            appendOutput("&nbsp;&nbsp;<b>projects</b>&nbsp;&nbsp;&nbsp;- Melihat daftar portofolio pilihan");
            appendOutput("&nbsp;&nbsp;<b>contact</b>&nbsp;&nbsp;&nbsp;&nbsp;- Informasi kontak langsung");
            appendOutput("&nbsp;&nbsp;<b>matrix</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Masuk ke Neural Matrix Hacker Mode");
            appendOutput("&nbsp;&nbsp;<b>clear</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Membersihkan layar terminal");
            appendOutput("&nbsp;&nbsp;<b>exit</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Menutup jendela terminal");
        },
        about: () => {
            appendOutput("Syafrizal (R1zzz) adalah Pelajar SMK & Creative Developer Indonesia yang berfokus pada WebGL interaktif, animasi GSAP tingkat lanjut, dan minimalis brutalist Swiss design.", "info");
        },
        skills: () => {
            appendOutput("Tech Stack: HTML5, CSS3, JavaScript ES6+, WebGL, Three.js, GSAP Motion, Figma, Git & GitHub.", "info");
        },
        projects: () => {
            appendOutput("1. R1zzz_Al-Qur'an Platform<br>2. Mama AL Food Ordering Web App<br>3. R1zzz Coding Learning Platform<br>4. Employee Attendance System", "info");
        },
        contact: () => {
            appendOutput("Email: syafrizalx@gmail.com | GitHub: rizzz30 | Instagram: @itz_r1zzz", "info");
        },
        matrix: () => {
            terminalWindow.classList.add('matrix-mode');
            appendOutput("SYSTEM OVERRIDE: Neural Matrix Mode Diaktifkan. Ketik 'clear' untuk reset.", "success");
            window.matrixInterval = setInterval(() => {
                let randStr = Math.random().toString(36).substring(2, 12).toUpperCase();
                appendOutput(`01001110 01110011 ${randStr} [ACTIVE_THREAD]`, "matrix-line text-success");
            }, 120);
        },
        clear: () => {
            if (window.matrixInterval) clearInterval(window.matrixInterval);
            terminalWindow.classList.remove('matrix-mode');
            terminalOutput.innerHTML = '<p class="welcome-text">R1zzz Interactive Developer Shell v2.6.0</p><p class="welcome-text">Ketik <strong>' + "'help'" + '</strong> untuk melihat daftar perintah sistem.</p><br>';
        },
        exit: () => {
            toggleTerminal(false);
        }
    };

    // Handle Input Keyboard di Terminal
    if (terminalInput) {
        terminalInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = terminalInput.value.trim().toLowerCase();
                appendOutput(`<span style="color: #c86d51;">r1zzz@portfolio:~$</span> ${val}`);
                terminalInput.value = "";

                if (commands[val]) {
                    commands[val]();
                } else if (val !== "") {
                    appendOutput(`Perintah tidak dikenal: '${val}'. Ketik 'help' untuk panduan.`, "error");
                }
            }
        });
    }
});
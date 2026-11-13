document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.querySelector(".theme-toggle");
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem("r1zzz_theme") || "dark";
    htmlEl.setAttribute("data-theme", savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlEl.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlEl.setAttribute("data-theme", newTheme);
            localStorage.setItem("r1zzz_theme", newTheme);
        });
    }
});
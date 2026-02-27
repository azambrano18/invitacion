const intro = document.getElementById("introScreen");
const main = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");

intro.addEventListener("click", () => {
    music.play();

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        main.style.opacity = "1";
    }, 1500);
});
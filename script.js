const curtainContainer = document.getElementById("curtainContainer");
const main = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");

curtainContainer.addEventListener("click", () => {

    music.play();

    curtainContainer.classList.add("open");

    setTimeout(() => {
        curtainContainer.style.display = "none";
        main.classList.add("showContent");
    }, 2000);
});
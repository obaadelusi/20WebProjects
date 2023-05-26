const year = document.querySelector("#year");
const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const countdown = document.querySelector("#countdown");
const loading = document.querySelector("#loading");

const currentYear = new Date().getFullYear();
// console.log(currentYear);

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

//To update the countdown
function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    //Update date values in DOM
    year.innerHTML = currentYear + 1;
    days.innerHTML = d;
    hours.innerHTML = h < 10 ? "0" + h : h;
    minutes.innerHTML = m < 10 ? "0" + m : m;
    seconds.innerHTML = s < 10 ? "0" + s : s;
}

//Load before date display
setTimeout(() => {
    loading.remove();
    countdown.style.display = "flex";
}, 1005);

//Update countdown every 1s
setInterval(updateCountdown, 1000);

let is_on = false;
let power = document.getElementById("remote-power-button");
let light = document.getElementsByClassName("light");
let arrayLights = Array.from(light);
let lightTV = document.getElementById("tv-on-light");
let date_container = document.getElementById("date");

const infrared = () => {
    for (let i = 0; i < arrayLights.length; i++) {
        arrayLights[i].classList.add("laser")

        setTimeout(() => {
            arrayLights[i].classList.remove("laser")
        }, 200)
    }
}
const dateToday = () => {
    let date = new Date();
    date_container.innerHTML = `${date}`;
    setTimeout(() => {
        date_container.innerHTML = ` `;

    }, 3000)
}
power.addEventListener("click", () => {

    infrared();
    is_on = !is_on;
    lightTV.classList.toggle("on");
    is_on
        ? dateToday()
        : null;
});
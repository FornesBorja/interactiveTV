let is_on = false;
let power = document.getElementById("remote-power-button");
let light = document.getElementsByClassName("light");
let arrayLights = Array.from(light);
let lightTV = document.getElementById("tv-on-light");
let date_container = document.getElementById("date");
let screen = document.getElementById("screen");
let channels = document.getElementsByClassName("channel-button");
channelsArray = Array.from(channels);
const tv_power = document.getElementById("tv-power-button");
const info = document.getElementById("info");
const channel_container = document.getElementById("channel-container");
let lastChannelIndex = -1; //Last channel used

const infrared = () => {
    for (let i = 0; i < arrayLights.length; i++) {
        arrayLights[i].classList.add("laser");
        setTimeout(() => {
            arrayLights[i].classList.remove("laser");
        }, 200);
    }
};
const showDate = () => {
    let date = new Date()
    date_container.innerHTML = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;

    setTimeout(() => {
        date_container.innerHTML = ` `;
    }, 3000);
};
const showChannel = () => {
    if (lastChannelIndex !== -1) {
        channel_container.innerHTML = `Canal: ${lastChannelIndex + 1}`;
        setTimeout(() => {
            channel_container.innerHTML = ` `;
        }, 3000);
    }
};

for (let i = 0; i < channelsArray.length; i++) {
    channelsArray[i].addEventListener("click", () => {
        if (is_on) {
            lastChannelIndex = i; 
            screen.style.backgroundImage = `url('../imgs/channel-${i + 1}.gif')`;
            infrared();
            showChannel(); 

        }
    });

}
power.addEventListener("click", () => {
    infrared();
    is_on = !is_on;
    lightTV.classList.toggle("on");
    if (is_on) {
        showDate();
        screen.style.backgroundImage = `url('../imgs/static.gif')`;
    } else {
        screen.style.backgroundImage = ``;
        screen.style.backgroundColor = `black`;
    }
});

tv_power.addEventListener("click", () => {
    infrared();
    is_on = !is_on;
    lightTV.classList.toggle("on");
    if (is_on) {
        showDate();
    }
});

info.addEventListener("click", () => {
    if (is_on) {
        showDate();
        showChannel();
        infrared();
    }
});
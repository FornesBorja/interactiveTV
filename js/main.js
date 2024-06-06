let is_on = false;
const power = document.getElementById("remote-power-button");
const light = document.getElementsByClassName("light");
let arrayLights = Array.from(light);
const lightTV = document.getElementById("tv-on-light");
const date_container = document.getElementById("date");
const screen = document.getElementById("screen");
const channels = document.getElementsByClassName("channel-button");
channelsArray = Array.from(channels);
const tv_power = document.getElementById("tv-power-button");
const info = document.getElementById("info");
const channel_container = document.getElementById("channel-container");
let lastChannelIndex = -1; //Last channel used

//Function to make the "led" shine
const infrared = () => {
    for (let i = 0; i < arrayLights.length; i++) {
        arrayLights[i].classList.add("laser");
        setTimeout(() => {
            arrayLights[i].classList.remove("laser");
        }, 200);
    }
};

//Switch on and off the TV
const togglePower = () => {
    infrared();
    is_on = !is_on;
    lightTV.classList.toggle("on");
    if (is_on) {
        screen.style.backgroundImage = `url('../imgs/static.gif')`;
        //If it has a channed saved goes to that channel in 3 seconds
        if (lastChannelIndex !== -1) {
            setTimeout(() => {
                screen.style.backgroundImage = `url('../imgs/channel-${lastChannelIndex + 1}.gif')`;
                showDateAndChannel();
            }, 3000);
        }
    } else {
        screen.style.backgroundImage = ``;
        screen.style.backgroundColor = `black`;
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
const showDateAndChannel = () => {
    showDate();
    showChannel();
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

power.addEventListener("click", togglePower);
tv_power.addEventListener("click", togglePower);

info.addEventListener("click", () => {
    if (is_on) {
        showDateAndChannel();
        infrared();
    }
});
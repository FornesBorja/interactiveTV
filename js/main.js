let is_on = false;
const power = document.getElementById("remote-power-button");
const light = document.getElementsByClassName("light");
let arrayLights = Array.from(light);
const lightTV = document.getElementById("tv-on-light");
const date_container = document.getElementById("date");
const screen = document.getElementById("screen");
const channels = document.getElementsByClassName("channel-button");
const general_volumen = document.getElementById("volume-bar");
const volume_up = document.getElementById("volume-button-up")
const volume_down = document.getElementById("volume-button-down");
const volume_bar = document.getElementById("volume");
channelsArray = Array.from(channels);
const tv_power = document.getElementById("tv-power-button");
const info = document.getElementById("info");
const channel_container = document.getElementById("channel-container");
let lastChannelIndex = -1; //Last channel used
let volumeLevel = 0; // Volume level (0 to 100)
const channelMore = document.getElementById("channel-button-more");
const channelLess = document.getElementById("channel-button-less");

const changeChannel = (increment) => {
    if (is_on) {
        lastChannelIndex += increment;
        if (lastChannelIndex < 0) {
            lastChannelIndex = channelsArray.length - 1;
        } else if (lastChannelIndex >= channelsArray.length) {
            lastChannelIndex = 0;
        }
        screen.src = `https://FornesBorja.github.io/interactiveTV/videos/channel-${lastChannelIndex + 1}.mp4`;
        screen.play();
        infrared();
        showChannel();
    }
};

//Function to make the "led" shine
const infrared = () => {
    for (let i = 0; i < arrayLights.length; i++) {
        arrayLights[i].classList.add("laser");
        setTimeout(() => {
            arrayLights[i].classList.remove("laser");
        }, 200);
    }
};

const volumeShow = () => {
    general_volumen.style.visibility = "visible";

    setTimeout(() => {
        general_volumen.style.visibility = "hidden";
    }, 3000);

}

const updateVolume = () => {
    screen.volume = volumeLevel / 100;
    volume_bar.style.height = volumeLevel + '%';
};

//Switch on and off the TV
const togglePower = () => {
    infrared();
    is_on = !is_on;
    lightTV.classList.toggle("on");
    if (is_on) {
        screen.src = 'https://FornesBorja.github.io/interactiveTV/videos/static.mp4';
        screen.play();
        // Si tiene un canal guardado, cambiar al canal en 3 segundos
        if (lastChannelIndex !== -1) {
            setTimeout(() => {
                screen.src = `https://FornesBorja.github.io/interactiveTV/videos/channel-${lastChannelIndex + 1}.mp4`;
                screen.play();
                showDateAndChannel();
            }, 3000);
        }
    } else {
        screen.pause();
        screen.src = '';
        screen.style.backgroundColor = "black";
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
        channel_container.innerHTML = `Channel: ${lastChannelIndex + 1}`;
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
            screen.src = `https://FornesBorja.github.io/interactiveTV/videos/channel-${i + 1}.mp4`;
            screen.play();
            infrared();
            showChannel();
        }
    });
}
volume_up.addEventListener("click", () => {
    if (is_on) {
        if (volumeLevel < 100) {
            volumeLevel += 10;
            volumeShow();
            updateVolume();
        } else if (volumeLevel = 100) {
            volumeShow();
        };
    }
});

volume_down.addEventListener("click", () => {
    if (is_on) {
        if (volumeLevel > 0) {
            volumeLevel -= 10;
            volumeShow();
            updateVolume();
        } else if (volumeLevel == 0) {
            volumeShow();
        };
    }
});

power.addEventListener("click", togglePower);
tv_power.addEventListener("click", togglePower);

info.addEventListener("click", () => {
    if (is_on) {
        showDateAndChannel();
        infrared();
    }
});
channelMore.addEventListener("click", () => changeChannel(1));
channelLess.addEventListener("click", () => changeChannel(-1));

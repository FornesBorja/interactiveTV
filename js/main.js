const powerButton = document.getElementById("remote-power-button");
const lightElements = document.getElementsByClassName("light");
const lightTV = document.getElementById("tv-on-light");
const dateContainer = document.getElementById("date");
const screen = document.getElementById("screen");
const channelButtons = document.getElementsByClassName("channel-button");
const volumeBar = document.getElementById("volume-bar");
const volumeBarValue = document.getElementById("volume");
const volumeUpButton = document.getElementById("volume-button-up");
const volumeDownButton = document.getElementById("volume-button-down");
const tvPowerButton = document.getElementById("tv-power-button");
const infoButton = document.getElementById("info");
const channelContainer = document.getElementById("channel-container");
const channelMoreButton = document.getElementById("channel-button-more");
const channelLessButton = document.getElementById("channel-button-less");

let arrayLights = Array.from(lightElements);
let channelsArray = Array.from(channelButtons);

let isOn = false;
let lastChannelIndex = -1;
let volumeLevel = 0;

//Switch on and off the TV
const togglePower = () => {
    infrared();
    isOn = !isOn;
    lightTV.classList.toggle("on");
    if (isOn) {
        screen.src = './videos/static.mp4';
        screen.play();
        if (lastChannelIndex !== -1) {
            setTimeout(() => {
                screen.src = `./videos/channel-${lastChannelIndex + 1}.mp4`;
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

const changeChannel = (increment) => {
    if (isOn) {
        lastChannelIndex += increment;
        if (lastChannelIndex < 0) {
            lastChannelIndex = channelsArray.length - 1;
        } else if (lastChannelIndex >= channelsArray.length) {
            lastChannelIndex = 0;
        }
        const newVideoSrc = `./videos/channel-${lastChannelIndex + 1}.mp4`;
        screen.src = newVideoSrc;
        screen.load();
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

//Toggles the visibility of the volume
const volumeShow = () => {
    volumeBar.style.visibility = "visible";

    setTimeout(() => {
        volumeBar.style.visibility = "hidden";
    }, 3000);

}

const updateVolume = () => {
    screen.volume = volumeLevel / 100;
    volumeBarValue.style.height = volumeLevel + '%';
    volumeShow();

};

const showDate = () => {
    let date = new Date()
    dateContainer.innerHTML = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
    setTimeout(() => {
        dateContainer.innerHTML = ` `;
    }, 3000);
};

const showChannel = () => {
    if (lastChannelIndex !== -1) {
        channelContainer.innerHTML = `Channel: ${lastChannelIndex + 1}`;
        setTimeout(() => {
            channelContainer.innerHTML = ` `;
        }, 3000);
    }
};
const showDateAndChannel = () => {
    showDate();
    showChannel();
};

for (let i = 0; i < channelsArray.length; i++) {
    channelsArray[i].addEventListener("click", () => {
        if (isOn) {
            lastChannelIndex = i;
            screen.src = `./videos/channel-${i + 1}.mp4`;
            screen.play();
            infrared();
            showChannel();
        }
    });
}
volumeUpButton.addEventListener("click", () => {
    if (isOn) {
        if (volumeLevel < 100) {
            volumeLevel += 10;
            updateVolume();
        } else if (volumeLevel = 100) {
            updateVolume();
        };
    }
});

volumeDownButton.addEventListener("click", () => {
    if (isOn) {
        if (volumeLevel > 0) {
            volumeLevel -= 10;
            updateVolume();
        } else if (volumeLevel == 0) {
            updateVolume();
        };

    }
});

powerButton.addEventListener("click", togglePower);
tvPowerButton.addEventListener("click", togglePower);

infoButton.addEventListener("click", () => {
    if (isOn) {
        showDateAndChannel();
        infrared();
    }
});
channelMoreButton.addEventListener("click", () => changeChannel(1));
channelLessButton.addEventListener("click", () => changeChannel(-1));

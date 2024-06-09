// Element Selectors
const powerButton = document.getElementById("remote-power-button");
const lightElements = document.getElementsByClassName("light");
const lightTV = document.getElementById("tv-on-light");
const dataContainer = document.getElementById("data");
const screen = document.getElementById("screen");
const mainScreen = document.getElementById("main-screen");
const channelButtons = document.getElementsByClassName("channel-button");
const volumeBar = document.getElementById("volume-bar");
const volumeBarValue = document.getElementById("volume");
const volumeUpButton = document.getElementById("volume-button-up");
const volumeDownButton = document.getElementById("volume-button-down");
const tvPowerButton = document.getElementById("tv-power-button");
const infoButton = document.getElementById("info");
const menuContainer = document.getElementById("menu-container");
const channelMoreButton = document.getElementById("channel-button-more");
const channelLessButton = document.getElementById("channel-button-less");
const centerButton = document.getElementById("center-button");
const menu = document.getElementById("menu");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

let arrayLights = Array.from(lightElements);
let channelsArray = Array.from(channelButtons);
const items = [];
const textItems = ["Block channel", "Mute", "Config", "Other", "Exit"];

let blockedChannelIndex = -1;
const BLOCKED_CHANNEL_PASSWORD = "222";
let passwordInput = "";

let isOn = false,
  menuCreated = false;
let lastChannelIndex = -1,
  volumeLevel = 0,
  activeIndex = 0;
let date = new Date();

//Switch on and off the TV
const togglePower = () => {
  infrared();
  isOn = !isOn;
  lightTV.classList.toggle("on");
  if (isOn) {
    screen.src = "./videos/static.mp4";
    screen.play();
    mainScreen.classList.remove("off");
    if (lastChannelIndex !== -1) {
      setTimeout(() => {
        screen.src = `./videos/channel-${lastChannelIndex + 1}.mp4`;
        screen.play();
        showDateAndChannel();
      }, 3000);
    }
  } else {
    screen.pause();
    screen.src = "";
    exit();
    mainScreen.classList.add("off");
  }
};

// Fuction to block/unblock channels
const blockCurrentChannel = () => {
  if (lastChannelIndex === blockedChannelIndex) {
    exit();
    const item = document.createElement("div");
    item.className = "menu-item";
    item.textContent = "This channel is ALREADY blocked";
    screen.src = ""
    menu.appendChild(item);
  } else {
    exit();
    const item = document.createElement("div");
    item.className = "menu-item";
    item.textContent = "This channel is blocked";
    screen.src = ""
    menu.appendChild(item);
    blockedChannelIndex = lastChannelIndex;
  }
  setTimeout(() => {
    exit();
  }, 2000);

};

// Función para desbloquear el canal
const unblockChannel = () => {
  if (passwordInput === BLOCKED_CHANNEL_PASSWORD) {
    isChannelBlocked = false;
    blockedChannelIndex = -1;
    passwordInput = "";
    const item = document.createElement("div");
    item.className = "menu-item";
    item.textContent = "Channel unblocked";
    screen.src = ""
    menu.appendChild(item);
    setTimeout(() => {
      exit();
    }, 2000);
    // Play the current channel
    screen.src = `./videos/channel-${lastChannelIndex + 1}.mp4`;
    screen.play();
  } else {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.textContent = "Incorrect password";
    screen.src = "";
    menu.appendChild(item);
    setTimeout(() => {
      exit();
    }, 2000);
  }
};

const checkPassword = (input) => {
  return input === BLOCKED_CHANNEL_PASSWORD;
};

const changeChannel = (increment) => {
  if (isOn) {
    let newChannelIndex = lastChannelIndex + increment;
    if (newChannelIndex < 0) {
      newChannelIndex = channelsArray.length - 1;
    } else if (newChannelIndex >= channelsArray.length) {
      newChannelIndex = 0;
    }
    if (newChannelIndex === blockedChannelIndex) {
      const item = document.createElement("div");
      item.className = "menu-item";
      item.textContent = "This channel is blocked";
      screen.src = ""
      menu.appendChild(item);
      setTimeout(() => {
        exit();
      }, 2000);
      return;
    } else {
      lastChannelIndex = newChannelIndex;
      const newVideoSrc = `./videos/channel-${newChannelIndex + 1}.mp4`;
      screen.src = newVideoSrc;
      screen.play();
      infrared();
      showChannel();
    }
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
};

//Makes you move through the menu
const handleNavigation = (event) => {
  if (isOn) {
    infrared();
    let newIndex = activeIndex;
    switch (event.target.id) {
      case "up-button":
        if (newIndex - 3 >= 0) newIndex -= 3;
        break;
      case "down-button":
        if (newIndex + 3 < items.length) newIndex += 3;
        break;
      case "left-button":
        if (newIndex % 3 > 0) newIndex -= 1;
        break;
      case "right-button":
        if (newIndex % 3 < 2) newIndex += 1;
        break;
    }
    if (newIndex !== activeIndex) {
      updateActiveItem(newIndex);
    }
  }
};

//When you are in menu execute the following actions
const executeMenuItemAction = (index) => {
  switch (textItems[index]) {
    case "Block channel":
      blockCurrentChannel();
      break;
    case "Mute":
      mute();
      break;
    case "Config":
      console.log("Config not implemented");
      break;
    case "Other":
      console.log("Other not implemented");
      break;
    case "Exit":
      exit();
      break;
    default:
      console.log("Unknown action");
  }
};
//Removes the menu
const exit = () => {
  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }
  items.length = 0;
  activeIndex = 0;
  menuCreated = false;
};
//Updates the active item we have selected
const updateActiveItem = (newIndex) => {
  items[activeIndex].classList.remove("active");
  activeIndex = newIndex;
  items[activeIndex].classList.add("active");
};
//Mutes the screen
const mute = () => {
  screen.muted = !screen.muted;
};

const updateVolume = () => {
  screen.volume = volumeLevel / 100;
  volumeBarValue.style.height = volumeLevel + "%";
  volumeShow();
};

const showDate = () => {
  dataContainer.innerHTML = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
  setTimeout(() => {
    dataContainer.innerHTML = ` `;
  }, 3000);
};

const showChannel = () => {
  if (lastChannelIndex !== -1) {
    dataContainer.innerHTML = `Channel: ${lastChannelIndex + 1}`;
    setTimeout(() => {
      dataContainer.innerHTML = ` `;
    }, 3000);
  }
};

const showChannelAndDate = () => {
  if (lastChannelIndex !== -1) {
    dataContainer.innerHTML = `Channel: ${lastChannelIndex + 1} <br/>
                                ${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
    setTimeout(() => {
      dataContainer.innerHTML = ` `;
    }, 3000);
  }
};

//Event listeners
powerButton.addEventListener("click", togglePower);
tvPowerButton.addEventListener("click", togglePower);

for (let i = 0; i < channelsArray.length; i++) {
  channelsArray[i].addEventListener("click", () => {
    if (isOn) {
      if (lastChannelIndex === blockedChannelIndex) {
        passwordInput += (i + 1).toString();
        if (passwordInput.length === 3) {
          unblockChannel();
        }
      } else {
        lastChannelIndex = i;
        if (lastChannelIndex === blockedChannelIndex) {
          const item = document.createElement("div");
          item.className = "menu-item";
          item.textContent = "Channel blocked. Enter password using channel buttons";
          screen.src = "";
          menu.appendChild(item);
          setTimeout(() => {
            exit();
          }, 2000);
          return;
        }
        screen.src = `./videos/channel-${i + 1}.mp4`;
        screen.play();
        infrared();
        showChannel();
      }
    }
  });
}

volumeUpButton.addEventListener("click", () => {
  if (isOn) {
    if (volumeLevel < 100) {
      volumeLevel += 10;
      screen.muted = false;
      updateVolume();
    } else if ((volumeLevel = 100)) {
      updateVolume();
    }
  }
});

volumeDownButton.addEventListener("click", () => {
  if (isOn) {
    if (volumeLevel > 0) {
      volumeLevel -= 10;
      updateVolume();
    } else if (volumeLevel == 0) {
      updateVolume();
    }
  }
});

infoButton.addEventListener("click", () => {
  if (isOn) {
    showChannelAndDate();
    infrared();
  }
});

centerButton.addEventListener("click", () => {
  if (isOn) {
    if (!menuCreated) {
      for (let i = 0; i < textItems.length; i++) {
        const item = document.createElement("div");
        item.className = "menu-item";
        item.textContent = textItems[i];
        items.push(item);
        menu.appendChild(item);
      }
      items[activeIndex].classList.add("active");
      menuCreated = true;
    } else {
      executeMenuItemAction(activeIndex);
    }
  }
});

channelMoreButton.addEventListener("click", () => changeChannel(1));
channelLessButton.addEventListener("click", () => changeChannel(-1));
upButton.addEventListener("click", handleNavigation);
downButton.addEventListener("click", handleNavigation);
leftButton.addEventListener("click", handleNavigation);
rightButton.addEventListener("click", handleNavigation);

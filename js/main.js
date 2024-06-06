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

const infrared = () => {
  for (let i = 0; i < arrayLights.length; i++) {
    arrayLights[i].classList.add("laser");
    setTimeout(() => {
      arrayLights[i].classList.remove("laser");
    }, 200);
  }
};
const DateAndChannel = () => {
  let date = new Date();
  date_container.innerHTML = `${date}`;
  setTimeout(() => {
    date_container.innerHTML = ` `;
  }, 3000);
};

for (let i = 0; i < channelsArray.length; i++) {
  channelsArray[i].addEventListener("click", () => {
    if (is_on) {
      let channel = `../imgs/channel-${i + 1}.gif`;
      console.log(channel);
      screen.style.backgroundImage = `url('../imgs/channel-${i + 1}.gif')`;
      infrared();
    }
  });
  
}
power.addEventListener("click", () => {
  infrared();
  is_on = !is_on;
  lightTV.classList.toggle("on");
  if (is_on) {
    DateAndChannel();
  }
});
tv_power.addEventListener("click", () => {
  infrared();
  is_on = !is_on;
  lightTV.classList.toggle("on");
  if (is_on) {
    DateAndChannel();
  }
});

info.addEventListener("click", () => {
  if (is_on) {
    DateAndChannel();
    infrared();
  }
});
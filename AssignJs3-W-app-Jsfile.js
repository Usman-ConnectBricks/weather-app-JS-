const input_value = document.querySelector(".city-input-modify");
const input_button = document.querySelector(".input-button");
const city_name = document.querySelector(".city-name");
const city_temp = document.querySelector(".city-temp");
const city_wind = document.querySelector(".city-wind");
const city_condition = document.querySelector(".city-condition");
const city_humidity = document.querySelector(".city-humidity");
const city_description = document.querySelector(".city-description");
const icons_i = document.querySelector(".icons-parent");

const api_details = {
  key: "a46a52896b37d1545338194d26c1257f",
  api_url: "https://api.openweathermap.org/data/2.5/weather?q=",
};

//destructuring to make get request url shorter

const { key, api_url } = api_details;

let user_entered_city = null;

input_button.addEventListener("click", async (e) => {
  user_entered_city = input_value.value;

  if (user_entered_city) {
    input_value.value = "";
    let data_get_from_api = await weather(user_entered_city);
    append_information_on_html(data_get_from_api);
    console.log(data_get_from_api);
  } else {
    alert("Enter value first");
  }
});

// api request method
// request from server
async function weather(user_cityy) {
  try {
    const response_data = await axios.get(
      `${api_url}${user_cityy}&appid=${key}`
    );
    console.log(response_data);
    return response_data;
  } catch (err) {
    alert("Enter correct city name or check your internet connection");
    return {
      status: false,
      error: err,
    };
  }
}

function append_information_on_html(res) {
  // checking if data is coming

  const kelsvin = 273.15;

  const city_details = {
    city: res.data.name,
    wind_speed: res.data.wind.speed,
    description: res.data.weather[0].description,
    temperature: res.data.main.temp,
    humidity: res.data.main.humidity,
    icon: res.data.weather[0].id,
  };

  const {
    city,
    wind_speed,
    description,
    temperature,
    humidity,
    icon,
  } = city_details;

  city_name.textContent = city;
  city_temp.textContent = Math.floor(temperature - kelsvin);
  city_wind.textContent = wind_speed;
  city_condition.textContent = description;
  city_humidity.textContent = humidity;

  // icons according weather

  icon >= 701 && icon <= 781
    ? iconChange(haze)
    : icon > 600 && icon <= 622
    ? iconChange(snowflake)
    : icon >= 500 && icon <= 531
    ? iconChange(raining)
    : icon >= 300 && icon <= 321
    ? iconChange(drizzle)
    : icon > 801 && icon <= 804
    ? iconChange(cloud)
    : icon >= 200 && icon <= 232
    ? iconChange(lightrain)
    : icon == 800
    ? iconChange(clear)
    : null;
}

// imc srch
const icon_imgs = {
  clear: `images/clear.png"`,
  cloud: `images/cloud.png"`,
  drizzle: `images/drizzle.png"`,
  raining: `images/raining.png"`,
  snowflake: `images/snowflake.png"`,
  storm: `images/storm.png"`,
  haze: `images/haze.png"`,
  lightrain: `images/lightrain.png`,
};
const {
  clear,
  cloud,
  drizzle,
  raining,
  snowflake,
  storm,
  haze,
  lightrain,
} = icon_imgs;

// icon change function
const iconChange = (condition) => {
  icons_i.innerHTML = `<img src="${condition}" class="icons" alt="" style="height:70px ; width:80px ;">`;
};

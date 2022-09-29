const API_KEY = "56c6d9f558c87d3bd26d55e54d49b000";
const API_KEY_geogoding = "AIzaSyChmyRqSgADdgNEsXF7S1GG3QRoDyOM3eg"

// success -> GeolocationPosition 객체를 유일한 매개변수로 받는 콜백 함수입니다.
function onGeoOk(position) {
  // latitude, longtitude
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  // current weather data
  const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  // daily forecast 16 days
  const cnt = 4
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

  // call url1 : current weather
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      // html
      const today_icon = document.querySelector('.today-icon')
      const today_main = document.querySelector('.today-main')
      const my_location = document.querySelector('.location')
      // 날씨정보
      const id = data.weather[0].id
      const main = data.weather[0].main
      const temp = String((data.main.temp - 272)).substring(0,2)

      // 날씨 아이콘 선택
      const icon = document.createElement('img')
      // 이미지 파일 선택
      if (200 <= id < 300) {
        icon.src = './img/weather/200.svg'
      }
      if (300 <= id < 400) {
        icon.src = './img/weather/300.svg'
      }
      if (500 <= id < 600) {
        icon.src = './img/weather/500.svg'
      }
      if (600 <= id < 700) {
        icon.src = './img/weather/600.svg'
      }
      if (700 <= id < 800) {
        icon.src = './img/weather/700.svg'
      }
      if (id === 800) {
        icon.src = './img/weather/800.svg'
      }
      if ( 800 < id < 900) {
        icon.src = './img/weather/801.svg'
      }
      today_icon.appendChild(icon)

      // 날씨 내용 추가
      today_main.innerText = `${main} / ${temp}`
    })

    
  // call url2 : daily forecast
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // for문에서 만든 요소 추가할 곳
      const weather_list = document.querySelector('#daily .right')

      // 8, 16, 24, 32
      const daily_num = [8, 16, 24, 32]
      for (var i in daily_num) {
        // #번째 날에 대한 날씨 정보
        const info = data.list[daily_num[i]]

        const outerDiv = document.createElement('div')
        // 왼쪽 date
        const dateDiv = document.createElement('div')
        const h5_1 = document.createElement('h5')
        const h6 = document.createElement('h6')
        h6.innerText = `${info.dt_txt.substr(5, 2)}.${info.dt_txt.substr(8, 2)}`
        dateDiv.appendChild(h5_1)
        dateDiv.appendChild(h6)
        outerDiv.appendChild(dateDiv)

        
        // 오른쪽 forecast
        const mainDiv = document.createElement('div')
        const icon = document.createElement('img')
        const h5_2 = document.createElement('h5')
        
        const temp = String((info.main.temp - 272)).substring(0,2)
        h5_2.innerText = `/ ${temp}`
        const id = info.weather[0].id
        // 이미지 파일 선택
        if (200 <= id < 300) {
          icon.src = './img/weather/200.svg'
        }
        if (300 <= id < 400) {
          icon.src = './img/weather/300.svg'
        }
        if (500 <= id < 600) {
          icon.src = './img/weather/500.svg'
        }
        if (600 <= id < 700) {
          icon.src = './img/weather/600.svg'
        }
        if (700 <= id < 800) {
          icon.src = './img/weather/700.svg'
        }
        if (id === 800) {
          icon.src = './img/weather/800.svg'
        }
        if ( 800 < id < 900) {
          icon.src = './img/weather/801.svg'
        }
        mainDiv.appendChild(icon)
        mainDiv.appendChild(h5_2)
        
        outerDiv.appendChild(mainDiv)
        weather_list.appendChild(outerDiv)
        console.log(weather_list)

        // const span = document.createElement('span')
        // span.innerText = `${daily_num[i]}`
        // weather_list.appendChild(span)
        
      }
      // // day1
      // const day1 = data.list[8]
      // const day1_main = day1.weather[0].main
      // const day1_date = day1.dt_txt
      // // day2
      // const day2 = data.list[16]
      // const day2_main = day2.weather[0].main
      // const day2_date = day2.dt_txt
      // // day3
      // const day3 = data.list[24]
      // const day3_main = day3.weather[0].main
      // const day3_date = day3.dt_txt
      // // day4
      // const day4 = data.list[32]
      // const day4_main = day4.weather[0].main
      // const day4_date = day4.dt_txt
    })
}

function onGeoError() {
    alert('Cant find your location.')
}

// navigator.geolocation.getCurrentPosition(success, error, [options])
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
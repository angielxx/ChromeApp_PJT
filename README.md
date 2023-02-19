




# 📋 프로젝트 개요
> **프로젝트명** : 크롬앱
**기획 및 제작** : Eunjee Lee
**분류** : 토이 프로젝트 (개인)
**제작 기간** : 2주
**사용 툴** : `HTML`, `CSS`, `JavaScript`

노마드 코더의 ['바닐라 JS로 크롬 앱 만들기'](https://nomadcoders.co/javascript-for-beginners) 강의를 수강한 후 만든 프로젝트입니다. 강의에서 구현하는 내용 외에 기능을 추가하여 프로젝트를 진행했습니다.


# 🎨 기획과 디자인
## 1. 기획

Momentum이라는 크롬앱을 클론 코딩하는 것이 강의 내용이기 때문에, 기획이랄껀 크게 없다. 하지만 단순히 수강 목적으로 코드만 복붙하기 보다는 제대로된 결과물이 나오면 좋겠다고 생각해서 기능을 추가하고 직접 UI도 디자인하여 프로젝트를 완성했다!

강의 내용에 더해 추가한 기능들은 아래와 같다.

1. 북마크
	- 북마크 추가
    - 북마크 삭제
    - 북마크 수정 (현재는 버튼만 구현해놓음)

2. 투두리스트
	- 카테고리 태그 추가
    - 카테고리 태그 삭제
    - 할일을 추가할 때 카테고리 태그 선택
    - 태그가 있는 할일, 태그가 없는 할일 모두 추가 가능
    - 카테고리가 추가된 할일은 리스트에 태그 보이기

3. 음악 플레이어 (iframe API 사용)
	- 유튜브 URL로 음악 추가
    - 플레이리스트 상의 음악 삭제
    - 플레이리스트 상의 음악 클릭하면 해당 음악 재생
    - 현재 재생 중인 음악 표시
    - 음악 재생 및 일시정지
    - 이전 곡, 다음 곡 재생

4. 날씨
	- 4일 동안의 날씨 예보


## 2. 디자인
![](https://velog.velcdn.com/images/94applekoo/post/ef0305d1-1ea4-40d1-9de1-76c5148d87ce/image.png)


figma를 사용하여 직접 인터페이스를 디자인했다. 노마드코더의 '바닐라 JS로 크롬앱 만들기'의 챌린지의 졸업작품들(https://nomadcoders.co/faq/challenge/vanillajs) 중에서 맘에 드는 디자인 몇개를 참고했다. 지금 내가 할 수 있는 수준에서 가장 최상의 선택이 박스 형태의 레이아웃이라고 생각하여 그에 맞는 레퍼런스를 참고했고, 최대한 깔끔하고 산뜻하게 디자인하려고 했다.


# 🎁 결과물

### 👉 [크롬앱 구경하러 가기](https://angie-momentum.vercel.app/)
마음껏 구경해주세요! 🙊

## 주요 기능


### 0. login
![](https://velog.velcdn.com/images/94applekoo/post/4e5ee678-7cfa-4dca-b3d6-58f58806e627/image.gif)

로그인 페이지가 화면 전체에 나타나고, 로그인이 완료되면 앱이 보여지게 구현했다.


### 1. todo list![](https://velog.velcdn.com/images/94applekoo/post/83577998-9005-41ab-ac90-19e3511f30b1/image.gif)

#### 할일 추가
투두리스트의 +버튼을 누르면 버튼이 입력창(form)으로 바뀔 수 있도록 구현하였고 애니메이션도 추가했다.

각각 다른 높이를 지정할 수 있는 클래스를 CSS에서 정의하여 버튼 클릭시 더 큰 높이를 지정하는 클래스가 추가되도록 했다. CSS에서 transition을 설정하여 애니메이션을 만들었다.

```css
/* +버튼일 때 */
.height1 {
    height: 40px;
    transition: all 1s;
}

/* 입력폼일 때 */
.height2 {
    height: 240px;
    transition: all 1s;
}
```


#### 카테고리 태그 추가
할일을 추가하는 입력창 안에서 카테고리 태그를 추가할 수 있는 form을 넣었다. html 구조 상 form안에 form을 넣을 수 없기 때문에 CSS에서 position을 absolute로 하여 할일 추가 form 안에 있는 것처럼 보이도록 했다. 
<br>

### 2. music player
#### 음악 추가
![](https://velog.velcdn.com/images/94applekoo/post/d068176d-85b5-4dd4-8449-f8150bb52692/image.gif)


URL을 입력하면 URL에서 정규표현식으로 영상 id를 받아왔다. 영상 id로 유튜브 영상 ID, 영상 제목, 썸네일 URL을 가져와 로컬 스토리지에 저장하고 각각 플레이리스트에 보여질 수 있게 했다.

```javascript
// 유튜브 URL에서 영상 id를 얻는 정규식 표현
var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
var matchs = url.match(regExp);
var youtube_id = matchs[7]
var musicObj

// 영상의 제목 얻기
const noEmbed = 'https://noembed.com/embed?url=';
const urlForm = "https://www.youtube.com/watch?v=";
const fetch_url = noEmbed + urlForm + youtube_id;
fetch(fetch_url)
  .then(res => res.json())
  .then(data => {
  const {thumbnail_url, title} = data;
  musicObj = {
    title: title,
    thumb: thumbnail_url,
    url: url,
    youtube_id: youtube_id,
  };
  playlists.push(musicObj);
  savePlaylist();
```
<br>
<br>

#### 음악 선택
![](https://velog.velcdn.com/images/94applekoo/post/aa4ca2b5-29e0-4f76-a15c-e433b5287c4d/image.gif)

먼저 현재 재생 중인 음악의 id를 로컬 스토리지에 추가로 저장했다. 음악을 선택하면 해당 영상의 id로 로컬 스토리지의 값을 업데이트하고, 각 음악의 id가 현재 재생 중인 영상의 id와 같으면 하이라이트하는 CSS 속성을 가진 클래스가 추가되도록 했다.


```javascript
function showCurrentSong() {
  // 플레이리스트 상의 모든 음악
  const allMusic = document.querySelectorAll('.a-music')
  // 개별 음악에 대해 id를 비교하여 현재 재생중인 음악의 id와 동일하다면
  // 'playing' 클래스를 추가, 아니라면 제거
  allMusic.forEach(function (element) {
    if (element.id !== currentSong) {
      element.classList.remove('playing')
    } else {
      element.classList.add('playing')
    }
  })
}
```
<br>

### 3. bookmark![](https://velog.velcdn.com/images/94applekoo/post/2eae8b63-d0eb-4f0a-adbc-bd83b1d37405/image.gif)

음악 플레이어와 마찬가지로 +버튼을 누르면 입력폼이 나타나게 했다.



### 4. weather
![](https://velog.velcdn.com/images/94applekoo/post/c39227df-49cb-4fc1-94c8-54789bb5a3c5/image.png)

 [OpenWeather](https://openweathermap.org/)의 API 중 무료 API인 'Current Weather', '3-hour Forecast 5 days' 두 가지를 사용했다. 오늘의 날씨는 'Current Weather'로, 날씨 예보는 '3-hour Forecast 5 days'를 사용했다. 

OpenWeather에서 Pricing에 들어가면 무료로 사용할 수 있는 API의 목록을 볼 수 있다.!!


날씨 아이콘은 fontawesome에서 다운받아 API에서 날씨 정보를 받아 그 ID의 값에 따라 아이콘을 선택하여 보여지게 했다.

```javascript
if (200 <= id && id < 300) {
        icon.src = './img/weather/200.svg'
      }
      if (300 <= id && id < 400) {
        icon.src = './img/weather/300.svg'
      }
      if (500 <= id && id < 600) {
        icon.src = './img/weather/500.svg'
      }
      if (600 <= id && id < 700) {
        icon.src = './img/weather/600.svg'
      }
      if (700 <= id && id < 800) {
        icon.src = './img/weather/700.svg'
      }
      if (id == 800) {
        icon.src = './img/weather/800.svg'
      }
      if (800 < id) {
        icon.src = './img/weather/801.svg'
      }
```


API 응답의 예시와 icon URL 그리고 날씨 코드에 대한 정보는 [여기](https://openweathermap.org/weather-conditions)에서 알 수 있다. (아래 사진)![](https://velog.velcdn.com/images/94applekoo/post/e27329d8-a537-45e4-937f-743ed632bd15/image.png)


### 5. quote
![](https://velog.velcdn.com/images/94applekoo/post/713878aa-65ac-49fd-a7a4-c375d5dbea02/image.png)

강의에서처럼 자바스크립트에 직접 명언을 저장하는 방식이 아닌 API로 가져오는 방식을 사용하고 싶어서 명언 API를 찾아봤는데, 생각보다 무료 API를 찾는 게 쉽지 않았다...! 

[https://type.fit/api/quotes](https://type.fit/api/quotes) 여기로 API요청을 보내면 JSON형식으로 저장된 1643개의 명언을 받아올 수 있다! (아래 사진)
![](https://velog.velcdn.com/images/94applekoo/post/ef7f73ed-6c45-428e-ba1a-d126b2180693/image.png)


`Math.random()`으로 1643개의 명언 중 랜덤으로 한가지를 뽑았다.
```javascript
const quote_text = document.querySelector('#quote p')
const quote_author = document.querySelector('#quote span')

// 0 ~ 1642
const length = 1643
let choice = Math.floor(Math.random() * length)

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let text = data[choice]['text']
    let author = data[choice]['author']
    quote_text.innerText = text
    quote_author.innerText = author
  });
```
<br>
<br>

# 🤔 나의 고민들

### 가독성있고 효율적인 코드..!
내 생애 처음으로 '코드'로 이루어진 프로젝트이기 때문에 **일단 어떻게든 만들어내는게** 목표였다. 그래서 다소 주먹구구식으로 맨땅에 헤딩하며 코드를 짰기 때문에...뒤로 갈수록 클래스명들과 코드들이 지저분해지는 문제와 기능이 추가될수록 코드 구조가 뒤죽박죽되는 문제가 있었다. 

변수명과 클래스명을 어떻게 하면 가독성있고 효율적으로 작성할 수 있을지에 대한 고민이 들었다. 특히, 프로젝트가 진행될수록 나조차 헷갈리는 CSS 구문들...ㅠㅠ 다음 프로젝트에선 CSS도 파일을 분할하고 **BEM** 규칙에 맞춰 클래스명을 깔끔하게 쓰고자 한다!



### 코드 구조

음악 플레이어와 같은 경우 다양한 경우의 수(음악 재생 중에 음악을 삭제하는 경우, 음악이 재생되는 중에 모든 음악이 삭제되는 경우 등등...)를 고려해야했는데, 코드를 짤수록 다양한 변수들을 맞이하며 코드 구조가 뒤죽박죽되는 경험을 했다🤯

어떤 기능이 필요한지 등을 미리 파악하고 전체적인 코드 구조를 먼저 생각했으면 좋았을 것 같다. (~~이 생각이 들었을땐 이미 너무 많은 강을 건너왔기에...~~) 기회가 된다면 코드구조를 다시 짜보는 것도 좋을 것 같다!


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


😎 **Eunjee Lee** | Frontend Developer
📩 angielxx94@gmail.com
💾 [github](https://github.com/angielxx)

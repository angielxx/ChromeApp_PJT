const plusbtn = document.querySelector('.plus-btn');
const plusImg = document.querySelector('.plus-btn img');
const closebtn = plusbtn.querySelector('.bookmark-close')
// bookmark form 관련
const bookmarkForm = document.querySelector('.bookmarkForm');
const bookmarkInput = document.querySelectorAll('.bookmarkForm input')
const bookmarkName = document.querySelector('.bookmark-name')
const bookmarkLink = document.querySelector('.bookmark-link')
const bookmarkList = document.querySelector('.bookmark-list')

// local storage key
const BOOKMARKS_KEY = 'bookmarks'


// Bookmark obj
let bookmarks = [];

// Bookmark Obj 저장
function saveMarks() {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

// bookmark 목록 보여주기
function showMarks(newMark) {
  // <a class="a-bookmark" href="https://naver.com">
  //   <img src="./img/icon/folder.png" alt="">
  //   <h3>Naver</h3>
  // </a>
  const linkTag = document.createElement('a')
  linkTag.classList.add('a-bookmark')
  linkTag.href = newMark.url
  linkTag.id = newMark.id
  const iconImg = document.createElement('img')
  iconImg.src = "./img/icon/folder.png"
  const linkName = document.createElement('h3')
  linkName.innerText = newMark.text

  linkTag.appendChild(iconImg)
  linkTag.appendChild(linkName)

  bookmarkList.appendChild(linkTag)
}

// Bookmark 제출
function onBookmarkSubmit(event) {
  const name = bookmarkName.value;
  const link = bookmarkLink.value;
  name = ''
  link = ''
  const MarkObj = {
    text: name,
    url: link,
    id: Date.now()
  }
  bookmarks.push(MarkObj)
  showMarks(MarkObj)
  saveMarks()
  // // 사이즈 원래대로
  onCloseClick()
}

// Bookmark Form 열기
function onPlusClick(event) {
  plusbtn.classList.add('plus-form')
  bookmarkForm.classList.remove('hidden');
  plusImg.classList.add('hidden')
  closebtn.classList.remove('hidden')
  // input animation
  bookmarkForm.classList.add('visible');
  plusImg.removeEventListener('click', onPlusClick)
}

// Bookmark Form 닫기
function onCloseClick(event) {
  const name = bookmarkName.value;
  const link = bookmarkLink.value;
  plusbtn.classList.remove('plus-form');
  bookmarkForm.classList.add('hidden');
  plusImg.classList.remove('hidden');
  closebtn.classList.add('hidden');
  plusImg.addEventListener('click', onPlusClick)
  bookmarkLink.value = ''
  bookmarkName.value = ''
}

const savedMarks = localStorage.getItem(BOOKMARKS_KEY)

if (savedMarks != null) {
  const parsedMarks = JSON.parse(savedMarks)
  bookmarks = parsedMarks
  parsedMarks.forEach(showMarks)
}

// bookmark form 제출
bookmarkForm.addEventListener('submit', onBookmarkSubmit)

// bookmark form 열기
plusImg.addEventListener('click', onPlusClick)

// bookmark form 닫기
closebtn.addEventListener('click', onCloseClick)
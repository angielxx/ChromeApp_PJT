const plusbtn = document.querySelector('.plus-btn');
const plusImg = document.querySelector('.plus-btn img');
const closebtn = plusbtn.querySelector('.close')
const bookmarkForm = document.querySelector('.bookmarkForm');

function onPlusClick(event) {
  event.preventDefault();
  plusbtn.classList.toggle('plus-form')
  bookmarkForm.classList.toggle('hidden');
  plusImg.classList.toggle('hidden')
  closebtn.classList.toggle('hidden')
}

// function onCloseClick(event) {
//   event.preventDefault();
//   plusbtn.classList.toggle('plus-form');
//   bookmarkForm.classList.toggle('hidden');
//   plusImg.classList.toggle('hidden');
//   closebtn.classList.toggle('hidden');
//   console.log('close');
// }

// bookmark form 열기
plusbtn.addEventListener('click', onPlusClick)

// bookmark form 닫기
// closebtn.addEventListener('click', onCloseClick)
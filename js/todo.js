
// tag form 관련
const addTagButton = document.querySelector('#plus-button')
const tagForm = document.querySelector('.addForm-tag')
const closeTagButton = document.querySelector('.addForm-tag .close-row img')
const tagInput = document.querySelector('.addForm-tag input')
const tagList = document.querySelector('#tag-list #select')

// todo form 관련
const addButton = document.querySelector('#add-button')
const todoForm = document.querySelector('.addForm')
const closeButton = document.querySelector('.addForm .close-row img')
const todoInput = document.querySelector('.addForm input')
const todoList = document.querySelector('#todo-list')

// local storage key
const TODOS_KEY = 'todos';
const TAGS_KEY = 'tags';

// local storage에 저장할 객체들
let toDos = [];
let tags = [];

///////////////////// start : todoForm ///////////////////////
// toDos 객체 저장
function savedTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

// todo 삭제
function deleteTodo(event) {
    const check = event.currentTarget.parentNode

    check.remove()
    toDos = toDos.filter((todo) => todo.id !== parseInt(check.id))
    savedTodos()
}

// todo status에 따라 체크 하기
function checkTodo(event) {
    let checkImg = event.target
    let check = event.currentTarget.parentNode.parentNode
    let theId = check.id
    let todo = toDos.find((todo) => todo.id === parseInt(theId))
    let span = checkImg.parentNode.querySelector('span')
    if (todo.status === 'unchecked') {
        todo.status = 'checked'
        checkImg.src = "./img/icon/check2.png"
        span.classList.add('checked')
    } else {
        todo.status = 'unchecked'   
        checkImg.src = "./img/icon/check1.png"
        span.classList.remove('checked')
    }
    savedTodos()
}

// todo 보여주기
function showlist(newTodo) {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('box')
    outerDiv.classList.add('todo')
    outerDiv.id = newTodo.id
    
    const innerDiv = document.createElement('div')
    innerDiv.classList.add('head')
    
    const span = document.createElement('span')
    span.innerText = newTodo.text
    
    const checkImg = document.createElement('img')
    if (newTodo.status === 'unchecked') {
        checkImg.src = "./img/icon/check1.png"
        span.classList.remove('checked')
    } else {
        checkImg.src = "./img/icon/check2.png"
        span.classList.add('checked')
    }
    checkImg.addEventListener('click', checkTodo)
    
    const trashImg = document.createElement('img')
    trashImg.src = './img/icon/trash.png'
    trashImg.addEventListener('click', deleteTodo)
    
    outerDiv.appendChild(innerDiv)
    outerDiv.appendChild(trashImg)
    innerDiv.appendChild(checkImg)
    innerDiv.appendChild(span)
    todoList.appendChild(outerDiv)
}

// todoForm 열기
function onAddClick(event) {
    event.preventDefault()
    todoForm.classList.remove('hidden')
}

//  todoForm 닫기
function onCloseClick(event) {
    event.preventDefault()
    todoForm.classList.add('hidden')
    tagForm.classList.add('hidden')
}


// todoForm 제출
function onTodoSubmit(event) {
    event.preventDefault()
    const newTodo = todoInput.value
    todoInput.value = ''
    const todoObj = {
        text: newTodo,
        // tag: theTag,
        status: 'unchecked',
        id: Date.now()
    }
    toDos.push(todoObj)
    showlist(todoObj)
    savedTodos()
    
    todoForm.classList.add('hidden')
    tagForm.classList.add('hidden')
}
///////////////////// end : todoForm ///////////////////////


///////////////////// start : tagForm ///////////////////////
// tag 보여주기
function showTags(newTag) {
    const option = document.createElement('option')
    option.classList.add('tag')
    option.id = newTag.id
    option.value = newTag.text
    option.innerText = newTag.text

    tagList.appendChild(option)
}

// tagForm 열기
function onAddTagClick(event) {
    event.preventDefault()
    tagForm.classList.remove('hidden')
}

// tagForm 닫기
function onTagCloseClick(event) {
    event.preventDefault()
    tagForm.classList.add('hidden')

}

// tags 객체 저장
function saveTags() {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags))
}

// tagForm 제출
function onTagSubmit(event) {
    event.preventDefault()
    const newTag = tagInput.value
    tagInput.value = ''
    const tagObj = {
        text: newTag,
        id: Date.now()
    }
    tags.push(tagObj)
    showTags(tagObj)

    saveTags()

    tagForm.classList.add('hidden')
}
///////////////////// end : tagForm ///////////////////////

const savedTodo = localStorage.getItem(TODOS_KEY)
const savedTags = localStorage.getItem(TAGS_KEY)

if (savedTodo !== null) {
    const parsedTodo = JSON.parse(savedTodo)
    toDos = parsedTodo
    parsedTodo.forEach(showlist)
}

if (savedTags !== null) {
    const parsedTags = JSON.parse(savedTags)
    tags = parsedTags
    parsedTags.forEach(showTags)
}

// todoForm 열기
addButton.addEventListener('click', onAddClick)
// todoForm 닫기
closeButton.addEventListener('click', onCloseClick)
// todoForm 제출
todoForm.addEventListener('submit', onTodoSubmit)

// tagForm 닫기
closeTagButton.addEventListener('click', onTagCloseClick)
// tagForm 열기
addTagButton.addEventListener('click', onAddTagClick)
// tagForm 제출
tagForm.addEventListener('submit', onTagSubmit)
const addButton = document.querySelector('#add-button')

const closeButton = document.querySelector('.close-row img')

const todoForm = document.querySelector('.addForm')
const todoInput = document.querySelector('.addForm input')
const todoList = document.querySelector('#todo-list')

const TODOS_KEY = 'todos';
const TAGS_KEY = 'tags';

let toDos = [];

function deleteTodo(event) {
    const check = event.currentTarget.parentNode
    console.log(check)
    check.remove()
    toDos = toDos.filter((todo) => todo.id !== parseInt(check.id))
    savedTodos()

}

function checkTodo(event) {
    let checkImg = event.target
    let check = event.currentTarget.parentNode.parentNode
    let theId = check.id
    let todo = toDos.find((todo) => todo.id === parseInt(theId))
    let span = checkImg.parentNode.querySelector('span')
    if (todo.status === 'unchecked') {
        todo.status = 'checked'
        checkImg.src = "./img/icon/check1.png"
        span.classList.add('checked')
    } else {
        todo.status = 'unchecked'   
        checkImg.src = "./img/icon/check2.png"
        span.classList.remove('checked')
    }
    savedTodos()
}

function savedTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

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
        checkImg.src = "./img/icon/check2.png"
        span.classList.remove('checked')
    } else { 
        checkImg.src = "./img/icon/check1.png"
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

function onAddClick(event) {
    event.preventDefault()
    todoForm.classList.remove('hidden')
}

function onCloseClick(event) {
    event.preventDefault()
    todoForm.classList.add('hidden')
}

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
}

const savedTodo = localStorage.getItem(TODOS_KEY)

if (savedTodo !== null) {
    const parsedTodo = JSON.parse(savedTodo)
    toDos = parsedTodo
    parsedTodo.forEach(showlist)
}

addButton.addEventListener('click', onAddClick)
closeButton.addEventListener('click', onCloseClick)
todoForm.addEventListener('submit', onTodoSubmit)
// SELECTEURS

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

// ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

// FUNCTIONS

function addTodo(event) {
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement('div'); //créer une div
    todoDiv.classList.add("todo"); // ajout d'une class à notre div
    // créer le LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // ajout du texte à notre liste
    newTodo.classList.add("todo-item"); // ajout une classe todo-item
    todoDiv.appendChild(newTodo); // mettre notre liste li dans la div
    // ajouter la todo à notre localstorage
    saveLocalTodos(todoInput.value);
    // Button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    // Button trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // AJOUTER NOTRE TODO A TODOLIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos (todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }
    // CHECK TODO
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('complete');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completen":
                if (todo.classList.contains("complete")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleten":
                if (!todo.classList.contains("complete")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    });
}

function saveLocalTodos (todo){
    // check s'il y'a des items existants
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos (){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
   todos.forEach(function(todo){
    const todoDiv = document.createElement('div'); //créer une div
    todoDiv.classList.add("todo"); // ajout d'une class à notre div
    // créer le LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // ajout du texte à notre liste
    newTodo.classList.add("todo-item"); // ajout une classe todo-item
    todoDiv.appendChild(newTodo); // mettre notre liste li dans la div
    // Button check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    // Button trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // AJOUTER NOTRE TODO A TODOLIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";
   })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}
// selectors 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event  Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

//function
function addTodo(event){
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);
    //ADD todo to locastorage
    saveLocalTodos(todoInput.value);

    //check Mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to List
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
   const item = e.target;

   //Delete todo
   if(item.classList[0] === "trash-btn"){
       const todo = item.parentElement;
       //animation
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener("transition", function(){
           todo.remove();
       });
       
   }
   //check mark
   if(item.classList[0]=== "complete-btn"){
       const todo = item.parentElement;
       todo.classList.toggle("completed");
   }
}
//this function used for find all, complete, and uncomplete lists
function filterTodo(e){
   const todos = todoList.childNodes;
   todos.forEach(function(todo){
     switch(e.target.value){
         case "all":
             todo.style.display = 'flex';
             break;
             case "completed":
                 if(todo.classList.contains('completed')){
                     todo.style.display = 'flex';
                 }else{
                     todo.style.display = "none";
                 }
                 break;
                 case "uncompleted":
                     if(!todo.classList.contains('completed')){
                         todo.style.display = "flex";
                     }else{
                        todo.style.display = "none";
                    }
                    break;
     
                }
 
            });

        }

// saving local storage
function saveLocalTodos(todo){
    //check
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
       todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    //Check todos
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
       todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    //check Mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to List
    todoList.appendChild(todoDiv);

    });

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }else{
       todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
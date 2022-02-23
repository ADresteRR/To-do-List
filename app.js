//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

//event listeners
todoButton.addEventListener('click', addTodo); todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //creating div inside which we would store the todo work
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveTodos(todoInput.value);




    //complete button check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //trash button or delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);


    //clear todo input value
    todoInput.value = null;

}

function deleteCheck(e) {
    // console.log(e.target);
    //e means event -- here click -- e.target meaning what we clicked on

    const item = e.target;

    //delete todo
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        //select the parent element of the trash button // here parent would be li element
        //animation
        todo.classList.add('fall');
        //remove the todo from the list
        todo.addEventListener('transitionend', function () {

            todo.remove();
        })
        deleteTodos(todo);





        //remove the element from the dom
    }

    //check mark
    else if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}


function filterTodo(event) {
    const todos = todoList.childNodes;
    //my code
    if (event.target.value === 'all') {
        todos.forEach(function (todo) {
            todo.style.display = 'flex';
        })
    }
    else if (event.target.value === 'completed') {
        todos.forEach(function (todo) {
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }
            else {
                todo.style.display = 'none';
            }
        })
    }
    else if (event.target.value === 'uncompleted') {
        todos.forEach(function (todo) {
            if (!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }
            else {
                todo.style.display = 'none';
            }
        })
    }

}


//capturing the todos in local storage
function saveTodos(todo) {
    //checking if we have todo in local storage already
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        //array ban raha hai
        todos = JSON.parse(localStorage.getItem('todos')); //making it array that is already stored
        //kaam jo tha woh strings the ab array banke bahar aa rahe hai

    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        //array ban raha hai
        todos = JSON.parse(localStorage.getItem('todos')); //making it array that is already stored
        //kaam jo tha woh strings the ab array banke bahar aa rahe hai
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //trash button or delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    })

}


function deleteTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        //array ban raha hai
        todos = JSON.parse(localStorage.getItem('todos')); //making it array that is already stored
        //kaam jo tha woh strings the ab array banke bahar aa rahe hai
    }

    const todoIndex = todo.children[0].innerText;
    // console.log(todoIndex);
    // console.log(todos.indexOf(todoIndex));
    todos.splice(todos.indexOf(todoIndex), 1);
    // todos.remove(todoIndex);

    localStorage.setItem('todos', JSON.stringify(todos));
}




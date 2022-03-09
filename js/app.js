/*sellectors*/ 

const myForm= document.querySelector('#my-form')
let todoInput= document.querySelector('.todo-input');
const doList = document.querySelector('#do-list');
const btn=document.querySelector('.btn');
const msg = document.querySelector('.msg');

/* Events */
document.addEventListener('contentLoaded', getTodos());
myForm.addEventListener('submit', onAdd);
doList.addEventListener('click', deleteCheck);

 
function onAdd(event) {
    event.preventDefault();
    if(todoInput.value === '') {
     
      msg.classList.add('error');
      msg.innerHTML = 'Add a new To-Do';
      setTimeout(() => msg.remove(), 3000);
    } else
    {
    // create elements//
    const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo', 'd-flex', 'justify-content-center');

    const newInput = document.createElement('input')
    newInput.value = todoInput.value;
    newInput.setAttribute('readonly', true)
    newInput.classList.add('todo-item','border','border-2','my-1','border-dark','rounded-pill','p-2','w-50','d-flex','bg-white');
    todoDiv.appendChild(newInput);
      //local storage//

      saveLocalStorage(todoInput.value);
      
     //Buttons//
      
     const completeBtn= document.createElement('button')
     completeBtn.innerHTML='<i class="fas fa-check pe-none"></i>';
     completeBtn.classList.add('todo-complete', 'btn', 'btn-success','m-1');
     todoDiv.appendChild(completeBtn);
     
     const deleteBtn= document.createElement('button')
     deleteBtn.innerHTML='<i class="fas fa-trash pe-none"></i>';
     deleteBtn.classList.add('todo-delete', 'btn', 'btn-danger','m-1');
     todoDiv.appendChild(deleteBtn);
     
      const editBtn= document.createElement('button');
     
      editBtn.innerHTML='<em> Edit </em>';
      editBtn.classList.add('todo-edit', 'btn', 'btn-info','m-1');
      todoDiv.appendChild(editBtn);
    
      editBtn.addEventListener('click', () => {
      let status = editBtn.textContent;
      if(status === ' Edit '){
        newInput.removeAttribute('readonly');
        editBtn.textContent= 'Save';
      } else if (status==='Save') 
      { newInput.setAttribute('readonly', true);
        editBtn.textContent= ' Edit ';
        
      }
      });
      
    
     doList.appendChild(todoDiv); 
     todoInput.value = "";
    }
  }
 // delete & complete//

  function deleteCheck(event){
   const item=event.target;
   if (item.classList[0]=== 'todo-delete'){
   const todo = item.parentElement;
   removeTodos(todo);
   todo.remove();
   }
   
   if(item.classList[0]=== 'todo-complete'){
   const todo = item.parentElement;
   todo.classList.toggle('completed','text-decoration-line-through');
   } 
  }
    //local storage function//

  function saveLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
      todos = [];  
    } else {
      todos= JSON.parse(localStorage.getItem('todos'));

    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
 //get todos//

  function getTodos() {
    
    let todos;
    if(localStorage.getItem("todos") === null){
      todos= [];  
    } else {
      
      todos= JSON.parse(localStorage.getItem("todos"));
    }
     todos.forEach(function(todo){ 
      const todoDiv= document.createElement('div');
      todoDiv.classList.add('todo','d-flex','justify-content-center');
  
      const newInput = document.createElement('input')
      newInput.value = todo;
      newInput.setAttribute('readonly', true)
      newInput.classList.add('todo-item','border','border-2','my-1','border-dark','rounded-pill','p-2','w-50','d-flex','bg-white');
      todoDiv.appendChild(newInput);
   
       const completeBtn= document.createElement('button')
       completeBtn.innerHTML='<i class="fas fa-check pe-none"></i>';
       completeBtn.classList.add('todo-complete', 'btn', 'btn-success','m-1');
       todoDiv.appendChild(completeBtn);
       
       const deleteBtn= document.createElement('button')
       deleteBtn.innerHTML='<i class="fas fa-trash pe-none"></i>';
       deleteBtn.classList.add('todo-delete', 'btn', 'btn-danger','m-1');
       todoDiv.appendChild(deleteBtn);
       
       const editBtn= document.createElement('button')
       editBtn.innerHTML='<em> Edit </em>';
       editBtn.classList.add('todo-edit', 'btn', 'btn-info','m-1');
       todoDiv.appendChild(editBtn);
      
       editBtn.addEventListener('click', () => {
        let status = editBtn.textContent;
        if(status === ' Edit '){
          newInput.removeAttribute('readonly');
          editBtn.textContent= 'Save';
        } else if (status==='Save') 
        { newInput.setAttribute('readonly', true);
          editBtn.textContent= ' Edit ';
          
        }
        });
       doList.appendChild(todoDiv); 

     });
  }
  //remove todos//
  function removeTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
      todos = [];  
    } else {
      todos= JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].value;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos',JSON.stringify(todos));
  }

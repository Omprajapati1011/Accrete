const api = 'http://localhost:3000/todo_list';

function loadTodos() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('list');
      list.innerHTML = '';
      data.forEach(t => {
        list.innerHTML += `
          <li>
            ${t.task}
            <button onclick="deleteTodo(${t.id})">❌</button>
          </li>`;
      });
    });
}

// task add to data base
function addTodo(){
    const task = document.getElementById('task').value;
    
    fetch(api, {
        method: 'post',
           headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ task })
    }).then(() => {
    document.getElementById('task').value = '';
    loadTodos();
  });
}


function deleteTodo(id) {
  fetch(`${api}/${id}`, { method: 'DELETE' })
    .then(loadTodos);
}


loadTodos();
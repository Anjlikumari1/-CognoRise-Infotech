const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const plainImage = document.querySelector(".plain-img");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = '';

const showTodos = () => {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = '';
    plainImage.style.display = 'block';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    plainImage.style.display = 'none';
  }
};

const getTodoHtml = (todo, index) => {
  if (filter && filter !== todo.status) {
    return '';
  }
  const checked = todo.status === "completed" ? "checked" : "";
  return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" type="checkbox" ${checked} onchange="updateStatus(this)">
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
};

const addTodo = todo => {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
};

const updateStatus = todo => {
  const todoName = todo.nextElementSibling;
  todosJson[todo.id].status = todo.checked ? "completed" : "pending";
  todoName.classList.toggle("checked", todo.checked);
  localStorage.setItem("todos", JSON.stringify(todosJson));
};

const remove = todo => {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
};

input.addEventListener("keyup", e => {
  const todo = input.value.trim();
  if (todo && e.key === "Enter") {
    addTodo(todo);
  }
});

addButton.addEventListener("click", () => {
  const todo = input.value.trim();
  if (todo) {
    addTodo(todo);
  }
});

filters.forEach(el => {
  el.addEventListener("click", e => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
      filters.forEach(tag => tag.classList.remove('active'));
      el.classList.add('active');
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});

// Initial display
showTodos();

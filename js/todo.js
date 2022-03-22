document.addEventListener("DOMContentLoaded", todo);

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();

function todo() {
  if (!JSON.parse(localStorage.getItem("user"))) {
    location.href = "/page/login.html";
  }

  let todo = JSON.parse(localStorage.getItem("todo"));
  if (todo === null) {
    localStorage.setItem("todo", JSON.stringify([]));
  }
  const name = JSON.parse(localStorage.getItem("user"))?.name;
  const todoForm = document.querySelector(".loginForm.todo");
  const todoInput = document.querySelector(".todoInput");
  const todoButton = document.querySelector(".submit.login");
  const todos = document.querySelector(".todos");
  let editId = null;

  const render = () => {
    todos.innerHTML = todo
      .map((item) => {
        return `
        <li class="todoBox">
          <button class="xBtn" data-id="${item.id}">❌</button>
          <button class="editBtn" data-id="${item.id}">EDIT</button>
          <p class="todolist">
            ${item.content}
          </p>
          <div class="userDate">
            <div class="date">${item.date}</div>
            <div class="user">${name}</div>
          </div>
        </li>
      `;
      })
      .join("");
  };
  render();

  todoForm.addEventListener("submit", (e) => {
    const now = new Date();
    const idNow = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getSeconds()}`;
    const id = Math.floor(Number(idNow) + Math.random() * Number(idNow));

    e.preventDefault();

    if (editId === null) {
      todo.push({
        content: todoInput.value,
        date: `${year}/${month}/${day} ${hours}시`,
        id: id,
      });
      localStorage.setItem("todo", JSON.stringify(todo));
    } else {
      todo.map((item) => {
        if (item.id === editId) {
          item.content = todoInput.value;
        }
        return item;
      });

      localStorage.setItem("todo", JSON.stringify(todo));

      editId = null;
      todoButton.innerText = "ToDo!";
    }

    render();

    todoInput.value = "";
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("xBtn")) {
      const data = todo.filter((item) => item.id !== Number(e.target.dataset.id));
      todo = data;
      localStorage.setItem("todo", JSON.stringify(data));
      render();
    }

    if (e.target.classList.contains("editBtn")) {
      todoInput.value = e.target.nextSibling.nextSibling.innerText;
      editId = Number(e.target.dataset.id);
      todoButton.innerText = "EDIT";
      todoInput.focus();
    }
  });
}

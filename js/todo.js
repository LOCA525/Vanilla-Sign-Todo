document.addEventListener("DOMContentLoaded", todo);

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();

function todo() {
  let todo = JSON.parse(localStorage.getItem("todo"));
  if (todo === null) {
    localStorage.setItem("todo", JSON.stringify([]));
  }
  const name = JSON.parse(localStorage.getItem("user")).name;
  const todoForm = document.querySelector(".loginForm.todo");
  const todoInput = document.querySelector(".todoInput");
  const todos = document.querySelector(".todos");

  const render = () => {
    todos.innerHTML = todo
      .map((item) => {
        return `
        <li class="todoBox">
          <button class="xBtn">❌</button>
          <p>
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
    e.preventDefault();

    todo.push({
      content: todoInput.value,
      date: `${year}/${month}/${day} ${hours}시`,
    });
    localStorage.setItem("todo", JSON.stringify(todo));
    render();
    todoInput.value = "";
  });

  const xBtn = document.querySelector(".xBtn");
  xBtn.addEventListener("click", () => {});
}

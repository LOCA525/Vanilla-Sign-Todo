document.addEventListener("DOMContentLoaded", login);
function login() {
  const email = document.querySelector(".email");
  const password = document.querySelector(".password");
  const loginForm = document.querySelector(".loginForm.login");

  let users = JSON.parse(localStorage.getItem("users"));

  const goTodo = () => {
    location.href = "/page/todo.html";
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (email.value === "") {
      alert("이메일을 입력해 주세요.");
    } else if (password.value === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      if (users.length === 0) {
        location.href = "/page/join.html";
      }
      accountCheck(users);
      email.value = "";
      password.value = "";
    }
  });

  const accountCheck = (users) => {
    for (let i = 0; i < users.length; i++) {
      if (email.value === users[i].email && password.value === users[i].password) {
        alert("로그인 성공!");

        const user = {
          email: users[i].email,
          name: users[i].name,
        };

        localStorage.setItem("user", JSON.stringify(user));

        goTodo();

        return;
      } else {
        if (i === users.length - 1) {
          alert("로그인에 실패하였습니다!");
          return;
        }
      }
    }
  };
}

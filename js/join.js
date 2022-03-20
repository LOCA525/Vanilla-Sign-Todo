document.addEventListener("DOMContentLoaded", join);

function join() {
  let users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  const name = document.querySelector(".name");
  const email = document.querySelector(".email");
  const password = document.querySelector(".password");
  const confirm = document.querySelector(".confirmPw");
  const loginForm = document.querySelector(".loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userValue = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    if (name.value === "") {
      alert("이름을 입력해 주세요.");
    } else if (email.value === "") {
      alert("이메일을 입력해 주세요.");
    } else if (password.value === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (confirm.value === "") {
      alert("비밀번호 확인창을 입력해주세요.");
    } else if (password.value !== confirm.value) {
      alert("비밀번호가 서로 다릅니다.");
    } else {
      userDuplicationCheck(userValue);
      name.value = "";
      email.value = "";
      password.value = "";
      confirm.value = "";
      name.focus();
    }
  });

  const userDuplicationCheck = (userValue) => {
    if (users.length === 0) {
      users.push(userValue);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      for (let i = 0; i < users.length; i++) {
        if (email.value === users[i].email) {
          alert("이미 가입된 이메일입니다.");
          return;
        } else {
          if (i === users.length - 1) {
            users.push(userValue);
            localStorage.setItem("users", JSON.stringify(users));
            return;
          }
        }
      }
    }
  };
}

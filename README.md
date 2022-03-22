# Vanilla-Sign-Todo

## 1. 회원가입 기능

- 회원가입 인풋에 입력된 name, email, password 밸류 값을  키(users)로 로컬스토리지에 저장시킴

- 페이지 실행시 로컬스토리지안의 users키값을 불러온 후 로컬스토리지에 저장된 유저데이터가 비어있다면 빈배열을 추가시킴

```jsx
let users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
```

- 기존 로컬스토리지에 저장되어있는 유저 아이디와 비밀번호가 중복되는지 체크하고 중복되지 않다면 로컬스토리지에 저장하는 userDuplicationCheck함수 선언

```jsx
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
            alert("회원가입에 성공하였습니다!");
            goLogin();
            return;
          }
        }
      }
    };
```

- 회원가입 성공 alert출력 후  로그인페이지로 이동

```jsx
const goLogin = () => {
    location.href = "/page/login.html";
  };
```

## 2. 로그인 기능

- 이메일과 비밀번호 인풋의 value값이 비어있다면 경고창 “이메일을 입력해주세요.” , “비밀번호를 입력해주세요.”출력, 로컬스토리지 user키 값에 아무것도 들어있지 않다면 회원가입 페이지로 이동시킴
    
    ```jsx
    if (email.value === "") {
          alert("이메일을 입력해 주세요.");
        } else if (password.value === "") {
          alert("비밀번호를 입력해주세요.");
        } else {
          if (users.length === 0) {
            location.href = "/page/join.html";
          }
    ```
    

- email과 password value값과 로컬스토리지안에 저장된 users키값을 for문을 통해 확인후 users키값에 저장된 value값이 맞을시 “로그인 성공” 출력. 아닐 시, “로그인 실패” 출력

```jsx
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
```

- 현재 로그인성공이 출력될 수 있게 한 users키값을 user란 변수를 지정해 로컬스토리지에 키값user로 저장

- for문이 로컬스토리지에 저장된 users키값을 끝까지 돌수 있게 else문에 if문을 걸어줌(users.length -1 = users안의 배열의 마지막 인덱스값)
    
    ```jsx
    else {
            if (i === users.length - 1) {
              alert("로그인에 실패하였습니다!");
              return;
            }
    ```
    

## 3. TODOLIST

- 로컬스토리지 user키값이 없을시 로그인을 위해 로그인페이지로 이동

```jsx
if (!JSON.parse(localStorage.getItem("user"))) {
    location.href = "/page/login.html";
  }
```

- map을 이용해 todos 클래스에 새로운 li태그를 넣는 함수 선언

```jsx
const render = () => {
    todos.innerHTML = todo
      .map((item) => {
        return `
        <li class="todoBox">
          <button class="xBtn" data-id="${item.id}">❌</button>
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
```

- todo에 (input value 값, 현재 년월일시, 유저id) 를 push하고 로컬스토리지에 “todo” 키값으로 저장함

```jsx
todo.push({
      content: todoInput.value,
      date: `${year}/${month}/${day} ${hours}시`,
      id: id,
    });
    localStorage.setItem("todo", JSON.stringify(todo));
```

- render함수 실행하여 li클래스를 넣어 화면에 출력후 기존input value 공란으로 만듬

```jsx
render();
    todoInput.value = "";
```

### 생성된 투두리스트 삭제버튼생성

```jsx
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("xBtn")) {
      const data = todo.filter((item) => item.id !== Number(e.target.dataset.id));
      todo = data;
      localStorage.setItem("todo", JSON.stringify(data));
      render();
    }
  });
```

- 클릭 addeventListener를 이용해 현재 클릭된 타겟의 클래스가 xBtn을 포함하고 있다면, filter함수를 이용한다.

- id를 이용한 필터링을 위해 todo키값에 id를 임의로 부여한다.

```jsx
const now = new Date();
    const idNow = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getSeconds()}`;
    const id = Math.floor(Number(idNow) + Math.random() * Number(idNow));
```

- 지금 클릭된 xBtn클래스가 저장된 로컬스토리지안의 id 값 과 todo키값에 부여된 id 값을 서로 비교하여 같은것을 제외한 나머지 값들만 다시 로컬스토리지에 저장하고 화면에 출력한다.

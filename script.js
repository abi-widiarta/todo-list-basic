const todoItem = document.querySelector(".todo-items");
const inputBtn = document.querySelector("#input-btn");
const inputField = document.querySelector("#title");
const deleteBtn = document.querySelectorAll("#delete-btn");

let arrTodo = [];

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const titleValue = document.querySelector("#title").value;
  
  if(titleValue != "") {
    e.target.innerHTML = `<img class="h-5" src="./assets/loader-white.svg" />`;
    fetch("https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI",{
      method:'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        tittle: `${titleValue}`,
        status: false
      })
    })  
    .then(
      (response) => {
            response.json()
            fetch("https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI")
            .then((response) => response.json())
            .then((hasil) => {
              // console.log("get :",hasil);
              arrTodo = hasil;
              append(arrTodo);
              inputField.value = "";
              e.target.innerHTML = "Add";
              }
            )
      }
      )
    }
})

function deleteTodo(el){
    el.childNodes[3].innerHTML = `<img class="h-5" src="./assets/loader2.svg" />`;
    fetch(`https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI/${el.id}`, {
    method: 'DELETE',
  })
  .then(res => {
    res.json()
    fetch("https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI")
      .then((response) => response.json())
      .then((hasil) => {     
      arrTodo = hasil;
      append(arrTodo);
      }
    )
  })
  // .then(res => console.log(res))
}

// function changeIcon(this) {
//   console.log(this);
// }

function append(arrTodo) {
  todoItem.innerHTML = "";
  arrTodo.forEach(element => {
    if(element.tittle != "") {
      const node = document.createElement("li");
      node.innerHTML =
      `
      <li id="${element.id}" class="px-4 flex items-center justify-between py-4 border-2 border-teal-300 rounded-lg mb-2">
          <div class="left flex" onclick={addLineThrough(this)}>
            <i class="checked cursor-pointer bi bi-circle mr-4"></i>
            <h1>${element.tittle}</h1>
          </div>
          <div class="right flex">
            <button type="submit">
              <i class="hover:text-slate-700 bi bi-pencil-square mr-2 text-slate-500"></i>
            </button>
            <button type="submit" class="block" onclick={deleteTodo(this.parentElement.parentElement)}>
              <i class="hover:text-slate-700 bi bi-trash3 text-slate-500"></i>
            </button>
          </div>
        </li>
      `

      // console.log(element)
      // if(element.status == true) {
      //   console.log("true",element)
      // }

      todoItem.appendChild(node)
    }
  });
}


fetch("https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI")
  .then((response) => response.json())
  .then((hasil) => {
    arrTodo = hasil
    append(arrTodo)
    }
  );
  
function addLineThrough(el) {
  console.log(el.parentElement.id)
  arrTodo.forEach((element) => {
    if(element.id == el.parentElement.id) {
      // harus di patch/put
      element.status = true;
    }
  })
  console.log(arrTodo)
  // el.children[0].classList.toggle("bi-circle");
  // el.children[0].classList.toggle("bi-check-circle-fill");
  // el.classList.toggle("line-through");
}



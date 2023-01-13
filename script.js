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
        // console.log("get :",hasil);
      
      arrTodo = hasil;
      append(arrTodo);
      }
    )
  })
  // .then(res => console.log(res))
}

function append(arrTodo) {
  todoItem.innerHTML = "";
  arrTodo.forEach(element => {
    if(element.tittle != "") {
      const node = document.createElement("li");
      node.innerHTML = `<li id="${element.id}" class="flex justify-between w-full px-8 py-4 border-2 border-teal-300 rounded-lg mb-2">
      <h1>${element.tittle}</h1>
      <button type="submit" id="delete-btn" class="ml-1" onclick={deleteTodo(this.parentElement)}>✅</button>
      </li>`
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
  
// fetch("https://629a2b907b866a90ec4afcf3.mockapi.io/todoAPI",{
//   method:'post',
//   headers: {
//     'Content-Type' : 'application/json'
//   },
//   body:JSON.stringify({
//     tittle: "Asdos Tepel",
//     status: false
//   })
// })  
// .then((response) => response.json())
// .then((hasil) => console.log(hasil));
  



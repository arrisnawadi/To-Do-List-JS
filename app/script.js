let addButton = document.querySelector(".add");
let todo = document.querySelector(".todo");
let lists = document.getElementById("lists");
let notif = document.querySelector(".notif");
const modalAlert = document.getElementById("modalAlert");
const close = document.querySelector(".close");
const activity = document.querySelector(".act");
const deleteAll = document.querySelector(".delAll");
const list = [];
let listID = 0;

// Get Date
let getDate = new Date();
let getDay = getDate.getDay();
let getMonth = getDate.getMonth();
const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let today = day[getDay];
let month = months[getMonth];
let date = getDate.getDate();
let year = getDate.getFullYear();
document.querySelector(".time").innerHTML = `${today.substring(
  0,
  3
)}, ${date} ${month} ${year}`;

// add list
addButton.addEventListener("click", function (event) {
    if (todo.value === "") {
        modalAlert.style.display = "block";
        notif.innerHTML = "Activity must be filled!";
    } else if (list.length >= 10) {
        todo.value = "";
        modalAlert.style.display = "block";
        notif.innerHTML = "The list of activities is full!";
    } else {
        let toDoList = {
            id: listID,
            toDo: todo.value
        };
        list.push(toDoList);
        todo.value = "";
        listID++;
        addList(toDoList);
        activity.style.display = "none";
    }
    checked();

    event.preventDefault();
});

// create list template
const addList = toDoList => {
    const div = document.createElement("div");
    div.classList.add("list");
    div.innerHTML = `
        <div class="flex1"><div class="bullet"><span></span></div></div>
        <div class="flex2"><span style="text-align: left">${toDoList.toDo}</span></div>
        <div class="flex3"><a href="#" class="delete-icon" data-name="${toDoList.toDo}">&times;</a></div>`;
    lists.appendChild(div);
};

// checked list
const checked = () => {
    const bullets = document.querySelectorAll(".bullet");
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].onclick = function () {
            bullets[i].children[0].classList.toggle("spanBlock");
            bullets[i].parentElement.nextElementSibling.children[0].classList.toggle("line-through");
            bullets[i].parentElement.nextElementSibling.nextElementSibling.children[0].classList.toggle("disabled");
        }
    }
}

// delete list
const deleteList = function (element) {
    let getToDo = list.findIndex(obj => obj.toDo === element.dataset.name);
    // remove element from the DOM
    element.parentElement.parentElement.remove();
    // remove selected element from array
    list.splice(getToDo, 1);
}

lists.addEventListener("click", function (e) {
    const delList = e.target.classList.contains("delete-icon");
    if (delList) {
        deleteList(e.target);
    }
})

// delete all lists
deleteAll.addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("Do you want to delete all?")) {
        list.splice(0, list.length);
        this.parentElement.previousElementSibling.innerHTML = "";
        listID = 0;
        activity.style.display = "block";
    }
}, false);

// close notification
close.addEventListener("click", event => {
    modalAlert.style.display = "none";
    event.preventDefault();
});
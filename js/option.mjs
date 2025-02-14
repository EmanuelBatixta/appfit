import { getLocalStorage, modalModel, setLocalStorage } from "./utils.mjs";

// const training = document.querySelector("#tra-op");
// const meal = document.querySelector("#meal-op");

function mealTemplate() {
  const localStorage = getLocalStorage("diet");
  let diet = [];
  localStorage.forEach((i, index) => {
    const item = `
    <div class="item-list">
        <a href="${i.split("-")[2]}" target="_blank">${i.split("-")[1]}</a>
        <span class="remove" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EB2500"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
    </div>`;
    diet.push(item);
  });
  return `
        <h1>Meals in your Diet</h1>
        <ul>
        ${diet.join(" ")}
        </ul>
        <a href="recipes.html" target="_blank" id="add-item"><button>Add more</button></a>
    `;
}

function trainingTemplate() {
  const localStorage = getLocalStorage("training");
  let exercises = [];
  localStorage.forEach((i, index) => {
    const item = `
    <div class="item-list">
        <p>${i.split("-")[0]} - ${i.split("-")[1]}</p>
        <span class="remove" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EB2500"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
    </div>`;
    exercises.push(item);
  });
  return `
        <h1>Exercises in your Training</h1>
        <ul>
        ${exercises.join(" ")}
        </ul>
        <a href="training.html" target="_blank" id="add-item"><button>Add more</button></a>
    `;
}

export default class op {
  constructor(template, storage) {
    this.template = template;
    this.storage = storage;
  }
  display() {
    if (this.template === "exercise") {
      const display = trainingTemplate();
      modalModel(display);
    } else {
      const display = mealTemplate();
      modalModel(display);
    }
    this.EventListenersRemove();
  }

  removeItem(key, index) {
    let storage = getLocalStorage(key);
    storage.splice(index, 1);
    setLocalStorage(key, storage);
  }

  EventListenersRemove() {
    const remove = document.querySelectorAll(".remove");
    remove.forEach((e) => {
      e.addEventListener("click", (event) => {
        const element = event.target.closest(".remove");
        const index = parseInt(element.getAttribute("data-index"), 10);
        this.removeItem(this.storage, index);
        element.closest(".item-list").remove();
      });
    });
  }
}

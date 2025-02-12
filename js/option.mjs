import { getLocalStorage, modalModel, setLocalStorage } from "./utils.mjs";

// const training = document.querySelector("#tra-op");
// const meal = document.querySelector("#meal-op");

function mealTemplate() {
  const localStorage = getLocalStorage("diet");
  let diet = [];
  localStorage.forEach((i,index) => {
    const item = `
    <div class="meal-list">
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
        <a href="recipes.html" target="_blank" id="add-recipes"><button>Add more</button></a>
    `;
}



export default class op{

    display(){
        const display = mealTemplate()
        modalModel(display)
        this.EventListenersRemove()
    }

    removeItem(key, index){
        let storage = getLocalStorage(key)
        storage.splice(index,1)
        setLocalStorage(key,storage) 
    }

    EventListenersRemove(){
        const remove = document.querySelectorAll(".remove")
        remove.forEach((e)=>{
            e.addEventListener("click",(event)=>{
                const element = event.target.closest(".remove")
                const index = parseInt(element.getAttribute("data-index"),10)
                this.removeItem("diet",index)
                element.closest(".meal-list").remove()
            })
        })
    }
}


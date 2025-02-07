import { setLocalStorage, getLocalStorage, modalModel } from "./utils.mjs"

export function detail(recipe){
    const ingredients = []
    for (let i = 1; i <= 20; i++){
        const ingredient = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]
        if(ingredient && ingredient.trim() && measure && measure.trim()){
            ingredients.push(`<li>${ingredient} - ${measure}<li>`)
        }
    }

    return`
        <div class="details">
            <h1>${recipe.strMeal}</h1>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.join("")}
            </ul>
            <h2>Instructions</h2>
            <p>${recipe.strInstructions}</p>
            <h2>Sources</h2>
            <a href="${recipe.strYoutube}" target="_blank">Youtube</a>
            
            <button class="btn-add" id="add">Add recipe to diet</button>
        </div>

    `
}

export class recipeDetail {

    constructor(data){
        this.data = data
        this.addToDiet = this.addToDiet.bind(this)
    }

    render(){
        const template = detail(this.data)
        modalModel(template, this.addToDiet)
    }

    addToDiet(){
        const btn = document.querySelector("#add")
        const info = `${this.data.idMeal} - ${this.data.strMeal}`

        btn.addEventListener("click", () => {
            const diet = getLocalStorage("diet")
            diet.find(item => item === info) ? alert("This recipe is already in your diet") :
            diet.push(info)
            setLocalStorage("diet", diet)           
        })
    }

}
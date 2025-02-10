import { recipeDetail } from "./recipeDetails.mjs";

const byIng = "https://www.themealdb.com/api/json/v1/1/filter.php?i="; //search by ingredient
const byName = "https://www.themealdb.com/api/json/v1/1/search.php?s="; //search by name

export async function searchBy(path, type) {
  const response = await fetch(`${path}${type}`);
  const resJson = await response.json();
  const data = resJson.meals;
  return data;
}

export async function displayRecipes(data) {
  const meal = document.querySelector("#meal-results");
  const div = document.createElement("div");
  const name = document.createElement("h2");
  const img = document.createElement("img");
  div.classList.add("meal-div");
  name.textContent = data.strMeal;
  img.setAttribute("src", data.strMealThumb);
  img.setAttribute("alt", data.strMeal);
  img.setAttribute("loafing", "lazy");
  div.appendChild(img);
  div.appendChild(name);
  div.addEventListener("click", () => {
    const recipe = new recipeDetail(data);
    recipe.render();
  });
  meal.appendChild(div);
}

export default class Recipe {
  async getData(text) {
    const message = document.querySelector("#results-message");
    const name = await searchBy(byName, text);
    let data = [];
    try {
      if (name !== null) {
        name.forEach((element) => {
          if (element != null) {
            data.push(element);
          }
        });
      } else {
        message.innerHTML = `No results found for: <strong>"${text}"</strong>`;
      }

      data.forEach((element) => {
        displayRecipes(element);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

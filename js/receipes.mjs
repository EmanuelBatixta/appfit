const catSearch = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const List = "https://www.themealdb.com/api/json/v1/1/list.php?c"
const byIng = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
const byName = "https://www.themealdb.com/api/json/v1/1/search.php?s="

export async function searchByIng(ingredient){
    const response = await fetch(`${byIng}${ingredient}`);
    const resJson = await response.json();
    const data = resJson.meals
    return data
}

export async function searchByName(name){
    const response = await fetch(`${byName}${name}`);
    const resJson = await response.json();
    const data =  resJson.meals
    return data
}

export async function unifySearch(text){
    const name = await searchByName(text)
    const ing = await searchByIng(text)
    let data = []
    try{
        name.forEach(element => {
            if (element !== null){
                data.push(element)
            }
        });
        ing.forEach(element => {
            if (element !== null){
                data.push(element)
            }
        });
        console.log(data)
        data.forEach(element => {
            displayIMG(element)
        });
    } catch (error){
        console.error(error)
    }
}

export async function getCategory(url){
    const res = await getData(url)
    const cat = await res.categories
    return cat
}

export async function searchByCategories(categories){
    const response = await fetch(`${catSearch}${categories}`)
    const resJson = await response.json()
    return resJson
}

export async function displayIMG(data){
    const meal = document.querySelector("#meal-results")
    const div = document.createElement("div")
    const name = document.createElement("h2")
    const img = document.createElement("img")
    div.classList.add("meal-div")
    name.textContent = data.strMeal
    img.setAttribute("src",data.strMealThumb)
    img.setAttribute("alt",data.strMeal)
    div.appendChild(img)
    div.appendChild(name)
    console.log(div)
    meal.appendChild(div)
};

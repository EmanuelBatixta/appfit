import { loadHeaderFooter, Search, } from "./utils.mjs";
import { recipeDetail } from "./recipeDetails.mjs"; 
import Recipe from "./receipeList.mjs";

loadHeaderFooter()
const recipeList = new Recipe()
Search("meal-results",recipeList.getData)

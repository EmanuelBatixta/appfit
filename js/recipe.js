import { loadHeaderFooter, Search, } from "./utils.mjs";
import Recipe from "./receipeList.mjs";

loadHeaderFooter()
const recipeList = new Recipe()
Search("data-results",recipeList.getData)

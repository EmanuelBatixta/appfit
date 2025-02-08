import { loadHeaderFooter } from "./utils.mjs";
import op from "./option.mjs";

loadHeaderFooter();
const ops = new op();
const meal = document.querySelector("#meal-op");
meal.addEventListener("click", ()=>ops.display());

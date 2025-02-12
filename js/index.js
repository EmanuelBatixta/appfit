import { loadHeaderFooter } from "./utils.mjs";
import op from "./option.mjs";

loadHeaderFooter();
const food = new op("meal", "meal");
const exercise = new op("exercise", "training");

const meal = document.querySelector("#meal-op");
const training = document.querySelector("#tra-op");

meal.addEventListener("click", () => food.display());
training.addEventListener("click", () => exercise.display());

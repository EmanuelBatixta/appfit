import { loadHeaderFooter, Search, } from "./utils.mjs";
import Exercise from "./exercisesList.mjs";

loadHeaderFooter()
const exercise = new Exercise();
Search("data-results",exercise.getData)
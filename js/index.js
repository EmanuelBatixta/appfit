import { loadHeaderFooter, Search, } from "./utils.mjs";
import { unifySearch } from "./receipes.mjs";

loadHeaderFooter();
Search("meal-results", unifySearch);
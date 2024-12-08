import { async } from "regenerator-runtime";
import { API_URL, KEY, MODEL_CLOSE } from "./config";
import { AJAX } from "./helper";

export const state = {
  recipe: {},
  search: {
    results: [],
    page: 1,
    searchPage: 10,
    query: "",
  },
  bookmarks: [],
  carts: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    image: recipe.image_url,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    publisher: recipe.publisher,
    id: recipe.id,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    if (state.carts.some((cart) => cart.id === id)) {
      state.recipe.carted = true;
    } else {
      state.recipe.carted = false;
    }
  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        image: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        id: rec.id,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const paginationPrePage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.searchPage;
  const end = page * state.search.searchPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.map((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
const bookmarkPresist = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  bookmarkPresist();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((book) => book.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  bookmarkPresist();
};

const init = function () {
  const local = JSON.parse(localStorage.getItem("bookmarks"));
  if (local) state.bookmarks = local;
};

init();
console.log(state.bookmarks);

export const addBookmarkRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
    .map((ing) => {
      const ingArr = ing[1].replaceAll(" ", "").split(",");
      if (ingArr.length !== 3) {
        throw new Error("Please use correct format");
      }
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  const recipe = {
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    title: newRecipe.title,
    cooking_time: newRecipe.cookingTime,
    servings: newRecipe.servings,
    ingredients,
    source_url: newRecipe.sourceUrl,
  };
  console.log(recipe);
  const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
  state.recipe = createRecipeObject(data);
  console.log(state.recipe);
  addBookmark(state.recipe);
};

const presistStore = function () {
  localStorage.setItem("carts", JSON.stringify(state.carts));
};
export const addCart = function (recipe) {
  state.carts.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.carted = true;
  presistStore();
};
export const removeCart = function (id) {
  const index = state.carts.findIndex((cart) => cart.id === id);
  state.carts.splice(index, 1);
  if (id === state.recipe.id) state.recipe.carted = false;
  presistStore();
};

const init1 = function () {
  const cartsLocal = JSON.parse(localStorage.getItem("carts"));
  if (cartsLocal) state.carts = cartsLocal;
};
export const numIncrease = function () {
  for (let i = 0; i < state.carts.length; i++) {
    if (i > 0) return i;
  }
  console.log("Welcome")
};
init1();
console.log("Carts ->", state.carts);

import * as modal from "./model.js";
import resultView from "./view/resultView.js";
import searchView from "./view/searchView.js";
import viewRecipe from "./view/viewRecipe.js";
import paginationView from "./view/paginationView.js";
import { rectangle } from "leaflet";
import bookmarkView from "./view/bookmarkView.js";
import addRecipeView from "./view/addRecipeView.js";
import { async } from "regenerator-runtime";
import { MODEL_CLOSE } from "./config.js";
import addCart from "./view/addCartView.js";
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    viewRecipe.renderSpinner();
    await modal.loadRecipe(id);
    viewRecipe.render(modal.state.recipe);
    resultView.update(modal.paginationPrePage());
    bookmarkView.update(modal.state.bookmarks);
    addCart.update(modal.state.carts);
  } catch (err) {
    viewRecipe.renderErrorMessage();
  }
};

const controlSearchRecipe = async function () {
  try {
    resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await modal.searchRecipe(query);
    console.log(modal.state.search.results);
    resultView.render(modal.paginationPrePage(1));
    paginationView.render(modal.state.search);
  } catch (err) {
    resultView.renderErrorMessage("Search recipe not found!");
  }
};
const controlPagination = function (goto) {
  resultView.render(modal.paginationPrePage(goto));
  paginationView.render(modal.state.search);
};
const controlServings = function (update) {
  modal.updateServings(update);
  viewRecipe.update(modal.state.recipe);
};
const emptyBookmarkMessage = function () {
  if (modal.state.bookmarks.length === 0)
    bookmarkView.renderMessage(
      "Not bookmark yet.Find nice recipe and save it:)"
    );
};
const controlBookmark = function () {
  if (!modal.state.recipe.bookmarked) modal.addBookmark(modal.state.recipe);
  else {
    modal.removeBookmark(modal.state.recipe.id);
    emptyBookmarkMessage();
  }
  // window.history.pushState(null, "", `#${modal.state.recipe.id}`);

  viewRecipe.update(modal.state.recipe);
  bookmarkView.render(modal.state.bookmarks);
  console.log(modal.state.bookmarks);
};
const controlAddBookmark = function () {
  bookmarkView.render(modal.state.bookmarks);
  emptyBookmarkMessage();
};
const controlUploadRecipe = async function (recipe) {
  try {
    console.log(recipe);
    await modal.addBookmarkRecipe(recipe);
    bookmarkView.render(modal.state.bookmarks);
    addRecipeView.render(modal.state.recipe);
    addRecipeView.renderMessage("Recipe successfully uploaded!");
    window.history.pushState(null, "", `#${modal.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindowClose();
    }, MODEL_CLOSE * 1000);
  } catch (err) {
    addRecipeView.renderErrorMessage();
  }
};
const message = function () {
  if (modal.state.carts.length === 0) {
    addCart.renderMessage("Not cart yet.Find nice recipe and carts it:)");
  }
};
const controlAddCart = function () {
  // Add/Remove cart.
  if (!modal.state.recipe.carted) modal.addCart(modal.state.recipe);
  else modal.removeCart(modal.state.recipe.id);
  addCart.render(modal.state.carts);
  message();
  // Render messaeg
  console.log(modal.state.carts);
};
const controlRemoveCart = function () {
  modal.removeCart(modal.state.recipe.id);
  addCart.render(modal.state.carts);
  message();
};
const controlCart = function () {
  addCart.render(modal.state.carts);
  message();
};
const init = function () {
  viewRecipe.addHandlerRecipe(controlRecipe);
  viewRecipe.addHandlerServings(controlServings);
  viewRecipe.addHandlerBookmark(controlBookmark);
  viewRecipe.addHandlerCart(controlAddCart);
  addCart.addHandlerCartRemove(controlRemoveCart);
  addCart.addHandlerReloadCart(controlCart);
  bookmarkView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRecipe);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerBookmarkAdd(controlUploadRecipe);
};
init();

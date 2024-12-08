import { View } from "./view";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _openWindow = document.querySelector(".nav__btn--add-recipe");
  _closeWindow = document.querySelector(".btn--close-modal");
  _message = "Recipe sucessfully uplaoded";
  _errorMessage = "Please use correct format";
  _addMoreIngredient = document.querySelector(".upload__down--up");
  _removeMoreIngredient = document.querySelector(".upload__down--btn");
  _ingredients = document.querySelectorAll(".ingredient");
  addHandlerBookmarkAdd(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = new FormData(this);
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  constructor() {
    super();
    this._openWindow.addEventListener("click", this._toggleWindow.bind(this));
    this._closeWindow.addEventListener(
      "click",
      this.toggleWindowClose.bind(this)
    );
    this._overlay.addEventListener("click", this.toggleWindowClose.bind(this));
    this._addMoreIngredient.addEventListener(
      "click",
      this.addIngredient.bind(this)
    );
    this._removeMoreIngredient.addEventListener(
      "click",
      this.removeIngredient.bind(this)
    );
  }
  _toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }
  toggleWindowClose() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addIngredient() {
    this._ingredients.forEach((ing) =>
      ing.classList.remove("hidden__ingredient")
    );
    this._removeMoreIngredient.classList.remove("hidden__ingredient");
    this._addMoreIngredient.classList.add("hidden__ingredient");
  }
  removeIngredient() {
    this._ingredients.forEach((ing) => ing.classList.add("hidden__ingredient"));
    this._addMoreIngredient.classList.remove("hidden__ingredient");
    this._removeMoreIngredient.classList.add("hidden__ingredient");
  }
  _generateMarkup() {
    return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST23" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST23" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST23" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST23" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
  }
}

export default new AddRecipeView();

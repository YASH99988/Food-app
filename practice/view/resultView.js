import { View } from "./view";
import icons from "/src/img/icons.svg";

class ResutlView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Search Recipe not found!";
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map((res) => {
        return `
             <li class="preview">
            <a class="preview__link ${
              id === res.id ? "preview__link--active" : ""
            }" href="#${res.id}">
              <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${res.icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
            `;
      })
      .join("");
  }
}

export default new ResutlView();

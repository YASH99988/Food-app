import { View } from "./view";
import icons from "/src/img/icons.svg";

class PreviewView extends View {
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
             <li class="preview">
            <a class="preview__link ${
              id === this._data.id ? "preview__link--active" : ""
            }" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${this._data.icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
                <div class="preview__user-generated ${
                  this._data.key ? "" : "hidden"
                }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <div style="font-size:2rem;color:red;">
          <button  class="remove__cart ${
            this._data.carted ? this._data.bookmarked ? "hidden" : "" : "hidden"
          }">&Cross;</button>
          </div>
            </a>
          </li>
            `;
  }
}

export default new PreviewView();

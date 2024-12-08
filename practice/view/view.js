import { mark } from "regenerator-runtime";
import icons from "/src/img/icons.svg";

export class View {
  _data;
  renderMarkup(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this.renderMarkup(markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll("*"));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll("*")
    );
    newElement.forEach((newEl, i) => {
      const curEl = currentElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild?.nodeValue?.trim() !== ""
      )
        curEl.textContent = newEl.textContent;
      if (!newEl?.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
    this.renderMarkup(markup);
  }
  renderErrorMessage(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
          </div> 
    `;
    this.renderMarkup(markup);
  }
  renderMessage(message = this._message) {
    const markup = `
       <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div> 
    `;
    this.renderMarkup(markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}

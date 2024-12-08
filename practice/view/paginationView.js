import { View } from "./view";
import icons from "/src/img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.searchPage
    );
    if (curPage === 1 && numPage > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <div class="pagination__pages"><span class="pagination__start">${
            curPage + 1 - 1
          }</span> / <span class="pagination__end">${numPage}</span></div>
      `;
    }
    if (curPage === numPage && numPage > 1)
      return `    
     <button data-goto="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
           <div class="pagination__pages"><span class="pagination__start">${
            curPage + 1 - 1
          }</span> / <span class="pagination__end">${numPage}</span></div>
    `;
    if (curPage < numPage) {
      return `
       <button data-goto="${
         curPage - 1
       }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
           <div class="pagination__pages"><span class="pagination__start">${
            curPage + 1 - 1
          }</span> / <span class="pagination__end">${numPage}</span></div>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    return "";
  }
}

export default new PaginationView();

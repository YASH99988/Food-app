import previewView from "./previewView";
import { View } from "./view";

class AddCartView extends View {
  _parentElement = document.querySelector(".carts__list");

  _generateMarkup() {
    return this._data.map((res) => previewView.render(res, false));
  }
  addHandlerReloadCart(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerCartRemove(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".remove__cart");
      
      if (!btn) return;
      console.log(btn);
      handler();
    });
  }
}

export default new AddCartView();

import previewView from "./previewView";
import { View } from "./view";

class BookmarView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  addHandlerBookmark(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    return this._data.map((res) => previewView.render(res, false));
  }
}

export default new BookmarView();

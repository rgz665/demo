import cover from "./1.png";
import style from "./index.scss";

function createCover() {
  var img = new Image();
  img.src = cover;
  img.classList.add(style.cover);
  var root = document.getElementById("root");
  root.append(img);
}

export default createCover;

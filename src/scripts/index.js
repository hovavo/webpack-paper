import '../styles/index.scss';
import paper from "paper";
import fingerSVG from "../assets/finger.svg";

paper.install(window);

window.onload = () => {
  paper.setup(document.querySelector("#canvas"));
  const finger = project.importSVG(fingerSVG);
  finger.position = view.size.multiply(0.5);
};
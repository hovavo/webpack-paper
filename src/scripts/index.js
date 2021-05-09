import '../styles/index.scss';
import paper from "paper";
import { run } from './round-hatch/example';

paper.install(window);

window.onload = () => {
  paper.setup(document.querySelector("#canvas"));
  run();
};
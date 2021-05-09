import {
  Path,
  project,
  view
} from "paper";
import {
  roundHatch
} from "./index";

export function run() {
  project.currentStyle.strokeColor = 'black';
  project.currentStyle.strokeWidth = 2;

  let res;

  view.onMouseMove = function (event) {
    if (res) res.remove();
    const d = event.point.getDistance(view.center);
    res = roundHatch(new Path.Circle(view.center, d), 6);
  };
};
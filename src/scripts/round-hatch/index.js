import {
  Path,
  Group,
} from "paper";
import {
  PaperOffset
} from "paperjs-offset";

export function roundHatch(source, radius, replace = true) {
  const points = [];
  const clone = source.clone().rotate(-45);
  
  if (replace) {
    source.remove();
  }
  
  const inset = PaperOffset.offset(clone, radius * -1, {
    insert: false,
  });

  clone.remove();
  
  for (let i = 0; i < inset.bounds.size.width / radius * 2; i++) {
    let divider = new Path([
      inset.bounds.topLeft, inset.bounds.bottomLeft
    ]).translate(i * radius * 2, 0);
    const intersections = inset.getIntersections(divider).map(p => p.point);
    if (intersections.length == 1) points.push(intersections[0]);
    else if (intersections.length > 1) {
      intersections = intersections.sort((a, b) => a.y - b.y);
      points.push(intersections[i % 2]);
    }
    divider.remove();
  }

  const p = new Path();
  const g = new Group(p);
  points.forEach((point, i) => {
    const isEven = i % 2 == 0;
    const dir = isEven ? 1 : -1;
    g.addChild(new Path([point, point.add(0, 20 * dir)]));
    g.addChild(new Path([point.add(0, 30 * dir), point.add(0, 40 * dir)]));
    if (isEven) {
      p.add(point.add(-radius, 0));
      p.arcTo(point.add(0, -radius), point.add(radius, 0));
    } else {
      p.add(point.add(-radius, 0));
      p.arcTo(point.add(0, radius), point.add(radius, 0));
    }
  });

  g.rotate(45);
  return g;
}
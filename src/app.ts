import P5 from "p5";
import "p5/lib/addons/p5.dom";
import Ball from "./Ball";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";

const sketch = (p5: P5) => {
  const balls: Ball[] = [];

  p5.setup = () => {
    // Creating and positioning the canvas
    const canvas = p5.createCanvas(500, 500);
    canvas.parent("app");

    // Configuring the canvas
    p5.frameRate(60);

    balls.push(new Ball(p5));
  };

  p5.draw = () => {
    p5.background("white");
    balls.forEach((ball) => ball.render());
  };
};

new P5(sketch);

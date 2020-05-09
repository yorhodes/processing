import p5 from "p5";
import PhysicsObject from "./PhysicsObject";

export default class Ball extends PhysicsObject {
  protected color: p5.Color;
  protected radius: number;

  constructor(protected p5: p5) {
    super(p5);
    this.color = p5.color(p5.random(255), p5.random(255), p5.random(255));
    this.velocity.x = p5.random(1);
    this.radius = p5.random(10, 100);
    this.mass = (this.radius * this.radius) / 2;
  }

  xBounds(): number {
    const left = this.position.x - this.radius;
    const right = this.position.x + this.radius;
    return left < 0 ? left : right > this.p5.width ? right - this.p5.width : 0;
  }

  yBounds(): number {
    const top = this.position.y - this.radius;
    const bottom = this.position.y + this.radius;
    return top < 0
      ? top
      : bottom > this.p5.height
      ? bottom - this.p5.height
      : 0;
  }

  draw() {
    this.p5.noStroke();
    this.p5.fill(this.color);
    this.p5.circle(0, 0, this.radius * 2);
  }
}

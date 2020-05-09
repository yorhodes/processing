import p5 from "p5";

const GRAVITY = 0.0004; // pixels per second

export default abstract class PhysicsObject {
  protected position: p5.Vector;
  protected velocity: p5.Vector;
  protected acceleration: p5.Vector;
  protected mass: number;

  constructor(protected p5: p5) {
    this.position = p5.createVector(p5.width / 2, p5.height / 2);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, GRAVITY);
    this.mass = 10;
  }

  update() {
    const deltaT = this.p5.deltaTime;
    const deltaV = p5.Vector.mult(this.acceleration, deltaT);
    const deltaA = p5.Vector.mult(this.velocity, deltaT).add(
      deltaV.mult(deltaT / 2)
    );

    this.velocity.add(deltaV);
    this.position.add(deltaA);

    const xBounds = this.xBounds();
    if (xBounds != 0) {
      this.velocity.x -= deltaV.x;
      this.velocity.x *= -1;
      this.position.x -= 2 * xBounds;
    }

    const yBounds = this.yBounds();
    if (yBounds != 0) {
      this.velocity.y -= deltaV.y;
      this.velocity.y *= -1;
      this.position.y -= 2 * yBounds;
    }
  }

  abstract draw();
  abstract yBounds(): number;
  abstract xBounds(): number;

  render() {
    this.update();
    this.p5.push();
    this.p5.translate(this.position);
    this.draw();
    this.p5.pop();
  }
}

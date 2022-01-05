class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/ball.png");
    World.add(world, this.body);
  }

  shoot() {
   var newAngle = cannon.angle - 90;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      y: velocity.y *(180/3.14), x: velocity.x * (180/3.14)})
  }

  remove(index) {
    
      Matter.World.remove(world,balls[index].body);

 
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    

  }
}

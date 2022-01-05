const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var goalkeeper;
var wall1,wall2;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/ground.jpg");
  goalkeeperImage = loadImage("./assets/goalkeeper.png");
  goalpostImage = loadImage("./assets/goalpost.png");
  crowd_img = loadImage("./assets/crowd.jpg");

}

function setup() {
  canvas = createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

 
  crowd = Bodies.rectangle(250,10, 250, 180, { isStatic: true });
  World.add(world, crowd);


  goalPost = Bodies.rectangle(255, 90, 100, 200, { isStatic: true });
  World.add(world, goalPost);




goalkeeper = createSprite(250,160,20,20)
goalkeeper.addImage(goalkeeperImage)
goalkeeper.scale = 0.5;
goalkeeper.velocityX = -6
//goalkeeper.debug = true;
goalkeeper.setCollider("rectangle",0,0,150,200);



  cannon = new Cannon(253,605,100,1000, angle);

wall1 = createSprite(60,160,20,80)
wall1.visible = false;
wall2 = createSprite(440,160,20,80)
wall2.visible = false;
}

function draw() {
  background(189);
  image(backgroundImg, 0, 110, width, height);
  
  Engine.update(engine);
  
 

  push();
  imageMode(CENTER);
  image(crowd_img,crowd.position.x, crowd.position.y, 500,240);
  image(goalpostImage,goalPost.position.x, goalPost.position.y, 333, 160)
  pop();

  if(goalkeeper.isTouching(wall1)){
    goalkeeper.velocityX = 6
  }

  if(goalkeeper.isTouching(wall2)){
    goalkeeper.velocityX = -6
  }

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
    collisionWithGoalpost(i);
  }



 
  cannon.display();
  drawSprites();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    ball = new CannonBall(cannon.x, cannon.y)
    Matter.Body.setAngle(ball.body, cannon.angle);
    balls.push(ball);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    balls[balls.length - 1].shoot();
    //collisionWithGoalpost(balls[i])
  }
}


function collisionWithGoalpost(index) {
   for (var i = 0; i < balls.length; i++) {
     if (balls[index] !== undefined) {
       var collision = Matter.SAT.collides(balls[i].body, goalPost);
 
       if (collision.collided) {  
         balls[i].remove(i);
         //Matter.World.remove(world,balls[index].body);
        // delete balls[index];
        balls.splice(i, 1);
        i--;
       }
     }
     
   }
 
 }


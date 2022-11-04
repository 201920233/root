const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let slingShot;

function setup() {
  const canvas = createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(450, 300 - i * 75, 50, 75);
  }
  bird = new Bird(150, 300, 20);

  slingshot = new SlingShot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  };
  mConstraint = MouseConstraint.create(engine);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == "a") {
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 20);
    slingshot.attach(bird.body);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 30);
}

function draw() {
  background(0);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  bird.show();
  slingshot.show();
}

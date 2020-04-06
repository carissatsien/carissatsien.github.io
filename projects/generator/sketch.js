let y;
let x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  rectMode(RADIUS);
}

function draw() {
  background(255);
  //a center line, for precision
  line(width / 2, height, width / 2, 0);

  for (let i = 0; i < 10; i++) {
    blackink(random(width)/500, random(height));
  }
  
  for (let i = 0; i < 3; i++) {
    redink(random(width)/200, random(height));
  }

}

function blackink(x, y) {
  let detail = int(random(1, 14));
  let v1 = createVector(random(width), random(height), detail);
  let v2 = v1.copy();

  let a = random(50, 200);
  let b = random(50, 200);
  

  fill(0);
  noStroke();
  ellipse(v1.x, v1.y, a, b);
  //reflect shapes
  ellipse(-(v2.x) + width, v2.y, a, b);

  print(detail);
}

function redink(x, y) {
  let v1 = createVector(random(width) / 2, random(height));
  let v2 = v1.copy();

  let a = random(10, 100);
  let b = random(10, 100);

  fill("red");
  ellipse(v1.x, v1.y, a, b);
  //reflect shapes
  ellipse(-(v2.x) + width, v2.y, a, b);
}



//click to redraw
function mousePressed() {
  redraw();
}
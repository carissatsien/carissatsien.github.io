function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  frameRate(10);
}

function draw() {
  background(0);
  
  for (let i = 0; i < 50; i++) {
    flower(random(width), random(height));
}

function flower(x, y) {


  //blue background
  fill("ghostwhite");
  noStroke();
  ellipse(x, y, 50, 100);

  //corner elements
  triangle(x - 15, y + 40, x, y - 70, x - 35, y);
  triangle(x + 15, y + 40, x, y - 70, x + 35, y);

  triangle(x - 15, y - 20, x, y - 70, x + 30, y);


  //spine
  fill("gold");
  stroke("ghostwhite");
  strokeWeight(0);
  ellipse(x, y + 15, 15, 60);
  // ellipse(x, y + 15, 5, 20);
  // ellipse(x - 15, y, 20, 5);
  // ellipse(x + 15, y, 20, 5);

  //gray lines
  stroke("darkgray");
  strokeWeight(2);
  line(x + 30, y, x + 15, y + 35);
  line(x + 30, y, x + 18, y - 30);
  line(x - 30, y, x - 15, y + 35);
  line(x - 30, y, x - 18, y - 30);

  strokeWeight(1.5);
  line(x + 25, y, x + 10, y + 18);
  line(x + 10, y, x + 18, y - 10);
  line(x - 25, y, x - 10, y + 18);
  line(x - 10, y, x - 18, y - 10);

  line(x + 25, y, x + 20, y + 10);
  line(x + 10, y, x + 18, y - 10);
  line(x - 25, y, x - 20, y + 10);
  line(x - 10, y, x - 18, y - 10);

  //stem
  stroke("green")
  strokeWeight(4);
  line(x, y + 80, x, y + 40);

  //center
  fill("gold");
  stroke("goldenrod")
  strokeWeight(2);
  ellipse(x, y + 15, 10, 10);
  ellipse(x, y - 5, 10, 10);
  ellipse(x, y + 5, 10, 10);
  ellipse(x, y + 25, 10, 10);
  ellipse(x, y + 35, 10, 10);
  }
}
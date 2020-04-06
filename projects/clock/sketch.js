let sec;
let mint;
let hr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
}

function draw() {
  background(0);

  // fill(255);
  // textSize(32);
  // textAlign(CENTER, TOP);
  // text('Angst Clock', windowWidth/2, 10);

  // //ambience
  //   fill(random(100, 255));
  //   // noStroke();
  //   square(random(width), random(height), random(width)/4, random(height));

  strokeWeight(5);

  let b = color(255);
  let r = color("darkred");

  //   hour block  
  for (let i = 0; i < hour(); i++) {
    fill("tomato");
    ellipse(width / 2 + 200, height / 16 + (i * 20), 20 + (i * 2), 20 + (i * 2));
  }

  //   minute block  
  for (let i = 0; i < minute(); i++) {
    fill('#FFBD00');
    ellipse(width / 4, height / 16 + (i * 10), 20 + (i * 2), 20 + (i * 2));
  }

  //   seconds block
  for (let i = 0; i < second(); i++) {
    let col = map(i, 0, 60, 0, 1); //convert i to be on a scale from 0 to 1
    let lerpCol = lerpColor(b, r, col); //interpolate between two colors
    fill(lerpCol);
    ellipse(width / 2, height / 12 + (i * (0.15 * i)), 2 + (i * 2), 2 + (i * 2)); //xpos, ypos, width, height
  }
  // print(sec);
}
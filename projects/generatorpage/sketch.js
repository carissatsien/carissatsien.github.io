let y;
let x;

let sw;

let shape = [];
let shapeC = [];

let yoff = 0.0;
let mov = 0.0;
let mov2 = 0.0;

let xDirection = 1;
let yDirection = 1;

let rBG, gBG, bBG; //variables to store word colors
let rLg, gLg, bLg;
let rSm, bSm, gSm;

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight);
  canvas.position(0, 0);
  // noLoop();

  frameRate(30);

  let menuXpos = windowWidth - width - 150;

  checkbox = createCheckbox('', true);
  checkbox.changed(makeLine);
  checkbox.position(menuXpos - 10, 590);

  button = createButton('Randomize Colors');
  button.position(menuXpos - 10, 500);
  button.mousePressed(randomColor);

  button = createButton('Reset Colors');
  button.position(menuXpos - 10, 530);
  button.mousePressed(resetColor);

  buttonRe = createButton('New Shapes');
  buttonRe.position(menuXpos - 10, 560);
  buttonRe.mousePressed(reDo);

  checkbox = createCheckbox('', false);
  checkbox.position(menuXpos - 10, 610);
  checkbox.changed(pauseDraw);

  // colorPick = createColorPicker('black');
  // colorPick.position(0, windowHeight - 30);
  // colorPick2 = createColorPicker('gray');
  // colorPick2.position(200, windowHeight - 30);

  bgcolorPickR = createSlider(0, 255, 255);
  bgcolorPickR.position(menuXpos, 45);
  bgcolorPickG = createSlider(0, 255, 255);
  bgcolorPickG.position(menuXpos, 75);
  bgcolorPickB = createSlider(0, 255, 255);
  bgcolorPickB.position(menuXpos, 105);


  //select the element in the html page with the same ID, store in a variable
  rBG = select("#rBG");
  gBG = select("#gBG");
  bBG = select("#bBG");
  
  rLg = select("#rLg");
  gLg = select("#gLg");
  bLg = select("#bLg");
  
  rSm = select("#rSm");
  gSm = select("#gSm");
  bSm = select("#bSm");

  radiusSlider = createSlider(40, 300, 120);
  radiusSlider.position(menuXpos, 180);

  largeshapeR = createSlider(0, 255, 0);
  largeshapeR.position(menuXpos, 210);
  largeshapeG = createSlider(0, 255, 0);
  largeshapeG.position(menuXpos, 240);
  largeshapeB = createSlider(0, 255, 0);
  largeshapeB.position(menuXpos, 270);

  radiusColoredSlider = createSlider(40, 150, 50);
  radiusColoredSlider.position(menuXpos, 360);

  smallshapeR = createSlider(0, 255, 200);
  smallshapeR.position(menuXpos, 390);
  smallshapeB = createSlider(0, 255, 0);
  smallshapeB.position(menuXpos, 420);
  smallshapeG = createSlider(0, 255, 0);
  smallshapeG.position(menuXpos, 450);
  
  saveButton = createButton("Save Image");
  saveButton.position(menuXpos - 10, 640);
  saveButton.mousePressed(saveFrame); 

  //randomized number of black shapes
  let n = random(4, 12);
  for (let i = 0; i < n; i++) {
    shape[i] = new Shape(random(width), random(height), random(40, (radiusSlider.value())));
  }
  //randomized number of colored shapes
  let m = random(1, 6);
  for (let i = 0; i < m; i++) {
    shapeC[i] = new secondShape(random(width), random(height), random(40, (radiusColoredSlider.value())));
  }
}

let p = true; //create boolean to pass to the pause function

function pauseDraw() {
  if (p == true) {
    frameRate(0);
    p = false;
  } else {
    frameRate(30);
    p = true;
  }
}

function saveFrame() {
  save("rorschach.jpg");
}

function randomColor() {
  // colorPick =
  bgcolorPickR.value(random(255));
  bgcolorPickG.value(random(255));
  bgcolorPickB.value(random(255));

  largeshapeR.value(random(255));
  largeshapeB.value(random(255));
  largeshapeG.value(random(255));

  smallshapeR.value(random(255));
  smallshapeB.value(random(255));
  smallshapeG.value(random(255));
}

function resetColor() {
  // colorPick =
  bgcolorPickR.value(255);
  bgcolorPickG.value(255);
  bgcolorPickB.value(255);

  largeshapeR.value(0);
  largeshapeB.value(0);
  largeshapeG.value(0);

  smallshapeR.value(200);
  smallshapeB.value(0);
  smallshapeG.value(0);
}

function makeLine() {
  //a center line, for precision
  if (this.checked()) {
    sw = 255;
    print('Line is back!');
  } else {
    print('Line is no more!');
    sw = 0;
  }
}

function draw() {
  background(bgcolorPickR.value(), bgcolorPickG.value(), bgcolorPickB.value());
  stroke(0, sw);
  line(width / 2, height, width / 2, 0);

  for (let i = 0; i < shape.length; i++) {
    shape[i].radiusChange(radiusSlider.value());
    shape[i].move(); //bounce off the edges
    shape[i].show();
  }

  for (let i = 0; i < shapeC.length; i++) {
    shapeC[i].radiusChange(radiusColoredSlider.value());
    shapeC[i].move(); //bounce off the edges
    shapeC[i].show();
  }

  //add background color for item (it might be easier to see the bgColorPickR.value() stored in a variable
  rBG.style("color", color(bgcolorPickR.value(), 0, 0));
  gBG.style("color", color(0, bgcolorPickG.value(), 0));
  bBG.style("color", color(0, 0, bgcolorPickB.value()));
  
  rLg.style("color", color(largeshapeR.value(), 0, 0));
  gLg.style("color", color(0, largeshapeG.value(), 0));
  bLg.style("color", color(0, 0, largeshapeB.value()));
  
  rSm.style("color", color(smallshapeR.value(), 0, 0));
  gSm.style("color", color(0, smallshapeG.value(), 0));
  bSm.style("color", color(0, 0, smallshapeB.value()));
 
  //   shape.push(new Shape(random(width), random(height), random(80, (radiusSlider.value()))));
  //   shape.splice(0, 1);

  //   if (shape2.length >= 3) {
  //     shape2.splice(0, 1);
  //   } else {
  //     shape2.push(new secondShape(random(width), random(height), random(40, (radiusSlider2.value()))));
  //   }
}

//click to rearrange shapes
function reDo() {
  background(bgcolorPickR.value(), bgcolorPickG.value(), bgcolorPickB.value());

  for (let i = 0; i < random(6, 12); i++) {
    shape[i] = new Shape(random(width), random(height), random(40, (radiusSlider.value())));
    // shape.splice(0, 1);
  }
  for (let i = 0; i < random(1, 6); i++) {
    shapeC[i] = new secondShape(random(width), random(height), random(40, (radiusColoredSlider.value())));
    // shapeC.splice(0, 1);
  }
  shape.splice(0, 1);
  shapeC.splice(0, 1);
}

function keyTyped() {
  if (key === 'e') {
    shape.push(new Shape(random(width), random(height), random(80, (radiusSlider.value()))));
    shape.splice(0, 1);
  } else if (key === 'r') {
    // if (shapeC.length >= 6) {
    shapeC.splice(0, 1);
    // } else {
    shapeC.push(new secondShape(random(width), random(height), random(40, (radiusColoredSlider.value()))));
    // }
  }

}

class Shape {

  constructor(x, y, radius) {
    this.x = x + width / 4;
    this.y = y / 2 + height / 4;
    this.radius = radius;
    this.yoff = 0.0;

    //elements for movement!
    this.xDirection = 1;
    this.yDirection = 1;
    this.xAcc = random(0.01, 0.5);
    this.xAngle = random(-180, 180);
    this.yAcc = random(0.01, 0.5);
    this.yAngle = random(-180, 180);
  }

  radiusChange(r) {
    this.radius = r;
  }

  move() {

    //for bouncing off the walls
    if (this.x > width || this.x < 0) {
      this.xDirection = this.xDirection * -1;
    }
    if (this.y > height || this.y < 0) {
      this.yDirection = this.yDirection * -1;
    }


    angleMode(DEGREES); //change angle mode here to DEGREES

    this.x = this.x + (this.xDirection * this.xAcc * cos(this.xAngle));
    this.y = this.y + (this.yDirection * this.yAcc * sin(this.yAngle));
  }


  show() {
    push();
    angleMode(RADIANS); //change angle mode here back to TWO_PI
    translate(this.x / 2, this.y);
    fill(largeshapeR.value(), largeshapeG.value(), largeshapeB.value());
    noStroke();
    let xoff = 0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, this.yoff), 0, 1, -90, 50);

      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
      xoff += 0.1;
    }
    endShape();
    pop();

    push();
    translate(-(this.x / 2) + width, this.y);
    fill(largeshapeR.value(), largeshapeG.value(), largeshapeB.value());
    noStroke();
    beginShape();
    xoff = 0;

    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, this.yoff), 0, 1, -90, 50);
      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(-x, y);
      xoff += 0.1;
    }
    endShape();
    this.yoff += 0.01;
    pop();
  }
}

class secondShape {

  constructor(x, y, radius) {
    this.x = x;
    this.y = y / 2 + height / 4;
    this.radius = radius;
    this.yoff = 0.0;
    
    this.xDirection = 1;
    this.yDirection = 1;
    this.xAcc = random(0.01, 1);
    this.xAngle = random(-180, 180);
    this.yAcc = random(0.01, 1);
    this.yAngle = random(-180, 180);
  }

  radiusChange(r) {
    this.radius = r;
  }

  move() {
    if (this.x > width - 500 || this.x < 0) {
      this.xDirection = this.xDirection * -1;
    }
    if (this.y > height - 500 || this.y < 0) {
      this.yDirection = this.yDirection * -1;
    }


    angleMode(DEGREES); //change angle mode here to DEGREES

    this.x = this.x + (this.xDirection * this.xAcc * cos(this.xAngle));
    this.y = this.y + (this.yDirection * this.yAcc * sin(this.yAngle));
  }

  show() {
    push();
    angleMode(RADIANS);
    translate(this.x, this.y);
    fill(smallshapeR.value(), smallshapeG.value(), smallshapeB.value());
    noStroke();
    let xoff = 0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, this.yoff), 0, 1, -25, 25);
      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
      xoff += 0.1;
    }
    endShape();
    pop();

    push();
    translate(-(this.x) + width, this.y);
    fill(smallshapeR.value(), smallshapeG.value(), smallshapeB.value());
    noStroke();
    xoff = 0
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, this.yoff), 0, 1, -25, 25);
      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(-x, y);
      xoff += 0.1;
    }
    endShape();
    this.yoff += 0.01;
    pop();
  }
}
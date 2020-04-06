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

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight);
  canvas.position(0, 0);
  // noLoop();
  frameRate(30);
  let menuXpos = windowWidth - width - 150;

  checkbox = createCheckbox('Center Line', true);
  checkbox.changed(makeLine);
  checkbox.position(menuXpos - 10, 5);

  button = createButton('Randomize Colors');
  button.position(menuXpos - 10, 460);
  button.mousePressed(randomColor);
  
  buttonRe = createButton('Rearrange Shapes');
  buttonRe.position(menuXpos - 10, 490);
  buttonRe.mousePressed(reDo);

  // checkbox = createCheckbox('Pause', false);
  // checkbox.changed(pauseDraw);

  // colorPick = createColorPicker('black');
  // colorPick.position(0, windowHeight - 30);
  // colorPick2 = createColorPicker('gray');
  // colorPick2.position(200, windowHeight - 30);

  bgcolorPickR = createSlider(0, 255, 255);
  bgcolorPickR.position(menuXpos, 60);
  bgcolorPickG = createSlider(0, 255, 255);
  bgcolorPickG.position(menuXpos, 90);
  bgcolorPickB = createSlider(0, 255, 255);
  bgcolorPickB.position(menuXpos, 120);

  radiusSlider = createSlider(40, 300, 120);
  radiusSlider.position(menuXpos, 180);

  largeshapeR = createSlider(0, 255, 0);
  largeshapeR.position(menuXpos, 210);
  largeshapeG = createSlider(0, 255, 0);
  largeshapeG.position(menuXpos, 240);
  largeshapeB = createSlider(0, 255, 0);
  largeshapeB.position(menuXpos, 270);

  radiusColoredSlider = createSlider(40, 150, 50);
  radiusColoredSlider.position(menuXpos, 330);

  smallshapeR = createSlider(0, 255, 200);
  smallshapeR.position(menuXpos, 360);
  smallshapeB = createSlider(0, 255, 0);
  smallshapeB.position(menuXpos, 390);
  smallshapeG = createSlider(0, 255, 0);
  smallshapeG.position(menuXpos, 420);

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

// function resetShapes() {
//   background(255);
//   offset = 0;
// }

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
    // shape[i].move();
    shape[i].show();
  }

  for (let i = 0; i < shapeC.length; i++) {
    shapeC[i].radiusChange(radiusColoredSlider.value());
    // shapeC[i].move();
    shapeC[i].show();
  }

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
    this.x = x + width/4;
    this.y = y/2 + height/4;
    this.radius = radius;
    this.yoff = 0.0;
  }

  radiusChange(r) {
    this.radius = r;
  }

  move() {
    mov2 = mov2 + 2;
    let n = noise(mov2) * 0.5;

    if (this.x > width || this.x < 0) {
      xDirection = xDirection * -1;
    }
    if (this.y > height || this.y < 0) {
      yDirection = yDirection * -1;
    }

    this.x = this.x + (n * xDirection);
    this.y = this.y + (n * yDirection);
  }


  show() {
    push();
    translate(this.x / 2, this.y);
    fill(largeshapeR.value(), largeshapeG.value(), largeshapeB.value());
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
    translate(-(this.x / 2) + width, this.y);
    fill(largeshapeR.value(), largeshapeG.value(), largeshapeB.value());
    noStroke();
    beginShape();
    xoff = 0;

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

class secondShape {

  constructor(x, y, radius) {
    this.x = x;
    this.y = y/2 + height/4;
    this.radius = radius;
    this.yoff = 0.0;
  }

  radiusChange(r) {
    this.radius = r;
  }

  move() {
    mov = mov + 10;
    let n = noise(mov) * 2;

    // this.x = this.x + n;
    // this.y = this.y + n;
    // if (this.x > width + 10, this.y > height + 10) {
    //   this.x = -10;
    //   this.y = random(height);
    // }

    if (this.x > width || this.x < 0) {
      xDirection = xDirection * -1;
    }
    if (this.y > height || this.y < 0) {
      yDirection = yDirection * -1;
    }

    this.x = this.x + (n * xDirection);
    this.y = this.y + (n * yDirection);
  }

  show() {
    push();
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
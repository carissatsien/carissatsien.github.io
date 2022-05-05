let scoreinfo = [];
let gdpinfo = [];
let socialinfo = [];
let geninfo = [];
let leinfo = [];
let corruptinfo = [];
let freedominfo = [];

let txt;
let data;

let file = '2019.csv';


function preload() {
  data = loadTable(file, 'csv', 'header');
  data2 = loadTable('2015.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1200, 620);
  background(0);

//   selector = createSelect();
//   selector.position(width - 200, height / 24);

//   selector.option('2015');
//   selector.option('2016');
//   selector.option('2017');
//   selector.option('2018');
//   selector.option('2019');
//   selector.selected('2019');

//     selector.changed(mySelectEvent);
  // if (selector.value() == '2019') {
  //   file = '2019.csv';
  //   data = loadTable('2019.csv', 'csv', 'header');
  // } else if (selector.value() == '2015') {
  //   file = '2015.csv';
  //   data = loadTable('2015.csv', 'csv', 'header');
  // }

  //get the amount of rows in the CSV
    let numRows = data.getRowCount();
    score = data.getColumn('Score');
    country = data.getColumn('Country');
    gdp = data.getColumn('GDP');
    social = data.getColumn('Social');
    gen = data.getColumn('Generosity');
    rank = data.getColumn('Rank');
    le = data.getColumn('LifeExpectancy');
    corrupt = data.getColumn('Corruption');
    freedom = data.getColumn('FreedomOfChoice');

  

  for (let i = 0; i < numRows; i++) {

    noStroke();

    x = i * 18 + width / 8 - 3;
    y = height - 185;
    w = 8;

    //multipliers
    l = score[i] * 10;
    m = gdp[i] * 50;
    n = gen[i] * 60;
    o = le[i] * 20;
    p = social[i] * 10;
    q = corrupt[i] * 50;
    r = freedom[i] * 20;

    scoreinfo[i] = new scoreInfo(x, y, w, score[i]);
    gdpinfo[i] = new gdpInfo(x, y - (l + m), w, gdp[i]);
    geninfo[i] = new genInfo(x, y - (l + m + n), w, gen[i]);
    leinfo[i] = new leInfo(x, y - (l + m + n + o), w, le[i]);
    socialinfo[i] = new socialInfo(x, y - (l + m + n + o + p), w, social[i]);
    corruptinfo[i] = new corruptInfo(x, y - (l + m + n + o + p + q), w, corrupt[i]);
    freedominfo[i] = new freedomInfo(x, y - (l + m + n + o + p + q + r), w, freedom[i]);

    fill(255);
    textSize(10);
    textAlign(CENTER);
    text(rank[i], i * 18 + width / 8, (height - 170));

    push();
    translate(i * 18 + width / 8, (height - 160));
    rotate(45);
    textAlign(LEFT);
    textSize(14);
    text(country[i], 0, 0);
    pop();

    //color key
    w1 = width / 18;
    h1 = height - 500;
    h2 = height - 485;
    textAlign(LEFT);
    noStroke();
    fill(255);
    rect(w1, h1, 20, 20);
    textSize(18);
    text('Score', w1 + 30, h2);
    fill('green');
    rect(w1 + 100, h1, 20, 20);
    text('GDP', w1 + 130, h2);
    fill('tomato');
    rect(w1 + 190, h1, 20, 20);
    text('Generosity', w1 + 220, h2);
    fill('yellow');
    rect(w1 + 330, h1, 20, 20);
    text('Life Expectancy', w1 + 360, h2);
    fill('pink');
    rect(w1 + 510, h1, 20, 20);
    text('Social Support', w1 + 540, h2);
    fill('powderblue');
    rect(w1 + 680, h1, 20, 20);
    text('Trust in Government', w1 + 710, h2);
    fill('teal');
    rect(w1 + 900, h1, 20, 20);
    text('Freedom of Choice', w1 + 930, h2);

    textSize(32);
    fill(255);
    textAlign(CENTER);
    text('Most and Least Happiest Countries in 2019', width / 2, height / 10);
    textSize(16);
    fill(255);
    textAlign(CENTER);
    text('(based on World Happiness Report data)', width / 2, (height / 10) + 25);
  }
  
  noLoop();

}

function mySelectEvent() {
  
  if (selector.value() == '2015') {
    
    background(0);
    setup();
    let numRows = data2.getRowCount();
    score = data2.getColumn('Score');
    country = data2.getColumn('Country');
    gdp = data2.getColumn('GDP');
    social = data2.getColumn('Social');
    gen = data2.getColumn('Generosity');
    rank = data2.getColumn('Rank');
    le = data2.getColumn('LifeExpectancy');
    corrupt = data2.getColumn('Corruption');
    let freedom = data2.getColumn('FreedomOfChoice');
    
    

  }
  
  // let item = selector.value(); //store the value of the item in a variable
  // if (selector.value() == '2015') {
  //   let file = '2015.csv';
  //   redraw();
  // } else if (selector.value() == '2019') {
  //    let file = '2019.csv'; 
  // }
}

function draw() {
  for (let i = 0; i < scoreinfo.length; i++) {
    scoreinfo[i].show();
    gdpinfo[i].show();
    socialinfo[i].show();
    geninfo[i].show();
    leinfo[i].show();
    corruptinfo[i].show();
    freedominfo[i].show();
  }
}

class scoreInfo {
  constructor(x, y, w, score) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.score = score * 10;
  }
  show() {
    fill(255);
    rect(this.x, this.y - this.score, this.w, this.score);
  }
}

class gdpInfo {
  constructor(x, y, w, gdp, score) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.gdp = gdp * 50;
    this.score = score * 10;
  }
  show() {
    fill('green');
    rect(this.x, this.y, this.w, this.gdp);
  }
}

class socialInfo {
  constructor(x, y, w, social) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.social = social * 10;
  }
  show() {
    fill('pink');
    rect(this.x, this.y, this.w, this.social);
  }
}

class genInfo {
  constructor(x, y, w, gen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.gen = gen * 60;
  }
  show() {
    fill('tomato');
    rect(this.x, this.y, this.w, this.gen);
  }
}

class leInfo {
  constructor(x, y, w, le) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.le = le * 20;
  }
  show() {
    fill('yellow');
    rect(this.x, this.y, this.w, this.le);
  }
}

class corruptInfo {
  constructor(x, y, w, corrupt) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.corrupt = corrupt * 50;
  }
  show() {
    fill('powderblue');
    rect(this.x, this.y, this.w, this.corrupt);
  }
}

class freedomInfo {
  constructor(x, y, w, freedom) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.freedom = freedom * 20;
  }
  show() {
    fill('teal');
    rect(this.x, this.y, this.w, this.freedom);
  }
}
let grid;
let grid_new;
let score = 0;

function setup() {
  createCanvas(1900, 500);
  noLoop();
  grid = blankGrid();
  grid_new = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      alert("Game Over");
    }

    let gamewon = isGameWon();
    if (gamewon) {
      alert("Hurray!! You Won");
    }
  }
}

function updateCanvas() {
  background(0,255,255);
  drawGrid();
  select('#score').html("Score : "+score);
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) {
        //stroke(200, 0, 200);
        //strokeWeight(4);
        grid_new[i][j] = 0;
      } else {
        strokeWeight(4);
        stroke(0);
      }

      if (val != 0) {
        fill(colorsSizes[s].color);
      } else {
        noFill();
      }
      rect( 750+ i * w, 10 + j * w, w, w,20);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorsSizes[s].size);
        text(val, 750 + i * w + w / 2, 10 + j * w + w / 2);
      }
    }
  }
}
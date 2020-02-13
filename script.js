WIDTH = 250;
NB_OF_SQR = 8;
BORDER_SIZE = 1;
NB_OF_MINES = 10;
SQR_SIZE = WIDTH / NB_OF_SQR - 2 * BORDER_SIZE;
DARK_GREEN = "#8cba51";
LIGHT_GREEN = "#deff8b";
DARK_BROWN = "#8f4426";
LIGHT_BROWN = "#de6b35";

var minesArray = [];
var mapMatrix = [];

var hexDigits = new Array(
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f"
);

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}

function squareClick(event) {
  console.log(event);
  changeColour(document.getElementById(event.target.id));
}

function init() {
  for (var i = 0; i < NB_OF_SQR; i++) {
    let lineArr = [];
    for (var j = 0; j < NB_OF_SQR; j++) {
      var id = "box_" + i + "-" + j;
      var divE = document.createElement("div");
      divE.addEventListener("click", squareClick);
      divE.id = id;
      divE.style.width = SQR_SIZE + "px";
      divE.style.height = SQR_SIZE + "px";
      if (i % 2 == 0) {
        divE.style.backgroundColor = j % 2 == 0 ? DARK_GREEN : LIGHT_GREEN;
      } else {
        divE.style.backgroundColor = j % 2 == 1 ? DARK_GREEN : LIGHT_GREEN;
      }
      divE.style.top = i * SQR_SIZE + "px";
      divE.style.left = j * SQR_SIZE + "px";
      document.getElementById("big_box").appendChild(divE);
      lineArr.push(0);
    }
    mapMatrix.push(lineArr);
  }

  generateMines();
  // addMinesToField();
  nbTheSquare();
}

function generateMines() {
  var arr = [];
  while (arr.length < NB_OF_MINES) {
    var r = Math.floor(Math.random() * Math.pow(NB_OF_SQR, 2));
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      var obj = { x: r % NB_OF_SQR, y: Math.floor(r / NB_OF_SQR) };
      mapMatrix[obj.x][obj.y] = "M";
      minesArray.push(obj);
    }
  }
  console.log(mapMatrix);
}

function addMinesToField() {
  minesArray.forEach(function(elemnt) {
    document
      .getElementById("box_" + elemnt.x + "-" + elemnt.y)
      .classList.add("mine");
  });
}

function changeColour(el) {
  console.log(el.style);
  el.style.backgroundColor =
    rgb2hex(el.style.backgroundColor) == DARK_GREEN ? DARK_BROWN : LIGHT_BROWN;
}

function nbTheSquare() {
  // mapMatrix[2][2] = checkNeighbours(2, 2);

  for (var i = 0; i < NB_OF_SQR; i++) {
    for (var j = 0; j < NB_OF_SQR; j++) {
      if (mapMatrix[i][j] != "M") {
        mapMatrix[i][j] = checkNeighbours(i, j);
        document.getElementById("box_" + i + "-" + j).innerText =
          mapMatrix[i][j];
      }
    }
  }
}

function checkNeighbours(x, y) {
  var nbOfMines = 0;
  nbOfMines += x > 0 && mapMatrix[x - 1][y] == "M" ? 1 : 0;
  nbOfMines +=
    x > 0 && y < NB_OF_SQR - 1 && mapMatrix[x - 1][y + 1] == "M" ? 1 : 0;
  nbOfMines += y < NB_OF_SQR - 1 && mapMatrix[x][y + 1] == "M" ? 1 : 0;
  nbOfMines +=
    x < NB_OF_SQR - 1 && y < NB_OF_SQR - 1 && mapMatrix[x + 1][y + 1] == "M"
      ? 1
      : 0;
  nbOfMines += x < NB_OF_SQR - 1 && mapMatrix[x + 1][y] == "M" ? 1 : 0;
  nbOfMines +=
    y > 0 && x < NB_OF_SQR - 1 && mapMatrix[x + 1][y - 1] == "M" ? 1 : 0;
  nbOfMines += y > 0 && mapMatrix[x][y - 1] == "M" ? 1 : 0;
  nbOfMines += x > 0 && y > 0 && mapMatrix[x - 1][y - 1] == "M" ? 1 : 0;
  return nbOfMines;
}

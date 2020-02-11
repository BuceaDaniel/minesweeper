WIDTH = 250;
NB_OF_SQR = 8;
BORDER_SIZE = 1;
NB_OF_MINES = 10;
SQR_SIZE = WIDTH / NB_OF_SQR - 2 * BORDER_SIZE;
DARK_GREEN = "#8cba51";
LIGHT_GREEN = "#deff8b";

var minesArray = [];

function init() {
  for (var i = 0; i < NB_OF_SQR; i++) {
    for (var j = 0; j < NB_OF_SQR; j++) {
      var id = "box_" + i + "-" + j;
      var divE = document.createElement("div");
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
    }
  }
  generateMines();
  addMinesToField();
}

function generateMines() {
  var arr = [];
  while (arr.length < NB_OF_MINES) {
    var r = Math.floor(Math.random() * Math.pow(NB_OF_SQR, 2));
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      console.log(r);
      minesArray.push({ x: r % NB_OF_SQR, y: Math.floor(r / NB_OF_SQR) });
    }
  }
  console.log(minesArray);
}

function addMinesToField() {
  minesArray.forEach(function(elemnt) {
    console.log("box_" + elemnt.x + "-" + elemnt.y);
    console.log(document.getElementById("box_" + elemnt.x + "-" + elemnt.y));
    document
      .getElementById("box_" + elemnt.x + "-" + elemnt.y)
      .classList.add("mine");
  });
}

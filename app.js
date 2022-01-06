const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clearBtn = document.getElementById("jsClear");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  ctx.lineWidth = brushSize.value;

  if (!painting) {
    // 기존의 경로를 삭제하고 새 경로를 만듦 painting 값이 flase가 되면 그리던 선을 끝마치고 새 경로를 만듦
    ctx.beginPath();
    // 새 경로를 만들진 않지만, 지금 경로의 위치를 옮겨줌 painting 값이 false가 되면 그림을 그리진 않지만, 위치값만 옮겨줌
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

function onMouseEnter(event) {
  x = event.offsetX;
  y = event.offsetY;
  ctx.moveTo(x, y);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleModeClick() {
  if (filling) {
    mode.innerText = "Fill";
    filling = false;
  } else {
    mode.innerText = "Paint";
    filling = true;
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function canvasClear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  //   mousedown 은 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mousedown", startPainting);
  //   mouseup 은 클릭을 풀었을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
}

// Array.from 은 오브젝트를 배열로 만들어준다
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

mode.addEventListener("click", handleModeClick);
clearBtn.addEventListener("click", canvasClear);

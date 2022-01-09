const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clearBtn = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    //캔버스 x = 0, y = 0 좌표 기준으로 canvas.width 넓이 만큼, canvas.height 높이 만큼 채워준다
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function canvasClear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function canvasSave() {
  const link = document.createElement("a");

  // toDataURL 은 지정된 type parameter(기본값 PNG)에 의해 지정된 포맷의 포맷의 이미지 표현을 포함한 data URL을 반환
  link.href = canvas.toDataURL("image/png");
  // download 는 a 의 attribute 로 url로 가는 대신 다운로드함
  link.download = "PaintJS";
  link.click();
}

function handleCM(event) {
  // preventDefault는 기본 동작을 실행하지 않도록 해서 우클릭 시 나오는 메뉴 이벤트가 나오지 않게 한다.
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  //   mousedown 은 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mousedown", startPainting);
  //   mouseup 은 클릭을 풀었을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  // contextmenu 는 우클릭 했을 때 나오는 메뉴 이벤트
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from 은 오브젝트를 배열로 만들어준다
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

mode.addEventListener("click", handleModeClick);
clearBtn.addEventListener("click", canvasClear);
saveBtn.addEventListener("click", canvasSave);

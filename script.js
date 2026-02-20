const canvas = document.getElementById("actaCanvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const acceptBtn = document.getElementById("acceptBtn");
const overlayText = document.getElementById("overlayText");

const petalsCanvas = document.getElementById("petalsCanvas");
const petalsCtx = petalsCanvas.getContext("2d");

let drawing = false;
let background = new Image();
background.src = "acta.png";

background.onload = function() {
  canvas.width = background.width;
  canvas.height = background.height;
  ctx.drawImage(background, 0, 0);
};

function redrawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
}

canvas.addEventListener("pointerdown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointermove", (e) => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();
});

canvas.addEventListener("pointerup", () => drawing = false);
canvas.addEventListener("pointerleave", () => drawing = false);

musicBtn.addEventListener("click", () => {
  music.play();
  musicBtn.style.display = "none";
});

// -------- PÉTALOS --------

petalsCanvas.width = window.innerWidth;
petalsCanvas.height = window.innerHeight;

let petals = [];
let petalsActive = false;

class Petal {
  constructor() {
    this.x = Math.random() * petalsCanvas.width;
    this.y = Math.random() * -petalsCanvas.height;
    this.size = Math.random() * 8 + 5;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
  }

  draw() {
    petalsCtx.save();
    petalsCtx.translate(this.x, this.y);
    petalsCtx.rotate(this.rotation);
    petalsCtx.fillStyle = "pink";
    petalsCtx.beginPath();
    petalsCtx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
    petalsCtx.fill();
    petalsCtx.restore();
  }
}

function animatePetals() {
  if (!petalsActive) return;

  petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);

  petals.forEach((petal) => {
    petal.update();
    petal.draw();
  });

  requestAnimationFrame(animatePetals);
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "Acta_Yulissa_y_Uriel.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

acceptBtn.addEventListener("click", () => {

  petalsActive = true;

  for (let i = 0; i < 100; i++) {
    petals.push(new Petal());
  }

  animatePetals();

  overlayText.style.opacity = "1";

  music.play();

  downloadImage();

  acceptBtn.disabled = true;

});

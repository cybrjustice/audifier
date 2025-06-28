// ========== DOM Elements ==========
const spectrumCanvas = document.getElementById('spectrum');
const toggle3DViewBtn = document.getElementById('toggle3DViewBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fftContainer = document.getElementById('fftContainer');
const joystick = document.getElementById('joystick');
const joystickInner = document.getElementById('joystickInner');
const fftLabel = document.getElementById('fft-label');

// ========== View State ==========
let is3DView = false;
let rotX = -0.6, rotY = 0.0, scale = 1.0;
let dragOrigin = null;
let spectrumAnimation = null;

function saveViewState() {
  localStorage.setItem('audifier_view', JSON.stringify({ is3DView, rotX, rotY, scale }));
}
function loadViewState() {
  const st = localStorage.getItem('audifier_view');
  if (st) {
    try {
      let v = JSON.parse(st);
      is3DView = !!v.is3DView;
      rotX = typeof v.rotX === "number" ? v.rotX : -0.6;
      rotY = typeof v.rotY === "number" ? v.rotY : 0.0;
      scale = typeof v.scale === "number" ? v.scale : 1.0;
    } catch(e) {}
  }
}
loadViewState();

// ========== FFT Draw ==========
function applyTransform(ctx, W, H) {
  ctx.translate(W/2, H*0.6);
  ctx.scale(scale,scale);
  ctx.rotate(rotY);
  ctx.transform(1, 0, 0.7*Math.sin(rotX), Math.cos(rotX), 0, 0);
  ctx.translate(-W/2, -H*0.6);
}
function drawSpectrum() {
  const ctx = spectrumCanvas.getContext('2d');
  const W = spectrumCanvas.width, H = spectrumCanvas.height;
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, W, H);
  if (is3DView) { applyTransform(ctx, W, H); }
  // Dummy FFT bars for visual demo
  for (let i=1; i<500; i++) {
    let x = Math.log10((i*40+100)/100) / Math.log10(20000/100) * W;
    let v = Math.max(0, Math.sin(i/22 + rotY)*0.7 + Math.cos(i/16 + rotX)*0.3);
    let y = H - v*H*0.7;
    ctx.fillStyle = is3DView ? "#7dd3fc" : "#38bdf8";
    ctx.fillRect(x, y, 2, H-y);
  }
  spectrumAnimation = requestAnimationFrame(drawSpectrum);
}

// ========== UI/Interaction ==========
toggle3DViewBtn.onclick = ()=>{
  is3DView = !is3DView;
  toggle3DViewBtn.textContent = is3DView ? "2D" : "3D";
  fftLabel.textContent = is3DView
    ? "Click and drag or use the joystick to rotate/zoom the 3D spectrum. Double-click to reset view."
    : "Log FFT | X: freq, Y: amplitude. Click spectrum to take a visual snapshot.";
  saveViewState();
  drawSpectrum();
}
spectrumCanvas.addEventListener('mousedown', e=>{
  dragOrigin = {x:e.clientX, y:e.clientY, rotX, rotY, scale};
  spectrumCanvas.style.cursor = "grabbing";
});
window.addEventListener('mousemove', e=>{
  if (!dragOrigin) return;
  let dx = e.clientX - dragOrigin.x, dy = e.clientY - dragOrigin.y;
  if (e.shiftKey) {
    scale = Math.max(0.5, Math.min(4, dragOrigin.scale * (1 + dy/180)));
  } else {
    rotY = dragOrigin.rotY + dx/180;
    rotX = dragOrigin.rotX + dy/180;
    rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX));
  }
  saveViewState();
});
window.addEventListener('mouseup', e=>{
  dragOrigin = null;
  spectrumCanvas.style.cursor = "grab";
});
spectrumCanvas.addEventListener('wheel', e=>{
  scale = Math.max(0.5, Math.min(4, scale * (e.deltaY>0 ? 0.92 : 1.08)));
  e.preventDefault();
  saveViewState();
});
spectrumCanvas.addEventListener('dblclick', ()=>{
  rotX = -0.6; rotY = 0; scale = 1.0;
  saveViewState();
  drawSpectrum();
});

// Fullscreen logic
function setFSStyle(on) {
  if (on) {
    fftContainer.style.position = "fixed";
    fftContainer.style.left = "0";
    fftContainer.style.top = "0";
    fftContainer.style.width = "100vw";
    fftContainer.style.height = "100vh";
    fftContainer.style.zIndex = 100;
  } else {
    fftContainer.style.position = "";
    fftContainer.style.left = "";
    fftContainer.style.top = "";
    fftContainer.style.width = "";
    fftContainer.style.height = "";
    fftContainer.style.zIndex = "";
  }
}
fullscreenBtn.onclick = ()=>{
  if (document.fullscreenElement) {
    document.exitFullscreen();
    setFSStyle(false);
  } else {
    fftContainer.requestFullscreen();
    setFSStyle(true);
  }
};
document.addEventListener('fullscreenchange', ()=>{
  if (!document.fullscreenElement) setFSStyle(false);
});

// Joystick logic
let joystickActive = false;
let joyCenter = {x: 46, y: 46};
let joyState = {x: 0, y: 0};
function updateJoystick(dx, dy) {
  let mx = Math.max(-30, Math.min(30, dx));
  let my = Math.max(-30, Math.min(30, dy));
  joystickInner.style.transform = `translate(${mx}px,${my}px)`;
  joyState = {x: mx/30, y: my/30};
  if (is3DView) {
    rotY += joyState.x * 0.03;
    rotX += joyState.y * 0.03;
    rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX));
    saveViewState();
    drawSpectrum();
  }
}
function resetJoystick() {
  joystickInner.style.transform = `translate(0px,0px)`;
  joyState = {x: 0, y: 0};
}
joystickInner.addEventListener('mousedown', e=>{
  joystickActive = true;
  e.preventDefault();
  e.stopPropagation();
});
window.addEventListener('mousemove', e=>{
  if (!joystickActive) return;
  let rect = joystick.getBoundingClientRect();
  let dx = e.clientX - (rect.left + joyCenter.x);
  let dy = e.clientY - (rect.top + joyCenter.y);
  updateJoystick(dx, dy);
});
window.addEventListener('mouseup', e=>{
  if (joystickActive) {
    joystickActive = false;
    resetJoystick();
  }
});
// Touch support
joystickInner.addEventListener('touchstart', e=>{
  joystickActive = true;
  e.preventDefault();
  e.stopPropagation();
}, {passive: false});
window.addEventListener('touchmove', e=>{
  if (!joystickActive) return;
  let touch = e.touches[0];
  let rect = joystick.getBoundingClientRect();
  let dx = touch.clientX - (rect.left + joyCenter.x);
  let dy = touch.clientY - (rect.top + joyCenter.y);
  updateJoystick(dx, dy);
}, {passive: false});
window.addEventListener('touchend', e=>{
  if (joystickActive) {
    joystickActive = false;
    resetJoystick();
  }
}, {passive: false});

// ========== Init ==========
fftLabel.textContent = is3DView
  ? "Click and drag or use the joystick to rotate/zoom the 3D spectrum. Double-click to reset view."
  : "Log FFT | X: freq, Y: amplitude. Click spectrum to take a visual snapshot.";
drawSpectrum();
window.addEventListener('resize', ()=>{
  spectrumCanvas.width = fftContainer.offsetWidth - 8;
  spectrumCanvas.height = fftContainer.offsetHeight - 8;
  drawSpectrum();
});
setTimeout(()=>{
  spectrumCanvas.width = fftContainer.offsetWidth - 8;
  spectrumCanvas.height = fftContainer.offsetHeight - 8;
  drawSpectrum();
},50);
window.addEventListener('beforeunload', saveViewState);

// ========== (You can restore all your original controls and logic in the controls panel and hook into this canvas logic) ==========

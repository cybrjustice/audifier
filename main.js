// === Audifier Main JS ===

// ----- Audify Reference Visibility (PR Fix) -----
const audifyCheck = document.getElementById('audifyCheck');
const audifyRefContainer = document.getElementById('audifyRefContainer');

function updateAudifyRefVisibility() {
  if (audifyCheck.checked) {
    audifyRefContainer.classList.remove('hidden');
  } else {
    audifyRefContainer.classList.add('hidden');
  }
}
updateAudifyRefVisibility();
audifyCheck.addEventListener('input', updateAudifyRefVisibility);

// ----- DOM Elements -----
const freqSlider = document.getElementById('frequencySlider');
const freqInput = document.getElementById('freqInput');
const freqLabel = document.getElementById('freqLabel');
const waveformSelect = document.getElementById('waveformSelect');
const gainSlider = document.getElementById('gainSlider');
const gainLabel = document.getElementById('gainLabel');
const harmonicsCheck = document.getElementById('harmonicsCheck');
const audifyRefSlider = document.getElementById('audifyRefSlider');
const audifyRefLabel = document.getElementById('audifyRefLabel');
const powerBtn = document.getElementById('powerBtn');
const statusLabel = document.getElementById('status');
const spectrumCanvas = document.getElementById('spectrum');
const toggle3DViewBtn = document.getElementById('toggle3DViewBtn');
const fftLabel = document.getElementById('fft-label');
const snapshotModal = document.getElementById('snapshotModal');
const exportLogBtn = document.getElementById('exportLogBtn');
const snapshotLogArea = document.getElementById('snapshotLogArea');
const snapCountLabel = document.getElementById('snapCount');
const pulseIntervalInp = document.getElementById('pulseInterval');
const presetPulse = document.getElementById('presetPulse');
const presetByeFly = document.getElementById('presetByeFly');
const presetBatSonar = document.getElementById('presetBatSonar');
const presetDogWhistle = document.getElementById('presetDogWhistle');
const presetScience = document.getElementById('presetScience');
const presetStop = document.getElementById('presetStop');
const experimentNameInp = document.getElementById('experimentName');
const saveExperimentBtn = document.getElementById('saveExperimentBtn');
const experimentsSelect = document.getElementById('experimentsSelect');
const exportExperimentsBtn = document.getElementById('exportExperimentsBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fftContainer = document.getElementById('fftContainer');
const visualizeIntented = document.getElementById('visualizeIntented');
const hearIntented = document.getElementById('hearIntented');
const simNotice = document.getElementById('simNotice');
const joystick = document.getElementById('joystick');
const joystickInner = document.getElementById('joystickInner');

// ---- Rest of original functionality below ----
// You should paste or keep all your original signal generation, UI logic, 
// FFT visualization, experiment manager, and snapshot code below this section.
// No features removed! Only Audify Reference visibility is improved above.

// Example: if you had
// function powerOn() { ... }
// function drawSpectrum() { ... }
// etc.
// Those remain unchanged and go below this comment.

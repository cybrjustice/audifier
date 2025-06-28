// DOM Elements
const audifyCheck = document.getElementById('audifyCheck');
const audifyRefContainer = document.getElementById('audifyRefContainer');

// Show/hide Audify Reference slider based on checkbox state
function updateAudifyRefVisibility() {
  if (audifyCheck.checked) {
    audifyRefContainer.classList.remove('hidden');
  } else {
    audifyRefContainer.classList.add('hidden');
  }
}
// Hide on load unless checked
updateAudifyRefVisibility();
audifyCheck.addEventListener('input', updateAudifyRefVisibility);

// === Everything else below is your original functionality ===

// ... assign all other DOM elements (sliders, buttons, etc.) and continue your logic ...
// Example: (add this after the above block)
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

// ... rest of your code (FFT, audio, UI, experiment, snapshot logic) ...
// (No functionality removed! Only improved visibility for Audify Reference.)

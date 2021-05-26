const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano__key');

//Mouse region
piano.addEventListener('mousedown', pianoHandler);
document.addEventListener('mouseup', removePianoListener);

function pianoHandler(e) {
  mouseHandler(e);
  pianoKeys.forEach(el => {
    el.addEventListener('mouseover', mouseHandler);
    el.addEventListener('mouseout', removeClass);
  });
}

function removePianoListener(e) {
  pianoKeys.forEach(el => {
    el.classList.remove('piano__key_active');
    el.removeEventListener('mouseover', mouseHandler);
    el.removeEventListener('mouseout', removeClass);
  });
}

function removeClass(e) {
  e.target.classList.remove('piano__key_active');
}

function mouseHandler(e) {
  if(!e.target.classList.contains("piano__key") || e.buttons === 0) return;

  const target = e.target;
  target.classList.add('piano__key_active');
  playAudio(target);
}

//Keyboard region
window.addEventListener('keydown', keyHandler, false);
window.addEventListener('keyup', removeKey, false);

function keyHandler(e) {
  if (e.repeat) return;

  const pianoKey = piano.querySelector(`.piano__key[data-letter="${String.fromCharCode(e.keyCode)}"]:not(.piano__key_active)`);

  if (!pianoKey) return;

  pianoKey.classList.add('piano__key_active');
  playAudio(pianoKey);
}

function removeKey(e) {
  const pianoKey = piano.querySelector(`.piano__key[data-letter="${String.fromCharCode(e.keyCode)}"]`);

  if (!pianoKey) return;

  pianoKey.classList.remove('piano__key_active');
}

//Audio region
function playAudio(key) {
  const audio = new Audio();
  const note = key.dataset.note;
  audio.src = `assets/audio/${note}.mp3`;
  audio.play();
}

// Fullscreen region
const fullscreen = document.querySelector('.fullscreen__button');

fullscreen.addEventListener('click', fullscreenHandler);

function fullscreenHandler(e) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Key switch
const notes = document.querySelector('.btn__notes');
const letters = document.querySelector('.btn__letters');

notes.addEventListener('click', function () {
  if (this.classList.contains('btn-active')) return;
  this.classList.add('btn-active');
  letters.classList.remove('btn-active');

  pianoKeys.forEach(el => el.classList.remove('piano__key-letter'));
});

letters.addEventListener('click', function () {
  if (this.classList.contains('btn-active')) return;
  this.classList.add('btn-active');
  notes.classList.remove('btn-active');

  pianoKeys.forEach(el => el.classList.add('piano__key-letter'));
});

var recorder = document.getElementById('recorder');
var player = document.getElementById('player');

recorder.addEventListener('change', function(e) {
  var file = e.target.files[0];
  // Do something with audio file.
  player.src = URL.createObjectURL(file);
});

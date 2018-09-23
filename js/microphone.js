/* var recorder = document.getElementById('recorder'); */
var player = document.getElementById('player');

/* recorder.addEventListener('change', function(e) {
 *   var file = e.target.files[0];
 *   // Do something with audio file.
 *   player.src = URL.createObjectURL(file);
 * });
 *  */

var handleSuccess = function(stream) {
  var context = new AudioContext();
  var source = context.createMediaStreamSource(stream);
  var processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = function(e) {
    // do something with the data
    console.log(e.inputBuffer);
  }

  /* if (window.URL) {
   *   player.src = window.URL.createObjectURL(stream);
   * } else {
   *   player.src = stream;
   * } */
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false})
         .then(handleSuccess);

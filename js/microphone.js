/* var recorder = document.getElementById('recorder'); */
// var player = document.getElementById('player');

/* recorder.addEventListener('change', function(e) {
 *   var file = e.target.files[0];
 *   // Do something with audio file.
 *   player.src = URL.createObjectURL(file);
 * });
 *  */

// var handleSuccess = function(stream) {
//   var context = new AudioContext();
//   var source = context.createMediaStreamSource(stream);
//   var processor = context.createScriptProcessor(1024, 1, 1);

//   source.connect(processor);
//   processor.connect(context.destination);

//   processor.onaudioprocess = function(e) {
//     // do something with the data
//     console.log(e.inputBuffer);
//   };

//   /* if (window.URL) {
//    *   player.src = window.URL.createObjectURL(stream);
//    * } else {
//    *   player.src = stream;
//    * } */
// };

// navigator.mediaDevices.getUserMedia({ audio: true, video: false})
//          .then(handleSuccess);

// navigator.mediaDevices.getUserMedia({audio: true})
//   .then(function(stream) {
//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     const audioChunks = [];

//     mediaRecorder.addEventListener("dataavailable", function(event) {
//       audioChunks.push(event.data);
//     });

//     mediaRecorder.addEventListener("stop", function() {
//       const audioBlob = new Blob(audioChunks);
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//       audio.play();
//     });

//     setTimeout(function() {
//       mediaRecorder.stop();
//     }, 3000);
//   });


const recordAudio = () => {
  return new Promise(resolve => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        const start = () => {
          mediaRecorder.start();
        };

        const stop = () => {
          return new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => {
                audio.play();
              };

              resolve({ audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
          });
        };

        resolve({ start, stop });
      });
  });
};


(async () => {
  var player = document.getElementById('player');
  player.disabled = true;
  const recorder = await recordAudio();
  recorder.start();

  setTimeout(async () => {
    const audio = await recorder.stop();
    // var player = document.getElementById('player');
    player.disabled = false;
    player.addEventListener("click", () => audio.play());
    // audio.play();
  }, 3000);
})();

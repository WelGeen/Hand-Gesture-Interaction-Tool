	const win_innerWidth = window.innerWidth;
	const videoElement = document.querySelector('.input_video');
	const canvasElement = document.querySelector('.output_canvas');
	const ctx = canvasElement.getContext('2d');
	
	/// standaard  gebruikerscode / function
	function draw(x, y, z) {
	  ctx.beginPath();
	  ctx.arc(x, y, 10, 0, 2 * Math.PI);
	  ctx.strokeStyle = 'red';
	  ctx.lineWidth = 2;
	  ctx.stroke();
	}

    // Initialize CodeMirror editor
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: "javascript",
      lineNumbers: true,
      theme: "default",
    });
	
	editor.setSize(null, `${window.innerHeight / 2}px`);
	
	// Run de gebruikerscode en sla deze op in de localStorage
	document.getElementById('run-button').addEventListener('click', () => {
	  const userCode = editor.getValue();
	  
	  try {
		draw = new Function('x', 'y', 'z', userCode);
		localStorage.setItem('userCode', userCode);
		console.log("Code succesvol uitgevoerd en opgeslagen!", userCode);
	  } catch (error) {
		console.error("Fout in gebruikerscode:", error);
	  }
	});
		

		const hands = new Hands({
			locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
		});

		hands.setOptions({
			maxNumHands: 1,
			modelComplexity: 1,
			minDetectionConfidence: 0.7,
			minTrackingConfidence: 0.7
		});

		hands.onResults(onResults);

		const camera = new Camera(videoElement, {
			onFrame: async () => {
		await hands.send({ image: videoElement });
		},
			width: win_innerWidth/2,
			height: 720
		});
		camera.start();

		function onResults(results) {
			canvasElement.width = videoElement.videoWidth;
			canvasElement.height = videoElement.videoHeight;

			// Spiegel het canvas horizontaal
			ctx.save();
			ctx.scale(-1, 1); // Spiegel horizontaal
			ctx.translate(-canvasElement.width, 0); // Corrigeer de verschuiving

			// Teken het gespiegelde videobeeld
			ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

			if (results.multiHandLandmarks && results.multiHandedness) {
				for (let i = 0; i < results.multiHandedness.length; i++) {
				  if (results.multiHandedness[i].label === "Right") {
					landmarks = results.multiHandLandmarks[i];

					for (let j = 4; j < 21; j += 4) { // Vingertoppen: 4, 8, 12, 16, 20
					  x = landmarks[j].x * canvasElement.width;
					  y = landmarks[j].y * canvasElement.height;
					  z = landmarks[j].z;
					  
					  draw(x,y,z);
						
					}
				  }
				}
			}

			ctx.restore(); // Herstel de originele niet-gespiegelde staat
		}
	
		// Bij het laden van de pagina: lees de opgeslagen code uit de localStorage
		window.addEventListener('load', () => {
		  const savedCode = localStorage.getItem('userCode');
		  
		  if (savedCode) {
			try {
			  draw = new Function('x', 'y', 'z', savedCode);
			  editor.setValue(savedCode);
			  console.log("Opgeslagen code geladen en toegepast:", savedCode);
			} catch (error) {
			  console.error("Fout in de opgeslagen code bij het laden:", error);
			}
		  } else {
			console.log("Geen opgeslagen code gevonden.");
		  }
		});




///// exercises
  let codeMirrorInstance;
  var  alert_flag = false;
  function showOverlay(index) {
    const overlay = document.getElementById('overlay');
    const exercise = exercises[index];

    document.getElementById('exercise-title').textContent = exercise.title;
    document.getElementById('exercise-description').textContent = exercise.description;

    codeEditor = document.getElementById('code-editor');
    codeEditor.value = exercise.code;

    overlay.style.display = 'block';

    if (!codeMirrorInstance) {
      codeMirrorInstance = CodeMirror.fromTextArea(codeEditor, {
        mode: "javascript",
        theme: "default",
        lineNumbers: true
      });
    } else {
      codeMirrorInstance.setValue(exercise.code);
    }
  }

  function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }
  
 document.getElementById("copy-button").addEventListener("click", function() {
    // Verkrijg de tekst uit de textarea
    var text = codeMirrorInstance.getValue();
    
    // Maak tijdelijk een input-element om de tekst naar het klembord te kopiëren
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select(); // Selecteer de tekst in de textarea
    document.execCommand("copy"); // Kopieer de tekst naar het klembord
    document.body.removeChild(textarea); // Verwijder het tijdelijke textarea-element
    
    // Optioneel: Geef een melding dat de tekst is gekopieerd
	if (alert_flag == false){
		alert_flag = true;
		alert("Tekst gekopieerd naar het klembord!");
	}
});
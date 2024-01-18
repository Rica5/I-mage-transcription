var imgToProcess = document.getElementById("imgToProcess");
var result = document.getElementById("result");
var waiting = document.getElementById("waiting");
var nothing = document.getElementById("nothing");
var textResult = document.getElementById("textResult");
var imgShown = document.getElementById("imgShown");
var textShown = document.getElementById("textShown");
var textFictif = "The text transcripted will be shown on this section. Please note that this is only a display text, you should put the appropriate result here.";
var handBtn = document.getElementById("handwritten");
var printBtn = document.getElementById("print");
var optionText = "Print";
var docLanguage = document.getElementById("docLanguage");
var siteLanguage = document.getElementById("siteLanguage");
(function () {
	function Init() {
		var fileSelect = document.getElementById('file-upload'),
			fileDrag = document.getElementById('file-drag');
			

		fileSelect.addEventListener('change', fileSelectHandler, false);

		// Is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			// File Drop
			fileDrag.addEventListener('dragover', fileDragHover, false);
			fileDrag.addEventListener('dragleave', fileDragHover, false);
			fileDrag.addEventListener('drop', fileSelectHandler, false);
		}
	}

	function fileDragHover(e) {
		var fileDrag = document.getElementById('file-drag');

		e.stopPropagation();
		e.preventDefault();

		fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
	}

	function fileSelectHandler(e) {

		// Fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// Cancel event and hover styling
		fileDragHover(e);

		// Process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			imgShown.setAttribute("class","d-none col-md-6 content-img");
			textShown.setAttribute("class","d-none col-md-6 p-y mt-0 px-0");
			nothing.setAttribute("class","d-none justify-content-center align-items-center")
			waiting.setAttribute("class","col-12 d-flex justify-content-center align-items-center");
			getFile(f);
			//uploadFile(f);
		}
	}

	function output(msg) {
		var m = document.getElementById('messages');
		m.innerHTML = msg;
	}

	

	function uploadFile(file) {

		var xhr = new XMLHttpRequest(),
			fileInput = document.getElementById('class-roster-file'),
			fileSizeLimit = 1024;	// In MB
		if (xhr.upload) {
			// Check if file is less than x MB
			if (file.size <= fileSizeLimit * 1024 * 1024) {
				// Progress bar

				// File received / failed
				xhr.onreadystatechange = function (e) {
					if (xhr.readyState == 4) {

					}
				};

				// Start upload
				xhr.open('POST', "link", true);
				var filedata = new FormData();
				filedata.append("fileup", file);
				
				//xhr.send(filedata);
			} else {
				output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
			}
		}
	}
	function getFile(file){
		fileSizeLimit = 10;	// In MB
		if (file.size <= fileSizeLimit * 1024 * 1024 && nameChecking(file.name)) {
			imgToProcess.src = URL.createObjectURL(file);
			setTimeout(() => {
				waiting.setAttribute("class","col-12 d-flex justify-content-center align-items-center end-process");
				setTimeout(() => {
					waiting.setAttribute("class","col-12 d-none justify-content-center align-items-center");
				}, 1000);
				textResult.textContent = textFictif;
					imgShown.setAttribute("class","d-block col-md-6 content-img");
					textShown.setAttribute("class","d-block col-md-6 p-y mt-0 px-0");
					nothing.innerHTML = "Please select image PNG or JPG => up to 10 Mb";
				
			}, 15000);
		}
		else {
			nothing.innerHTML = "Image or file not supported or exceed the limits";
			nothing.setAttribute("class","d-flex justify-content-center align-items-center")
			waiting.setAttribute("class","col-12 d-none justify-content-center align-items-center");
			imgShown.setAttribute("class","d-none col-md-6 content-img");
			textShown.setAttribute("class","d-none col-md-6 p-y mt-0 px-0");
		}
	}
	function nameChecking(name){
		name = name.split(".");
		if (name[name.length - 1 ].toLowerCase() == "jpg" || name[name.length - 1 ].toLowerCase() == "png"){
			return true;
		}
		else {
			return false;
		}
	}

	if (window.File && window.FileList && window.FileReader) {
		Init();
	} else {
		document.getElementById('file-drag').style.display = 'none';
	}
	//Image drag and zooming event
	  
	  let zoomLevel = 1;
	  let isDragging = false;
	  let startX, startY;
	
	  
	  function zoomHandler(event) {
		zoomLevel += event.deltaY * -0.01;
	
		zoomLevel = Math.min(Math.max(0.5, zoomLevel), 3);
	
		const zoomableContent = document.getElementById("imgToProcess");
		zoomableContent.style.transform = `scale(${zoomLevel})`;
	  }
	
	  function dragStart(event) {
		isDragging = true;
		startX = event.clientX - zoomableDiv.offsetLeft;
		startY = event.clientY - zoomableDiv.offsetTop;
	  }
	
	  function dragMove(event) {
		if (isDragging) {
		  const offsetX = event.clientX - startX;
		  const offsetY = event.clientY - startY;
	
		  zoomableDiv.style.left = offsetX + 'px';
		  zoomableDiv.style.top = offsetY + 'px';
		}
	  }
	
	 
	  function dragEnd() {
		isDragging = false;
	  }
	
	  
	  const zoomableDiv = document.getElementById("imgToProcess");
	  const zoomableContent = document.getElementById("imgToProcess");
	
	  zoomableDiv.addEventListener("wheel", zoomHandler);
	  zoomableContent.addEventListener("mousedown", dragStart);
	  document.addEventListener("mousemove", dragMove);
	  document.addEventListener("mouseup", dragEnd);
})();
function activeBtn(clickedBtn){
	if (clickedBtn == "hand"){
		handBtn.setAttribute("class","activeBtn");
		handBtn.innerHTML = 'HANDWRITTEN <i class="fa-solid fa-check-to-slot"></i>';
		printBtn.setAttribute("class","btn-type");
		printBtn.innerHTML = 'PRINT';
		optionText = "Handwritten";
	}
	else {
		printBtn.setAttribute("class","activeBtn");
		printBtn.innerHTML = 'PRINT <i class="fa-solid fa-check-to-slot"></i>'
		handBtn.setAttribute("class","btn-type");
		handBtn.innerHTML = 'HANDWRITTEN';
		optionText = "Print"
	}
}
activeBtn("hand");
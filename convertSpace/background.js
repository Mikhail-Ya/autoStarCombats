$.get(chrome.extension.getURL('/injected.js'), 
	function(data) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.innerHTML = data;
		document.getElementsByName("mainWindow")[0].appendChild(script);
		document.getElementsByName("mainWindow")[0].setAttribute("onLoad","injected_main()");
	}
);
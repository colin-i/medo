chrome.runtime.sendMessage(null,//{greeting: "urls"},
function (response) {
	if(response){
		var btn = document.createElement("BUTTON");
		btn.innerHTML = response;
		btn.addEventListener ("click", function() {
			chrome.downloads.download({url: this.innerHTML},function(id) { })
		});
		document.body.appendChild(btn)
	}
})

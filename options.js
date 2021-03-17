document.addEventListener('DOMContentLoaded', function() {
	var a=document.getElementById('options');
	a.addEventListener ("click", function() {
		var content = document.createElement("DIV");
		var t=document.createTextNode("Request range");
		var input = document. createElement("input");
		input.value=options.range;
		content.appendChild(t);
		content.appendChild(input);
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "Done";
		btn.addEventListener ("click", function() {
			options.range=input.value;
			content.remove();
			chrome.storage.sync.set({ range: options.range })
		});
		content.appendChild(btn);
		this.parentNode.insertBefore(content, this.nextSibling)//if last,null is ok
	});
	chrome.storage.sync.get('range', function(data) {
		if(data.range)options.range=data.range
	})
})
var options = (function (){return{
range:'2147483647'
}})()

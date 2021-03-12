document.addEventListener('DOMContentLoaded', function() {
	var a=document.getElementById('options');
	a.addEventListener ("click", function() {
		var content = document.createElement("DIV");
		var t=document.createTextNode("Range request");
		var input = document. createElement("input");
		content.appendChild(t);
		content.appendChild(input);
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "Hide";
		btn.addEventListener ("click", function() {
			content.remove()
		});
		content.appendChild(btn);
		this.parentNode.insertBefore(content, this.nextSibling)//if last,null is ok
	})
})

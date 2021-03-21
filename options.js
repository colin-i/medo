var options = (function (){return{
range:'2147483647',
new_opt:function (content,a,b){
	var t=document.createTextNode(a);
	var input = document. createElement("input");
	input.value=b;
	content.appendChild(t);
	content.appendChild(input);
	return input
},
on:function(){
	var a=document.getElementById('options');
	a.removeEventListener('click',options.on);
	chrome.runtime.sendMessage(null,{xhr: true},function(x){
		var content = document.createElement("DIV");
		var rang=
			options.new_opt(content,"Request range",options.range);
		var x_con=
			options.new_opt(content,"XHR Content-Type (separator="+x.sep+")",x.xhr);
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "Done";
		btn.addEventListener ("click", function() {
			if(rang.value!=options.range){
				options.range=rang.value;
				chrome.storage.sync.set({ range: options.range })
			}
			if(x_con.value!=x.xhr){
				chrome.runtime.sendMessage(null,{xhr:x_con.value});
				chrome.storage.sync.set({ xhr_ct: x_con.value })
			}
			content.remove();
			a.addEventListener('click',options.on)
		});
		content.appendChild(btn);
		a.parentNode.insertBefore(content, a.nextSibling)//if last,null is ok
	})
}
}})();
document.addEventListener('DOMContentLoaded', function() {
	var a=document.getElementById('options');
	a.addEventListener ("click",options.on);
	chrome.storage.sync.get('range', function(data) {
		if(data.range)options.range=data.range
	})
})

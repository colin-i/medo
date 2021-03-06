chrome.runtime.sendMessage(null,//{greeting: "urls"},
function (response) {
	if(response){
		var btn = document.createElement("BUTTON");
		btn.innerHTML = response[0];
		if(response[1]){
			btn.addEventListener ("click", function() {
				var a=unescap(this.innerHTML);
				chrome.downloads.download({url: a},function(id) { })
			})
		}else{
			btn.addEventListener ("click", function() {
				var a=unescap(this.innerHTML);
				var b=new URL(a);
				var c=new URLSearchParams(b.search);
				c.set('range','0-2147483647');
				a=b.origin+b.pathname+'?'+c.toString();
				window.open(a,'_blank')
			})
		}
		document.body.appendChild(btn)
	}
});
function unescap(a){
	var doc = new DOMParser().parseFromString(a, "text/html");
	return doc.documentElement.textContent
}

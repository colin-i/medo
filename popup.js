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
				chrome.tabs.create({url:a,selected:false/*is not pausing if true*/}, function(tab) {
					chrome.tabs.executeScript(tab.id, {
						code:  '(' + contentscript + ')()'
					});
					//focus
					var updateProperties = { 'active': true };
					chrome.tabs.update(tab.id, updateProperties, (tab) => { })
				})
			})
		}
		document.body.appendChild(btn)
	}
});
function unescap(a){
	var doc = new DOMParser().parseFromString(a, "text/html");
	return doc.documentElement.textContent
}
function contentscript(){
	var e=document.body.getElementsByTagName('video');
	for(var i=0;i<e.length;i++){
		var q=e[i];
		q.pause()
	}
}
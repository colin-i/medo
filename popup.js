chrome.runtime.onMessage.addListener(function(response){
	var cont=document.createElement("DIV");
	cont.style.whiteSpace='nowrap';
	for(var key in response){
		var r=response[key];
		var site = document.createElement("DIV");
		site.innerHTML=key;
		cont.appendChild(site);
		for(var k in r){
			var btn = document.createElement("BUTTON");
			btn.innerHTML = k;
			if(r[k]){
				btn.addEventListener ("click", function() {
					var a=items.unescap(this.innerHTML);
					chrome.downloads.download({url: a},function(id) { })
				})
			}else{
				btn.addEventListener ("click", function() {
					var a=items.unescap(this.innerHTML);
					var b=new URL(a);
					var c=new URLSearchParams(b.search);
					c.set('range','0-'+options.range);
					a=b.origin+b.pathname+'?'+c.toString();
					chrome.tabs.create({url:a,selected:false/*is not pausing if true*/}, function(tab) {
						chrome.tabs.executeScript(tab.id, {
							code:  '(' + items.contentscript + ')()'
						});
						//focus
						var updateProperties = { 'active': true };
						chrome.tabs.update(tab.id, updateProperties, (tab) => { })
					})
				});
				cont.appendChild(document.createTextNode('x'))
			}
			btn.style.textAlign='left';
			cont.appendChild(btn);
			cont.appendChild(document.createElement("BR"))
		}
	}
	var bt = document.getElementById('clear');
	bt.addEventListener ("click", function() {
		cont.remove();
		chrome.runtime.sendMessage(null)
	});
	bt.parentNode.insertBefore(cont, bt)
});
chrome.runtime.sendMessage(null,{})//no callback here,bgp will timeout for tabs

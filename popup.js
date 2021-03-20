chrome.runtime.onMessage.addListener(function(response){
	var cont=document.createElement("DIV");
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
				})
			}
			btn.style.textAlign='left';
			btn.style.display = "block";
			cont.appendChild(btn)
		}
	}
	var bt = document.createElement("BUTTON");
	bt.innerHTML = "Clear";
	bt.addEventListener ("click", function() {
		cont.remove();
		chrome.runtime.sendMessage(null)
	});
	cont.appendChild(bt);
	document.body.appendChild(cont)
});
chrome.runtime.sendMessage(null,{});//{greeting: true})

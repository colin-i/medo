chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var d=details.responseHeaders;
	var media=details.type=='media';
	if (media){
		items.starter(details,media)
	}else if(details.type=='xmlhttprequest'){
		for (a in d){
			var e=d[a];
			if(e.name=="Content-Type"){
				var b=options.xhr_ct;
				for (x in b){
					var f=b[x];
					if(e.value.substr(0,f.length)==f){
						items.starter(details,media);
						break
					}
				}
				break
			}
		}
	}
	return {responseHeaders: d}
}, {urls: ["<all_urls>"]}, ['responseHeaders']);
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
	if(request){
		if(request.xhr){
			var s=',';
			if(request.xhr===true)//'1'==true
				sendResponse({xhr:options.xhr_ct.join(s),sep:s});
			else options.xhr_ct=request.xhr.split(s);
			return
		}
		//throw away old results
		chrome.tabs.getAllInWindow(null, function(tabs){
			var collect={};
			for (var i = 0; i < tabs.length; i++) {
				var k=tabs[i].url;var v=items.values[k];
				if(v)collect[k]=v
			}
			items.values=collect;
			chrome.runtime.sendMessage(null,items.values)
		})
	}else items.values={}
})
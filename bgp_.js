chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var d=details.responseHeaders;
	var media=details.type=='media';
	if (media){
		items.starter(details,media)
	}else if(details.type=='xmlhttprequest'){
		for (a in d){
			var e=d[a];
			if(e.name=="Content-Type"){
				var b=['video/mp4','audio/mp4'];
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
	sendResponse( items.values )
})
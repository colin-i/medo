var urls;
chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var d=details.responseHeaders;
	//xhr
	if (details.type=='media'){
		for (a in d){
			var e=d[a]; 
			if(e.name=="Content-Range"){
				if(e.value.substr(0,7)=='bytes 0'){
					urls=details.url
				}
				break
			}
		}
	}
	return {responseHeaders: d}
}, {urls: ["<all_urls>"]}, ['responseHeaders']);
chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
	sendResponse( urls )
})
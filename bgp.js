var urls;
function verif(details){
	var d=details.responseHeaders;
	for (a in d){
		var e=d[a];
		if(e.name=="Content-Range"){
			var b='bytes 0';
			return e.value.substr(0,b.length)==b
		}
	}
	var b=new URL(details.url);
	var c=new URLSearchParams(b.search);
	if(c.has('range'))
		return c.get('range')[0]=='0';
	return false
}
function starter(details,media){
	if(verif(details))
		urls=[details.url,media]
}
chrome.webRequest.onHeadersReceived.addListener(function(details) {
	var d=details.responseHeaders;
	var media=details.type=='media';
	if (media){
		starter(details,media)
	}else if(details.type=='xmlhttprequest'){
		for (a in d){
			var e=d[a];
			if(e.name=="Content-Type"){
				var b=['video/mp4','audio/mp4'];
				for (x in b){
					var f=b[x];
					if(e.value.substr(0,f.length)==f){
						starter(details,media);
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
	sendResponse( urls )
})
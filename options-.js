var options = (function (){return{
xhr_ct:['video/mp4','audio/mp4']
}})();
chrome.storage.sync.get('xhr_ct', function(data) {
	if(data.xhr_ct)options.xhr_ct=data.xhr_ct
})

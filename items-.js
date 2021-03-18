var items = (function (){return{
values:{},
verif: function(details){
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
},
starter:function (details,media){
	if(this.verif(details)){
		var tabid = details.tabId;
		var vals=this.values;
		chrome.tabs.get(tabid, function (tab) {
			var t=tab.url;
			if(!(t in vals))vals[t]={};
			vals[t][details.url]=media
		})
	}
}
}})()

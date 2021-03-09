var items = (function (){
return{
unescap:function (a){
	var doc = new DOMParser().parseFromString(a, "text/html");
	return doc.documentElement.textContent
},
contentscript:function (){
	var e=document.body.getElementsByTagName('video');
	for(var i=0;i<e.length;i++){
		var q=e[i];
		q.pause()
	}
}
}
})()

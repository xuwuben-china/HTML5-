/*
	method: 请求的方法 "GET" 或者 "POST";
	url:请求数据地址;
	data:请求时传递的地址;
	callback:请求成功的回调函数;

*/


function ajax(method, url, data, callback){	
	var xhr;	
	var str = "";
	try{
		xhr = new XMLHttpRequest();
	} catch(e){
		xhr = new ActiveXObject();
	}
	if((typeof data).toLowerCase()==="object" && data !== null){
		for(var key in data){
			str += key + "=" + encodeURI(data[key]) + "&";
		}
		str = str.substr(0,str.length-1);
	}
	if(method.toLowerCase()==="get" && str.length !== 0 ){
		url = url + "?" + str;
	}
	xhr.open(method,url,true);
	if(method.toLowerCase()==="get"){
		xhr.send();
	}else{
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			// if(xhr.status <= 300 && xhr.status >= 200){
				var data = xhr.responseText;
				callback&&callback(data);
			// }
		}
	}
}
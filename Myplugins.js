//我的插件
var myPlugins = {
	// 获取元素
	getEle: {
		// id
		id: function(id) {
			return document.getElementById(id)
		},
		// class
		className: function(cNa,context) {
			context = context || document;
			var str,arr = [];
			// 标准浏览器
			if ( context.getElementsByClassName ) {
				return myPlugins.toArr(context.getElementsByClassName(cNa))
			}
			// IE8及以下浏览器
			var allTagName = this.tagName("*");
			for (var i = 0; i < allTagName.length; i++) {
				var item = allTagName[i];
				var reg = new RegExp("\\b"+cNa+"\\b");
				if ( reg.test(item.className) ) {
					arr.push(item)
				}
			}
			return arr
		},
		// 标签名
		tagName: function(tagName,context) {
			context = context || document;
			var arr = context.getElementsByTagName(tagName);
			arr =  myPlugins.toArr(arr)
			return arr;
		}
	},
	// 没有添加className 有删除className
	toggleClass: function(Name,obj){
		var reg = new RegExp("\\b"+Name+"\\b");
		if(reg.test(obj.className)){
			var res = obj.className.replace(reg,"").replace(/\b\s{2,}\b/g,"").replace(/^\s*|\s*$/g,"");
			obj.className = res;
		} else {
			obj.className += " "+Name;
		}
	},
	// 16进制随机色
	colorChar16: function(){
		var txt = "#";
		for (var i = 0; i < 6; i++) {
			txt += Math.floor(Math.random() * 16).toString(16);
		}
		return txt
	},
	// 获取元素的样式
	getStyle: function(obj,attr){
		return window.getComputedStyle? window.getComputedStyle(obj)[attr] : obj.currentStyle[attr]
	},
	// trim 去除字符串首尾空格
	trim: function(str){
		return str.trim && str.trim() || str.replace(/^\s*|\s*$/g,"");
	},
	toArr: function(arr){
		try{
	    	var args =  Array.prototype.slice.apply(arr); 
		}catch(err){
		    var args = Array.prototype.concat.apply([],arr);
		}
		return args
	},
	
}


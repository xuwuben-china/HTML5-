// move的onOff有问题如果有一个move的值没达到flase的条件就进行下一个move那么上一个定时器就没清除
	// 总之定时器开关存在缺陷，如轮播时有定时器存在清除不了的问题；
	// BUG触发：轮播时点右按钮当图片还没移动完时立马点任意小圆点就存在定时器没清除情况
	var moveTimer = null;
	function move(obj,json,speed,callback){
			moveTimer = setInterval(function(){
			var onOff = true;
			for (var attr in json){
				var start;
				if(attr === "opacity"){
					start = getStyle(obj,attr)*100;

				}else{
					start = parseInt(getStyle(obj,attr));
				}
				var target = json[attr];
				var newSpeed = start > target ? -speed : speed;
				if(start != target){
					if(attr === "opacity"){
						var end = start + newSpeed;
						if(start > target && end < target || start < target && end > target){
							obj.style[attr] = target / 100;
						} else {
							obj.style[attr] = end/100 ;
						}
					}else{
						var end = start + newSpeed;
						if(start > target && end < target || start < target && end > target){
							obj.style[attr] = target + "px";
						} else {
							obj.style[attr] = end + "px";
						}
					}
					onOff = false;	
				} 
			}
			if(onOff){
				clearInterval(moveTimer);
				callback&&callback();
			}
		},16)
	}
	function getStyle(obj,attr){
		return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
	}
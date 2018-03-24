// move的onOff有问题如果有一个move的值没达到flase的条件就进行下一个move那么上一个定时器就没清除
	// 总之定时器开关存在缺陷，如轮播时有定时器存在清除不了的问题；
	// BUG触发：轮播时点右按钮当图片还没移动完时立马点任意小圆点就存在定时器没清除情况
	function move(obj,json,time,callback){
		var startTime = new Date();
		var timer = null;
		timer = setInterval(function(){
			var onOff = true;
			for (var attr in json){
				var start;
				if(attr === "opacity"){
					start = getStyle(obj,attr)*100;

				}else{
					start = parseInt(getStyle(obj,attr));
				}
				var target = json[attr];
				var time_diff = new Date() - startTime;
				var a = 2 * ( target - start ) / Math.pow(time, 2);
				var s = a * Math.pow(time_diff, 2) / 2;
				if( time_diff > time ){
					time_diff = time;
					obj.style[attr] = target + "px";
				} else {
					obj.style[attr] = s + start + "px";
					onOff = false;
				}
			}
			if(onOff){
				clearInterval(timer);
				callback&&callback();
			}
		},16)
	}
	function getStyle(obj,attr){
		return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
	}
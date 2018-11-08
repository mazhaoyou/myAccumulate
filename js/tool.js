/*
 * 手机号格式验证
 */
function checkPhone(phone) {
	var re = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
	var retu = phone.match(re);
	if (retu) {
		return true;
	} else {
		return false;
	}
}

/*
 * 验证是否有表情符号
 */
function isEmojiCharacter(substring) {
	for (var i = 0; i < substring.length; i++) {
		var hs = substring.charCodeAt(i);
		if (0xd800 <= hs && hs <= 0xdbff) {
			if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
				if (0x1d000 <= uc && uc <= 0x1f77f) {
					return true;
				}
			}
		} else if (substring.length > 1) {
			var ls = substring.charCodeAt(i + 1);
			if (ls == 0x20e3) {
				return true;
			}
		} else {
			if (0x2100 <= hs && hs <= 0x27ff) {
				return true;
			} else if (0x2B05 <= hs && hs <= 0x2b07) {
				return true;
			} else if (0x2934 <= hs && hs <= 0x2935) {
				return true;
			} else if (0x3297 <= hs && hs <= 0x3299) {
				return true;
			} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
				hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
				hs == 0x2b50) {
				return true;
			}
		}
	}
}

/*
 * 格式化详情内容
 */
function formatting(data) {
	if (data != null) {
		var content = data.replace(/_br_/g, "<br />");
		content = content.replace(/<table>/g, "<table border='1'>");
		content = content.replace(/(\r\n)|(\n)/g, "<br />");
		content = content.replace(/_p_s_/g, "<p style='color:#000;'>");
		content = content.replace(/_p_e_/g, "</p>");
		content = content.replace(/_strong_s_/g, "<strong style='color:#000;'>");
		content = content.replace(/_strong_e_/g, "</strong>");
		content = content.replace(/_em_s_/g, "<span style='text-decoration: underline;'>");
		content = content.replace(/_em_e_/g, "</span>");
		content = content.replace(/_img_start_/g, "<img src='");
		content = content.replace(/_img_end_/g, "' data-preview-src='' data-preview-group='1' class='lazy' />");
		return content;
	} else {
		return null;
	}
}

/*
 * 获取当前网络状态
 */
function getNet() {
	var net = plus.networkinfo.getCurrentType();
	var netWork = "";
	switch (net) {
		case 0:
			netWork = "未知";
			break;
		case 1:
			netWork = "未连接";
			break;
		case 2:
			netWork = "有线";
			break;
		case 3:
			netWork = "wifi";
			break;
		case 4:
			netWork = "2G";
			break;
		case 5:
			netWork = "3G";
			break;
		case 6:
			netWork = "4G";
			break;
	}
	return netWork;
}

/*
 * 对比数组是否相同
 */
function contrastArray(array1, array2) {
	if (!array1 || !array2) {
		return false;
	}
	if (array1.length != array2.length) {
		return false;
	}
	if (JSON.stringify(array1) != JSON.stringify(array2)) {
		return false;
	}
	for (var i = 0, l = array1.length; i < l; i++) {
		if (array1[i] instanceof Array && array2[i] instanceof Array) {
			if (!array1[i].equals(array2[i])) {
				return false;
			}
		}
	}
	return true;
}



/*
 * 格式化时间（秒->分秒）
 */
function formatSeconds(value) {
	var theTime = parseInt(value); // 秒 
	var theTime1 = "00"; // 分 
	if (theTime > 60) {
		theTime1 = parseInt(theTime / 60);
		theTime = parseInt(theTime % 60);
		if (theTime1 > 0 && theTime1 < 10) {
			theTime1 = "0" + theTime1;
		} else if (theTime1 < 1) {
			theTime1 = "00";
		}
		if (theTime < 10) {
			theTime = "0" + theTime;
		}
	} else if (theTime < 10) {
		theTime = "0" + theTime;
	}
	result = theTime1 + ":" + theTime;
	return result;
}
//字节格式化
function bytesToSize(bytes) {
	if (bytes === 0) return '0 B';
	var k = 1024;
	sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
/*
 * 图片路径判断
 */
function imgPath(path) {
	if (path == "" || path == null || path == undefined) {
		return false;
	} else {
		var pathHead = path.substring(0, 4);
		if (pathHead == "http") {
			return path;
		} else {
			return config.options.host + path;
		}
	}
}

/*
 * 多行文本输入框剩余字数计算
 */
function checkMaxInput(obj, maxLen) {
	if (obj == null || obj == undefined || obj == "") {
		return;
	}
	if (maxLen == null || maxLen == undefined || maxLen == "") {
		maxLen = 30;
	}
	var len = obj.value.length;
	var str_length = 0;
	str_cut = new String();
	var strResult = document.getElementById("remaining");
	for (var i = 0; i < len; i++) {
		a = obj.value.charAt(i);
		str_length++;
		if (escape(a).length > 4) {
			//中文字符的长度经编码之后大于4  
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if (parseInt(str_length / 2) >= maxLen) {
			obj.value = str_cut;
		}
	}
	if (parseInt(str_length / 2) >= maxLen) {
		str_length = maxLen;
	}
	if (str_length == maxLen) {
		strResult.innerHTML = 0;
	} else {
		str_length = parseInt(str_length / 2);
		strResult.innerHTML = maxLen - str_length;
	}
}

/*
 * 转化为几天前,几小时前，几分钟前
 */
function getDateDiff(timeStr) {
	var dateTimeStamp = timeStr.replace(/-/g, '/');
	dateTimeStamp = new Date(dateTimeStamp);
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		return;
	}
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (dayC > 3) {
		var dateStr = new Date(dateTimeStamp);
		result = "" + dateStr.getFullYear() + "-" + (dateStr.getMonth() + 1) + "-" + dateStr.getDate();
	} else if (dayC >= 1) {
		result = "" + parseInt(dayC) + "天前";
	} else if (hourC >= 1) {
		result = "" + parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		result = "" + parseInt(minC) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
}
/*
 * 返回100长度的字符串
 */
function accordion(content) {
	if (content.length > 100) {
		content = content.substring(0, 100);
	} else {
		content = content;
	}
	return content;
}
/*网页启动app*/
function submitFn() {
	//判断浏览器
	var u = navigator.userAgent;
	if (/MicroMessenger/gi.test(u)) {
		// 引导用户在浏览器中打开
		alert('请在浏览器中打开');
		return;
	}
	var d = new Date();
	var t0 = d.getTime();
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		//Android
		if (openApp('ncielts02://cielts://invitation?userId=41&shareId=42&teamId=1&areaId=2')) {
			openApp('ncielts02://cielts://invitation?userId=41&shareId=42&teamId=1&areaId=2');
		} else {
			//由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
			var delay = setInterval(function () {
				var d = new Date();
				var t1 = d.getTime();
				if (t1 - t0 < 3000 && t1 - t0 > 2500) {
					window.location.href = "http://www.xhd.cn/app_dl/download/ ";
				} else {

				}
				if (t1 - t0 >= 3000) {
					clearInterval(delay);
				}
			}, 2000);
		}
	} else if (u.indexOf('iPhone') > -1) {
		//IOS
		if (openApp('ncielts://invitation?userId=41&shareId=42&teamId=1&areaId=2')) {
			openApp('ncielts://invitation?userId=41&shareId=42&teamId=1&areaId=2');
		} else {
			var delay = setInterval(function () {
				var d = new Date();
				var t1 = d.getTime();
				if (t1 - t0 < 3000 && t1 - t0 > 2500) {
					window.location.href = "http://www.xhd.cn/app_dl/download/ ";
				}
				if (t1 - t0 >= 3000) {
					clearInterval(delay);
				}
			}, 1000);
		}
	}
}
/*打开APP*/

function openApp(src) {
	// 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
	// 否则打开a标签的href链接
	var ifr = document.createElement('iframe');
	ifr.src = src;
	ifr.style.display = 'none';
	document.body.appendChild(ifr);
	window.setTimeout(function () {
		document.body.removeChild(ifr);
	}, 2000);
}
/*根据参数键获得URL后面的值*/
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	/*alert(window.location.search);*/
	if (r != null) return unescape(r[2]);
	return null;
}
/*
 * @ mzy 2018.4
 * 是否微信打开
 */
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

/*@ mzy 2018.4
 * 是否QQ
 */
function isQQ() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/QQ/i) == "qq") {
		return true;
	} else {
		return false;
	}
}

function isWeiBo() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/WeiBo/i) == "weibo") {
		return true;
	} else {
		return false;
	}
}
/*
 * @马钊有 2018.4
 * 是否是qq浏览器
 */
function isQQBrowes() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('mobile mqqbrowser') > -1) {
		return true;
	} else {
		return false;
	}
}

/*判断终端为Android*/
function isAndroid() {
	if (/Android/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

function isIPod() {
	if (/iPod/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

function isiPhone() {
	if (/iPhone/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}

}

function isBlackBerry() {
	if (/BlackBerry/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

function isWebOS() {
	if (/webOS/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

/*JSON数组去重*/
function filterObj(jsonArray) {
	for (var i = 0; i < jsonArray.length; i++) {
		for (var j = i + 1; j < jsonArray.length;) {
			//通过currentPrice属性进行匹配；
			if (jsonArray[i].currentPrice == objcArray[j].currentPrice) {
				objcArray.splice(j, 1);
			} else {
				j++;
			}
		}
	}
	return objcArray;
}
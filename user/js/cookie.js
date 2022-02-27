function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}

function setCookie(c_name, value, expiredays = 1) {                   
    var exdate = new Date();                   
    exdate.setDate(exdate.getDate() + expiredays);
    //var Days = 30;     
    //exdate.setTime(exdate.getTime() + Days * 24 * 60 * 60 * 30);          
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/";         
}

function delAllCookie() {
	var myDate = new Date();
	myDate.setTime(-1000);
	var data = document.cookie;
	var dataArray = data.split(";");
	for(var i = 0; i < dataArray.length; i++) {
		var varName = dataArray[i].split("=");
		document.cookie = varName[0] + "=; expires=" + myDate.toGMTString() + ";path=/";
	}
}


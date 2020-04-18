document.addEventListener('DOMContentLoaded', function() {
	__ORIGIN__ = "[KERNAL]:";
	var domainName = window.location.host;
	if (domainName == "tieba.baidu.com") {
		console.log(__ORIGIN__ + "Coxmotron Kernal Loaded.");
		$.post("https://api.winsloweric.cn/c/init.php", function(result) {
			if (result == 0) {
				console.log(__ORIGIN__ + "Coxmotron initialization failed. Error code: 0x01");
				return false;
			} else {
				__initialization__();
				console.log(__ORIGIN__ + "Coxmotron initialization successful.");
				console.log(getObfusedTitle());
			}
		});
	}
});

function loadControlGUI() {
	var consoleObject = $('<div>', {
		id : 'coxmotron-gui'
	});

	consoleObject.appendTo('body');
	var objectiveGUI = document.getElementById('coxmotron-gui');
	//objectiveGUI.innerHTML = "<button class='guibutton'>开始刷帖</button><button class='guibutton'>AT某人</button><button class='guibutton'>加快速度</button><button class='guibutton'>减慢速度</button><button class='guibutton'>关闭发图</button><button class='guibutton'>反馈问题</button><br/><span id='tickspeed'>当前刷帖速度</span>";
	console.log(__ORIGIN__ + "Coxmotron GUI loaded.");
	var buttonSet = document.getElementsByClassName('guibutton');
	buttonSet[0].onclick = function() {
		if (status == 1) {
			status = 0;
			buttonSet[0].innerText = "暂停刷帖";
		} else if (status == 0) {
			status = 1;
			buttonSet[0].innerText = "继续刷帖";
		}
	};
}

function getObfusedTitle() {
	return getPoem().author;
	//return getPoem().content;
}

function getObfusedContent() {
	var contentMode = Math.floor(Math.random() * 4);
	if(contentMode == 0){
		var poemAuthorObfs = Math.floor(Math.random() * 3);
		if(poemAuthorObfs == 0){
		return getPoem().content + " -- " + getPoem().author;
		}else if(poemAuthorObfs == 1){
		return getPoem().content + " By " + getPoem().author;
		}else if(poemAuthorObfs == 2){
		return getPoem().content;
		}
	}else if(contentMode == 1){
		var HSAuthorObfs = Math.floor(Math.random() * 2);
		if(HSAuthorObfs == 0){
			return getHS();
		}else if(HSAuthorObfs == 1){
			return getPoem().author.getHS();
		}
}

function __initialization__() {
	var TBElement_title = document.getElementsByClassName('editor_title ui_textfield')[0];
	var TBElement_content = document.getElementById('ueditor_replace');
	var TBElement_submit = document.getElementsByClassName('poster_submit')[0];
	$(".tbui_aside_float_bar").remove();
	$(".search_back_box").remove();
	$(".app_download_box").remove();
	$(".celebrity").remove();
	status = 0;
	loadControlGUI();
}

function getPoem() {
	var poemObject = $.ajax({
		type : 'POST',
		url : 'https://v1.jinrishici.com/all.json',
		async : false,
		success : function(callback) {
			result = callback;
		}
	});
	return result;
}

function getHS() {
	var poemObject = $.ajax({
		type : 'POST',
		url : 'https://api.winsloweric.cn/c/hs.php',
		async : false,
		success : function(callback) {
			result = callback;
		}
	});
	return result;
}

function getImage() {
	var imageServer = Math.floor(Math.random() * 2);
}
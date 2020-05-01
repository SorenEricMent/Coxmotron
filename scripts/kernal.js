document.addEventListener('DOMContentLoaded', function() {
	__ORIGIN__ = "[KERNAL]:";
	var domainName = window.location.host;
	if (domainName == "tieba.baidu.com") {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = "document.body.setAttribute('data-fp', PageData.forum.id);";
		document.head.appendChild(script);
		document.head.removeChild(script);
		fid = document.body.getAttribute('data-fp');
		console.log(__ORIGIN__ + "Coxmotron Kernal Loaded.");
		$.post("https://api.winsloweric.cn/c/init.php", function(result) {
			if (result == 0) {
				console.log(__ORIGIN__ + "Coxmotron initialization failed. Error code: 0x01");
				return false;
			} else if (result == 3) {
				alert("服务端校验失败：您的刷帖机版本过老，对应API接口已经无法适配，请立刻更新。");
			} else {
				__initialization__();
				console.log(__ORIGIN__ + "Coxmotron initialization successful.");

			}
		});
	}
});

function loadControlGUI() {
	consoleObject = $('<div>', {
		id : 'coxmotron-gui',
		class : 'mdui-shadow-2 mdui-hoverable'
	});

	consoleObject.appendTo('body');
	var objectiveGUI = document.getElementById('coxmotron-gui');
	objectiveGUI.innerHTML = "<span id='guititle'>Coxmotron刷帖机<br/></span><span>版权所有：SorenEricMent,QQ1815880525,载入成功，激活成功。</span><button class='guibutton mdui-shadow-3 mdui-ripple'>开始刷帖</button><button class='guibutton mdui-shadow-3 mdui-ripple'>AT某人</button><button class='guibutton mdui-shadow-3 mdui-ripple' id='speed-up' mdui-shadow-3>加快速度</button><button class='guibutton mdui-shadow-3 mdui-ripple' id='speed-down'>减慢速度</button><button class='guibutton mdui-shadow-3 mdui-ripple'>关闭发图</button><button class='guibutton mdui-shadow-3 mdui-ripple'>反馈问题</button><br/><span id='tickspeed'>当前刷帖速度</span><br/><span id='guitbfid'>FID</span>";
	console.log(__ORIGIN__ + "Coxmotron GUI loaded.");
	var buttonSet = document.getElementsByClassName('guibutton');
	buttonSet[0].onclick = function() {
		if (status == 1) {
			stopMainLoop();
			status = 0;
			buttonSet[0].innerText = "继续刷帖";
		} else if (status == 0) {
			startMainLoop();
			status = 1;
			buttonSet[0].innerText = "暂停刷帖";
		}
	};
}

function getObfusedTitle() {
	titleMode = Math.floor(Math.random() * 2);
	var tempTitle;
	if (titleMode == 0) {
		tempTitle = getPoem().content;
	} else if (titleMode == 1) {
		tempTitle = getHS();
	}
	titleObfsNumber = Math.floor(Math.random() * 2);
	if (titleObfsNumber == 0) {
		tempTitle = tempTitle + Math.floor(Math.random() * 114514);

		return tempTitle;
	} else if (titleObfsNumber == 1) {
		return tempTitle;
	}
	return getPoem().content;
}

function getObfusedContent() {
	contentMode = Math.floor(Math.random() * 5);
	if (contentMode == 0) {
		var poemAuthorObfs = Math.floor(Math.random() * 3);
		if (poemAuthorObfs == 0) {
			return getPoem().content + ' -- ' + getPoem().author;
		} else if (poemAuthorObfs == 1) {
			return getPoem().content + ' By' + getPoem().author;
		} else if (poemAuthorObfs == 2) {
			return getPoem().content;
		}
	} else if (contentMode == 1) {
		var HSAuthorObfs = Math.floor(Math.random() * 2);
		if (HSAuthorObfs == 0) {
			return getHS();
		} else if (HSAuthorObfs == 1) {
			return getPoem().author + getHS();
		}
	} else {
		var imageJSON = getImage();
		imageJSON = imageJSON.urls[0].pic_id_encode;
		imageDiv = "<img class='BDE_Image' data-isupload='1' src='https://tiebapic.baidu.com/forum/pic/item/" + imageJSON + ".jpg' unselectable='on' pic_type='0' width='400' height='400'>";
		return imageDiv;
	}
}

function __initialization__() {
	mdui1 = $('<link>', {
		rel : "stylesheet",
		href : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css"
	});
	mdui2 = $('<script>', {
		src : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"
	});
	mdui1.appendTo('body');
	mdui2.appendTo('body');
	controlTick = 7000;
	TBElement_title = document.getElementsByClassName('editor_title ui_textfield')[0];
	TBElement_content = document.getElementById('ueditor_replace');
	TBElement_submit = document.getElementsByClassName('poster_submit')[0];
	$(".tbui_aside_float_bar").remove();
	$(".search_back_box").remove();
	$(".app_download_box").remove();
	$(".celebrity").remove();
	imageRange = $.ajax({
		type : 'POST',
		url : 'https://api.winsloweric.cn/c/limit.php',
		async : false,
		success : function(callback) {
			callRange = callback.limit;
		}
	});
	callRange = callRange;
	status = 0;
	loadControlGUI();
	document.getElementById('guitbfid').innerText = "FID:" + fid;
	speedup = document.getElementById('speed-up');
	speeddown = document.getElementById('speed-down');
	document.getElementById('tickspeed').innerText = "Speed:" + controlTick;
	speedup.onclick = function() {
		if (controlTick == 3000) {
			alert("已经到3秒了，无法加速了，要不然基本会被封");
		} else {
			alert("加速（平均延迟-1秒）");
			controlTick = controlTick - 1000;
			document.getElementById('tickspeed').innerText = "Speed:" + controlTick;
		}
	};
	speeddown.onclick = function() {
		controlTick = controlTick + 1000;
		alert("减速（平均延迟+1秒）");
		document.getElementById('tickspeed').innerText = "Speed:" + controlTick;
	};
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
	var imageTbs = $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/dc/common/imgtbs',
		async : false,
		success : function(callback) {
			tbsData = callback;
		}
	});
	tbsJson = JSON.parse(tbsData);
	tbs = tbsJson.data.tbs;
	var imageIndex = Math.floor(Math.random() * callRange + 1);
	var imageTbs = $.ajax({
		type : 'POST',
		timeout : 100000,
		url : 'https://uploadphotos.baidu.com/upload/pic?tbs=' + tbs + '&fid=' + fid + '&save_yun_album=1',
		async : false,
		data : "filetype=url&file=&urls%5B%5D=https%3A%2F%2Fraw.githubusercontent.com%2FSorenEricMent%2Fsorenericment.github.io%2Fmaster%2Fimages%2F" + imageIndex + ".png",
		success : function(callback) {
			imageObject = callback;
		}
	});
	if (imageObject == undefined) {
		return "Image transfer failure.";
	}
	return imageObject;
}

function startMainLoop() {
	mainLoop = setInterval(function() {
		TBElement_title.value = getObfusedTitle();
		TBElement_content.innerHTML = getObfusedContent();
		$(".poster_submit")[0].click();
		document.getElementById('tickspeed').innerText = "Speed:" + controlTick;
	}, controlTick + Math.floor(Math.random() * 100));
}

function stopMainLoop() {
	clearInterval(mainLoop);
}

function selectAtPeople() {

}

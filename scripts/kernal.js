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
		var script2 = document.createElement('script');
		script2.type = 'text/javascript';
		script2.innerHTML = "document.body.setAttribute('data-nm', PageData.forum.name);";
		document.head.appendChild(script2);
		document.head.removeChild(script2);
		tbName = document.body.getAttribute('data-nm');
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
	objectiveGUI.innerHTML = "<span id='guititle'>Coxmotron刷帖机<br/></span><span id='guicopyright'>版权所有：SorenEricMent,QQ1815880525,载入成功，激活成功。</span><button class='guibutton mdui-shadow-3 mdui-ripple'>开始刷帖</button><button class='guibutton mdui-shadow-3 mdui-ripple' id='addatinfo'>AT某人</button><button class='guibutton mdui-shadow-3 mdui-ripple' id='speed-up' mdui-shadow-3>加快速度</button><button class='guibutton mdui-shadow-3 mdui-ripple' id='speed-down'>减慢速度</button><button class='guibutton mdui-shadow-3 mdui-ripple'>关闭发图</button><button class='guibutton mdui-shadow-3 mdui-ripple'>反馈问题</button><br/><span id='tickspeed'>当前刷帖速度</span><br/><span id='guitbfid'>FID</span><br/><input id='codermode' placeholder='测试区域，请勿使用!'/><input type='button' id='cmbutton' value='Run'/>";
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
	titleObfsNumber = Math.floor(Math.random() * 3);
	if (titleObfsNumber == 0) {
		tempTitle = tempTitle + Math.floor(Math.random() * 114514);
		return tempTitle;
	} else if (titleObfsNumber == 1) {
		return tempTitle;
	} else if (titleObfsNumber == 2) {
		return tempTitle + obfsSym[Math.floor(Math.random() * obfsSym.length)];
	}
}

function getObfusedContent() {
	contentMode = Math.floor(Math.random() * 8);
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
			return getPoem().author + ":" + getHS();
		}
	} else if (contentMode > 1 && contentMode < 6) {
		var imageJSON = getImage();
		imageJSON = imageJSON.urls[0].pic_id_encode;
		imageDiv = "<img class='BDE_Image' data-isupload='1' src='https://tiebapic.baidu.com/forum/pic/item/" + imageJSON + ".jpg' unselectable='on' pic_type='0' width='400' height='400'>";
		return imageDiv;
	} else {
		var videoObject = getVideo();
		if (videoObject.no != 0) {
			console.log(__ORIGIN__ + "不！无效视频请求！！启用恶臭缺省值！！！");
			console.log(__ORIGIN__ + "哼，哼，哼，啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！！！");
			var videoHTMLObject = "<img unselectable='on' class='BDE_Flash' src='//tb2.bdstatic.com/tb/img/flash_335fbc8.png' data-video_url='https://www.bilibili.com/video/av114515' data-vsrc='https://www.bilibili.com/video/av114515' data-pkey='564dbe018a70bf84e64d1dc8ec8332ee' data-vpic='http://tiebapic.baidu.com/forum/pic/item/77094b36acaf2edde3335c839a1001e93801939d.jpg' title='http://static.hdslb.com/miniloader.swf?aid=114515&amp;page=1' width='219' height='175' data-width='500' data-height='450'>";
		} else {
			var videoURL = videoObject.data.html_url;
			var videoSWF = videoObject.data.swf_url;
			var videoIMG = videoObject.data.img_url;
			var videoKEY = videoObject.data.pri_key;
			var videoHTMLObject = "<img unselectable='on' class='BDE_Flash' src='//tb2.bdstatic.com/tb/img/flash_335fbc8.png' data-video_url='" + videoURL + "'data-vsrc='" + videoURL + "' data-pkey='" + videoKEY + "' data-vpic='" + videoIMG + "' title='" + videoSWF + "' width='219' height='175' data-width='500' data-height='450'>";
		}
	}
	return videoHTMLObject;
}

function __initialization__() {
	commonCounter = 0;
	isMentionModeEnabled = 0;
	obfsSym = ["。。。", "???", "？？？", "?", "!!!", "!", ".....", "0.0", "...", "~~~", "~", "qwq", "???!", "~~~!!!", "= =", "QwQ", ":)"];
	mdui1 = $('<link>', {
		rel : "stylesheet",
		href : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/css/mdui.min.css"
	});
	mdui2 = $('<script>', {
		src : "https://cdnjs.loli.net/ajax/libs/mdui/0.4.3/js/mdui.min.js"
	});
	mdui1.appendTo('body');
	mdui2.appendTo('body');
	controlTick = 8000;
	TBElement_title = document.getElementsByClassName('editor_title ui_textfield')[0];
	TBElement_content = document.getElementById('ueditor_replace');
	TBElement_submit = document.getElementsByClassName('poster_submit')[0];
	TBElement_pageTitle = document.getElementsByClassName('card_title_fname')[0];
	TBElement_pageTitle.innerText = tbName + "吧 | 发帖数：" + commonCounter;
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
	atPeople();
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
			if ( typeof mainLoop !== "undefined") {
				clearInterval(mainLoop);
				startMainLoop();
			}
			document.getElementById('tickspeed').innerText = "Speed:" + controlTick;
		}
	};
	speeddown.onclick = function() {
		controlTick = controlTick + 1000;
		alert("减速（平均延迟+1秒）");
		if ( typeof mainLoop !== "undefined") {
			clearInterval(mainLoop);
			startMainLoop();
		}
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

function getVideo() {
	var randomVideoID = Math.floor(Math.random() * 99999999) + 1;
	var bdVidAPI1 = $.ajax({
		type : 'GET',
		url : 'https://tieba.baidu.com/fex/check/isRealName',
		async : false,
		success : function(callback) {
			vidAPI1Data = callback;
		}
	});
	var bdVidAPI2 = $.ajax({
		type : 'GET',
		url : 'https://tieba.baidu.com/video/pc/getBaseInfo',
		async : false,
		success : function(callback) {
			vidAPI2Data = callback;
		}
	});
	var uploadVideoData = $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/f/commit/commonapi/getVideoInfoApi',
		data : 'url=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2Fav' + randomVideoID + '&type=0',
		async : false,
		success : function(callback) {
			receivedVideoInfo = callback;
		}
	});
	videoInfoJSON = JSON.parse(receivedVideoInfo);
	return videoInfoJSON;
}
/*
function getVote() {
	var voteTitle = getPoem().content + "?";
	var voteOption = [];

	voteOption[0] = getHS();
	voteOption[1] = getPoem().content;
	voteOption[2] = getPoem().author;  
	var getTbs = $.ajax({
		type : 'GET',
		url : 'https://tieba.baidu.com/dc/common/tbs',
		async : false,
		success : function(callback) {
			voteTbs = callback;
		}
	});
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var myddy = date.getDay() + 7;
	if(month > 12){
		month = 1;
		year = year + 1;
	}
	var createVoteRequest = $.ajax({
		type : 'POST',
		url : 'https://tieba.baidu.com/f/commit/vote/add',
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		referer: 'http://tieba.baidu.com/newvote/createvote?kw=zyeh&ie=utf-8&red_tag=h1132008651',
		data : 'kw=' + tbName + '&title=' + voteTitle + '&content=&tid=0&' + 'floor_num=0&anonymous=&rich_text=&pic_url=&sign_id=&vcode=&fid=' + fid + 
		'&tbs=' + voteTbs + '&product_name=forum&expire_time='+year+'-'+(month+1)+'-'+myddy+'+23%3A26%3A10&' + 
		'item_type=0&max_select_num=1&perm=2&attr_key_1=forum_name&attr_value_1=' + tbName + 
		'&attr_key_2=forum_id' + '&attr_value_2='+fid+'&item_title_1='+voteOption[0]+'&item_title_2='+voteOption[1]+'&item_title_3='+voteOption[2]+'&ie=utf-8&vcode_md5=',
		async : false
	});
}
*/
function atPeople() {
	var atPeopleButton = document.getElementById('addatinfo');
	atTargets = [];
	atPeopleButton.onclick = function() {
		var atNumber = prompt("输入你想要在刷帖时AT几个人，无上限(最好不要过5)，如果已经设置过了会覆盖。输入 CLS 关闭AT功能");
		if (atNumber == "CLS" || atNumber == "cls") {
			isMentionModeEnabled = 0;
		} else if (isNaN(atNumber)) {
			alert("错误，你得输入被AT的人数，这是个纯数字。");
		} else {
			for (var i = 0; i < atNumber; i++) {
				atTargets[i] = prompt("第" + (i + 1) + "个目标，" + "输入对方贴吧用户名，注意不是昵称。");
			}
			isMentionModeEnabled = 1;
		}
	};
}

function startMainLoop() {
	mainLoop = setInterval(function() {
		TBElement_title.value = getObfusedTitle();
		var tempContentContainer = getObfusedContent();
		if (isMentionModeEnabled) {
			for (var i = 0; i < atTargets.length; i++) {
				tempContentContainer = tempContentContainer + " @" + atTargets[i] + " ";
			}
		}
		TBElement_content.innerHTML = tempContentContainer;
		$(".poster_submit")[0].click();
		commonCounter = commonCounter + 1;
		TBElement_pageTitle.innerText = tbName + "吧 | 发帖数：" + commonCounter;
	}, controlTick);
}

function stopMainLoop() {
	clearInterval(mainLoop);
}

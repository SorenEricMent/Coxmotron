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
		id:'coxmotron-gui'
	});

	consoleObject.appendTo('body');
	var objectiveGUI = document.getElementById('coxmotron-gui');
	objectiveGUI .innerHTML="Test";
	console.log(__ORIGIN__ + "Coxmotron GUI loaded.");
}

function getObfusedTitle() {
	return getPoem().content;
}

function getObfusedContent() {
	var contentMode = Math.floor(Math.random() * 3);
	return getPoem().content;
}

function __initialization__() {
	var TBElement_title = document.getElementsByClassName('editor_title ui_textfield')[0];
	var TBElement_content = document.getElementById('ueditor_replace');
	var TBElement_submit = document.getElementsByClassName('poster_submit')[0];
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

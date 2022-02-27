window.ok = false;



layui.use(['form', 'jquery', 'layer'], function() {

	window.$ = layui.$;

	window.form = layui.form;

	window.layer = layui.layer;

	$('.statement.0').css('display', 'none');

	form.render();

	//layer.msg("缃戠珯浠嶅湪寮€鍙戜腑,濡傛灉閬囧埌闂璇疯仈绯荤鐞嗗憳");

});



window.checkname = function() {

	let rule = /^[a-zA-Z0-9_]{3,16}$/;

	let name = $('#player').val();

	if (rule.test(name)) {

		$.post("./api/user.php", 'action=checkname&name=' + name, function(data, status) {

			if (status === 'success' && data.code === 1) {

				window.ok = true;

				$('#check').text('');

				refreshSkin(name);

			} else {

				window.ok = false;

				$('#check').css('color', 'red');

				$('#check').text('鍚嶇О宸茶鍗犵敤');

			}

		});

		$.get('//api.yfdadi.com/skin/skin.php?name=' + name.toLowerCase());

	} else {

		window.ok = false;

		$('#check').text('鍙兘鏄�3-16浣嶅瓧姣嶆暟瀛椾笅鍒掔嚎');

		$('#check').css('color', 'red');

	}

}

window.register = function() {

	layui.$('#button-reg').attr("disabled", true);

	layui.$('#button-reg').addClass("layui-btn-disabled");

	if (!ok) {

		layer.msg('璇锋鏌ユ父鎴忓悕鏄惁瑙勮寖');

		layui.$('#button-reg').attr("disabled", false);

		layui.$('#button-reg').removeClass("layui-btn-disabled");

		return;

	}

	//const player = $('#player').val();

	var post = {

		"action": "register",

		"name": $('#player').val(),

		"pass": $('#password').val(),

		"email": $("#qq").val() + '@qq.com'

	}

	$.post('./api/user.php', post, function(result) {

		if (result.code == 1) {

			layer.msg('娉ㄥ唽鎴愬姛,璇峰墠寰€鐢ㄦ埛涓績鐧诲綍', {

				icon: 6

			});

			$('#check').text('娉ㄥ唽鎴愬姛');

			$('#check').css('color', 'green');

			layui.$('#button-reg').attr("disabled", false);

			layui.$('#button-reg').removeClass("layui-btn-disabled");

		} else {

			layer.msg(result.msg, {

				icon: 2

			});

		}

	});

	/*

	layer.open({

	  type: 2,

	  title: '姝ｅ湪涓� ' + player + ' 璐拱鐧藉悕鍗�',

	  shade: [0.3, '#000'],

	  area: ['360px', '320px'],

	  content: ['./pay.html?player=' + player + '&payway=' + $('input:radio:checked').val() + '&time=' + Date.parse(new Date()), 'no'],

	  success: function(layero) {}

	});

	*/

}



function refreshSkin(name) {

	$.post("//api.yfdadi.com/skin/skinbase.php", 'name=' + name.toLowerCase(), function(data, status) {

		if (status === 'success' && data !== '') {

			$.msp.config.skinUrl = data;

			initSkinViewer(60);

			registerAnimationController();

			registerWindowResizeHandler();

		}

	});

}

window.onload = function() {
	var inputs = $('.input')[0];
	var outputs = $('.output')[0];
	inputs.style.height = $(window).height() + 'px';
	outputs.style.height = $(window).height() + 'px';
	
	$(window).resize(function() {
		inputs.style.height = $(window).height() + 'px';
		outputs.style.height = $(window).height() + 'px';
	});
	
	var row = [];
	row[0] = $('.nums')[0];
	
	mark(row);
	addText(row);
	mouseClick(row);
	showContent();
}

function mark(row) {
	$('#textarea').keydown(function(e) {
		var e = e || window.event;
		
		// enter
		if (e.keyCode == 13) {
			// 拦截换行
			e.cancelBubble = true;
			e.preventDefault();
			e.stopPropagation();
			var t = parseInt($('#textarea').css('top'))/15;
			//文本域下移
			$('#textarea').css('top', (t + 1) * 15);
			$('#textarea').val("");
			// 添加行
			var div = document.createElement('div');
			div.setAttribute('class', 'rows');
			var span = document.createElement('span');
			div.appendChild(span);
			//$('.row-list')[0].appendChild(div);
			$('.rows:eq(' + t + ')').after(div);
			row.push(div);
			// 添加列表数字
			$('.row-num').append('<div class="nums">' + row.length + '</div>');
			//添加右侧div
			$('.output:eq(0)').append('<div class="outext"></div>');
		}
		
		// backspace
		if (e.keyCode == 8) {
			var nowt = parseInt($('#textarea').css('top'));
			var i = $('span:eq(' + nowt/15 + ')').html();
			var val = $('span:eq('+ (nowt/15-1) + ')').html(val);
			if (i == '' && nowt/15 != 0) {
				//拦截删除
				e.cancelBubble = true;
				e.preventDefault();
				e.stopPropagation();
				//删除行
				$('.rows:eq(' + nowt/15 + ')').remove();
				//文本域上移
				$('#textarea').css('top', nowt - 15);
				$('#textarea').val(val);
				//删除数组中指定位置
				row.splice(nowt/15, 1);
				//刷新数字
				$('.nums').remove();
				for (var i=0; i<row.length; i++) {
					$('.row-num').append('<div class="nums">' + (i+1) + '</div>');
				}		
				//删除右侧
				$('.outext:eq(' + nowt/15 + ')').remove();
			}
		}
		
		// up
		if (e.keyCode == 38) {
			var t = parseInt($('#textarea').css('top'));
			var val = $('span:eq('+ (t/15-1) + ')').html(val);
			if (t != 0) {
				$('#textarea').css('top', t - 15);
				$('#textarea').val(val);
			}
		}
		
		// down
		if (e.keyCode == 40) {
			var t = parseInt($('#textarea').css('top'));
			var val = $('span:eq('+ (t/15+1) + ')').html(val);
			if (t/15 != row.length-1) {
				$('#textarea').css('top', t + 15);
				$('#textarea').val(val);
			}
		}
	});	
}

function addText(row) {
	$('textarea').keyup(function() {
		var val = $('textarea').val();
		var nowNum = parseInt($('#textarea').css('top'))/15;
		$('span:eq('+ nowNum + ')').html(val);
	});
}

//监听addtext，刷新内容
function showContent() {
	$('#textarea').keyup(function() {
		var t = parseInt($('#textarea').css('top'))/15;
		var val = $('span:eq(' + t + ')').html();
		$('.outext:eq(' + t + ')').html(val);
	});
}

//鼠标点击
function mouseClick(row) {
	addEventListener('click', function(e) {
		var e = e || window.event;
		var t = Math.floor(e.clientY / 15);
		var val = $('span:eq(' + t +')').html();
		console.log(t);
		console.log(val);
		if (t <= row.length) {
			$('#textarea').css('top', t*15);
			$('#textarea').val(val);
		}
	});
}

//正则编译
function regex() {
	
}

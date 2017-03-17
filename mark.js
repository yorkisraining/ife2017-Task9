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
	//mouseClick(row);
	showLayout(row);
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
			// 添加行
			var div = document.createElement('div');
			div.setAttribute('class', 'rows');
			var span = document.createElement('span');
			div.appendChild(span);
			$('.row-list')[0].appendChild(div);
			row.push(div);
			for (var i=0; i<row.length; i++) {
				row[i].style.top = i*15 + 'px';
			}
			$('#textarea').css('top', (row.length-1)*15);
			$('#textarea').val("");
			// 添加列表数字
			$('.row-num').append('<div class="nums">' + row.length + '</div>');
		}
		
		// backspace
		if (e.keyCode == 8) {
			var nowt = parseInt($('#textarea').css('top'));
			var i = $('span:eq(' + nowt/15 + ')').html();
			if (i == '') {
				$('.rows:eq(' + nowt/15 + ')').remove();
				$('#textarea').css('top', nowt - 15);
				row.splice(nowt/15, 1);
				$('.nums:eq(' + nowt/15 + ')').remove();
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

//监听up down enter back，刷新布局
function showLayout(row) {
	$('#textarea').keyup(function(e) {
		var e = e || window.event;
		if (e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40  || e.keyCode == 8) {
			row.each(function(index) {
				$('.output').append('<div class=' + index + '></div>');
			});
		}
	})
}


//监听addtext，刷新内容
function showContent() {
	
}

//鼠标点击
//function mouseClick(row) {
//}

//正则编译
function regex() {
	
}

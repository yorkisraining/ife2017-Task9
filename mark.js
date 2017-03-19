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
			span.setAttribute('class', 'inspan');
			div.appendChild(span);
			//$('.row-list')[0].appendChild(div);
			$('.rows:eq(' + t + ')').after(div);
			row.push(div);
			// 添加列表数字
			$('.row-num').append('<div class="nums">' + row.length + '</div>');
			//添加右侧div
			$('.output:eq(0)').append('<div class="outext"><span class="outspan"></span></div>');
		}
		
		// backspace
		if (e.keyCode == 8) {
			var nowt = parseInt($('#textarea').css('top'));
			var i = $('.inspan:eq(' + nowt/15 + ')').html();
			var val = $('.inspan:eq('+ (nowt/15-1) + ')').html();
			
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
			var val = $('.inspan:eq('+ (t/15-1) + ')').html(val);
			if (t != 0) {
				$('#textarea').css('top', t - 15);
				$('#textarea').val(val);
			}
		}
		
		// down
		if (e.keyCode == 40) {
			var t = parseInt($('#textarea').css('top'));
			var val = $('.inspan:eq('+ (t/15+1) + ')').html(val);
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
		$('.inspan:eq('+ nowNum + ')').html(val);
	});
}

//监听addtext，刷新内容
function showContent() {
	$('#textarea').keyup(function() {
		var t = parseInt($('#textarea').css('top'))/15;
		var val = $('.inspan:eq(' + t + ')').html();
		var vals = val;
		//正则匹配
		//h1
		var h1 = /#\S{1,}/.test(vals);
		var h2 = /#{2}\S{1,}/.test(vals);
		var h3 = /#{3}\S{1,}/.test(vals);
		var h4 = /#{4}\S{1,}/.test(vals);
		var h5 = /#{5}\S{1,}/.test(vals);
		var h6 = /#{6}\S{1,}/.test(vals);
		var p = /<p>\S+<\/p>/.test(vals);
		var br = /\S+(<\/br>)/.test(vals);
		var lis = /(\*|\-|\+)\s+\S+/.test(vals);
		var ols = /\d+\.\s+\S+/.test(vals);
		var italic = /(\*|\-)+(\s)*\S+(\s)*(\*|\-)+/.test(vals);
		var quoteInline = /(`+)\s*\S+\s*(`+)/.test(vals);
		if (h1 || h2 || h3 || h4 || h5 || h6 || italic || quoteInline) {
			if(h1) {
				$('.outspan:eq(' + t + ')').css('font-size', 32);
				vals = val.replace(/#/, '');
			}
			if(h2) {
				$('.outspan:eq(' + t + ')').css('font-size', 28);
				vals = val.replace(/#{2}/, '');
			}
			if(h3) {
				$('.outspan:eq(' + t + ')').css('font-size', 24);
				vals = val.replace(/#{3}/, '');
			}
			if(h4) {
				$('.outspan:eq(' + t + ')').css('font-size', 20);
				vals = val.replace(/#{4}/, '');
			}
			if(h5) {
				$('.outspan:eq(' + t + ')').css('font-size', 16);
				vals = val.replace(/#{5}/, '');
			}
			if(h6) {
				$('.outspan:eq(' + t + ')').css('font-size', 12);
				vals = val.replace(/#{6}/, '');
			}
			if(italic) {
				$('.outspan:eq(' + t + ')').css('font-style', 'italic');
				vals = val.replace(/(\*|\-)+([^"]*)(\*|\-)/, '$2');
			}
			if(quoteInline) {
				$('.outspan:eq(' + t + ')').css('background', 'palevioletred');
				vals = val.replace(/`+([^"]*)`+/, '$1');
			}
		} else {
			$('.outspan:eq(' + t + ')').css({
				'background': '#fff',
				'font-size': 18,
				'font-style': 'normal'
			});
		}
		$('.outspan:eq(' + t + ')').html(vals);
	});
}

//鼠标点击
function mouseClick(row) {
	addEventListener('click', function(e) {
		var e = e || window.event;
		var t = Math.floor(e.clientY / 15);
		var val = $('.inspan:eq(' + t +')').html();
		console.log(t);
		console.log(val);
		if (t < row.length) {
			$('#textarea').css('top', t*15);
			$('#textarea').val(val);
		}
	});
}

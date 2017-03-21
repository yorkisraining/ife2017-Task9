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
	for (var i=0; i<$('.rows').length; i++) {
		row[i] = $('.rows')[0];
	}
	
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
			$('.output:eq(0)').append('<div class="outext"></div>');
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
		//正则
		var head = /#\S+/.test(vals);
		var br = /\S+(<\/br>)/.test(vals);
		var lis = /(\*|\-|\+)\s+\S+/;
		var ols = /\d+\.\s+\S+/;
		var pic = /!\[\S+\]\([a-zA-z]+:\/\/[^\s]*\)/.test(vals);
		var web = /\[\S+\]\([a-zA-z]+:\/\/[^\s]*\)/.test(vals);
		var italic = /(\*|\-)+\S+(\*|\-)+/.test(vals);
		var quoteInline = /(`+)\s*\S+\s*(`+)/.test(vals);
		
		if (pic || web) {
			var a = /\(\S+\)/;
			var src = a.exec(vals)[0].replace(/\(/, '').replace(/\)/, '');
			var b = /\[\S+\]/;
			var name = b.exec(vals)[0].replace(/\[/, '').replace(/\]/, '');
			var isImg = /\!./.test(vals);
			if (isImg) {
				//图片引用
				$('.outext:eq(' + t + ')').html(name + '<img src="' + src + '" />');
				$('.outext:eq(' + t + ')').removeClass('height');
			} else {
				//链接
				$('.outext:eq(' + t + ')').html('<a href="' + src + '" >' + name + '</a>');
				$('.outext:eq(' + t + ')').addClass('height');
			}
		} else {
			$('.outext:eq(' + t + ')').addClass('height');
			if (head) {
				//标题
				var i = vals.search(/[^#]/);
				i = i > 6 ? 6 : i;
				$('.outext:eq(' + t + ')').html('<h' + i + '>' + vals.substring(i) + '</h>');
			} else if(italic) {
				//强调
				vals = val.replace(/(\*|\-)+/, '').replace(/(\*|\-)+/, '');
				$('.outext:eq(' + t + ')').html('<span>' + vals + '</span>');
				$('.outext:eq(' + t + ')').css('font-style', 'italic');
			} else if(quoteInline) {
				//行级引用
				vals = val.replace(/`+/, '').replace(/`+/, '');
				$('.outext:eq(' + t + ')').html('<span>' + vals + '</span>');	
				$('.outext:eq(' + t + ')>span').css('background', 'palevioletred');
//			} else if (lis.test(vals)) {
//				//无序列表
//				//先remove掉下一行，判断textarea上一行是否为列表，存在则在本行添加不存在则添加ul
//				var last = $('.inspan:eq(' + (t-1) + ')').html();
//				var isLi = lis.test(last);
//				vals = val.replace(/\*|\-|\+/, '');
//				if (isLi) {
//					$('.outext:eq(' + (t-1) + ')>ul:eq(0)').append('<li>' + vals + '</li>');
//					$('.outext:eq(' + t + ')').html('');
//					$('.outext:eq(' + t + ')').class('');
//				} else {
//					$('.outext:eq(' + t + ')').html('<ul><li>' + vals + '</li></ul>');
//				}
//			} else if (ols.test(vals)) {
//				
			} else {
				//正常情况
				$('.outext:eq(' + t + ')').css({
					'background': '#fff',
					'font-size': 18,
					'font-style': 'normal'
				});
				$('.outext:eq(' + t + ')').html(vals);
			}
		}
	});
}

//鼠标点击
function mouseClick(row) {
	addEventListener('click', function(e) {
		var e = e || window.event;
		var t = Math.floor(e.clientY / 15);
		var val = $('.inspan:eq(' + t +')').html();
		if (t < row.length) {
			$('#textarea').css('top', t*15);
			$('#textarea').val(val);
		}
	});
}
window.onload = function() {
	var inputs = $('.input')[0];
	var outputs = $('.output')[0];
	inputs.style.height = $(window).height() + 'px';
	outputs.style.height = $(window).height() + 'px';
	
	$(window).resize(function() {
		inputs.style.height = $(window).height() + 'px';
		outputs.style.height = $(window).height() + 'px';
	});
	
	var num = [];
	var row = [];
	
	mark(num, row);

}

function mark(num, row) {
	$('#textarea').keydown(function(e) {
		var e = e || window.event;
		if (e.keyCode == 13) {
			//添加行
			var div = $('<div class="rows"></div>');
			//div.setAttribute('class', 'rows');
			//$('.row-list')[0].appendChild(div);
			$('.row-list:eq(0)').append(div);
			row.push(div);
			row.each(function() {
				
			})
			
			
		}
	});	
}

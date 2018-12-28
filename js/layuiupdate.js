		$("div").delegate(".productiondate","change",function(e){	
				$(this).parent().text($(this).val())
			});
			$("div").delegate("[data-field=productiondate]","click",function(e){
				$(this).children("input").attr("type","date");

			});	
			$("div").delegate(".indate","change",function(e){
				$(this).parent().text($(this).val())		
			});		
			$("div").delegate("[data-field=indate]","click",function(e){
				$(this).children("input").attr("type","date");	
			});
				
				
							
			$('.addDianJiEvent').on('click', function() {
				var type = $(this).data('type');
				active[type] ? active[type].call(this) : '';
			});

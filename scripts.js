$(document).ready(function(){
	$('#button').click(function()
	{ /*
	http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={API_key}&tags=flower&per_page=3
	Key:
490339d8f11881f710ab0c35fd8a3eeb

Secret:
aa1cc58b5beb425e
	*/
		var pic= $("#search").val();
		$.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?tags='
		  +pic+"&tagmode=any&format=json&jsoncallback=?",function(data)
		{
			$("#images").append(data).fadeIn('fast');
			$.each(data.items, function(i,item) {
				 if(i == 5)
				{	
					return false;
				}	
					
				 $("<img/>").attr("src", item.media.m).appendTo("#images").addClass(''+pic+'').draggable(
			    {
				containment:'#zdes',
				cursor:'move',
				revert:'invalid',
				scroll: false
			    }); 
				i++;
			});
		});
			

		
		$("<div id="+$("#search").val()+"></div>").html(""+$('#search').val()).appendTo($('#footer')).click(function()
				{		$(this).hover().css({'cursor':'pointer'});
					$(this).children("img").each(function()
					{
						$(this).hide(200,function()
						{
							$(this).appendTo("#images").fadeIn(2000).css({
																			'top': '10px',
																			'left': '10px',
																			'right':'10px',
																			 'bottom': '10px',
																			'z-index': '10'
																		});
						});
					})
					
				});;	
		
		$('#'+$("#search").val()+'').addClass('box').fadeIn(2000).droppable(
		{
			drop: function(event,ui)
			{
				MakeDraggable(ui.draggable);
				var pic=$(ui.draggable);
				var cl = (pic).attr('class').split(' ');
				pic.fadeOut(200,function()
				{
					$(this).appendTo("div [id*="+cl[0]+"");
				})
			},
			accept:'.'+$('#'+$("#search").val()+'').attr('id'),
			activeClass: "ui-state-hover",
			
		});

		
	 
	})
			
		

});	

	function MakeDraggable(ele) {
    ele.draggable({ revert: "invalid" });
}	



 
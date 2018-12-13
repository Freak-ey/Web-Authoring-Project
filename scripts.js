onload = init();

function init()
{
	$("#BoxRegion").hide();
	$("#RadialMenu").hide();
	//$("#MusicMenu").hide();
		
	var numPerColumn = 6;
	var num = 30;
	var scale = (100 / numPerColumn) - 1;
	
	$('.ScrollableField').each(function()
	{
		$(this).mousewheel(function(event, delta)
		{
			var offset = $(this).offset();
			var distanceY = offset.top + delta * 20;
	
			$(this).offset({ top: distanceY, left: offset.left });
			
			console.log(distanceY);
		});
	});
	
	var musicMenu = $("#MusicMenu").find(".ScrollableField");
	for(var i = 0; i < num; i++)
		musicMenu.append("<div class='GridSquare'></div>");	
	
	$('.GridSquare').each(function()
	{
		var value = GenerateRandomNumber(0, 3);
		var url = "data/images/albums/";
		
		switch(value)
		{
			case 0:
				url += "Agents of Fortune"
				break;
			case 1:
				url += "Back in Black"
				break;
			case 2:
				url += "Fire of Unknown Origin"
				break;
		}
		url += ".jpg";
		//$(this).css('background-image', 'url("' + url + '")');
		$(this).width(scale + "%");
		$(this).css('paddingBottom', scale + "%");
		
		$(this).append("<div class='CardFront'> </div>");	
		$(this).append("<div class='CardBack'> </div>"); //style='background-image: url(" + '"' + url + '"' + ")
	});	
}

function OnHover()
{	
	console.log("Hover");
}

function Hide()
{
	$("#BoxRegion").hide();
	//$("#RadialMenu").show();
	$("#MusicMenu").show();
}

function GenerateRandomNumber(min, max) 
{
    return Math.floor(Math.random() * (max-min) + min);
}
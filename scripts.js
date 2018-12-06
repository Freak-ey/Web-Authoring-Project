onload = init();

function init()
{
	$("#BoxRegion").hide();
	$("#RadialMenu").hide();
	//$("#MusicMenu").hide();
	
	/*
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
		
		$(this).css('background-image: url("' + url + '");'); 
	});​
	*/
	
	
	$('.GridSquare').each(function()
	{
		var value = GenerateRandomNumber(0, 3);
		var url = "data/images/albums/";
		
		switch(value)
		{
			case 0:
				url += "Agents of Fortune"
				console.log("Fortune");
				break;
			case 1:
				url += "Back in Black"
				console.log("Back in Black");
				break;
			case 2:
				url += "Fire of Unknown Origin"
				console.log("Fire of Unknown Origin");
				break;
		}
		url += ".jpg";
		console.log(url);
		$(this).css('background-image', 'url("' + url + '")'); 
	});
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
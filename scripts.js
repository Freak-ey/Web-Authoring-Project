onload = init();

function init()
{

}

//Define a delegate to pass parameter to function
//setInterval( function() { funca(10,3); }, 500 );

function AnimateBoxRegion()
{	
	var elem = $("#BoxRegion");
    AnimateHorizontal(elem, 10, -2000);
}

function AnimateHorizontal(elementObj, step, amount)
{
	var id = setInterval(frame, 5);
	
	var o = GetXYCoords(elementObj);
	var offset = 0;
	
	var direction = Math.sign(amount);
	amount = Math.abs(amount);
	
	function frame()
	{
        offset = Math.min(offset + step, amount);		
		SetXYCoords(elementObj, o.x + offset * direction, o.y);
		if(offset == amount)
			clearInterval(id);
    }
}

function GetXYCoords(elementObj)
{
	var offset = elementObj.offset();
	var width = elementObj.width() + elementObj.outerWidth();
	var height = elementObj.height() + elementObj.outerHeight();

	var centerX = offset.left + width / 2;
	var centerY = offset.top + height / 2;
	
	return { x: centerX, y: centerY };
}

function SetXYCoords(elementObj, x, y)
{
	var width = elementObj.width() + elementObj.outerWidth();
	var height = elementObj.height() + elementObj.outerHeight();
		
    elementObj.offset({left: x - (width / 2), top: y - (height / 2)});
}
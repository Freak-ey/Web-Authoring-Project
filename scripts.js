onload = init();

function init()
{
	draggable = document.getElementById("Slider")
	draggable.onmousedown = OnMouseDown;
	draggable.onmouseup = OnMouseUp;
}

function OnMouseDown()
{
	var x = event.clientX;     // Get the horizontal coordinate
	var y = event.clientY;     // Get the vertical coordinate
	console.log(x + " : " + y);
}

function OnMouseUp()
{
	
}

function OnMouseMove()
{
	
}
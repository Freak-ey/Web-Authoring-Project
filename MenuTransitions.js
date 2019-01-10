var menus = [];
var currentMenu = 0;

onload = init();

function init()
{
	menus.push({name:'Main Menu', parentID:'#LoginMenu', transition_in: function() { MainMenu_TransitionIn(); }, transition_out: function(transitionInFunc) { MainMenu_TransitionOut(); transitionInFunc(); }});
	menus.push({name:'Music Player', parentID:'#MusicMenu', transition_in: function() { MusicPlayer_TransitionIn(); }, transition_out: function(transitionInFunc) { MusicPlayer_TransitionOut(); transitionInFunc(); }});
	
	HideAll();
	menus[0].transition_in();
}

function ChangeMenu(menuID)
{
	var current = currentMenu;
	currentMenu = menuID;
	menus[current].transition_out(menus[menuID].transition_in);
}

function MainMenu_TransitionIn()
{
	console.log("Transition into main menu");
	$("#LoginMenu").show();
}

function MainMenu_TransitionOut()
{
	console.log("Transition out of main menu");		
	$("#LoginMenu").hide();
}


function MusicPlayer_TransitionIn()
{
	console.log("Transition into music menu");
	$("#MusicMenu").show();
}

function MusicPlayer_TransitionOut()
{
	console.log("Transition out of music menu");		
	$("#MusicMenu").hide();
}

function HideAll()
{
	for(var i = 0; i < menus.length; i++)
		$(menus[i].parentID).hide();
}
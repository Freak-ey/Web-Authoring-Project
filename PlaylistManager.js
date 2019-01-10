var numPerColumn = 6;
var num = 1;
var scale = (100 / numPerColumn) - 1;
	
var musicList = $("#MusicMenu").find(".MusicList");
var dotted = musicList.find("#CreatePlaylist");

var playlistObjects = [];
var emptySlots = [];

dotted.width(scale + "vw");
dotted.height(scale + "vw");
	
for(var i = 0; i < builtInPlaylists.length; i++)
	CreatePlaylist(builtInPlaylists[i]);
	
function GenerateRandomNumber(min, max) 
{
    return Math.floor(Math.random() * (max-min) + min);
}

function CreateNewPlaylist()
{
	CreatePlaylist(new Playlist());
}

function CreatePlaylist(playlist)
{
	$("<div class='GridSquare Playlist'></div>").insertBefore(dotted);
	
	var gridSquare = musicList.find(".Playlist").last();
	
	gridSquare.width(scale + "vw");
	gridSquare.height(scale + "vw");
		
	gridSquare.append("<div class='FlipCard'> </div>");
	var flipcard = gridSquare.find(".FlipCard");
	
	gridSquare.hover(function(e) { flipcard.addClass("ShowCardBack"); }, function(e) { flipcard.removeClass("ShowCardBack"); });
	
	flipcard.append("<div class='CardFront FillImage'> </div>");	
	flipcard.append("<div class='CardBack'> </div>");
		
	PopulateCardFront(flipcard.find(".CardFront"), playlist.coverURL);
	PopulateCardBack(flipcard.find(".CardBack"), playlist, GetPlaylistID(gridSquare));
}

function PopulateCardFront(element, url)
{		
	element.css('background-image', 'url("' + url + '")');
	element.height(scale + "vw");
	element.width(scale + "vw");
}

function PopulateCardBack(element, playlist, id)
{
	element.height(scale + "vw");
	element.width(scale + "vw");
	
	element.append("<h1 contenteditable='true'>" + playlist.name + "</h1>");
	
	element.append("<img src='data/images/EditPlaylistIcon.svg' style='float:left;	' draggable='false' class='PlaylistButton DisableSelect' onclick='TogglePlaylistEditing(" + id  + ")'>");
	//element.append("<img src='data/images/NewImageIcon.svg' style='float:left;' draggable='false' class='PlaylistButton DisableSelect' onclick=AddToPlaylist()'>");
	element.append("<img src='data/images/TrashIcon.svg' style='float:right;' draggable='false' class='PlaylistButton DisableSelect' onclick='DeletePlaylist(" + id + ")'>");
	
	element.append("<div class='AlbumScrollField Scrollable'> </div>");
	
	element.find("h1").on("keydown paste", function(event)
	{
		if(($(this).text().length === 12 && event.keyCode != 8) || event.keyCode == 13) 		
			event.preventDefault();
	});
	
	var albumScroll = element.find(".AlbumScrollField");
	albumScroll.width(scale + "vw");
	albumScroll.height(scale - 4 + "vw");
	albumScroll.append("<ol> </ol>");
	
	var list = albumScroll.find("ol");
	
	for(var i = 0; i < playlist.songs.length; i++)
	{
		var song = playlist.songs[i];		
		
		list.append("<li> </li>");
		var listElement = list.find("li").last();
		
		
		listElement.append("<h2 class='ListedSong' onclick='ChangeSong(" + '"' + song.url + '"' + ")'>" + song.name + "</h2>");		
		listElement.append("<img src='data/images/Cross.svg' style='float:right;' draggable='false' class='PlaylistCross SetInvisible DisableSelect'>");
	
	}
}

function TogglePlaylistEditing(id)
{
	var playlist = playlistObjects[id];
	if(playlist.currentlyEditing)
		HideEditingFeatures(playlist);
	else
		ShowEditingFeatures(playlist);
	playlist.currentlyEditing = !playlist.currentlyEditing;
}

function ShowEditingFeatures(playlistObject)
{
	var list = playlistObject.mainElement.find("li");	
	for(var i = 0; i < list.length; i++)
	{
		var text = list.find(".ListedSong");
		var icon = list.find(".PlaylistCross");
		
		text.addClass("ReduceWidth");
		icon.removeClass("SetInvisible");
	}
}

function HideEditingFeatures(playlistObject)
{
	var list = playlistObject.mainElement.find("li");	
	for(var i = 0; i < list.length; i++)
	{
		var text = list.find(".ListedSong");
		var icon = list.find(".PlaylistCross");
		
		text.removeClass("ReduceWidth");
		icon.addClass("SetInvisible");
	}
}

function DeletePlaylist(id)
{
	emptySlots[emptySlots.length] = id;
	playlistObjects[id].mainElement.remove();
}

function GetPlaylistID(element, playlist)
{
	var id;
	if(emptySlots.length != 0)	
	{
		id = emptySlots[emptySlots.length - 1];
		emptySlots.length = emptySlots.length - 1;
	}
	else
		id = playlistObjects.length;
	playlistObjects[id] = new PlaylistObject(element, playlist);
	return id;
}
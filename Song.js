//Contains helper functions for songs and playlists
var builtInSongList = 
[
	//Back in Black
	{ name: "ACDC - Hell's Bells", url: "data/music/ACDC - Hells Bells.mp3" },
	{ name: "ACDC - Shoot To Thrill", url: "data/music/ACDC - Shoot To Thrill.mp3" },
	{ name: "ACDC - Back In Black", url: "data/music/ACDC - Back in Black.mp3" },
	{ name: "ACDC - What Do You Do For Money Honey", url: "data/music/ACDC - What Do You Do For Money Honey (Filmed July, 1980).mp3" },
	{ name: "ACDC - Given the Dog a Bone(Live)", url: "data/music/ACDC - Given the Dog a Bone - Live - American Airlines Center Dallas TX 2-23-16.mp3" },
	{ name: "ACDC - You Shook Me All Night Long", url: "data/music/ACDC - You Shook Me All Night Long.mp3" },
	
	{ name: "Blue Oyster Cult - (Don't Fear) The Reaper", url: "data/music/Blue Oyster Cult - (Dont Fear) The Reaper 1976 [Studio Version]cowbell link in description.mp3" },
	{ name: "Blue Oyster Cult - Burning For You", url: "data/music/Blue Oyster Cult Burnin For You.mp3" },
	
];

var builtInPlaylists = [];

builtInPlaylists.push(new Playlist("Back In Black", "data/images/albums/Back in Black.jpg", 0, 5 ));
builtInPlaylists.push(new Playlist("Blue Oyster Cult", "data/images/albums/Fire of Unknown Origin.jpg", 6, 7 ));

//Contains helper functions for songs and playlists
function Song(name, url)
{
	this.name = name;
	this.url = url;
}

//The Data representation of a playlist
function Playlist(name = "New Playlist", coverURL= "data/images/PlaylistBlank.svg", songs = [])
{
	this.name = name;
	this.coverURL = coverURL;
	this.songs = songs;
}

function Playlist(name = "New Playlist", coverURL= "data/images/PlaylistBlank.svg", min, max)
{
	this.name = name;
	this.coverURL = coverURL;
	
	this.songs = [];
	for(var i = min; i <= max; i++)
		this.songs.push(builtInSongList[i]);
}

//The Representation of the Playlist on the Website
function PlaylistObject(mainElement, id, playlist = new Playlist())
{
	this.mainElement = mainElement;
	this.playlist = playlist;
	this.id = id;
	this.currentlyEditing = false;
	this.songElements = [];
}
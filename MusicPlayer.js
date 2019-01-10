var currentSong = new Audio();

var durationElement = $("#MusicDuration");
var musicPlayer = $(".MusicPlayer");
var progressBar = $("#ProgressBar");
var barContainer = $("#BarContainer");
var barSlider = $("#BarSlider");

var pauseButton = $("#PauseButton");

var currentSelectedElement;

var durationSeconds;
var duration;

var mouseX;
var manuallyPaused;

//
barContainer.mousedown(OnBarClicked);
$("#MusicPlayerContainer").hover(function(e) { musicPlayer.addClass("ShowMusicPlayer"); }, function(e) { musicPlayer.removeClass("ShowMusicPlayer"); });

//On Song Load Callback
currentSong.addEventListener('loadeddata', OnSongLoad);

var mouseDown;

//Actual Code
function OnBarClicked(e)
{	
	mouseDown = true;
	window.requestAnimationFrame(AnimateWhilstMouseDown);
}

function OnBarReleased()
{
	if(currentSong.src == "")
		return;
	
	var percentage = mouseX / $(window).width();
	SetBarPercentage(percentage);
	
	//Set current song position
	var currentTime = currentSong.duration * percentage;
	
	if(!manuallyPaused)
		PlaySong(currentTime);
	else
		currentSong.currentTime = currentTime;
	
	window.requestAnimationFrame(AnimateMusicPlayer);
}

function AnimateWhilstMouseDown()
{
	if(!mouseDown || currentSong.src == "")
		return;
	var percentage = mouseX / $(window).width();
	SetBarPercentage(percentage);
	
	window.requestAnimationFrame(AnimateWhilstMouseDown);
}

function AnimateMusicPlayer()
{
	var percentage = (currentSong.currentTime / durationSeconds);
	SetBarPercentage(percentage);
		
	if(!currentSong.paused)
		window.requestAnimationFrame(AnimateMusicPlayer);
}

function SetBarPercentage(percentage)
{
	progressBar.width(percentage * 100 + "vw");
	
	var t = barSlider.offset().top;
	barSlider.offset({left: (percentage - 0.001) * $(window).width(), top: t }); //0.001 offset to ensure that the dot fits ontop of the end of the bar
	
	var includeHours = (duration.hours != 0);
	durationElement.text(DirectToString(currentSong.duration * percentage, includeHours) + "/" + duration.ConvertToString(includeHours));	
}

//Basic Interface For Buttons to interact with the Music Player
function ChangeSong(source)
{	
	currentSong.setAttribute("src", source);
}

function PauseSong()
{
	currentSong.pause();
	manuallyPaused = true;
	
	UpdateButtonGraphic();
}

function PlaySong(time = currentSong.currentTime)
{
	currentSong.currentTime = time;
	currentSong.play();
	manuallyPaused = false;
	
	UpdateButtonGraphic();
	window.requestAnimationFrame(AnimateMusicPlayer);
}

function ToggleSong()
{
	if(currentSong.src == "")
		return;
	if(currentSong.paused)
		PlaySong();
	else
		PauseSong();
}

function UpdateButtonGraphic()
{
	if(!currentSong.paused)
		pauseButton.attr("src", "data/images/PauseButton.svg");
	else
		pauseButton.attr("src", "data/images/PlayButton.svg");
}

function SkipToNext()
{
	PlaySong(durationSeconds);
}

function SkipToPrevious()
{
	PlaySong(0);
}

//Callbacks
function OnSongLoad()
{	
	duration = CreateHHMMSSFromDuration(currentSong.duration);
	durationSeconds = currentSong.duration;
	
	var includeHours = (duration.hours != 0);
	durationElement.text(DirectToString(0, includeHours) + "/" + duration.ConvertToString(includeHours));
		
	PlaySong();
}

//HHMMSS Object
function DirectToString(time, includeHours = true)
{
	var hours = Math.floor(time / 3600);
	time = time - hours * 3600;
	
	var minutes = Math.floor(time/60);
	var seconds = Math.floor(time - minutes * 60);
	
	var str = "";
	if(includeHours)	
		str += hours + ":";
	if(minutes < 10 && hours != 0)
		str += "0";
	str += minutes + ":";
	if(seconds < 10)
		str += "0";
	str += seconds;
	
	return str;
}

function CreateHHMMSSFromDuration(time)
{
	var hours = Math.floor(time / 3600);
	time = time - hours * 3600;
	
	var minutes = Math.floor(time/60);
	var seconds = Math.floor(time - minutes * 60);
	
	return new HHMMSS(hours, minutes, seconds);
}

function HHMMSS(hours, minutes, seconds)
{
	this.hours = hours;
	this.minutes = minutes;
	this.seconds = seconds;
}

HHMMSS.prototype.ConvertToString = function(includeHours = true)
{
	var str = "";
	
	if(includeHours)	
		str += this.hours + ":";
	if(this.minutes < 10 && this.hours != 0)	
		str += "0";
	str += this.minutes + ":";
	if(this.seconds < 10)
		str += "0";
	str += this.seconds;
	
	return str;
}

document.onmouseup = OnMouseUp;
function OnMouseUp(event) 
{
	if(mouseDown)
	{
		mouseDown = false;
		OnBarReleased();
	}
}

document.onmousemove = OnMouseMove;
function OnMouseMove(event) 
{
	mouseX = event.pageX;
	mouseY = event.pageY;
}
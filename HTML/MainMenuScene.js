var MENU_PLAY = 1;
var MENU_EXIT = 0;

//Button varibles
var playPosX;
var playPosY;
var playSizeX;
var playSizeY;

var multiPosX;
var multiPosY;
var multiSizeX;
var multiSizeY;

var exitPosX;
var exitPosY;
var exitSizeX;
var exitSizeY;

function MainMenuScene()
{
	this.playSizeX = this.multiSizeX = this.endSizeX = 300;
	this.playSizeY = this.multiSizeY = this.endSizeY = 90;

	this.createMenu();

	this.image = new Image();
	this.image.src = "../assets/gfx/Menu/play.png"
	//console.log("MainMenuScene Initaliser called");
}

MainMenuScene.prototype.createScene = function()	{	}

MainMenuScene.prototype.getClickPosiiton = function(e)
{
	var x;
	var y;
	if (e.pageX || e.pageY) { 
  		x = e.pageX;
  		y = e.pageY;
	}
	else { 
  		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	//x -= game.screenwidth;
	//y -= game.screenheight;
	//x *= -1;
	//y *= -1;
	console.log(x + ", " + y)
}

MainMenuScene.prototype.disposeScene = function()	
{	
	ResourceManager.getInstance().UnloadMenuResources();
}

MainMenuScene.prototype.createMenu = function()
{
	this.playPosX = (game.screenwidth / 2) - (this.playSizeX/2);
	this.playPosY = (game.screenheight / 4);

	this.multiSizeX = (game.screenwidth / 2) - (this.playSizeX/2);
	this.multiSizeY = (game.screenheight / 4) * 3;
	//console.log("MainMenuScene createMenu called");
}

MainMenuScene.prototype.onMenuItemClicked = function(e)
{
	switch(e)
	{
		case MENU_PLAY:
			SceneManager.getInstance().setGameScene();
			return true;
		case MENU_EXIT:
			return true;
	}
	return false;
}

MainMenuScene.prototype.Draw = function()
{
	//console.log("MainMenuDraw Called:")
	game.ctx.drawImage(this.image, this.playPosX, this.playPosY, this.playSizeX, this.playSizeY);
}
var MENU_PLAY = 0;
var MENU_MULTI = 1;
var MENU_EXIT = 2;

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
	this.MENU_PLAY = 0;
	this.MENU_MULTI = 1;
	this.MENU_EXIT = 2;

	this.playSizeX = this.multiSizeX = this.exitSizeX = 300;
	this.playSizeY = this.multiSizeY = this.exitSizeY = 90;

	this.createMenu();
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
	this.CheckButtonTouch(x,y);
	//console.log(x + ", " + y)
}

MainMenuScene.prototype.CheckButtonTouch = function(x, y)
{
	if (x > this.playPosX && x < this.playPosX + this.playSizeX &&
		y > this.playPosY && y < this.playPosY + this.playSizeY)
	{
			//this.onMenuItemClicked(this.MENU_PLAY);
			console.log("MENU_PLAY")
	}

	if (x > this.multiPosX && x < this.multiPosX + this.multiSizeX &&
		y > this.multiPosY && y < this.multiPosY + this.multiSizeY)
	{
			//this.onMenuItemClicked(this.MENU_MULTI);
			console.log("MENU_Multi")
	}

	if (x > this.exitPosX && x < this.exitPosX + this.exitSizeX &&
		y > this.exitPosY && y < this.exitPosY + this.exitSizeY)
	{
			this.onMenuItemClicked(2);
			//console.log("MENU_EXIT")
	}
}

MainMenuScene.prototype.disposeScene = function()	
{	
	resourceManager.UnloadMenuResources();
}

MainMenuScene.prototype.createMenu = function()
{
	this.playPosX = (game.screenwidth / 2) - (this.playSizeX/2);
	this.playPosY = (game.screenheight / 7);

	this.multiPosX = (game.screenwidth / 2) - (this.multiSizeX/2);
	this.multiPosY = (game.screenheight / 7) * 3;

	this.exitPosX = (game.screenwidth / 2) - (this.exitSizeX/2);
	this.exitPosY = (game.screenheight / 7) * 5;
	console.log(this.exitPosX + ", " + this.exitPosY);
}

MainMenuScene.prototype.onMenuItemClicked = function(e)
{
	switch(e)
	{
		case this.MENU_PLAY:
			//SceneManager.getInstance().setGameScene();
			sceneManager.setGameScene();
			break;

		case this.MENU_MULTI:
			//SceneManager.getInstance().setMultiplayerScene();
			break;

		case this.MENU_EXIT:
			//SceneManager.getInstance().setInfoScene();
			break;
	}
	return false;
}

MainMenuScene.prototype.Draw = function()
{
	//console.log("MainMenuDraw Called:")
	game.ctx.drawImage(resourceManager.play_BUTTON, this.playPosX, this.playPosY, this.playSizeX, this.playSizeY);
	game.ctx.drawImage(resourceManager.multi_BUTTON, this.multiPosX, this.multiPosY, this.multiSizeX, this.multiSizeY);
	game.ctx.drawImage(resourceManager.exit_BUTTON, this.exitPosX, this.exitPosY, this.exitSizeX, this.exitSizeY);
}
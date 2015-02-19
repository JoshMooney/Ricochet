var MENU_PLAY = 0;
var MENU_MULTI = 1;
var MENU_DEV = 2;

//Button varibles
var playPosX;
var playPosY;
var playSizeX;
var playSizeY;

var multiPosX;
var multiPosY;
var multiSizeX;
var multiSizeY;

var devPosX;
var devPosY;
var devSizeX;
var devSizeY;

function MainMenuScene()
{
	this.MENU_PLAY = 0;
	this.MENU_MULTI = 1;
	this.MENU_DEV = 2;

	this.playSizeX = this.multiSizeX = this.devSizeX = 300;
	this.playSizeY = this.multiSizeY = this.devSizeY = 90;

	this.animatedImageSourceX = 0;
	this.animatedImageSourceY = 0;
	this.animatedImageWidth = 400;
	this.animatedImageHeight = 150;
	this.animatedImageClock = 0;
	this.animatedImageClockLimit = 10;
	this.animatedImageMaxHeight = 2400;

	this.animatedImagePosX = (game.screenwidth / 2) - (this.animatedImageWidth/2);
	this.animatedImagePosY = (game.screenheight / 9);

	this.createMenu();
	//resourceManager.menuBE.play();
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
	if(CURR_SCENE == SCENE_MENU)
		this.CheckButtonTouch(x,y);
	//console.log(x + ", " + y)
}

MainMenuScene.prototype.CheckButtonTouch = function(x, y)
{
	if (x > this.playPosX && x < this.playPosX + this.playSizeX &&
		y > this.playPosY && y < this.playPosY + this.playSizeY)
	{
			resourceManager.selectSE.play();
			this.onMenuItemClicked(this.MENU_PLAY);
			console.log("MENU_PLAY")
	}

	if (x > this.multiPosX && x < this.multiPosX + this.multiSizeX &&
		y > this.multiPosY && y < this.multiPosY + this.multiSizeY)
	{
			resourceManager.selectSE.play();
			this.onMenuItemClicked(this.MENU_MULTI);
			console.log("MENU_Multi")
	}

	if (x > this.devPosX && x < this.devPosX + this.devSizeX &&
		y > this.devPosY && y < this.devPosY + this.devSizeY)
	{
			resourceManager.selectSE.play();
			this.onMenuItemClicked(this.MENU_DEV);
			console.log("MENU_DEV")
	}
}

MainMenuScene.prototype.Update = function()
{
	this.Animate();
}

MainMenuScene.prototype.Animate = function()
{
	this.animatedImageClock ++;
	if(this.animatedImageClock >= this.animatedImageClockLimit)
	{
		this.animatedImageClock = 0;
		if(this.animatedImageSourceY + this.animatedImageHeight == this.animatedImageMaxHeight)
			this.animatedImageSourceY = 0;
		else
			this.animatedImageSourceY += this.animatedImageHeight;
	}
}

MainMenuScene.prototype.disposeScene = function()	
{	
	resourceManager.UnloadMenuResources();
}

MainMenuScene.prototype.createMenu = function()
{
	this.playPosX = (game.screenwidth / 2) - (this.playSizeX/2);
	this.playPosY = (game.screenheight / 9) * 3;

	this.multiPosX = (game.screenwidth / 2) - (this.multiSizeX/2);
	this.multiPosY = (game.screenheight / 9) * 5;

	this.devPosX = (game.screenwidth / 2) - (this.devSizeX/2);
	this.devPosY = (game.screenheight / 9) * 7;
	//console.log(this.exitPosX + ", " + this.exitPosY);
}

MainMenuScene.prototype.onMenuItemClicked = function(e)
{
	switch(e)
	{
		case this.MENU_PLAY:
			sceneManager.setGameScene();
			resourceManager.menuBE.pause();
			break;

		case this.MENU_MULTI:
			//sceneManager.setMultiplayerScene();
			break;

		case this.MENU_DEV:
			//sceneManager.setInfoScene();
			break;
	}
	return false;
}

MainMenuScene.prototype.Draw = function()
{
	//console.log("MainMenuDraw Called:")
	
	game.ctx.drawImage(resourceManager.play_BUTTON, this.playPosX, this.playPosY, this.playSizeX, this.playSizeY);
	game.ctx.drawImage(resourceManager.multi_BUTTON, this.multiPosX, this.multiPosY, this.multiSizeX, this.multiSizeY);
	game.ctx.drawImage(resourceManager.dev_BUTTON, this.devPosX, this.devPosY, this.devSizeX, this.devSizeY);

	game.ctx.drawImage(resourceManager.animatedTitle, 
						this.animatedImageSourceX, this.animatedImageSourceY, 
						this.animatedImageWidth, this.animatedImageHeight, 
						this.animatedImagePosX, this.animatedImagePosY, 
						this.animatedImageWidth, this.animatedImageHeight);


}
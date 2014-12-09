
function GameScene()
{
	this.createScene();
	resourceManager.gameBE.play();
	console.log("GameScene Initaliser called");
}

GameScene.prototype.createScene = function()	
{	
	//configGestureDetection();
	createHUD();
	createPhysics();
	addPlayer();
	createTiles();
}

GameScene.prototype.getClickPosiiton = function(e)
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
	//this.CheckButtonTouch(x,y);
	//console.log(x + ", " + y)
}

GameScene.prototype.disposeScene = function()	
{	
	resourceManager.UnloadMenuResources();
}

GameScene.prototype.createHUD = function(e)
{

}

GameScene.prototype.createPhysics = function(e)
{

}

GameScene.prototype.addPlayer = function(e)
{

}

GameScene.prototype.createTiles = function(e)
{

}

GameScene.prototype.Update()
{

}

GameScene.prototype.Draw = function()
{
	//game.ctx.drawImage(resourceManager.play_BUTTON, this.playPosX, this.playPosY, this.playSizeX, this.playSizeY);
	//game.ctx.drawImage(resourceManager.multi_BUTTON, this.multiPosX, this.multiPosY, this.multiSizeX, this.multiSizeY);
	//game.ctx.drawImage(resourceManager.exit_BUTTON, this.exitPosX, this.exitPosY, this.exitSizeX, this.exitSizeY);
}
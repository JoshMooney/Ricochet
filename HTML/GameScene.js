
function GameScene()
{

	resourceManager.gameBE.play();
	this.playerLifes = 3;
	this.score = 0;
	this.createScene();
	console.log("GameScene Initaliser called");
}

GameScene.prototype.createScene = function()	
{	
	//configGestureDetection();
	//createHUD();
	//createPhysics();
	this.addPlayer();
	this.createTiles();
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
	this.playerOne = new Player(Scale, game.screenwidth, game.screenheight);
}

GameScene.prototype.createTiles = function()
{
	var tileSize = 48;
	var i; 
	var Lenght = 10;
	var Width = 15;
	for (i = 0; i < Lenght; i++)
	{
		tileManager.createTile(0,tileSize * i);
		tileManager.createTile(14 * tileSize, tileSize * i);
	}
	for (i = 0; i < Width; i++)
	{
		tileManager.createTile(tileSize * i,0);
		tileManager.createTile(i * tileSize, tileSize * 9);
	}
	
	

}

GameScene.prototype.Update = function()
{
	this.playerOne.Update();
}

GameScene.prototype.Draw = function()
{
	game.ctx.font = "30px Arial";
	this.playerOne.Draw();
	
	//HUD Background
	game.ctx.drawImage(resourceManager.SpriteBackGround, 0, game.canvas.height - 90, 228, 100);
	game.ctx.strokeText("Score : " + this.score, 10, game.canvas.height - 50);
	game.ctx.strokeText("Lives : ", 10, game.canvas.height - 20);

	//Draw tiles
	tileManager.draw();

	//Lives On HUD
	switch(this.playerLifes)
	{
		case 3 :
			game.ctx.drawImage(resourceManager.SpriteLives, 100, game.canvas.height - 45, 32.5, 32.5);
			game.ctx.drawImage(resourceManager.SpriteLives, 100 + 22.5 + 10, game.canvas.height - 45, 32.5, 32.5);
			game.ctx.drawImage(resourceManager.SpriteLives, 100 + 55 + 10, game.canvas.height - 45, 32.5, 32.5);
			break;
		case 2 :
			game.ctx.drawImage(resourceManager.SpriteLives, 100, game.canvas.height - 45, 32.5, 32.5);
			game.ctx.drawImage(resourceManager.SpriteLives, 100 + 22.5 + 10, game.canvas.height - 45, 32.5, 32.5);
			break;
		case 1 :
			game.ctx.drawImage(resourceManager.SpriteLives, 100, game.canvas.height - 45, 32.5, 32.5);
			break;
		default :
			break;
	}
}
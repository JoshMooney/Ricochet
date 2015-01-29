
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
	this.createTiles("Level 1");
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

GameScene.prototype.calculateTileSizes = function()
{
	if(game.screenwidth > 200)
		tileManager.tileWidth = game.screenwidth / 22;
	else
		tileManager.tileWidth = 16
	if(game.screenheight > 200)
		tileManager.tileHeight = game.screenheight / 12;
	else
		tileManager.tileHeight = 16
}

GameScene.prototype.createTiles = function(e)
{
	resourceManager.LoadTileResources();
	this.calculateTileSizes();
	if(e == "Level 1")
	{

		var i; 
		//tileManager.createTile(100,100);
	
		var Lenght = 10;
		var Width = 15;
		for (i = 0; i < Lenght; i++)
		{
			tileManager.createTile(0, tileManager.tileHeight * i);
			tileManager.createTile(14 * tileManager.tileWidth, tileManager.tileHeight * i);
		}
		for (i = 0; i < Width; i++)
		{
			tileManager.createTile(tileManager.tileWidth * i,0);
			tileManager.createTile(i * tileManager.tileWidth, tileManager.tileHeight * 9);
		}
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 3);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 6);

		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 3);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 6);

		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 2);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 7);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 8);
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
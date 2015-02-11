var playerOne;

var LEVEL_NUM = 1;

//Button varibles
var UpButtonPosX;
var UpButtonPosY;
var UpButtonSizeX;
var UpButtonSizeY;
var DownButtonPosX;
var DownButtonPosY;
var DownButtonSizeX;
var DownButtonSizeY;
var LeftButtonPosX;
var LeftButtonPosY;
var LeftButtonSizeX;
var LeftButtonSizeY;
var RightButtonPosX;
var RightButtonPosY;
var RightButtonSizeX;
var RightButtonSizeY;

function GameScene()
{
	resourceManager.gameBE.play();
	this.playerLifes = 3;
	this.score = 0;
	this.createScene();
	//buttons set size and location proportional to screen size
	this.UpButtonSizeY = this.UpButtonSizeX = 90;
	this.UpButtonPosX = tileManager.tileWidth * 18;
	this.UpButtonPosY = tileManager.tileHeight * 3;
	this.DownButtonSizeY = this.DownButtonSizeX = 90;
	this.DownButtonPosX = tileManager.tileWidth * 18;
	this.DownButtonPosY = tileManager.tileHeight * 5;
	this.LeftButtonSizeY = this.LeftButtonSizeX = 90;
	this.LeftButtonPosX = tileManager.tileWidth * 17;
	this.LeftButtonPosY = tileManager.tileHeight * 4;
	this.RightButtonSizeY = this.RightButtonSizeX = 90;
	this.RightButtonPosX = tileManager.tileWidth * 19;
	this.RightButtonPosY = tileManager.tileHeight * 4;

}

GameScene.prototype.createScene = function()	
{	
	this.calculateTileSizes();

	if(LEVEL_NUM == 1)
	{
		//configGestureDetection();
		//createHUD();
		//createPhysics();
		this.addPlayers();
		this.createTiles("Level 2");
		this.createButtons();
		document.addEventListener("keydown", function(e){playerOne.Move(e);} );
	}
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
	this.CheckButtonTouch(x,y);
	//console.log(x + ", " + y)
}

GameScene.prototype.CheckButtonTouch = function(x, y)
{
	if (x > this.UpButtonPosX && x < this.UpButtonPosX + this.UpButtonSizeX &&
		y > this.UpButtonPosY && y < this.UpButtonPosY + this.UpButtonSizeY)
	{
			console.log("Up pressed")
	}

	if (x > this.DownButtonPosX && x < this.DownButtonPosX + this.DownButtonSizeX &&
		y > this.DownButtonPosY && y < this.DownButtonPosY + this.DownButtonSizeY)
	{
			console.log("Down pressed")
	}

	if (x > this.LeftButtonPosX && x < this.LeftButtonPosX + this.LeftButtonSizeX &&
		y > this.LeftButtonPosY && y < this.LeftButtonPosY + this.LeftButtonSizeY)
	{
			console.log("Left pressed")
	}
	if (x > this.RightButtonPosX && x < this.RightButtonPosX + this.RightButtonSizeX &&
		y > this.RightButtonPosY && y < this.RightButtonPosY + this.RightButtonSizeY)
	{
			console.log("Right pressed")
	}
}


GameScene.prototype.disposeScene = function()	
{	
	resourceManager.UnloadMenuResources();
}

GameScene.prototype.createHUD = function(e)
{

}

GameScene.prototype.createButtons = function()
{

}

GameScene.prototype.createPhysics = function(e)
{

}

GameScene.prototype.addPlayers = function(e)
{
	if(LEVEL_NUM == 1)
	{
		playerOne = new AnimatedPlayer(100,100, tileManager.tileWidth, tileManager.tileHeight);
		this.OtherPlayer = new OtherPlayer(150,100);
	}
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
	if(e == "Level 2")
	{
		var i; 
	
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

		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 2);
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 2);

		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 8);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 7);
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 7);

		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 2);
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 2);

		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 8);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 7);
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 7);

		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 3);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 6);
	}
}

GameScene.prototype.Update = function()
{
	playerOne.Update();
	
}

GameScene.prototype.Draw = function()
{
	game.ctx.font = "30px Arial";
	playerOne.Draw();
	this.OtherPlayer.Draw();
	
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

	//buttons draw
	game.ctx.drawImage(resourceManager.Up_BUTTON, this.UpButtonPosX, this.UpButtonPosY, this.UpButtonSizeX, this.UpButtonSizeY);
	game.ctx.drawImage(resourceManager.Down_BUTTON, this.DownButtonPosX, this.DownButtonPosY, this.DownButtonSizeX, this.DownButtonSizeY);
	game.ctx.drawImage(resourceManager.Left_BUTTON, this.LeftButtonPosX, this.LeftButtonPosY, this.LeftButtonSizeX, this.LeftButtonSizeY);
	game.ctx.drawImage(resourceManager.Right_BUTTON, this.RightButtonPosX, this.RightButtonPosY, this.RightButtonSizeX, this.RightButtonSizeY);

}
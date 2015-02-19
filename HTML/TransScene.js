var timer;
var gameOver;

function TransScene()
{
	timer = 0;
	gameover = false;
	
	this.screenWidth = game.screenwidth;
	this.screenHeight = game.screenheight;
}

TransScene.prototype.Initalise = function(e)
{
	timer = 0;
	console.log(e);
	if(e < 5)
		gameover = false;
	else if(e >= 6)
		gameover = true;
	console.log(gameover);
}

TransScene.prototype.Update = function()
{
	timer ++;
	if(timer > 100 && gameover == false)
	{
		timer = 0;
		return true;
	}
	if(timer > 250 && gameover == true)
	{
		timer = 0;
		return true;
	}
	return false;
}

TransScene.prototype.Draw = function()
{
	game.ctx.font = "30px Arial";
	
	//HUD Background
	game.ctx.drawImage(resourceManager.SpriteBackGround, 0, game.canvas.height - 90, 228, 100);
	game.ctx.strokeText("Score : " + this.score, 10, game.canvas.height - 50);
	game.ctx.strokeText("Lives : ", 10, game.canvas.height - 20);
	
	if (gameover)
		game.ctx.drawImage(resourceManager.trans_GameOver, 0, 0, tileManager.tileWidth * 15, tileManager.tileHeight * 10);
	else
		game.ctx.drawImage(resourceManager.trans_NextLevel, 0, 0, tileManager.tileWidth * 15, tileManager.tileHeight * 10);
}

TransScene.prototype.getClickPosiiton = function(e)
{
	console.log("TransClicked")
	if(gameover == true)
		sceneManager.ChanageScene("Menu");
}

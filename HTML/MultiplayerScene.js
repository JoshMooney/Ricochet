//Websockets
var url = "ws://149.153.102.19:8080/test";
var ws = new WebSocket(url);
var state;
var ID;

//Players
var playerOne;
var playerTwo;

var bullets = new Array();
var bulletIndex = -1;
var LEVEL_NUM = 1;

var p1_x, p1_y
var p2_x, p2_y

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

var UpButton2PosX;
var UpButton2PosY;
var UpButton2SizeX;
var UpButton2SizeY;
var DownButton2PosX;
var DownButton2PosY;
var DownButton2SizeX;
var DownButton2SizeY;
var LeftButton2PosX;
var LeftButton2PosY;
var LeftButton2SizeX;
var LeftButton2SizeY;
var RightButton2PosX;
var RightButton2PosY;
var RightButton2SizeX;
var RightButton2SizeY;

//Multiplayer Shtuff
function MultiplayerScene()
{
	
	state = "NULL";
	
	var msg = { }
	msg.request = 'join'
	
	var message = JSON.stringify(msg);
	ws.send(message);
	
	//document.addEventListener("keydown", function(e){this.Move(e);} );
	
	//resourceManager.gameBE.play();
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
	
	this.UpButton2SizeY = this.UpButton2SizeX = 90;
	this.UpButton2PosX = tileManager.tileWidth * 18;
	this.UpButton2PosY = tileManager.tileHeight * 6;
	this.DownButton2SizeY = this.DownButton2SizeX = 90;
	this.DownButton2PosX = tileManager.tileWidth * 18;
	this.DownButton2PosY = tileManager.tileHeight * 8;
	this.LeftButton2SizeY = this.LeftButton2SizeX = 90;
	this.LeftButton2PosX = tileManager.tileWidth * 17;
	this.LeftButton2PosY = tileManager.tileHeight * 7;
	this.RightButton2SizeY = this.RightButton2SizeX = 90;
	this.RightButton2PosX = tileManager.tileWidth * 19;
	this.RightButton2PosY = tileManager.tileHeight * 7;

}

//Websocket Shtuff
//ws.onopen = function()
//{
//	var msg = { }
//	msg.request = 'join'
	
//	var message = JSON.stringify(msg);
//	ws.send(message);
//}

ws.onmessage = function(event)
{
	var msg;
	msg = JSON.parse(event.data);
	console.log(msg["type"]);
	
	if(msg["type"] == "Message")
	{
		console.log("Your Player ID: " + ID);
		console.log("Other Player ID: " + msg["ID"]);
	}
	if(msg["type"] == "Joined")
	{
		if(msg["data"] == "WAITING_FOR_PLAYERS" || msg["data"] == "ALL_PLAYERS_READY" )
		{
			state = msg["data"];
			ID = msg["ID"];
			console.log(ID);
		}
		
		if(msg["data"] == "STARTING_GAME")
		{
			console.log(msg["data"]);
			state = msg["data"];
		}
	}
	else if(msg["type"] == "Join UnsuccessFul - Session Full")
	{
		state = msg["type"];
		console.log(msg["type"]);
	}
	if(msg["type"] == "Movement")
	{
		if(ID != 0)
		{
			playerTwo.MoveToPosition(msg["Pos"]["X"],msg["Pos"]["Y"])
		}
		if(ID != 1)
		{
			playerOne.MoveToPosition(msg["Pos"]["X"],msg["Pos"]["Y"])
		}
	}
	if(msg["type"] == "Spawn Bullet")
	{
		bulletIndex++;
		bullets[bulletIndex] = new Bullet(msg["Pos"]["X"],msg["Pos"]["Y"],msg["Dir"]);
	}
}

MultiplayerScene.prototype.Move = function(e)
{
	if(state == "STARTING_GAME")
	{
		if(ID == 0)
		{
			playerOne.Move(e);
			//console.log("You Moved");
			var msg = {		}
			msg.request = "Movement";
			msg.Pos = {"X": playerOne.m_x, "Y": playerOne.m_y};
			msg.lives = playerOne.playerLifes;
			var message = JSON.stringify(msg);
			ws.send(message);
		}
		if(ID == 1)
		{
			playerTwo.Move(e);
			//console.log("You Moved");
			var msg = {		}
			msg.request = "Movement";
			msg.Pos = {"X": playerTwo.m_x, "Y": playerTwo.m_y};
			msg.lives = playerTwo.playerLifes;
			var message = JSON.stringify(msg);
			ws.send(message);
		}
	}
	else
	{
		e.preventDefault();
		console.log("Please Wait on Other Players");
	}
}

MultiplayerScene.prototype.createScene = function()	
{	
	this.calculateTileSizes();

	//configGestureDetection();
	//createHUD();
	//createPhysics();
	this.GetStartingPosition();
	this.addPlayers();
	this.createTiles();
	this.createButtons();
}

MultiplayerScene.prototype.setUpNextLevel = function()
{
	LEVEL_NUM++;
	this.GetStartingPosition();
	this.addPlayers();
	//Give both players Lives OR whatever we intend to do
	tileManager.ClearMap();
	this.createTiles();
}

MultiplayerScene.prototype.GetStartingPosition = function()
{
	var width = tileManager.tileWidth;
	var height = tileManager.tileHeight;
	
	if(LEVEL_NUM == 1)
	{
		//Player 1 Starting Location
		p1_x = 1.0 * width;
		p1_y = 4.5 * height;
		
		//Player 2 Starting Location
		p2_x = 13.0 * width; 
		p2_y = 4.5 * height;
	}
	else if(LEVEL_NUM == 2)
	{
		//Player 1 Starting Location
		p1_x = 1.0 * width;
		p1_y = 4.5 * height;
		
		//Player 2 Starting Location
		p2_x = 13.0 * width; 
		p2_y = 4.5 * height;
	}
	else if(LEVEL_NUM == 3)
	{
		//Player 1 Starting Location
		p1_x = 1.5 * width;
		p1_y = 1.5 * height;
		
		//Player 2 Starting Location
		p2_x = 11.5 * width;
		p2_y = 7.5 * height;
	}
	else if(LEVEL_NUM == 4)
	{
		//Player 1 Starting Location
		p1_x = 1.5 * width;
		p1_y = 1.5 * height;
		
		//Player 2 Starting Location
		p2_x = 11.5 * width;
		p2_y = 7.5 * height;
	}
	else
	{
		//Player 1 Starting Location
		p1_x = 1.0 * width;
		p1_y = 4.5 * height;
		
		//Player 2 Starting Location
		p2_x = 13.0 * width;
		p2_y = 4.5 * height;
	}
}

MultiplayerScene.prototype.getClickPosiiton = function(e)
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

MultiplayerScene.prototype.CheckButtonTouch = function(x, y)
{
	if (x > this.UpButtonPosX && x < this.UpButtonPosX + this.UpButtonSizeX &&
		y > this.UpButtonPosY && y < this.UpButtonPosY + this.UpButtonSizeY)
	{
		if(state == "STARTING_GAME")
		{
			console.log("You Shot");
			
			if(ID == 0)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerOne.m_x,playerOne.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Pos = {"X":playerOne.m_x, "Y":playerOne.m_y};
				msg.Dir = 0;
				var message = JSON.stringify(msg);
				ws.send(message);
			}
			if(ID == 1)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerTwo.m_x,playerTwo.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Pos = {"X":playerTwo.m_x, "Y":playerTwo.m_y};
				msg.Dir = 0;
				var message = JSON.stringify(msg);
				ws.send(message);
			}
		}
		else
		{
			console.log("Please Wait on Other Players");
		}
	}

	if (x > this.DownButtonPosX && x < this.DownButtonPosX + this.DownButtonSizeX &&
		y > this.DownButtonPosY && y < this.DownButtonPosY + this.DownButtonSizeY)
	{
		if(state == "STARTING_GAME")
		{
			console.log("You Shot");
			
			if(ID == 0)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerOne.m_x,playerOne.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Dir = 2;
				msg.Pos = {"X":playerOne.m_x, "Y":playerOne.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
			if(ID == 1)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerTwo.m_x,playerTwo.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Dir = 2;
				msg.Pos = {"X":playerTwo.m_x, "Y":playerTwo.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
		}
		else
		{
			console.log("Please Wait on Other Players");
		}
	}

	if (x > this.LeftButtonPosX && x < this.LeftButtonPosX + this.LeftButtonSizeX &&
		y > this.LeftButtonPosY && y < this.LeftButtonPosY + this.LeftButtonSizeY)
	{
		if(state == "STARTING_GAME")
		{
			console.log("You Shot");
			
			if(ID == 0)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerOne.m_x,playerOne.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Dir = 3;
				msg.Pos = {"X":playerOne.m_x, "Y":playerOne.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
			if(ID == 1)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerTwo.m_x,playerTwo.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Dir = 3;
				msg.Pos = {"X":playerTwo.m_x, "Y":playerTwo.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
		}
		else
		{
			console.log("Please Wait on Other Players");
		}
	}
	if (x > this.RightButtonPosX && x < this.RightButtonPosX + this.RightButtonSizeX &&
		y > this.RightButtonPosY && y < this.RightButtonPosY + this.RightButtonSizeY)
	{
		if(state == "STARTING_GAME")
		{
			console.log("You Shot");
			
			if(ID == 0)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerOne.m_x,playerOne.m_y,0);
				var msg = { };
				msg.request = "Spawn Bullet";
				msg.Dir = 3;
				msg.Pos = {"X":playerOne.m_x, "Y":playerOne.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
			if(ID == 1)
			{
				//Create the bullet
				bulletIndex++;
				bullets[bulletIndex] = new Bullet(playerTwo.m_x,playerTwo.m_y,0);
				var msg = { };
				msg.Dir = 3;
				msg.request = "Spawn Bullet";
				msg.Pos = {"X":playerTwo.m_x, "Y":playerTwo.m_y};
				var message = JSON.stringify(msg);
				ws.send(message);
			}
		}
		else
		{
			console.log("Please Wait on Other Players");
		}
	}

	//move buttons
	if (x > this.UpButton2PosX && x < this.UpButton2PosX + this.UpButton2SizeX &&
		y > this.UpButton2PosY && y < this.UpButton2PosY + this.UpButton2SizeY)
	{
		if(ID == 0)
			playerOne.Move(0);
		else
			playerTwo.Move(0);
	}

	if (x > this.DownButton2PosX && x < this.DownButton2PosX + this.DownButton2SizeX &&
		y > this.DownButton2PosY && y < this.DownButton2PosY + this.DownButton2SizeY)
	{
		if(ID == 0)
			playerOne.Move(1);
		else
			playerTwo.Move(1);
	}

	if (x > this.LeftButton2PosX && x < this.LeftButton2PosX + this.LeftButton2SizeX &&
		y > this.LeftButton2PosY && y < this.LeftButton2PosY + this.LeftButton2SizeY)
	{
		if(ID == 0)
			playerOne.Move(2);
		else
			playerTwo.Move(2);
	}
	if (x > this.RightButton2PosX && x < this.RightButton2PosX + this.RightButton2SizeX &&
		y > this.RightButton2PosY && y < this.RightButton2PosY + this.RightButton2SizeY)
	{
		if(ID == 0)
			playerOne.Move(3);
		else
			playerTwo.Move(3);
	}
}

MultiplayerScene.prototype.disposeScene = function()	
{	
	resourceManager.UnloadMenuResources();
}

MultiplayerScene.prototype.createHUD = function(e)
{

}

MultiplayerScene.prototype.createButtons = function()
{

}

MultiplayerScene.prototype.createPhysics = function(e)
{

}

MultiplayerScene.prototype.addPlayers = function(e)
{
	playerOne = new AnimatedPlayer(p1_x, p1_y, tileManager.tileWidth, tileManager.tileHeight);
	playerTwo = new AnimatedPlayer(p1_x, p1_y, tileManager.tileWidth, tileManager.tileHeight);
}

MultiplayerScene.prototype.calculateTileSizes = function()
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

MultiplayerScene.prototype.createTiles = function()
{
	resourceManager.LoadTileResources();
	
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
	
	if(LEVEL_NUM == 1)
	{
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
	if(LEVEL_NUM == 2)
	{
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
	if(LEVEL_NUM == 3)
	{
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 2);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 3);
		
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 8);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 7);
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 6);
		
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 3);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 6);
	}
	if(LEVEL_NUM == 4)
	{
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 2);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 3);
		
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 6);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 7);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 8);
		
		tileManager.createTile(tileManager.tileWidth * 1, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 2, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 3, tileManager.tileHeight * 4);
		
		tileManager.createTile(tileManager.tileWidth * 11, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 12, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 13, tileManager.tileHeight * 5);
	}
	if(LEVEL_NUM == 5)
	{
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 2);
		
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 8);
		tileManager.createTile(tileManager.tileWidth * 4, tileManager.tileHeight * 7);
		
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 1);
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 2);
		
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 8);
		tileManager.createTile(tileManager.tileWidth * 10, tileManager.tileHeight * 7);
		
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 3);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 4);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 5);
		tileManager.createTile(tileManager.tileWidth * 7, tileManager.tileHeight * 6);
	}
}

MultiplayerScene.prototype.Update = function()
{
	var j;
	playerOne.Update();
	playerTwo.Update();
	for(j = 0; j < bullets.length; j++)
	{
		bullets[j].Update();
		if(bullets[j].remove)
		{
			bullets.splice(j,1);
			bulletIndex--;
		}
	}

	if(this.CheckLives())
	{
		sceneManager.ChangeScene("Transition");
	}
	return false;
}

MultiplayerScene.prototype.CheckLives = function()
{
	if(playerOne.playerLifes == 0 || playerTwo.playerLifes == 0)
		return true;
	return false;
}

MultiplayerScene.prototype.Draw = function()
{
	game.ctx.font = "30px Arial";
	playerOne.Draw();
	playerTwo.Draw();
	for(index = 0; index < bullets.length; index++)
	{
		bullets[index].Draw();
	}
	
	//HUD Background
	game.ctx.drawImage(resourceManager.SpriteBackGround, 0, game.canvas.height - 90, 228, 100);
	game.ctx.strokeText("Score : " + this.score, 10, game.canvas.height - 50);
	game.ctx.strokeText("Lives : ", 10, game.canvas.height - 20);

	game.ctx.font = "18px Arial";
	game.ctx.strokeText("State : " + state, 180, game.canvas.height - 20);
	
	//Draw tiles
	tileManager.draw();

	if(ID == 0)
	{
		switch(playerOne.playerLifes)
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
	
	if(ID == 1)
	{
		switch(playerOne.playerLifes)
		{
			case 3 :
				game.ctx.drawImage(resourceManager.player2Sprite, 100, game.canvas.height - 45, 32.5, 32.5);
				game.ctx.drawImage(resourceManager.player2Sprite, 100 + 22.5 + 10, game.canvas.height - 45, 32.5, 32.5);
				game.ctx.drawImage(resourceManager.player2Sprite, 100 + 55 + 10, game.canvas.height - 45, 32.5, 32.5);
				break;
			case 2 :
				game.ctx.drawImage(resourceManager.player2Sprite, 100, game.canvas.height - 45, 32.5, 32.5);
				game.ctx.drawImage(resourceManager.player2Sprite, 100 + 22.5 + 10, game.canvas.height - 45, 32.5, 32.5);
				break;
			case 1 :
				game.ctx.drawImage(resourceManager.player2Sprite, 100, game.canvas.height - 45, 32.5, 32.5);
				break;
			default :
				break;
		}
	}

	//buttons draw
	game.ctx.drawImage(resourceManager.Up_BUTTON, this.UpButtonPosX, this.UpButtonPosY, this.UpButtonSizeX, this.UpButtonSizeY);
	game.ctx.drawImage(resourceManager.Down_BUTTON, this.DownButtonPosX, this.DownButtonPosY, this.DownButtonSizeX, this.DownButtonSizeY);
	game.ctx.drawImage(resourceManager.Left_BUTTON, this.LeftButtonPosX, this.LeftButtonPosY, this.LeftButtonSizeX, this.LeftButtonSizeY);
	game.ctx.drawImage(resourceManager.Right_BUTTON, this.RightButtonPosX, this.RightButtonPosY, this.RightButtonSizeX, this.RightButtonSizeY);

	game.ctx.drawImage(resourceManager.Up_BUTTON, this.UpButton2PosX, this.UpButton2PosY, this.UpButton2SizeX, this.UpButton2SizeY);
	game.ctx.drawImage(resourceManager.Down_BUTTON, this.DownButton2PosX, this.DownButton2PosY, this.DownButton2SizeX, this.DownButton2SizeY);
	game.ctx.drawImage(resourceManager.Left_BUTTON, this.LeftButton2PosX, this.LeftButton2PosY, this.LeftButton2SizeX, this.LeftButton2SizeY);
	game.ctx.drawImage(resourceManager.Right_BUTTON, this.RightButton2PosX, this.RightButton2PosY, this.RightButton2SizeX, this.RightButton2SizeY);
}
function ResourceManager()
{

}

//Load & Unload Game Resources
ResourceManager.prototype.LoadGameResources = function()
{
	this.player1Sprite = new Image();
	this.player1Sprite.src = "assets/gfx/playerOne.png"

	this.player2Sprite = new Image();
	this.player2Sprite.src = "assets/gfx/playerTwo.png"

	this.SpriteLives = new Image();
	this.SpriteLives.src = "assets/gfx/PlayerOneLives.png"

	this.SpriteBackGround = new Image();
	this.SpriteBackGround.src = "assets/gfx/Menue.png"

	//buttons load
	this.Up_BUTTON = new Image();
	this.Up_BUTTON.src = "assets/gfx/UpButton.png"

	this.Down_BUTTON = new Image();
	this.Down_BUTTON.src = "assets/gfx/DownButton.png"

	this.Left_BUTTON = new Image();
	this.Left_BUTTON.src = "assets/gfx/LeftButton.png"

	this.Right_BUTTON = new Image();
	this.Right_BUTTON.src = "assets/gfx/RightButton.png"

	console.log("Load Game Resources Complete")
	this.LoadGameAudio();
}
ResourceManager.prototype.UnloadGameResources = function()
{

}

//Load & Unload Menu Resources
ResourceManager.prototype.LoadMenuResources = function()
{
	this.animatedTitle = new Image();
	this.animatedTitle.src = "assets/gfx/AnimatedTitle.png"

	this.play_BUTTON = new Image();
	this.play_BUTTON.src = "assets/gfx/Menu/play.png"

	this.multi_BUTTON = new Image();
	this.multi_BUTTON.src = "assets/gfx/Menu/multiplayer.png"

	this.dev_BUTTON = new Image();
	this.dev_BUTTON.src = "assets/gfx/Menu/dev.png"
	
	console.log("Load Menu Resources Complete")
	this.LoadMenuAudio();
}
ResourceManager.prototype.UnloadMenuResources = function()
{

}

//Tile Resources
ResourceManager.prototype.LoadTileResources = function()
{
    this.tile_wall = new Image();
    this.tile_wall.src = "assets/gfx/Map/Wall.png"
    this.tile_floor = new Image();
    this.tile_floor.src = "assets/gfx/Map/Floor.png"
    
	console.log("Load Tile Resources Complete")
}
ResourceManager.prototype.UnloadTileResources = function()
{

}

//Transition Resources
ResourceManager.prototype.LoadTransitionResources = function()
{
	this.trans_NextLevel = new Image();
    this.trans_NextLevel.src = "assets/transitions/nextlevel.png"
	this.trans_GameOver = new Image();
    this.trans_GameOver.src = "assets/transitions/gameover.png"
	
	console.log("Load Transition Resources Complete")
}
ResourceManager.prototype.UnloadTransitionResources = function()
{
	
}

//Load Audio
ResourceManager.prototype.LoadMenuAudio = function()
{
	this.menuBE = document.getElementById("0");	//Main menu background music
	this.selectSE = document.getElementById("1");	//Select on the main menu
}
ResourceManager.prototype.LoadGameAudio = function()
{
	this.gameBE = document.getElementById("2")		//Game Background music
	this.gameoverSE = document.getElementById("3")	//Gameover sound effect
	this.respawnSE = document.getElementById("4")	//Respawn Sound Effect
	this.ricochetSE = document.getElementById("5")	//Ricochet sound effect
	this.shootSE = document.getElementById("6")		//Shooting sound effect
	this.wingameSE = document.getElementById("7")	//Wingame sound effect
}


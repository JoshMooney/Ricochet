function ResourceManager()
{

}

//Load & Unload Game Resources
ResourceManager.prototype.LoadGameResources = function()
{
	this.playerSprite = new Image();
	this.playerSprite.src = "../assets/gfx/animatePlayer.png"

	this.SpriteLives = new Image();
	this.SpriteLives.src = "../assets/gfx/PlayerOneLives.png"

	this.SpriteBackGround = new Image();
	this.SpriteBackGround.src = "../assets/gfx/Menue.png"

	this.LoadGameAudio();
}
ResourceManager.prototype.UnloadGameResources = function()
{

}

//Load & Unload Menu Resources
ResourceManager.prototype.LoadMenuResources = function()
{
	this.animatedTitle = new Image();
	this.animatedTitle.src = "../assets/gfx/AnimatedTitle.png"

	this.play_BUTTON = new Image();
	this.play_BUTTON.src = "../assets/gfx/Menu/play.png"

	this.multi_BUTTON = new Image();
	this.multi_BUTTON.src = "../assets/gfx/Menu/multiplayer.png"

	this.exit_BUTTON = new Image();
	this.exit_BUTTON.src = "../assets/gfx/Menu/exit.png"
	this.LoadMenuAudio();
}
ResourceManager.prototype.UnloadMenuResources = function()
{

}

//Tile Resources
ResourceManager.prototype.LoadTileResources = function()
{
	//Create a new Instance of Tilemanager
}
ResourceManager.prototype.UnloadTileResources = function()
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


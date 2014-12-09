function ResourceManager()
{

}

//Load & Unload Game Resources
ResourceManager.prototype.LoadGameResources = function()
{

}
ResourceManager.prototype.UnloadGameResources = function()
{

}

//Load & Unload Menu Resources
ResourceManager.prototype.LoadMenuResources = function()
{
	this.play_BUTTON = new Image();
	this.play_BUTTON.src = "../assets/gfx/Menu/play.png"

	this.multi_BUTTON = new Image();
	this.multi_BUTTON.src = "../assets/gfx/Menu/multiplayer.png"

	this.exit_BUTTON = new Image();
	this.exit_BUTTON.src = "../assets/gfx/Menu/exit.png"
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
ResourceManager.prototype.LoadGameAudio = function()
{

}
ResourceManager.prototype.LoadMenuAudio = function()
{

}

var JOSH = 0;
var DAVE = 1;

var joshPosX;
var joshPosY;
var joshSizeX;
var joshSizeY;

var davePosX;
var davePosY;
var daveSizeX;
var daveSizeY;

function InfoScene()
{
	var JOSH = 0;
	var DAVE = 1;

	this.createMenu();

	this.image = new Image();
	this.image.src = "../assets/gfx/Dev/josh.png"

	this.image1 = new Image();
	this.image1.src = "../assets/gfx/Dev/dave.png"
}

InfoScene.prototype.createMenu = function()
{
	joshPosX = (game.screenwidth / 5) * 2;
	joshPosY = (game.screenheight / 3);
	joshSizeX = 300;
	joshSizeY = 300;

	davePosX = (game.screenwidth / 5) * 4;
	davePosY = (game.screenheight / 3);
	daveSizeX = playSizeX;
	daveSizeY = playSizeY;
}

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
	this.CheckButtonTouch(x,y);
	//console.log(x + ", " + y)
}

MainMenuScene.prototype.CheckButtonTouch = function(x, y)
{
	if (x > this.joshPosX && x < this.joshPosX + this.joshSizeX &&
		y > this.joshPosY && y < this.joshPosY + this.joshSizeY)
	{
			this.onMenuItemClicked(this.JOSH);
	}

	if (x > this.davePosX && x < this.davePosX + this.daveSizeX &&
		y > this.davePosY && y < this.davePosY + this.daveSizeY)
	{
			this.onMenuItemClicked(this.DAVE);
	}
}

MainMenuScene.prototype.onMenuItemClicked = function(e)
{
	switch(e)
	{
		case this.JOSH:
			window.location.href = "http://joshmooney.com/";
			break;

		case this.DAVE:
			break;
	}
	return false;
}

MainMenuScene.prototype.Draw = function()
{
	game.ctx.drawImage(this.image, this.joshPosX, this.joshPosY, this.joshSizeX, this.joshSizeY);
	game.ctx.drawImage(this.image1, this.davePosX, this.davePosY, this.daveSizeX, this.daveSizeY);
}
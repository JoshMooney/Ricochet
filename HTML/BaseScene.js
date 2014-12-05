function BaseScene()
{

	MainMenu.prototype = Object.create(BaseScene.prototype);
	GameScene.prototype = Object.create(BaseScene.prototype);
	console.log("BaseScene Initaliser called");
}

BaseScene.prototype.createSprite = function(e)
{
	//Wasn't sure what to do here and weither we needed it 
	//for sure so im going to leave it until i get further 
	//into porting over to HTML
}

BaseScene.prototype.createScene = function()	{	}

BaseScene.prototype.onBackPressed = function()	{	}

BaseScene.prototype.disposeScene = function()	{	}
var currentScene

var BaseScene;

var SCENE_MENU = 0;
var SCENE_GAME = 1;
var CURR_SCENE;

function SceneManager()
{
	this.setMenuScene();
}

SceneManager.prototype.setMenuScene = function()
{
	resourceManager.LoadMenuResources();
	this.MenuScene = new MainMenuScene();
	CURR_SCENE = SCENE_MENU;
}

SceneManager.prototype.setGameScene = function()
{
	resourceManager.LoadGameResources();
	this.GameScene = new GameScene();
	CURR_SCENE = SCENE_GAME;
}

SceneManager.prototype.UpdateScene = function()
{
	switch(CURR_SCENE)
	{
		case SCENE_MENU:
			//console.log(this.MenuScene);
			//this.MenuScene.Update();
			break;
			
		case SCENE_GAME:
			this.GameScene.Update()
			break;
	}
}

SceneManager.prototype.DrawScene = function()
{
	switch(CURR_SCENE)
	{
		case SCENE_MENU:
			this.MenuScene.Draw();
			break;
			
		case SCENE_GAME:
			this.GameScene.Draw();
			break;
	}
}


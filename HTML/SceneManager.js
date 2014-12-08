var currentScene

var BaseScene;
var MenuScene; 
var GameScene;

var SCENE_MENU = 0;
var SCENE_GAME = 1;
var CURR_SCENE;

function SceneManager()
{

}

SceneManager.prototype.setMenuScene = function()
{
	MenuScene = new MainMenuScene();
	CURR_SCENE = SCENE_MENU;
}

SceneManager.prototype.setGameScene = function()
{
	GameScene = new GameScene();
	CURR_SCENE = SCENE_MENU;
}

SceneManager.prototype.UpdateScene = function()
{
	switch(CURR_SCENE)
	{
		case SCENE_MENU:
			break;
			
		case SCENE_GAME:
			break;
	}
}

SceneManager.prototype.Draw = function()
{
	switch(CURR_SCENE)
	{
		case SCENE_MENU:
			break;
			
		case SCENE_GAME:
			break;
	}
}


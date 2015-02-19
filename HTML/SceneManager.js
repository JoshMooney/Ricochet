var BaseScene;

var TransitionScene;

var SCENE_MENU = 0;
var SCENE_GAME = 1;
var SCENE_TRANS = 2;

var CURR_SCENE;

function SceneManager()
{
	document.addEventListener("clickdown", function(e){this.ReturnToMenu();} );
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
	this.setTransitionScene();
	CURR_SCENE = SCENE_GAME;
}

SceneManager.prototype.setTransitionScene = function()
{
	resourceManager.LoadTransitionResources();
	TransitionScene = new TransScene();
}

SceneManager.prototype.ReturnToMenu = function()
{
	if(TransitionScene.gameover == true)
		this.ChangeScene("Menu")
}

SceneManager.prototype.UpdateScene = function()
{
	switch(CURR_SCENE)
	{
		case SCENE_MENU:
			this.MenuScene.Update();
			break;
			
		case SCENE_GAME:
			if(this.GameScene.Update())
			{
				CURR_SCENE = SCENE_TRANS;
			}
			break;
			
		case SCENE_TRANS:
			if(TransitionScene.Update())
			{
				CURR_SCENE = SCENE_GAME;
			}
			break;
	}
}

SceneManager.prototype.ChangeScene = function(e)
{
	if(e == "Game")
		CURR_SCENE = SCENE_GAME;
	else if(e == "Menu")
	{
		this.GameScene.LEVEL_NUM = 0;
		CURR_SCENE = SCENE_MENU;
	}
	else
	{
		this.GameScene.setUpNextLevel();
		TransitionScene.Initalise(LEVEL_NUM);
		CURR_SCENE = SCENE_TRANS;
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
			
		case SCENE_TRANS:
			TransitionScene.Draw();
			break;
	}
}


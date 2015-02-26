package ie.itcarlow.box2ddemo.scene;

import ie.itcarlow.box2ddemo.ResourceManager;

import org.andengine.engine.Engine;
import org.andengine.ui.IGameInterface.OnCreateSceneCallback;

public class SceneManager 
{
	 public BaseScene menuScene;
	 public BaseScene gameScene;
	 
	 private static final SceneManager INSTANCE = new SceneManager();
	 
	 private BaseScene currentScene;
	 private Engine engine = ResourceManager.getInstance().engine;

	 public boolean audio_toggle;
	 
	 public enum SceneType { 
		 SCENE_MENU, SCENE_GAME
	 }
	 
	 public void setMenuScene(OnCreateSceneCallback cb)
	 {
		 audio_toggle = SharedPreferencesManager.getInstance(ResourceManager.getInstance().activity).getMusic();
		 ResourceManager.getInstance().LoadMenuResources();
		 menuScene = new MainMenuScene();
		 setScene(menuScene);
		 currentScene.createScene();
		 cb.onCreateSceneFinished(menuScene);
	 }
	 
	 public void setGameScene()
	 {
		 ResourceManager.getInstance().LoadGameResources();
		 ResourceManager.getInstance().LoadTileManager();
		 
		 gameScene = new GameScene();
		 setScene(gameScene);
		 currentScene.createScene();
	 }
	 
	 public void setScene(BaseScene scene)
	 {
		 if(currentScene != null)
			 currentScene.disposeScene();
		 engine.setScene(scene);
		 currentScene = scene;
	 }
	 
	 public void setScene(SceneType type)
	 {
		 switch(type)
		 {
		 case SCENE_MENU:
			 setScene(menuScene);
			 break;
		 case SCENE_GAME:
			 setScene(gameScene);
			 break;
		 }
		 
	 }
	 
	 public static SceneManager getInstance()
	 {
		return INSTANCE; 
	 }
	 
	 public BaseScene getCurrentScene()
	 {
		 return currentScene;
	 }
}

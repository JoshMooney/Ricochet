package ie.itcarlow.box2ddemo.scene;

import ie.itcarlow.box2ddemo.ResourceManager;

import org.andengine.engine.Engine;
import org.andengine.ui.IGameInterface.OnCreateResourcesCallback;

public class SceneManager 
{
	 private BaseScene menuScene;
	 private BaseScene gameScene;
	 
	 private static final SceneManager INSTANCE = new SceneManager();
	 
	 private BaseScene currentScene;
	 private Engine engine = ResourceManager.getInstance().engine;

	 public enum SceneType { 
		 SCENE_MENU, SCENE_GAME
	 }
	 
	 public void setMenuScene(OnCreateSceneCallback cb)
	 {
		 ResourceManager.getInstance().LoadMenuResources();
		 menuScene = new MainMenuScene();
		 setScene(menuScene);
		 currentScene.createScene();
		 cb.onCreateResourcesFinished(menuScene);
	 }
	 
	 public void setScene(BaseScene scene)
	 {
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

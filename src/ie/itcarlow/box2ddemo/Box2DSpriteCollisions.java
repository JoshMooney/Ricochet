package ie.itcarlow.box2ddemo;

import ie.itcarlow.box2ddemo.scene.SceneManager;

import org.andengine.engine.camera.Camera;
import org.andengine.engine.handler.IUpdateHandler;
import org.andengine.engine.options.EngineOptions;
import org.andengine.engine.options.ScreenOrientation;
import org.andengine.engine.options.WakeLockOptions;
import org.andengine.engine.options.resolutionpolicy.RatioResolutionPolicy;
import org.andengine.input.touch.controller.MultiTouch;
import org.andengine.ui.activity.BaseGameActivity;

import android.view.KeyEvent;
import android.widget.Toast;

import com.badlogic.gdx.math.Vector2;

public class Box2DSpriteCollisions extends BaseGameActivity implements IUpdateHandler 
{		
	private static final int CAMERA_WIDTH = 720;
	private static final int CAMERA_HEIGHT = 480;

	private Camera camera;
	
	//Assorted Variables
	int numberOfFloorTiles = 1;
	Vector2 velocity, sprite1,sprite2;
	float velX,velY,speed = 50;
	boolean mCollided = false;

	@Override
	public EngineOptions onCreateEngineOptions() 
	{
		camera = new Camera(0, 0, CAMERA_WIDTH, CAMERA_HEIGHT);
		EngineOptions engineOptions = new EngineOptions(true, ScreenOrientation.LANDSCAPE_FIXED, new RatioResolutionPolicy(CAMERA_WIDTH, CAMERA_HEIGHT), camera);
		engineOptions.getAudioOptions().setNeedsMusic(true).setNeedsSound(true);
		engineOptions.setWakeLockOptions(WakeLockOptions.SCREEN_ON);
		engineOptions.getTouchOptions().setNeedsMultiTouch(true);
		if(!MultiTouch.isSupported(this))
			Toast.makeText(this, "Sorry your devvice does not support multitouch", Toast.LENGTH_LONG);
		return engineOptions;
	}

    @Override
	public void onCreateResources(OnCreateResourcesCallback cb) throws Exception 
	{
		//mScene.getOnSceneTouchListener(); 
    	ResourceManager.prepareManager(getEngine(), this, camera, getVertexBufferObjectManager());	
    	cb.onCreateResourcesFinished();
    }

    @Override
  	public void onCreateScene(OnCreateSceneCallback cb) throws Exception 
  	{
    	SceneManager.getInstance().setMenuScene(cb);
    	
  		//this.mScene = new Scene();			// Dont know if we need this

  		//this.mScene.setBackground(new Background(0, 125, 58));
  		cb.onCreateSceneFinished(SceneManager.getInstance().menuScene);  
  	}

    @Override
	public void onPopulateScene(org.andengine.entity.scene.Scene pScene,
			OnPopulateSceneCallback pOnPopulateSceneCallback) throws Exception {
	   this.mEngine.registerUpdateHandler(this);
	   pOnPopulateSceneCallback.onPopulateSceneFinished();
    }

	public void onUpdate(float pSecondsElapsed) 
	{
		/*if(mCollided == true)
		{
			PhysicsConnector connector = mPhysicsWorld.getPhysicsConnectorManager().findPhysicsConnectorByShape(mPlayerTwo);
			// Unregister the physics connector
			mPhysicsWorld.unregisterPhysicsConnector(connector);
			// Destroy the body
			mPhysicsWorld.destroyBody(connector.getBody());
			
			mScene.detachChild(mPlayerTwo);
			mCollided = false;
		}*/
	}
	
	@Override
	protected void onDestroy()
	{
		super.onDestroy();
		System.exit(0);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event)
	{
		if(keyCode == KeyEvent.KEYCODE_BACK)
		{
			SceneManager.getInstance().getCurrentScene().onBackPressed();
		}
		return false;
	}

	public void reset() 
	{
		// TODO Auto-generated method stub
	
	}
}

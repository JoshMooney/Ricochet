package ie.itcarlow.box2ddemo;

import ie.itcarlow.box2ddemo.scene.SceneManager;

import java.util.ArrayList;

import org.andengine.engine.camera.Camera;
import org.andengine.engine.handler.IUpdateHandler;
import org.andengine.engine.options.EngineOptions;
import org.andengine.engine.options.ScreenOrientation;
import org.andengine.engine.options.WakeLockOptions;
import org.andengine.engine.options.resolutionpolicy.RatioResolutionPolicy;
import org.andengine.entity.scene.Scene;
import org.andengine.entity.scene.background.Background;
import org.andengine.entity.sprite.Sprite;
import org.andengine.extension.physics.box2d.PhysicsConnector;
import org.andengine.extension.physics.box2d.PhysicsFactory;
import org.andengine.extension.physics.box2d.PhysicsWorld;
import org.andengine.extension.physics.box2d.util.Vector2Pool;
import org.andengine.extension.physics.box2d.util.constants.PhysicsConstants;
import org.andengine.input.touch.TouchEvent;
import org.andengine.input.touch.controller.MultiTouch;
import org.andengine.input.touch.detector.SurfaceGestureDetector;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlas;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.ui.activity.BaseGameActivity;

import android.view.KeyEvent;
import android.widget.Toast;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef.BodyType;
import com.badlogic.gdx.physics.box2d.FixtureDef;

public class Box2DSpriteCollisions extends BaseGameActivity implements IUpdateHandler 
{		
	private static final int CAMERA_WIDTH = 720;
	private static final int CAMERA_HEIGHT = 480;

	private Camera camera;
	
	//MoveTo Variable will be location for A* to move to
	private Vector2 MoveTo;
	
	//Scene
	private Scene mScene;
	
	//Assorted Variables
	int numberOfFloorTiles = 1;
	private PhysicsWorld mPhysicsWorld;
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
    public void onPopulateScene(Scene pScene, OnPopulateSceneCallback pOnPopulateSceneCallback) throws Exception 
    {
    	configGestureDetection();
    	//final float centerX = (CAMERA_WIDTH - this.mPlayerOneTextureRegion.getWidth()) / 2;
	   	//final float centerY = (CAMERA_HEIGHT - this.mPlayerOneTextureRegion.getHeight()) / 2;
       //setUpBox2DWorld();
	   this.mEngine.registerUpdateHandler(this);
	   pOnPopulateSceneCallback.onPopulateSceneFinished();
    }

    private void setUpBox2DWorld() 
    {	/*
    	// Set up your physics world here.
    	final Vector2 v = Vector2Pool.obtain(0, 0);
    	// Establish world with no gravity, second param 
    	// (false) means PhysicsWorld cannot sleep
    	mPhysicsWorld = new PhysicsWorld(v, false);
        mPhysicsWorld.setContactListener(createContactListener());

    	Vector2Pool.recycle(v);
    	this.mScene.registerUpdateHandler(mPhysicsWorld);
    	velocity = Vector2Pool.obtain(velX, velY);*/
    }
    
    private void createPhysicsBodies(final Sprite Playerone) 
    {
    	// Create your Box2D bodies here.
    	final FixtureDef PLAYER_FIX = PhysicsFactory.createFixtureDef(1.5f,0.45f, 0.3f);
    	Body body = PhysicsFactory.createCircleBody(
 			   mPhysicsWorld, Playerone, BodyType.DynamicBody, 
 			   PLAYER_FIX);
    	mPhysicsWorld.registerPhysicsConnector(new PhysicsConnector(Playerone, body, true, true));
    	 Playerone.setUserData(body);
    	 //body.applyLinearImpulse(velocity, body.getWorldCenter());


    }
    
    private void setBodyPosition(final Sprite sprite, final float pX, final float pY) {
    	
    	//Body body = PhysicsFactory.createCircleBody(mPhysicsWorld, puck, BodyType.DynamicBody, PLAYER_FIX);
    	//body.setLinearDamping(0.4f);
    	//puck.setUserData(body);
    	final Body body = (Body) sprite.getUserData();
        final float widthD2 = sprite.getWidth() / 2;
        final float heightD2 = sprite.getHeight() / 2;
        final float angle = body.getAngle(); // keeps the body angle       
        final Vector2 v2 = Vector2Pool.obtain((pX + widthD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT, (pY + heightD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT);
        body.setTransform(v2, angle);
        Vector2Pool.recycle(v2);
    }
   
    private void setBodyPosition(final Sprite sprite, final Sprite sprite2, final float pX, final float pY) {
		
    	final Body body = (Body) sprite.getUserData();
        final float widthD2 = sprite.getWidth() / 2;
        final float heightD2 = sprite.getHeight() / 2;
        final float angle = body.getAngle(); // keeps the body angle       
        final Vector2 v2 = Vector2Pool.obtain((pX + widthD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT, (pY + heightD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT);
        body.setTransform(v2, angle);
        Vector2Pool.recycle(v2);
        body.applyLinearImpulse((sprite2.getX()-sprite.getX())/speed, (sprite2.getY()-sprite.getY())/speed, sprite2.getX(), sprite2.getY());
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

	private void configGestureDetection() {
	this.runOnUiThread(new Runnable() {
		
		@Override
		public void run() {
			// TODO Auto-generated method stub
			setupGestureDetection();
		}
	});
		
}

	private void setupGestureDetection()
	{
		SurfaceGestureDetector surfaceGestureDetector = new SurfaceGestureDetector(this.getBaseContext(), 1f) 
		{
@Override
			protected boolean onSwipeUp() {
 System.out.println("onSwipeUp");
 return true;
}

@Override
			protected boolean onSwipeRight() {
System.out.println("onSwipeRight");
return true;
}

 @Override
 			protected boolean onSwipeLeft() {
 System.out.println("onSwipeLeft");
 return true;
 }

@Override
 			protected boolean onSwipeDown() {
 System.out.println("onSwipeDown");
 return true;
 }

@Override
 			protected boolean onSingleTap() {
 System.out.println("onSingleTap");
 return true;
}

 @Override
 			protected boolean onDoubleTap() {
  System.out.println("onDoubleTap");
  return true;
 }

 @Override
 			public boolean onManagedTouchEvent(TouchEvent pSceneTouchEvent) {    
  return super.onManagedTouchEvent(pSceneTouchEvent);
 }

@Override
			public boolean onSceneTouchEvent(Scene pScene,
  TouchEvent pSceneTouchEvent) {    
  return super.onSceneTouchEvent(pScene, pSceneTouchEvent);
}
		};

		surfaceGestureDetector.setEnabled(true);
  //mScene.setOnSceneTouchListener(surfaceGestureDetector);
 }
 
}

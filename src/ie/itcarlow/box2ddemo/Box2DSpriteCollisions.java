package ie.itcarlow.box2ddemo;

import java.util.List;

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
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlas;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlasTextureRegionFactory;
import org.andengine.opengl.texture.atlas.bitmap.BuildableBitmapTextureAtlas;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.ui.activity.BaseGameActivity;

import android.widget.Toast;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef.BodyType;
import com.badlogic.gdx.physics.box2d.Contact;
import com.badlogic.gdx.physics.box2d.ContactImpulse;
import com.badlogic.gdx.physics.box2d.ContactListener;
import com.badlogic.gdx.physics.box2d.FixtureDef;
import com.badlogic.gdx.physics.box2d.Manifold;

public class Box2DSpriteCollisions extends BaseGameActivity implements IUpdateHandler {
		private static final int CAMERA_WIDTH = 720;
	private static final int CAMERA_HEIGHT = 480;

	private Camera camera;
	
	//PlayerOne
	private BitmapTextureAtlas PlayerOneTexture;
	private ITextureRegion mPlayerOneTextureRegion;
	
	//PlayerTwo
	private BitmapTextureAtlas PlayerTwoTexture;
	private ITextureRegion mPlayerTwoTextureRegion;
	private Sprite mPlayerTwo;
	
	//Floor
	private BitmapTextureAtlas FloorTexture;
	private ITextureRegion mFloorTextureRegion;
	private List<Sprite>  mFloorList;
	
	//Scene
	private Scene mScene;
	
	
	//Assorted Variables
	int numberOfFloorTiles = 1;
	private PhysicsWorld mPhysicsWorld;
	Vector2 velocity, sprite1,sprite2;
	float velX,velY,speed = 50;
	boolean mCollided = false;

	private BuildableBitmapTextureAtlas tiledTextureAtlas;
	private ITextureRegion wall_region, floor_region;

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
	public void onCreateResources(OnCreateResourcesCallback pOnCreateResourcesCallback) throws Exception 
	{
    	ResourceManager.prepareManager(getEngine(), this, camera, getVertexBufferObjectManager());
    	loadGfx();
		pOnCreateResourcesCallback.onCreateResourcesFinished();

    }

    public void LoadTileResources()
    {
    	BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/Map"); 
    	tiledTextureAtlas = new BuildableBitmapTextureAtlas(getTextureManager(), 65, 65);  
    	wall_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, this, "Wall.png", 0, 0);
    	floor_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, this, "Floor.png", 0, 0);
    	PlayerOneTexture.load();
    }
    
    private void loadGfx() 
    {     
        BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/"); 
        
        //PlayerOne
        PlayerOneTexture = new BitmapTextureAtlas(getTextureManager(), 65, 65);  
        mPlayerOneTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(PlayerOneTexture, this, "playerOne.png", 0, 0);
        PlayerOneTexture.load();
        
        //PlayerTwo
        PlayerTwoTexture = new BitmapTextureAtlas(getTextureManager(), 65, 65);  
        mPlayerTwoTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(PlayerTwoTexture, this, "playerTwo.png", 0, 0);
        PlayerTwoTexture.load();
        
        //Floor
        FloorTexture = new BitmapTextureAtlas(getTextureManager(),65,65);
        mFloorTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(FloorTexture, this, "FloorSprite.png", 0, 0);
        FloorTexture.load();
    }

    
    
    
    @Override
  	public void onCreateScene(OnCreateSceneCallback pOnCreateSceneCallback)
  			throws Exception {
    	
    	
  		this.mScene = new Scene();
  		this.mScene.setBackground(new Background(0, 125, 58));
  	    pOnCreateSceneCallback.onCreateSceneFinished(this.mScene);  
  	}


    @Override
	public void onPopulateScene(Scene pScene, OnPopulateSceneCallback pOnPopulateSceneCallback) 
          throws Exception {
	   final float centerX = (CAMERA_WIDTH - this.mPlayerOneTextureRegion.getWidth()) / 2;
	   final float centerY = (CAMERA_HEIGHT - this.mPlayerOneTextureRegion.getHeight()) / 2;
 
	   
	   
	   //PlayerOne
	   final Sprite PlayerOne = new Sprite(centerX+100, centerY, this.mPlayerOneTextureRegion, this.getVertexBufferObjectManager())
	   {
           @Override
           public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
                                        final float pTouchAreaLocalX,
                                        final float pTouchAreaLocalY) {
               setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
               return true;
           }
       };
       
       //PlayerTwo
       mPlayerTwo = new Sprite(centerX, centerY, this.mPlayerTwoTextureRegion, this.getVertexBufferObjectManager())
	   {
    	  @Override
		public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
                  final float pTouchAreaLocalX,
                  final float pTouchAreaLocalY){
    		  setBodyPosition(this, PlayerOne, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
    		  return true; 
    	  }
    	  
       };
       
       //Floor
       for(int i = 0; i < numberOfFloorTiles; i= i+1){
    	   mFloorList.add(new Sprite(centerX - 50, centerY, this.mFloorTextureRegion, this.getVertexBufferObjectManager())
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  setBodyPosition(PlayerOne, this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	       });
       }
       
       //PlayerOne
	   mScene.attachChild(PlayerOne);
	   createPhysicsBodies(PlayerOne); 
	   this.mScene.registerTouchArea(PlayerOne);
	   
	   //PlayerTwo
	   mScene.attachChild(mPlayerTwo);
	   this.mScene.registerTouchArea(mPlayerTwo);
	   createPhysicsBodies(mPlayerTwo);
	   
	   //Floor
	   for(int i = 0; i < numberOfFloorTiles; i++){
		   mScene.attachChild(mFloorList.get(i));
		   createPhysicsBodies(mFloorList.get(i)); 
		   this.mScene.registerTouchArea(mFloorList.get(i));
	   }
	   
	   setUpBox2DWorld();
	   this.mEngine.registerUpdateHandler(this);
	   pOnPopulateSceneCallback.onPopulateSceneFinished();
    }

    private void setUpBox2DWorld() {
    	// Set up your physics world here.
    	final Vector2 v = Vector2Pool.obtain(0, 0);
    	// Establish world with no gravity, second param 
    	// (false) means PhysicsWorld cannot sleep
    	mPhysicsWorld = new PhysicsWorld(v, false);
        mPhysicsWorld.setContactListener(createContactListener());

    	Vector2Pool.recycle(v);
    	this.mScene.registerUpdateHandler(mPhysicsWorld);
    	velocity = Vector2Pool.obtain(velX, velY);
    }
    

    private void createPhysicsBodies(final Sprite Playerone) {
    	// Create your Box2D bodies here.
    	final FixtureDef PLAYER_FIX = PhysicsFactory.createFixtureDef(1.5f,0.45f, 0.3f);
    	Body body = PhysicsFactory.createCircleBody(
 			   mPhysicsWorld, Playerone, BodyType.DynamicBody, 
 			   PLAYER_FIX);
    	mPhysicsWorld.registerPhysicsConnector(new PhysicsConnector(Playerone, body, true, true));
    	 Playerone.setUserData(body);
    	 body.applyLinearImpulse(velocity, body.getWorldCenter());


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


private ContactListener createContactListener() {

	
	ContactListener levelContactListener = new ContactListener() {
        @Override
        public void beginContact(Contact contact) {
        	mCollided = true;
        	/*Body body = contact.getFixtureA().getBody();
        	if(body.getUserData().equals("PlayerTwo")) {
        		
        	} */
        }
        @Override
        public void endContact(Contact contact) {
           
                       
        }
        @Override
        public void preSolve(Contact contact, Manifold oldManifold) {
           
           
        }
        @Override
        public void postSolve(Contact contact, ContactImpulse impulse) {
            
           
        }
    };
	
	return levelContactListener;
}

@Override

public void onUpdate(float pSecondsElapsed) {
	if(mCollided == true){
				PhysicsConnector connector = mPhysicsWorld.getPhysicsConnectorManager().findPhysicsConnectorByShape(mPlayerTwo);
				// Unregister the physics connector
				mPhysicsWorld.unregisterPhysicsConnector(connector);
				// Destroy the body
				mPhysicsWorld.destroyBody(connector.getBody());
				
				mScene.detachChild(mPlayerTwo);
		mCollided = false;
	}
}

@Override
public void reset() {
	// TODO Auto-generated method stub
	
}

    
}

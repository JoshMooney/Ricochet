package ie.itcarlow.box2ddemo;


import org.andengine.engine.handler.IUpdateHandler;
import org.andengine.engine.options.EngineOptions;
import org.andengine.engine.options.ScreenOrientation;
import org.andengine.engine.options.resolutionpolicy.RatioResolutionPolicy;
import org.andengine.entity.scene.Scene;
import org.andengine.entity.scene.background.Background;
import org.andengine.entity.sprite.Sprite;
import org.andengine.input.touch.TouchEvent;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlas;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlasTextureRegionFactory;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.ui.activity.BaseGameActivity;

import android.graphics.Camera;

public class Box2DSpriteCollisions extends BaseGameActivity implements IUpdateHandler {
	// ===========================================================
	// Constants
	// ===========================================================

	private static final int CAMERA_WIDTH = 720;
	private static final int CAMERA_HEIGHT = 480;

	// ===========================================================
	// Fields
	// ===========================================================

	private BitmapTextureAtlas mTextureAustrianBear;
	private BitmapTextureAtlas mTexturePiglet;
	private ITextureRegion mAustrianBearTextureRegion;
	private ITextureRegion mPigletTextureRegion;
	private Scene mScene;
	private Sprite mPiglet;	

	private PhysicsWorld mPhysicsWorld;
	Vector2 velocity, sprite1,sprite2;
	float velX,velY,speed = 50;
	boolean mCollided = false;
	
	
	// ===========================================================
	// Constructors
	// ===========================================================

	// ===========================================================
	// Getter & Setter
	// ========================================================

	// ===========================================================
	// Methods for/from SuperClass/Interfaces
	// ===========================================================

	@Override
	public EngineOptions onCreateEngineOptions() {
		final Camera camera = new Camera(0, 0, CAMERA_WIDTH, CAMERA_HEIGHT);

		return new EngineOptions(true, ScreenOrientation.LANDSCAPE_SENSOR, new RatioResolutionPolicy(CAMERA_WIDTH, CAMERA_HEIGHT), camera);
	}

    @Override
	public void onCreateResources(
       OnCreateResourcesCallback pOnCreateResourcesCallback)
			throws Exception {

    	 loadGfx();
		 pOnCreateResourcesCallback.onCreateResourcesFinished();

    }

    private void loadGfx() {     
        BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/");  
        mTextureAustrianBear = new BitmapTextureAtlas(getTextureManager(), 46, 54);  
        mAustrianBearTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(mTextureAustrianBear, this, "austrian_bear.png", 0, 0);
        mTextureAustrianBear.load();
        
        mTexturePiglet = new BitmapTextureAtlas(getTextureManager(), 46, 54);  
        mPigletTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(mTexturePiglet, this, "piglet.png", 0, 0);
        mTexturePiglet.load();
       
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

       // Setup coordinates for the sprite in order that it will
       //  be centered on the camera.
	   final float centerX = (CAMERA_WIDTH - this.mAustrianBearTextureRegion.getWidth()) / 2;
	   final float centerY = (CAMERA_HEIGHT - this.mAustrianBearTextureRegion.getHeight()) / 2;
 
	   // Create the austrian bear and add it to the scene.
	   
	   final Sprite austrianBear = new Sprite(centerX+100, centerY, this.mAustrianBearTextureRegion, this.getVertexBufferObjectManager())
	   {
           @Override
           public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
                                        final float pTouchAreaLocalX,
                                        final float pTouchAreaLocalY) {
        	   //y2-y1 ,x2-x1
        	   //velocity.x = (sprite2.x - sprite1.x)/speed;
               //velocity.y = (sprite2.y - sprite1.y)/speed;
               setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
               return true;
           }
       };
       //sprite1.x= austrianBear.getX();
      // sprite1.y= austrianBear.getY();
      mPiglet = new Sprite(centerX, centerY, this.mPigletTextureRegion, this.getVertexBufferObjectManager())
	   {
           @Override
           public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
                                        final float pTouchAreaLocalX,
                                        final float pTouchAreaLocalY) {
               setBodyPosition(this, austrianBear, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
               return true;
           }
       };
       //sprite2.x= mPiglet.getX();
       //.y= mPiglet.getY();
       
       //austrianBear.setPosition(austrianBear.getX() + velocity.x, austrianBear.getY() + velocity.y); 
       
       
	   mScene.attachChild(austrianBear);
	   this.mScene.registerTouchArea(austrianBear);
	   mScene.attachChild(mPiglet);
	   this.mScene.registerTouchArea(mPiglet);
	   
	   setUpBox2DWorld();
	   
	   // The bear sprite (unlike the piglet sprite) is a local variable, 
	   //  so it must be passed to method createPhysicsBodies
	   createPhysicsBodies(austrianBear);  
	   createPhysicsBodies(mPiglet);  	   
	   this.mEngine.registerUpdateHandler(this);
	   pOnPopulateSceneCallback.onPopulateSceneFinished();
    }

	// ===========================================================
	// Methods
	// ===========================================================

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
    
    private void createPhysicsBodies(final Sprite austrianBear) {
    	// Create your Box2D bodies here.
    	final FixtureDef PLAYER_FIX = PhysicsFactory.createFixtureDef(1.5f,0.45f, 0.3f);
    	Body body = PhysicsFactory.createCircleBody(
 			   mPhysicsWorld, austrianBear, BodyType.DynamicBody, 
 			   PLAYER_FIX);
    	mPhysicsWorld.registerPhysicsConnector(new PhysicsConnector(austrianBear, body, true, true));
    	 austrianBear.setUserData(body);
    	 body.applyLinearImpulse(velocity, body.getWorldCenter());


    }
    
    /*
     * Helper method that translates the associated physics body to the specified coordinates.
     * 
	 * @param pX The desired x coordinate for this sprite.
	 * @param pY The desired y coordinate for this sprite.
     */
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
    	
    	//Body body = PhysicsFactory.createCircleBody(mPhysicsWorld, puck, BodyType.DynamicBody, PLAYER_FIX);
    	//body.setLinearDamping(0.4f);
    	//puck.setUserData(body); // puck is a Sprite
		
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
        	if(body.getUserData().equals("piglet")) {
        		
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
	// TODO Auto-generated method stub
	// Only do this ONCE if a collision has occurred (hint: you need a boolean variable to
		// store the collision state)
	if(mCollided == true){
		//mEngine.runOnUpdateThread(new Runnable(){ 
			//@Override
			//public void run() {
				// Find the physics connector associated with the sprite mPiglet
				PhysicsConnector connector = mPhysicsWorld.getPhysicsConnectorManager().findPhysicsConnectorByShape(mPiglet);
				// Unregister the physics connector
				mPhysicsWorld.unregisterPhysicsConnector(connector);
				// Destroy the body
				mPhysicsWorld.destroyBody(connector.getBody());
				
				mScene.detachChild(mPiglet);
		//}
		//});
		mCollided = false;
	}
}

@Override
public void reset() {
	// TODO Auto-generated method stub
	
}


    // ===========================================================
 	// Inner and Anonymous Classes
 	// ===========================================================
    
}

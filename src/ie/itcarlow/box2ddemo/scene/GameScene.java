package ie.itcarlow.box2ddemo.scene;

import ie.itcarlow.box2ddemo.ResourceManager;

import org.andengine.engine.camera.hud.HUD;
import org.andengine.entity.scene.IOnSceneTouchListener;
import org.andengine.entity.scene.Scene;
import org.andengine.entity.scene.background.Background;
import org.andengine.entity.sprite.Sprite;
import org.andengine.extension.physics.box2d.FixedStepPhysicsWorld;
import org.andengine.extension.physics.box2d.PhysicsConnector;
import org.andengine.extension.physics.box2d.PhysicsFactory;
import org.andengine.extension.physics.box2d.PhysicsWorld;
import org.andengine.extension.physics.box2d.util.Vector2Pool;
import org.andengine.extension.physics.box2d.util.constants.PhysicsConstants;
import org.andengine.input.touch.TouchEvent;
import org.andengine.input.touch.detector.SurfaceGestureDetector;
import org.andengine.util.color.Color;

import android.graphics.Point;
import android.view.MotionEvent;
import android.view.View;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef.BodyType;
import com.badlogic.gdx.physics.box2d.FixtureDef;

public class GameScene extends BaseScene
{
	private HUD gameHUD;
	private PhysicsWorld physicsWorld;
	Sprite PlayerOne;
	Sprite PlayerTwo;
	Sprite Up,Down,Left,Right;
	Sprite Projectile;
	float destinationX, destinationY;
	
	float p1x,p1y,p2x,p2y;
	float upx,downx,leftx,rightx,upy,downy,lefty,righty;
	
	public int LEVEL_NUM = 3;
	
	public void createScene() 
	{
		//configGestureDetection();
		setBackground();
		createHUD();
		createListener();
		createPhysics();
		createTiles();
		addPlayer();
		
		//camera.setChaseEntity(playerSprite);	//We are not using this
	}

	public void setUpNextLevel()
	{
		LEVEL_NUM++;
		getPlayerPositions();
		//Move Players to the new player Level Positions
		//Give both players Lives OR whatever we intend to do
		ResourceManager.getInstance().tileManager.ClearMap();
		createTiles();
	}

	private void createListener() 
	{
		configGestureDetection();
	}
	
	public boolean onSceneTouchEvent(Scene pScene, TouchEvent event) {

        // your stuff here
        return false;
    }

    public boolean onTouch(View v, MotionEvent event) {
       setBodyPosition(PlayerOne, event.getX() - 65 / 2, event.getY() - 65 / 2);
       return true;
    }

	public void onBackPressed() 
	{
		// TODO Auto-generated method stub
	}

	public void disposeScene() 
	{
		ResourceManager.getInstance().UnloadGameResources();
	}
	
	private void setBackground()
	{
		setBackground(new Background(Color.WHITE));
	}
	
	private void createHUD()
	{
		gameHUD = new HUD();
		camera.setHUD(gameHUD);
	}
	
	private void createPhysics()
	{
		physicsWorld = new FixedStepPhysicsWorld(60, new Vector2(0,0), false);	
												//FPS, Gravity, Is physics engine allowed to Sleep
		registerUpdateHandler(physicsWorld);
	}
	
	private void getPlayerPositions()
	{
		float tileSize = ResourceManager.getInstance().wall_region.getWidth();
		upx = 11.0f * tileSize;
		upy = 4.5f * tileSize;
		downx = 11.0f * tileSize;
		downy = 6.5f * tileSize;
		leftx = 10.0f * tileSize;
		lefty = 3.0f * tileSize;
		rightx = 12.0f * tileSize;
		righty = 3.0f * tileSize;
		
		if(LEVEL_NUM == 1)
		{
			p1x = 1.0f * tileSize;
			p1y = 4.5f * tileSize;
			
			p2x = 13.0f * tileSize;
			p2y = 4.5f * tileSize;
		}
		else if (LEVEL_NUM == 2)
		{
			p1x = 1.0f * tileSize;
			p1y = 4.5f * tileSize;
			
			p2x = 13.0f * tileSize;
			p2y = 4.5f * tileSize;
		}
		else if (LEVEL_NUM == 3)
		{
			p1x = 1.5f * tileSize;
			p1y = 1.5f * tileSize;
					
			p2x = 11.5f * tileSize;
			p2y = 7.5f * tileSize;
		}
		else if (LEVEL_NUM == 4)
		{
			p1x = 1.5f * tileSize;
			p1y = 1.5f * tileSize;
					
			p2x = 11.5f * tileSize;
			p2y = 7.5f * tileSize;
		}
		else
		{
			p1x = 1.0f * tileSize;
			p1y = 4.5f * tileSize;
			
			p2x = 13.0f * tileSize;
			p2y = 4.5f * tileSize;
		}
	}
	
	private void addPlayer()
	{
		getPlayerPositions();
		//PlayerOne
		   PlayerOne = new Sprite(p1x, p1y, ResourceManager.getInstance().mPlayerOneTextureRegion, ResourceManager.getInstance().vbom)
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
	       PlayerTwo = new Sprite(p2x, p2y, ResourceManager.getInstance().mPlayerTwoTextureRegion, ResourceManager.getInstance().vbom)
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  //setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	    	  
	       };
	     //Up button
	       Up = new Sprite(upx , upy, ResourceManager.getInstance().UpTextureRegion, ResourceManager.getInstance().vbom)
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  //setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	    	  
	       };
	     //down button
	       Down = new Sprite(downx, downy, ResourceManager.getInstance().DownTextureRegion, ResourceManager.getInstance().vbom)
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  //setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	    	  
	       };
	     //left button
	       Left = new Sprite(leftx, lefty, ResourceManager.getInstance().LeftTextureRegion, ResourceManager.getInstance().vbom)
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  //setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	    	  
	       };
	     //right button
	       Right = new Sprite(rightx, righty, ResourceManager.getInstance().RightTextureRegion, ResourceManager.getInstance().vbom)
		   {
	    	  @Override
			public boolean onAreaTouched(final TouchEvent pSceneTouchEvent,
	                  final float pTouchAreaLocalX,
	                  final float pTouchAreaLocalY){
	    		  //setBodyPosition(this, pSceneTouchEvent.getX() - this.getWidth() / 2, pSceneTouchEvent.getY() - this.getHeight() / 2);
	    		  return true; 
	    	  }
	    	  
	       };
	       
	       //PlayerOne
		   this.attachChild(PlayerOne);
		   this.createPhysicsBodies(PlayerOne); 
		   this.registerTouchArea(PlayerOne);
		   
		   //PlayerTwo
		   this.attachChild(PlayerTwo);
		   this.registerTouchArea(PlayerTwo);
		   this.createPhysicsBodies(PlayerTwo);
		   
		   //Button
		   this.attachChild(Up);
		   //this.createPhysicsBodies(Up); 
		   this.registerTouchArea(Up);
		   this.attachChild(Down);
		   //this.createPhysicsBodies(Down); 
		   this.registerTouchArea(Down);
		   this.attachChild(Left);
		  // this.createPhysicsBodies(Left); 
		   this.registerTouchArea(Left);
		   this.attachChild(Right);
		   //this.createPhysicsBodies(Right); 
		   this.registerTouchArea(Right);
	}
	
	private void addProjectile(float x, float y)
	{
			//PlayerOne
			Projectile = new Sprite(x, y, ResourceManager.getInstance().mProjectileRegion, ResourceManager.getInstance().vbom){};
	       
	       //PlayerOne
		   this.attachChild(Projectile);
		   this.createPhysicsBodies(Projectile);    
	}
	
	private void createPhysicsBodies(final Sprite Player) 
	{
    	// Create your Box2D bodies here.
    	final FixtureDef PLAYER_FIX = PhysicsFactory.createFixtureDef(1.5f,0.45f, 0.3f);
    	
    	PLAYER_FIX.restitution = 0;
    	Body body = PhysicsFactory.createCircleBody(
 			   physicsWorld, 
 			   Player, 
 			   BodyType.DynamicBody, 
 			   PLAYER_FIX);
    	
    	physicsWorld.registerPhysicsConnector(new PhysicsConnector(Player, body, true, true));
    	body.setFixedRotation(true);
    	Player.setUserData(body);
    	 //body.applyLinearImpulse(velocity, body.getWorldCenter());
    }
	
	private void createTiles()
	{
		int tileSize = 48;
		int i; 
		int Lenght = 10;
		int Width = 15;
		
		for (i = 0; i < Lenght; i++)
		{
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(0, tileSize * i).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 14, tileSize * i).CreateBodyAndAttach(this, physicsWorld);
		}
		for (i = 0; i < Width; i++)
		{
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * i, 0).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * i, tileSize * 9).CreateBodyAndAttach(this, physicsWorld);
		}

		if(LEVEL_NUM == 1)
		{
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 3).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 4).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 5).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 6).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 3).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 4).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 5).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 6).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 1).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 8).CreateBodyAndAttach(this, physicsWorld);
		}
		if(LEVEL_NUM == 2)
		{		
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 1).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 4, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 8).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 4, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 1).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 10, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 8).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 10, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 3).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 4).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 5).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 6).CreateBodyAndAttach(this, physicsWorld);
		}
		if(LEVEL_NUM == 3)
		{		
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 1).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 2).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 3, tileSize * 3).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 8).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 7).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 11, tileSize * 6).CreateBodyAndAttach(this, physicsWorld);
			
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 3).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 4).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 5).CreateBodyAndAttach(this, physicsWorld);
			ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(tileSize * 7, tileSize * 6).CreateBodyAndAttach(this, physicsWorld);
		}
		
	}
	
	/*public void setBodyPosition(final Sprite sprite, final float pX, final float pY) {
    	
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
    }*/
	
	public void setBodyPosition(final Sprite sprite, final float pX, final float pY) {
		float speed = 50;
    	final Body body = (Body) sprite.getUserData();
        final float widthD2 = sprite.getWidth() / 2;
        final float heightD2 = sprite.getHeight() / 2;
        final float angle = body.getAngle(); // keeps the body angle       
        final Vector2 v2 = Vector2Pool.obtain((sprite.getX() + widthD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT, (sprite.getY() + heightD2) / PhysicsConstants.PIXEL_TO_METER_RATIO_DEFAULT);
        body.setTransform(v2, angle);
        Vector2Pool.recycle(v2);
        body.applyLinearImpulse((pX-sprite.getX())/speed, (pY-sprite.getY())/speed, pX, pY);
    }
	
	public void MoveToPosition(final Sprite sprite, final float pX, final float pY) {
		float speed = 2;	
        double angle = calcAngleBetweenPoints(new Vector2(sprite.getX(), sprite.getY()), new Vector2(pX, pY));
        double distance = speed;
        Vector2 velocityPoint = getVelocity(angle, distance);
        sprite.setPosition(sprite.getX() + velocityPoint.x, sprite.getY() + velocityPoint.y);
        System.out.println("Pos = " + sprite.getX() + velocityPoint.x + " , " + sprite.getY() + velocityPoint.y);
    }
    
	public static final double calcAngleBetweenPoints(Vector2 p1, Vector2 p2)
    {
        return Math.toDegrees( Math.atan2( p2.y-p1.y, p2.x-p1.x ) );
    }

    public static final Vector2 getVelocity(double angle, double speed){
        double x = Math.cos(Math.toRadians(angle))*speed;
        double y = Math.sin(Math.toRadians(angle))*speed;
        return (new Vector2((float)x, (float)y));
    }

	private void configGestureDetection() {
		activity.runOnUiThread(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				setupGestureDetection();
			}
		});
			
	}

	public void setupGestureDetection(){

		SurfaceGestureDetector surfaceGestureDetector = new SurfaceGestureDetector(activity.getBaseContext(), 1f) {
	
			@Override
			 protected boolean onSwipeUp() {
			 System.out.println("onSwipeUp");
			 addProjectile(PlayerOne.getX(), PlayerOne.getY() - 45);
			 setBodyPosition(Projectile, Projectile.getX(),Projectile.getY() - 100);
			 ResourceManager.getInstance().shootSE.play();
			 return true;
			}
		
			@Override
			protected boolean onSwipeRight() {
			System.out.println("onSwipeRight");
			addProjectile(PlayerOne.getX() + 45, PlayerOne.getY());
			setBodyPosition(Projectile, Projectile.getX() + 100 ,Projectile.getY());
			ResourceManager.getInstance().shootSE.play();
			return true;
			}
		
			 @Override
			 protected boolean onSwipeLeft() {
			 System.out.println("onSwipeLeft");
			 addProjectile(PlayerOne.getX() - 45, PlayerOne.getY());
			 setBodyPosition(Projectile, Projectile.getX() - 100,Projectile.getY());
			 ResourceManager.getInstance().shootSE.play();
			 return true;
			 }
		
			@Override
			 protected boolean onSwipeDown() {
			 System.out.println("onSwipeDown");
			 addProjectile(PlayerOne.getX(), PlayerOne.getY() + 45);
			 setBodyPosition(Projectile, Projectile.getX(),Projectile.getY() + 100);
			 ResourceManager.getInstance().shootSE.play();
			 return true;
			 }
		
			@Override
			 protected boolean onSingleTap() {
			 System.out.println("onSingleTap");
			 //while(PlayerOne)
			 setBodyPosition(PlayerOne,destinationX,destinationY);
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
			public boolean onSceneTouchEvent(Scene pScene, TouchEvent pSceneTouchEvent) {    
				if(pSceneTouchEvent.getAction() == MotionEvent.ACTION_DOWN)
		        {
					System.out.println("Move destination set");
					destinationX = pSceneTouchEvent.getX();
					destinationY = pSceneTouchEvent.getY();
		        }
				return super.onSceneTouchEvent(pScene, pSceneTouchEvent);
			}
		};

	    surfaceGestureDetector.setEnabled(true);


	  setOnSceneTouchListener(surfaceGestureDetector);
	 }
	
}

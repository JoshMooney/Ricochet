package ie.itcarlow.box2ddemo.scene;

import ie.itcarlow.box2ddemo.ResourceManager;

import org.andengine.engine.camera.hud.HUD;
import org.andengine.entity.scene.background.Background;
import org.andengine.extension.physics.box2d.FixedStepPhysicsWorld;
import org.andengine.extension.physics.box2d.PhysicsWorld;
import org.andengine.util.color.Color;

import com.badlogic.gdx.math.Vector2;

public class GameScene extends BaseScene
{
	private HUD gameHUD;
	private PhysicsWorld physicsWorld;
	
	@Override
	public void createScene() {
		setBackground();
		createHUD();
		createPhysics();
		addPlayer();
		createTiles();
		//camera.setChaseEntity(playerSprite);	//We are not using this
	}

	@Override
	public void onBackPressed() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void disposeScene() {
		ResourceManager.getInstance().UnloadGameResources();
		
	}
	
	private void setBackground()
	{
		setBackground(new Background(Color.RED));
		
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
	
	private void addPlayer()
	{
		//Create and make the players here
		
		//final FixtureDef playerFixturedef = PhysicsFactory.createFixtureDef(0.5f, 0.0f, 0.75f);
		//Sprite playerSprite = createSprite(0,0,ResourceManager.getInstance().player_region, vbom);
		//playerBody = PhysicsFactory.createBoxBody(physicsWorld, playerSprite, BodyType.DynamicBody, playerFixtureDef);
		//physicsWorld.registerPhysicsConnector(new PhysicsConnector(playerSprite, playerBody, true, false));
		//attachChild(playerSprite);
	}

	private void createTiles()
	{
		ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(-50, 100).CreateBodyAndAttach(this, physicsWorld);
		ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(50, 100).CreateBodyAndAttach(this, physicsWorld);
		ResourceManager.getInstance().tileManager.getTileByID(1).getInstance(100, -100).CreateBodyAndAttach(this, physicsWorld);
	}
}

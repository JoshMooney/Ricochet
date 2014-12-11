package ie.itcarlow.box2ddemo;

import java.io.IOException;

import org.andengine.audio.music.Music;
import org.andengine.audio.music.MusicFactory;
import org.andengine.audio.sound.Sound;
import org.andengine.audio.sound.SoundFactory;
import org.andengine.engine.Engine;
import org.andengine.engine.camera.Camera;
import org.andengine.entity.sprite.Sprite;
import org.andengine.opengl.texture.TextureOptions;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlas;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlasTextureRegionFactory;
import org.andengine.opengl.texture.atlas.bitmap.BuildableBitmapTextureAtlas;
import org.andengine.opengl.texture.atlas.bitmap.source.IBitmapTextureAtlasSource;
import org.andengine.opengl.texture.atlas.buildable.builder.BlackPawnTextureAtlasBuilder;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.opengl.vbo.VertexBufferObjectManager;
import org.andengine.util.debug.Debug;

public class ResourceManager 
{
	private static final ResourceManager INSTANCE = new ResourceManager();
	
	public Engine engine;
	public Box2DSpriteCollisions activity;
	public Camera camera;
	public VertexBufferObjectManager vbom;
	
	private BuildableBitmapTextureAtlas menuTextureAtlas;
	public ITextureRegion play_button_region;
	public ITextureRegion exit_button_region;
	public Music menuBE;
	public Sound menuClickedSE;
	
	private BuildableBitmapTextureAtlas tiledTextureAtlas;
	public ITextureRegion wall_region;
	public ITextureRegion floor_region;
	public Music gameBE;
	public Sound respawnSE, ricochetSE, shootSE, gameoverSE, gamewinSE;
	
	private BuildableBitmapTextureAtlas gameTextureAtlas;
	
	private BuildableBitmapTextureAtlas hudTextureAtlas;
	public ITextureRegion hudSprite;
	
	
	//Projectile
	private BuildableBitmapTextureAtlas ProjectileAtlas;
	public ITextureRegion mProjectileRegion;
	
	//PlayerOne
	private BuildableBitmapTextureAtlas PlayerOneAtlas;
	public ITextureRegion mPlayerOneTextureRegion;
	//MoveTo Variable will be location for A* to move to
	//private Vector2 MoveTo;
		
	//PlayerTwo
	private BuildableBitmapTextureAtlas PlayerTwoAtlas;
	public ITextureRegion mPlayerTwoTextureRegion;
	public Sprite mPlayerTwo;
		
	public TileManager tileManager;
	public int tileSize = 50;
	
	public void LoadMenuResources()
	{
		BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/Menu/"); 
		menuTextureAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 1024, 1024, TextureOptions.BILINEAR);
		play_button_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(menuTextureAtlas, activity, "play.png");
		exit_button_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(menuTextureAtlas, activity, "exit.png");
		
		LoadMenuAudio();
		try{
			menuTextureAtlas.build(new BlackPawnTextureAtlasBuilder<IBitmapTextureAtlasSource, BitmapTextureAtlas>(0,1,0));
			menuTextureAtlas.load();
		}
		catch (Exception e){
			Debug.e(e);
		}
		menuBE.play();
	}
	public void UnloadMenuResources()
	{
		menuBE.pause();
		menuTextureAtlas.unload();
		menuTextureAtlas = null;
	}
	
	public void LoadGameResources()
	{
		BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/");
		gameTextureAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 200, 200, TextureOptions.BILINEAR);
		
		//HUD Assets
		hudTextureAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 200, 200, TextureOptions.BILINEAR);
		hudSprite = BitmapTextureAtlasTextureRegionFactory.createFromAsset(gameTextureAtlas, activity, "Menue.png");
	
		//PlayerOne
        PlayerOneAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 50, 50);  
        mPlayerOneTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(PlayerOneAtlas, activity, "playerOne.png");
        
        //Projectile
        ProjectileAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 25, 25);  
        mProjectileRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(PlayerOneAtlas, activity, "Projectile.png");
        
        //PlayerTwo
        PlayerTwoAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 50, 50);  
        mPlayerTwoTextureRegion = BitmapTextureAtlasTextureRegionFactory.createFromAsset(PlayerTwoAtlas, activity, "playerTwo.png");
	
        LoadGameAudio();
		try{
			gameTextureAtlas.build(new BlackPawnTextureAtlasBuilder<IBitmapTextureAtlasSource, BitmapTextureAtlas>(0,1,0));
			gameTextureAtlas.load();
		}
		catch (Exception e){
			Debug.e(e);
		}
		gameBE.play();
	}	
    public void UnloadGameResources()
    {
    	gameTextureAtlas.unload();
		gameTextureAtlas = null;
    }
	
    public void LoadTileResources()
    {
    	BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/Map/"); 
    	tiledTextureAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 256, 256);
    	
    	wall_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, activity, "Wall.png");
    	floor_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, activity, "Floor.png");
    	
    	try{
    		tiledTextureAtlas.build(new BlackPawnTextureAtlasBuilder<IBitmapTextureAtlasSource, BitmapTextureAtlas>(0,1,0));
    		tiledTextureAtlas.load();
		}
		catch (Exception e){
			Debug.e(e);
		}
    }
    public void UnloadTileResources()
    {
    	tiledTextureAtlas.unload();
    	tiledTextureAtlas = null;
    }
    
    public void LoadFonts()
	{
		
	}	
	public void LoadAudio()
	{
		
	}
	
	public void LoadMenuAudio()
	{
		SoundFactory.setAssetBasePath("mfx/Menu/");
		try 
		{
			menuClickedSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "select.wav");
		} 
		catch (final IOException e) 
		{
			Debug.e(e);
		}
		
		MusicFactory.setAssetBasePath("mfx/Menu/");
		try 
		{
			menuBE = MusicFactory.createMusicFromAsset(engine.getMusicManager(), activity, "background.ogg");
			menuBE.setVolume(0.5f);
			menuBE.setLooping(true);
		} 
		catch (final IOException e) 
		{
			Debug.e(e);
		}
	}
	
	public void LoadGameAudio()
	{
		MusicFactory.setAssetBasePath("mfx/Game/");
		try 
		{
			gameBE = MusicFactory.createMusicFromAsset(engine.getMusicManager(), activity, "background.mp3");
			gameBE.setVolume(0.5f);
			gameBE.setLooping(true);
		} 
		catch (final IOException e) {	Debug.e(e);	}
		
		SoundFactory.setAssetBasePath("mfx/Game/");
		try 
		{
			respawnSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "respawn.mp3");
		} 
		catch (final IOException e)	{	Debug.e(e);	}
		try 
		{
			ricochetSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "ricochet.wav");
		} 
		catch (final IOException e)	{	Debug.e(e);	}
		try 
		{
			shootSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "shoot.wav");
		} 
		catch (final IOException e)	{	Debug.e(e);	}
		try 
		{
			gameoverSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "gameover.wav");
		} 
		catch (final IOException e)	{	Debug.e(e);	}
		try 
		{
			gamewinSE = SoundFactory.createSoundFromAsset(engine.getSoundManager(), activity, "wingame.wav");
		} 
		catch (final IOException e)	{	Debug.e(e);	}
		
	}
	
	public void LoadTileManager()
	{	
		LoadTileResources();
		tileManager = new TileManager(vbom);
	}
	
	public static void prepareManager(Engine engine, Box2DSpriteCollisions activity, Camera camera, VertexBufferObjectManager vbom)
	{
		getInstance().engine = engine;
		getInstance().activity = activity;
		getInstance().camera = camera;
		getInstance().vbom = vbom;
	}
	
	public static ResourceManager getInstance()
	{
		return INSTANCE;
	}
}

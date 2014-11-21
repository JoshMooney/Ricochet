package ie.itcarlow.box2ddemo;

import org.andengine.engine.Engine;
import org.andengine.engine.camera.Camera;
import org.andengine.opengl.texture.TextureOptions;
import org.andengine.opengl.texture.atlas.bitmap.BitmapTextureAtlasTextureRegionFactory;
import org.andengine.opengl.texture.atlas.bitmap.BuildableBitmapTextureAtlas;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.opengl.vbo.VertexBufferObjectManager;

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
	
	private BuildableBitmapTextureAtlas tiledTextureAtlas;
	public ITextureRegion wall_region;
	public ITextureRegion floor_region;
	
	public void LoadMenuResources()
	{
		BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/Menu"); 
		menuTextureAtlas = new BuildableBitmapTextureAtlas(activity.getTextureManager(), 1024, 1024, TextureOptions.BILINEAR);
		play_button_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(menuTextureAtlas, activity, "play.png");
		play_button_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(menuTextureAtlas, activity, "exit.png");
	}
	public void LoadGameResources()
	{
		
	}	
    public void LoadTileResources()
    {
    	BitmapTextureAtlasTextureRegionFactory.setAssetBasePath("gfx/Map"); 
    	tiledTextureAtlas = new BuildableBitmapTextureAtlas(getTextureManager(), 100, 100);  
    	wall_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, activity, "Wall.png");
    	floor_region = BitmapTextureAtlasTextureRegionFactory.createFromAsset(tiledTextureAtlas, activity, "Floor.png");
    }
	public void LoadFonts()
	{
		
	}	
	public void LoadAudio()
	{
		
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

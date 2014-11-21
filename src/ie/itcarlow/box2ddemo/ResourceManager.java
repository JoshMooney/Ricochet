package ie.itcarlow.box2ddemo;

import org.andengine.engine.Engine;
import org.andengine.engine.camera.Camera;
import org.andengine.opengl.vbo.VertexBufferObjectManager;

public class ResourceManager 
{
	private static final ResourceManager INSTANCE = new ResourceManager();
	
	public Engine engine;
	public Box2DSpriteCollisions activity;
	public Camera camera;
	public VertexBufferObjectManager vbom;
	
	public void LoadMenuResources()
	{
		
	}
	public void LoadGameResources()
	{
		
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

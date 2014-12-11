package ie.itcarlow.box2ddemo;

import org.andengine.entity.scene.Scene;
import org.andengine.entity.sprite.Sprite;
import org.andengine.extension.physics.box2d.PhysicsConnector;
import org.andengine.extension.physics.box2d.PhysicsFactory;
import org.andengine.extension.physics.box2d.PhysicsWorld;
import org.andengine.extension.physics.box2d.util.Vector2Pool;
import org.andengine.extension.physics.box2d.util.constants.PhysicsConstants;
import org.andengine.input.touch.TouchEvent;
import org.andengine.opengl.texture.region.ITextureRegion;
import org.andengine.opengl.vbo.VertexBufferObjectManager;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef.BodyType;
import com.badlogic.gdx.physics.box2d.FixtureDef;

public class Tile extends Sprite
{
	final public String m_name;
	final public int m_id;
	final public float m_dense, m_elast, m_frict;
	
	public Tile(String name, int id, float x, float y, float dense, float elast, float frict, ITextureRegion texture, VertexBufferObjectManager vbom)
	{
		super(x, y, texture, vbom);
		
		m_name = name;
		m_id = id;
		m_dense = dense;
		m_elast = elast;
		m_frict = frict;
	}
	
	public void CreateBodyAndAttach(Scene scene, PhysicsWorld physicsworld)
	{
		final FixtureDef tileFixtureDef = PhysicsFactory.createFixtureDef(m_dense, m_elast, m_frict);
		tileFixtureDef.restitution = 1;
		Body body = PhysicsFactory.createBoxBody(physicsworld, this, BodyType.StaticBody, tileFixtureDef);
		scene.attachChild(this);
		physicsworld.registerPhysicsConnector(new PhysicsConnector(this, body, true, true));
	}
	
	
	public String getName()
	{
		return m_name;
	}
	public int getID()
	{
		return m_id;
	}
	public Tile getInstance(float x, float y)
	{
		return new Tile(m_name, m_id, x, y, m_dense, m_elast, m_frict, getTextureRegion(), getVertexBufferObjectManager());
	}
	
	
	
}

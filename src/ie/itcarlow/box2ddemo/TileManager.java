package ie.itcarlow.box2ddemo;

import java.util.ArrayList;

import org.andengine.opengl.vbo.VertexBufferObjectManager;

public class TileManager 
{
	private ArrayList<Tile> tiles = new ArrayList<Tile>();

	public TileManager(VertexBufferObjectManager vbom)
	{
		tiles.add(new Tile("Wall", 1, 0, 0, 5f, 0, .5f, ResourceManager.getInstance().wall_region, vbom));
		tiles.add(new Tile("Floor", 2, 0, 0, 0, 0, 0, ResourceManager.getInstance().floor_region, vbom));	
	}
	
	public Tile getTileByID(int id)
	{
		for(Tile t : tiles)
			if(t.getID() == id)
				return t;
		return null;
	}

	public void ClearMap()
	{
		tiles = new ArrayList<Tile>();
	}
}

var tiles = new Array();

function TileManager()
{
	
}

TileManager.prototype.getTileByID = function(id)
{
	for(i = 0; i < tiles.lenght; i++)
		if(tiles[i].getID() == id)
			return tiles[i];
	return null;
}

TileManager.prototype.createTile = function(x, y)
{
	tiles.push(new Tile("Wall", tiles.lenght, x, y, ResourceManager.wall));
}

TileManager.prototype.draw = function()
{
	for(i = 0; i < tiles.lenght; i++)
	{
		tiles[i].draw();
	}
}
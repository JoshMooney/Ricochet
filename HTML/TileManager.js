var tiles = new Array();
var tileIndex = 0;

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
	tiles[tileIndex] = new Tile("Wall", tileIndex, x, y, resourceManager.tile_wall);
	tileIndex++;
	//console.log(tiles[1]);
}

TileManager.prototype.draw = function()
{
	console.log(tiles.length);
	for(i = 0; i < tiles.length; i++)
	{
		tiles[i].draw();
	}
}
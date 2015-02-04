var tiles = new Array();

var tileIndex = 0;

function TileManager()
{
	this.tileWidth = 0;
	this.tileHeight = 0;
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
	//console.log(this.tileHeight);
	tiles[tileIndex] = new Tile("Wall", tileIndex, x, y, resourceManager.tile_wall, this.tileWidth, this.tileHeight);
	tileIndex++;
	//console.log(tiles[1]);
}

TileManager.prototype.draw = function()
{
	//console.log(tiles.length);
	for(i = 0; i < tiles.length; i++)
	{
		tiles[i].draw();
	}
}
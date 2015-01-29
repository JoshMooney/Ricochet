	var tileSize = 64;
	
	function Tile(name, id, x, y, texture)
	{
		this.m_x = x;
		this.m_y = y;
		this.m_texture = texture;		
		this.m_name = name;
		this.m_id = id;
	}
	
	Tile.prototype.getName = function()
	{
		return this.m_name;
	}

	Tile.prototype.getID = function()
	{
		return this.m_id;
	}
	
	Tile.prototype.gettexture = function()
	{
		return this.m_texture;
	}

	Tile.prototype.draw = function()
	{
		game.ctx.drawImage(this.m_texture, this.m_x, this.m_y, tileSize, tileSize);
	}


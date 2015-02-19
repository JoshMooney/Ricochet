function Bullet(x, y, Direction)
{
	//Box2D Variables
	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 1.0;
	this.fixDef.friction = 0.5;
	this.fixDef.restitution = 0.2;
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	//vairbles
	this.direction = Direction;
	this.m_width = 10;
	this.m_height = 10;
	//creates bullet on right side of player
	switch(this.direction) {
	    case 0:
	        this.m_x = x + playerOne.m_width/2 - this.m_width/2;
			this.m_y = y - 2 - this.m_height;
	        break;
	    case 1:
	        this.m_x = x + playerOne.m_width/2 - this.m_width/2;
			this.m_y = y + playerOne.m_height + 1;
	        break;
	    case 2:
	        this.m_x = x - 1 - this.m_width;
			this.m_y = y + playerOne.m_height/2 - this.m_height/2;
	        break;
	    default:
	        this.m_x = x + playerOne.m_width + 1;
			this.m_y = y + playerOne.m_height/2 - this.m_height/2;
			break;
	}
	this.speed = 10;
	this.remove = false;
	console.log("x: " + this.m_x + "Y: " + this.m_y);
}

Bullet.prototype.Update = function()
{
	//console.log("Bullet Update")
	//direction 0=up, 1=down, 2=right and 3/defualt=left
	if(tileManager.CheckCollision(this) || playerOne.Contains(this) || otherPlayer.Contains(this))
		this.remove = true;
	switch(this.direction) {
	    case 0:
	        this.m_y -= this.speed;
	        break;
	    case 1:
	        this.m_y += this.speed;
	        break;
	    case 2:
	        this.m_x -= this.speed;
	        break;
	    default:
	        this.m_x += this.speed;
	}
	//console.log("x: " + this.m_x + "Y: " + this.m_y)
}

Bullet.prototype.Draw = function()
{
	//console.log("Bullet Draw")
	game.ctx.fillStyle = rgb(255,0,55);
	game.ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
}
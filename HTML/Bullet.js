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
	this.m_x = x;
	this.m_y = y;
	this.m_width = 10;
	this.m_height = 10;
	this.speed = 10;
	this.direction = Direction;
	this.remove = false;
	console.log("x: " + this + "Y: " + this.m_y);
}

Bullet.prototype.Update = function()
{
	//console.log("Bullet Update")
	//direction 0=up, 1=down, 2=left and 3/defualt=right
	if(tileManager.CheckCollision(this))
		this.remove = true;
	switch(this.direction) {
	    case 0:
	        this.m_y -= this.speed;
	        break;
	    case 1:
	        this.m_y += this.speed;
	        break;
	    case 3:
	        this.m_x += this.speed;
	        break;
	    default:
	        this.m_x -= this.speed;
	}
	//console.log("x: " + this.m_x + "Y: " + this.m_y)
}

Bullet.prototype.Draw = function()
{
	//console.log("Bullet Draw")
	game.ctx.fillStyle = rgb(255,0,55);
	game.ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
}
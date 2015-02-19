function OtherPlayer(x, y)
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
	this.m_width = 20;
	this.m_height = 20;
	this.speed = 50;
	console.log("otherPlayers()");
}

OtherPlayer.prototype.Move = function(e)
{
	//A*
}

OtherPlayer.prototype.Update = function()
{
	
}

OtherPlayer.prototype.Draw = function()
{
	game.ctx.fillStyle = rgb(255,0,255);
	game.ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
}
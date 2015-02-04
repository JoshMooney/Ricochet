function AnimatedPlayer(x, y, Scale, CANVAS_WIDTH, CANVAS_HEIGHT)//Base Class for Player and Enemy to inherate from
{
	//Box2D Variables
	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 1.0;
	this.fixDef.friction = 0.5;
	this.fixDef.restitution = 0.2;
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	// positions the center of the object (not upper left!)
	this.bodyDef.position.x = CANVAS_WIDTH / 2 / Scale;
	this.bodyDef.position.y = CANVAS_HEIGHT / Scale;
	this.fixDef.shape = new b2CircleShape(35.5);
	this.Body = game.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

	this.ai = false;//can be used to juge if this is player or enemy
	this.m_x = x;
	this.m_y = y;
	this.m_width = 20;
	this.m_height = 200;
	this.speed = 10;
	var coin = sprite({
    	context: game.ctx,
    	width: 25,
   		height: 26,
    	image: this.Sprite
	});
	this.animationPosX = 0;
	console.log("AnimatedPlayers()");
}

function sprite (options) {
				
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
}

AnimatedPlayer.prototype.Move = function(e)
{
	/*console.log(this);*/
	if(this.ai == false)
	{
		this.m_x = this.pos.x;
		this.m_y = this.pos.y;
		if(e.keyCode == 38) // Up Key
			this.m_y -= this.speed;
		if(e.keyCode == 40) // Down Key
			this.m_y += this.speed;
		if(e.keyCode == 37) // Left Key
			this.m_x -= this.speed;
		if(e.keyCode == 39) // Right Key
			this.m_x += this.speed;
		this.pos.x = this.m_x;
		this.pos.y = this.m_y;
		this.Body.GetBody().SetPosition(this.pos);
	}
	console.log("Move called x" + this.pos.x + " , y " + this.pos.y + "");
}

AnimatedPlayer.prototype.Update = function()
{
	if(this.animationPosX == 0)
		this.animationPosX = 26;
	else if(this.animationPosX == 26)
		this.animationPosX = 53;
	else if(this.animationPosX == 53)
		this.animationPosX = 81;
	else 
		this.animationPosX = 0;

}


AnimatedPlayer.prototype.Draw = function()
{
	/*console.log("Draw called");*/
	this.pos = this.Body.GetBody().GetPosition();

	game.ctx.drawImage(resourceManager.playerSprite, this.animationPosX, 0, 25, 26, this.pos.x, this.pos.y, 25, 26)
	//game.ctx.drawImage(this.Sprite, this.pos.x / 32.5, this.pos.y / 32.5, 25,26);
}

AnimatedPlayer.prototype.GetWidth = function()
{
	return this.m_width;
}

AnimatedPlayer.prototype.GetHeight = function()
{
	return this.m_height;
}
AnimatedPlayer.prototype.GetX = function()
{
	return this.m_x;
}
AnimatedPlayer.prototype.GetY = function()
{
	return this.m_y;
}
AnimatedPlayer.prototype.Speed = function()
{
	return this.speed;
}
AnimatedPlayer.prototype.GetFixDef = function()
{
	return this.fixDef;
}
AnimatedPlayer.prototype.GetBodyDef = function()
{
	return this.bodyDef;
}
AnimatedPlayer.prototype.GetLives = function()
{
	return this.lives;
}
AnimatedPlayer.prototype.GetScore = function()
{
	return this.score;
}
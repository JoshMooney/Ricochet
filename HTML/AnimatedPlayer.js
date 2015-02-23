function AnimatedPlayer(x, y, w, h)//Base Class for Player and Enemy to inherate from
{
	this.playerLifes = 3;
	this.m_x = x;
	this.m_y = y;
	
	this.m_previousX = this.m_x;
	this.m_previousY = this.m_y;
	
	this.m_width = w;
	this.m_height = h;
	
	//Box2D Variables
	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 1.0;
	this.fixDef.friction = 0.5;
	this.fixDef.restitution = 0.2;
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	// positions the center of the object (not upper left!)
	this.bodyDef.position.x = x + w/2;
	this.bodyDef.position.y = y = h/2;
	this.fixDef.shape = new b2CircleShape(35.5);
	this.Body = game.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

	this.ai = false;//can be used to juge if this is player or enemy

	this.speed = 4;
	var coin = sprite({
    	context: game.ctx,
    	width: 25,
   		height: 26,
    	image: this.Sprite
	});
	this.animationPosX = 0;
}

function sprite (options) 
{
				
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
}

AnimatedPlayer.prototype.Move = function(direction)
{
	if(this.ai == false)
	{
		this.m_previousX = this.m_x;
		this.m_previousY = this.m_y;
	
		if(direction == 0) // Up Key
			this.m_y -= this.speed;
		if(direction == 1) // Down Key
			this.m_y += this.speed;
		if(direction == 2) // Left Key
			this.m_x -= this.speed;
		if(direction == 3) // Right Key
			this.m_x += this.speed;
	}
	
	if(tileManager.CheckCollision(this))
		this.PreviousStep();
}

AnimatedPlayer.prototype.Update = function()
{
	/*
	if(this.animationPosX == 0)
		this.animationPosX = 26;
	else if(this.animationPosX == 26)
		this.animationPosX = 53;
	else if(this.animationPosX == 53)
		this.animationPosX = 81;
	else 
		this.animationPosX = 0;
	*/
}

AnimatedPlayer.prototype.PreviousStep = function()
{
	this.m_x = this.m_previousX;
	this.m_y = this.m_previousY;
}

AnimatedPlayer.prototype.Draw = function()
{
	//this.pos = this.Body.GetBody().GetPosition();
	//console.log("x - " + this.m_x + " y - " + this.m_y);
	game.ctx.drawImage(resourceManager.playerSprite, this.m_x, this.m_y, this.m_width, this.m_height)
}

AnimatedPlayer.prototype.GetWidth = function()
{
	this.m_x = this.m_previousX;
	this.m_y = this.m_previousY;
}

AnimatedPlayer.prototype.Contains = function(e)
{
	if(this.m_x + this.m_width > e.m_x && this.m_x < e.m_x + e.m_width &&
		this.m_y + this.m_height > e.m_y && this.m_y < e.m_y + e.m_height)
	{
		this.playerLifes--;
		return true;
	}
	return false;
}
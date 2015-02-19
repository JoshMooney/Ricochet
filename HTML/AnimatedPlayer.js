function AnimatedPlayer(x, y, w, h)//Base Class for Player and Enemy to inherate from
{
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

	this.m_x = x;
	this.m_y = y;
	this.m_width = w;
	this.m_height = h;

	this.speed = .01;
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

AnimatedPlayer.prototype.Move = function(e)
{
	/*console.log(this);*/
	if(this.ai == false)
	{
		if(e.keyCode == 38) // Up Key
			this.m_y -= this.speed;
		if(e.keyCode == 40) // Down Key
			this.m_y += this.speed;
		if(e.keyCode == 37) // Left Key
			this.m_x -= this.speed;
		if(e.keyCode == 39) // Right Key
			this.m_x += this.speed;
	}
}

AnimatedPlayer.prototype.Update = function()
{
	//console.log("Player Update")
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


AnimatedPlayer.prototype.Draw = function()
{
	/*console.log("Draw called");*/
	this.pos = this.Body.GetBody().GetPosition();
	//console.log("x: " + this.m_x + "Y - " + this.m_y + "w: " + this.m_width + "h - " + this.m_height + "Text- " + resourceManager.playerSprite);
	game.ctx.drawImage(resourceManager.playerSprite, this.m_x, this.m_y, this.m_width, this.m_height)
	//game.ctx.drawImage(this.Sprite, this.pos.x / 32.5, this.pos.y / 32.5, 25,26);
}


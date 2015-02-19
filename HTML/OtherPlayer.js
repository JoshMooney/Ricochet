function OtherPlayer(x, y, w, h)
{
	this.playerLifes = 3;
	
	//vairbles
	this.m_x = x;
	this.m_y = y;
	this.m_width = w;
	this.m_height = h;
	this.speed = 50;
	
	//Box2D Variables
	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 1.0;
	this.fixDef.friction = 0.5;
	this.fixDef.restitution = 0.2;
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	var coin = sprite({
    	context: game.ctx,
    	width: 25,
   		height: 26,
    	image: this.Sprite
	});
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

OtherPlayer.prototype.Move = function(e)
{
	//A*
}

OtherPlayer.prototype.Update = function()
{
	
}

OtherPlayer.prototype.Draw = function()
{
	//game.ctx.fillStyle = rgb(255,0,255);
	//game.ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
	game.ctx.drawImage(resourceManager.player2Sprite, this.m_x, this.m_y, this.m_width, this.m_height)
}

OtherPlayer.prototype.Contains = function(e)
{
	if(this.m_x + this.m_width > e.m_x && this.m_x < e.m_x + e.m_width &&
		this.m_y + this.m_height > e.m_y && this.m_y < e.m_y + e.m_height)
		return true;
	return false;
}
function Player(Scale, CANVAS_WIDTH, CANVAS_HEIGHT)//Base Class for Player and Enemy to inherate from
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

	this.Sprite = new Image();
	this.Sprite.src = "../assets/gfx/PlayerOne.png"//fill in
	this.ai = false;//can be used to juge if this is player or enemy
	this.m_x = 20;
	this.m_y = 200;
	this.m_width = 20;
	this.m_height = 200;
	this.speed = 10;
	console.log("Initaliser called");
}

/*function Player(e)
{
	this.ai = e;
	if(this.ai)
	{
		this.m_x = window.screen.availWidth - 60;
		this.m_y = window.screen.availHeight - 300;
		this.speed = 8;
		console.log("AI Active");
	}
	else
	{
		this.m_x = 30;
		this.m_y = 200;
		this.speed = 20;
	}
	this.m_width = 30;
	this.m_height = 250;
	//this.speed = 10;
	console.log("AI Initaliser called");
}*/

Player.prototype.Move = function(e)
{
	/*console.log(this);*/
	if(this.ai == false)
	{
		if(e.keyCode == 38) // Up Key
			this.m_y -= this.speed;
		if(e.keyCode == 40) // Down Key
			this.m_y += this.speed;
	}
	/*console.log("Move called");*/
}

Player.prototype.Update = function()
{

}

Player.prototype.AIMovement = function()
{

}

Player.prototype.Draw = function()
{
	/*console.log("Draw called");*/
	this.pos = this.Body.GetBody().GetPosition();

	game.ctx.drawImage(this.Sprite, this.pos.x / 32.5, this.pos.y / 32.5, 65,65);
}

Player.prototype.GetWidth = function()
{
	return this.m_width;
}

Player.prototype.GetHeight = function()
{
	return this.m_height;
}
Player.prototype.GetX = function()
{
	return this.m_x;
}
Player.prototype.GetY = function()
{
	return this.m_y;
}
Player.prototype.Speed = function()
{
	return this.speed;
}
Player.prototype.GetFixDef = function()
{
	return this.fixDef;
}
Player.prototype.GetBodyDef = function()
{
	return this.bodyDef;
}

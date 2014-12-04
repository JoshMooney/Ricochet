function Paddle()
{
	this.ai = false;
	this.m_x = 20;
	this.m_y = 200;
	this.m_width = 20;
	this.m_height = 200;
	this.speed = 10;
	console.log("Initaliser called");
}

function Paddle(e)
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
}

Paddle.prototype.Move = function(e)
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

Paddle.prototype.Update = function()
{

}

Paddle.prototype.AIMovement = function()
{

}

Paddle.prototype.Draw = function()
{
	/*console.log("Draw called");*/
	game.ctx.fillStyle = rgb(255,255,255);
	game.ctx.fillRect(this.m_x, this.m_y, this.m_width, this.m_height);
}

Paddle.prototype.GetWidth = function()
{
	return this.m_width;
}

Paddle.prototype.GetHeight = function()
{
	return this.m_height;
}
Paddle.prototype.GetX = function()
{
	return this.m_x;
}
Paddle.prototype.GetY = function()
{
	return this.m_y;
}
Paddle.prototype.Speed = function()
{
	return this.speed;
}

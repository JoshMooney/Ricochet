var game;


function Game()
{
	this.screenwidth = window.innerWidth;
	this.screenheight = window.innerHeight;
	this.ctx;

	//this.paddle = new Paddle(false);
	//this.aiPaddle = new Paddle(true);
}

function main()
{
	game = new Game();	

	//Call canvas function
	game.initCanvas();
	document.addEventListener("keydown", function(e){game.paddle.Move(e);} );
	game.gameloop();
}

Game.prototype.gameloop = function()
{


	window.requestAnimationFrame(game.gameloop);
}

Game.prototype.initCanvas = function()
{
	//creates canvas object
	this.canvas = document.createElement("canvas");	//Allows the object to be seen by the whole solution
	//create a 2d content for drawing 
	this.ctx = this.canvas.getContext("2d");
	//adds the actual canvas to the HTML file
	document.body.appendChild(this.canvas);

	//makes the canvas full screen
	this.canvas.width = this.screenwidth;
	this.canvas.height = this.screenheight;
}

Game.prototype.draw = function()
{
	/*Clear*/
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	this.ctx.font = "30px Arial";
		
	//this.ctx.strokeText("Player | AI Player",this.canvas.width/2 -100,50);
	//this.ctx.strokeText("" + this.aiScore +" | " + this.playerScore,this.canvas.width/2 -30,90);

}

function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';};

	/*helper function*/
	function clamp(value, min, max) 
	{ 
		if(max<min) { 
			var temp = min; 
			min = max; 
			max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
};
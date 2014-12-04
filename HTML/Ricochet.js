var game;

 var b2Vec2 = Box2D.Common.Math.b2Vec2
, b2BodyDef = Box2D.Dynamics.b2BodyDef
, b2Body = Box2D.Dynamics.b2Body
, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
, b2Fixture = Box2D.Dynamics.b2Fixture
, b2World = Box2D.Dynamics.b2World
, b2MassData = Box2D.Collision.Shapes.b2MassData
, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
, b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var Scale = 30;

function Game()
{
	this.screenwidth = window.innerWidth;
	this.screenheight = window.innerHeight;
}

Game.prototype.Inisalise = function()
{
	this.world = new b2World(new b2Vec2(0, 0)/*gravity*/,true/*allow sleep*/);
	this.playerOne = new Player(Scale, this.screenwidth, this.screenheight);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
    };
})();

function main()
{
	game = new Game();
	game.Inisalise();	
	//game.ctx;
	//Call canvas function
	game.initCanvas();
	document.addEventListener("keydown", function(e){game.paddle.Move(e);} );
	requestAnimFrame(update);
}

function update() {
   game.world.Step(
         1 / 60   //frame-rate
      ,  10       //velocity iterations
      ,  10       //position iterations
   );
   game.draw();
   game.world.ClearForces();
     
   requestAnimFrame(update);
}; // update()

Game.prototype.initCanvas = function()
{
	//creates canvas object
	this.canvas = document.createElement("canvas");	//Allows the object to be seen by the whole solution
	//create a 2d content for drawing 
	game.ctx = this.canvas.getContext("2d");
	//adds the actual canvas to the HTML file
	document.body.appendChild(this.canvas);

	//makes the canvas full screen
	this.canvas.width = this.screenwidth;
	this.canvas.height = this.screenheight;
}

Game.prototype.draw = function()
{
	/*Clear*/
	game.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	game.ctx.font = "30px Arial";

	game.playerOne.Draw();
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
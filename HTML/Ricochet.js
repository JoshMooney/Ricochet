var game;

//gestures
var SWIPE_MIN_DISTANCE = 5;
var SWIPE_THRESHOLD_VELOCITY = 50;

//touch input
var mouseX, mouseY, 
// is this running in a touch capable environment?
touchable = 'createTouch' in document,
touches = []; // array of touch vectors

//Box2D
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

//Sprites
var Scale = 30;

function Game()
{
	this.screenwidth = window.innerWidth;
	this.screenheight = window.innerHeight;

}

Game.prototype.Inisalise = function()
{
	this.mms = new MainMenuScene();
	this.world = new b2World(new b2Vec2(0, 0)/*gravity*/,true/*allow sleep*/);
	this.playerOne = new Player(Scale, this.screenwidth, this.screenheight);
	setupTouch();
	configGestureDetection();
}

function setupTouch()
{
	if(touchable) {
		game.canvas.addEventListener( 'touchstart', onTouchStart, false );
		game.canvas.addEventListener( 'touchmove', onTouchMove, false );
		game.canvas.addEventListener( 'touchend', onTouchEnd, false );
		window.onorientationchange = resetCanvas;  
		window.onresize = resetCanvas;  
	} 
	else {
		console.log("not touchable");		
		document.addEventListener("click", function(e){game.mms.getClickPosiiton(e);} );
	}
}

function resetCanvas (e) {  
 	// resize the canvas - but remember - this clears the canvas too. 
  	game.canvas.width = window.innerWidth; 
	game.canvas.height = window.innerHeight;
	
	//make sure we scroll to the top left. 
	window.scrollTo(0,0); 
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
	game.initCanvas();
	game.Inisalise();
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
	game.mms.Draw();
	//this.ctx.strokeText("Player | AI Player",this.canvas.width/2 -100,50);
	//this.ctx.strokeText("" + this.aiScore +" | " + this.playerScore,this.canvas.width/2 -30,90);

	//touch
	if(touchable) {
		for(var i=0; i<touches.length; i++)
		{
			var touch = touches[i]; 
			game.ctx.beginPath(); 
			game.ctx.fillStyle = "white";
			game.ctx.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30); 
			game.ctx.beginPath(); 
			game.ctx.strokeStyle = "red";
			game.ctx.lineWidth = "6";
			game.ctx.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true); 
			game.ctx.stroke();
		}
	} else {
		game.ctx.fillStyle	 = "white"; 
		game.ctx.fillText("mouse : "+mouseX+", "+mouseY, mouseX, mouseY); 	
	}

}


function onTouchStart(e) {
 
	touches = e.touches; 
	//alert("touch!");
	draw();

}


 
function onTouchMove(e) {
	 // Prevent the browser from doing its default thing (scroll, zoom)
	e.preventDefault();
	touches = e.touches; 
	onFling(e.touches[0].pageX, e.touches[0].pageY);
} 
 
function onTouchEnd(e) { 
   
   	touches = e.touches; 
   
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


/*//gestures ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function setupGestureDetection(){
	var surfaceGestureDetector = new SurfaceGestureDetector(activity.getBaseContext(), 1f) {
		function onSwipeUp() {
			System.out.println("onSwipeUp");
			return true;
		}

		@Override
		function onSwipeRight() {
			System.out.println("onSwipeRight");
			return true;
		}

		function onSwipeLeft() {
			System.out.println("onSwipeLeft");
			return true;
		}

		function onSwipeDown() {
			System.out.println("onSwipeDown");
			return true;
		}

		function onSingleTap() {
			System.out.println("onSingleTap");
			return true;
		}

		function onDoubleTap() {
			System.out.println("onDoubleTap");
			return true;
		}

		function onManagedTouchEvent(TouchEvent pSceneTouchEvent) {    
			return super.onManagedTouchEvent(pSceneTouchEvent);
		}

		function onSceneTouchEvent(Scene pScene,TouchEvent pSceneTouchEvent) {    
			return super.onSceneTouchEvent(pScene, pSceneTouchEvent);
		}
	};
	surfaceGestureDetector.setEnabled(true);
	setOnSceneTouchListener(surfaceGestureDetector);
}


function configGestureDetection() {
	activity.runOnUiThread(new Runnable() {
		function run() {
			// TODO Auto-generated method stub
			setupGestureDetection();
		}
	});
			
}*/


function onFling( e1X, e1Y,  e2X, e2Y,  velocityX,  velocityY) {
    if(e1X - e2X > SWIPE_MIN_DISTANCE ) {
        //From Right to Left
        return true;
    }  
    else if (e2X - e1X > SWIPE_MIN_DISTANCE ) {
        //From Left to Right
        return true;
    }
    if(e1Y - e2Y > SWIPE_MIN_DISTANCE ) {
        //From Bottom to Top
        return true;
    }  
    else if (e2Y - e1Y > SWIPE_MIN_DISTANCE ) {
        //From Top to Bottom
        return true;
    }
    return false;
}
        
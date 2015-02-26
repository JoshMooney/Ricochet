var game;
var sceneManager;
var resourceManager;
var tileManager;
var touchStart;
var touchEnd;

//gestures
var SWIPE_MIN_DISTANCE = 10;
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

	this.testSwipe = "default"; 
}

Game.prototype.Inisalise = function()
{
	this.world = new b2World(new b2Vec2(0, 0)/*gravity*/,true/*allow sleep*/);
	setupTouch();
	//configGestureDetection();
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
		//console.log("not touchable");
		//document.addEventListener("keyup", function(e){sceneManager.GameScene.playerOne.Move(e);} );
		//document.addEventListener("click", function(e){TransitionScene.getClickPosiiton(e);} );		
		document.addEventListener("click", function(e){sceneManager.MenuScene.getClickPosiiton(e);} );
		document.addEventListener("click", function(e){sceneManager.getClickPosiiton(e);} );
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
	resourceManager = new ResourceManager();
	tileManager = new TileManager();
	sceneManager = new SceneManager();
	game.initCanvas();
	game.Inisalise();
	requestAnimFrame(update);
}

function update() 
{
    game.world.Step(
        1 / 60   //frame-rate
        , 10       //velocity iterations
        , 10       //position iterations
    );
    game.draw();
    game.world.ClearForces();
    sceneManager.UpdateScene();  
    requestAnimFrame(update);
} // update()

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
	//Clear Canvas
	game.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


	this.ctx.strokeText("" + this.testSwipe, this.canvas.width/2,this.canvas.height/4 * 3);

	//Touch
	if(touchable) {
		for(var i=0; i<touches.length; i++)
		{
			var touch = touches[i]; 
			//game.ctx.beginPath(); 
			//game.ctx.fillStyle = "black";
			//game.ctx.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30); 
			//game.ctx.beginPath(); 
			//game.ctx.strokeStyle = "red";
			//game.ctx.lineWidth = "1";
			//game.ctx.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true); 
			//game.ctx.stroke();
			sceneManager.MenuScene.getClickPosiiton(touch);
			//sceneManager.GameScene.getClickPosiiton(touch);
		}
	} else {
		game.ctx.fillStyle	 = "black"; 
		game.ctx.fillText("mouse : "+mouseX+", "+mouseY, mouseX, mouseY); 	
	}
	sceneManager.DrawScene();
}



function onTouchStart(e) 
{
	touchStart = e.touches[0];
	touches = e.touches;
	
	game.testSwipe = "Record start";
}
function onTouchMove(e) 
{
	/*// Prevent the browser from doing its default thing (scroll, zoom)
	e.preventDefault();
	touches = e.touches; \
	if(touchable && touches.length >= 2) {
		for(var i=0; i<touches.length; i++)
		{
			game.testSwipe = "_______________" + touches.length;
			var touch = touches[i]; 
			onFling(e.touches[i].clientX , e.touches[i].clientY,e.touches[i+1].clientX, e.touches[i+1].clientY);
		}
	}*/
} 
function onTouchEnd(e) 
{ 
   	touchEnd = e.touches[1];
   	touches = e.touches; 
   	onFling(touchStart.clientX, touchStart.clientY, touchEnd.clientX, touchEnd.clientY);
   
   	game.testSwipe = "End";

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


function onFling(e1X, e1Y,  e2X, e2Y) {


    if(e1X - e2X > SWIPE_MIN_DISTANCE ) {
        //From Right to Left
        onSwipeLeft();
    }  
    else if (e2X - e1X > SWIPE_MIN_DISTANCE ) {
        //From Left to Right
        onSwipeRight();
    }
    if(e1Y - e2Y > SWIPE_MIN_DISTANCE ) {
        //From Bottom to Top
        onSwipeUp();
    }  
    else if (e2Y - e1Y > SWIPE_MIN_DISTANCE ) {
        //From Top to Bottom
       	onSwipeDown();
    }
    else{
    	//touched once
    	sceneManager.MenuScene.getClickPosiiton(e);
    }
}

function onSwipeUp() {
	game.testSwipe = "up";
}
function onSwipeRight() {
	game.testSwipe = "Right";
}
function onSwipeLeft() {
	game.testSwipe = "Left";
}
function onSwipeDown() {
	game.testSwipe = "Down";
}

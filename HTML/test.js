var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new Object("I am the instance");
		
        return object;
    }
 
	function setMenuScene()
	{
		console.log("Cheese");
	}
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})(); 

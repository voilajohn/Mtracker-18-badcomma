var MickmanAppLogin = MickmanAppLogin || {};

//create the databases that we will be using
var product = localforage.createInstance({ //Product Database
	name: "product"
});
var cart = localforage.createInstance({ //Cart Database
	name: "cart"
});
var user = localforage.createInstance({ //Orders Database
	name: "user"
});

//var name = "john";
//orderdb = "order"+name;
//var orderdb = localforage.createInstance({ //Orders Database
	//name: orderdb
//});

console.log("db created");
		
//create the session
MickmanAppLogin.Session = (function () {
    var instance;
	
    function init() {
		
        var sessionIdKey = "mickman-session";
        
		

        return {
            // Public methods and variables.
            set: function (sessionData) {
                window.localStorage.setItem(sessionIdKey, JSON.stringify(sessionData));
            },

            get: function () {

                var result = null;

                try {
                    result = JSON.parse(window.localStorage.getItem(sessionIdKey));
                } catch(e){}

                return result;
            }
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
}());
var MickmanAppLogin = MickmanAppLogin || {};

//create the databases
/*var user = localforage.createInstance({ //User Database
	name: "user"
});*/
var product = localforage.createInstance({ //Product Database
	name: "product"
});
var cart = localforage.createInstance({ //Cart Database
	name: "cart"
});
var order = localforage.createInstance({ //Orders Database
	name: "order"
});
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
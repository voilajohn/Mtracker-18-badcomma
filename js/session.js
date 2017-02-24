var MickmanAppLogin = MickmanAppLogin || {};

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
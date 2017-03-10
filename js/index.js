var MickmanAppLogin = MickmanAppLogin || {};

var dbShell; //database name variable
var settings; //whether the db is loaded ie on or off
var product;
var cart;
var order;

// Begin boilerplate code generated with Cordova project.

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready'); 
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();

// End boilerplate code.

$(document).on("mobileinit", function (event, ui) {
    $.mobile.defaultPageTransition = "slide";
    //$.mobile.defaultPageTransition = "none";
	$( "body>[data-role='panel']" ).panel(); //global panel
});

app.signInController = new MickmanAppLogin.SignInController(); //call the signin controller
app.catalogController = new MickmanAppLogin.CatalogController(); //call the catalog controller 
app.cartController = new MickmanAppLogin.CartController(); //call the cart controller
app.orderController = new MickmanAppLogin.OrderController(); //call the cart controller 


$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
        switch (ui.toPage.attr("id")) {
            case "page-signin":
                // Reset signin form.
                app.signInController.resetSignInForm();
                break;
            case "page-cart":
            	app.cartController.getCartData(); 
            case "page-checkout":
            	app.catalogController.getUserData();
        }
    }
});

//Check for Sign-in
$(document).on("pagecontainerbeforechange", function (event, ui) {
    if (typeof ui.toPage !== "object") return;
    
    switch (ui.toPage.attr("id")) {
        case "page-signin": //if it's the sign-in page lets check to see if they have a valid session
            if (!ui.prevPage) {
                // Check session.keepSignedIn and redirect to main menu.
                var session = MickmanAppLogin.Session.getInstance().get(),
                    today = new Date();
                if (session && session.keepSignedIn && new Date(session.expirationDate).getTime() > today.getTime()) {
                    ui.toPage = $("#page-main-menu");  
                    console.log("Redirect");              
                }else{
	                console.log("Not Logged in");
                }
            }
        case "page-checkout": //if it's the second step of the cart let's check for saved 
        	//app.catalogController.getUserData();
			//console.log("check for saved profile info - check the db for saved cart data");
    }
});

//Login Button
$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signInController.init();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

//Login Button
$(document).delegate("#page-checkout", "pagebeforecreate", function () {
    app.cartController.init();
    app.cartController.$btnSave.off("tap").on("tap", function () {
        app.cartController.saveCartData();
    });
});

//Catalog Page is Loaded
$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
	app.catalogController.init();
    app.catalogController.getSavedData();
    app.cartController.init();
    app.cartController.$btnAdd.off("tap").on("tap", function () {
        app.cartController.addpricetoPopup($(this).data("num"),$(this).data("product-size"),$(this).data("product"),$(this).data("thumb"));
        console.log("activated");
    });
    app.cartController.$btnCheck.off("tap").on("tap", function (event) {
	    //first check cart data, then add to if there is existing
	    
	    cost = $(this).parent().find("span.sentPrice").text();
	    product = $(this).parent().find("span.sentProduct").text();
	    size = $(this).parent().find("span.sentSize").text();
	    thumb = $(this).parent().find("img").attr('src');
	    var items = [product+"-"+size,Number(cost),thumb];
        app.cartController.addtoCartCommand(items);
    });
});

//Cart Page is Loaded
$(document).delegate("#page-cart", "pageshow", function () {
	app.cartController.init();
    app.cartController.getCartData(); //lets gather the cart info each time the cart is visited.
});

//Orders page
$(document).delegate("#page-orders", "pageshow", function () {
	app.orderController.init();
    app.orderController.buildOrders(); //lets gather the cart info each time the cart is visited.
});
 
//Add to Cart Button
/*$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
    //app.cartController.init();
    app.cartController.$btnAdd.off("tap").on("tap", function () {
        app.cartController.addpricetoPopup($(this).data("num"),$(this).data("product-size"),$(this).data("product"),$(this).data("thumb"));
        console.log("activated");
    });
    app.cartController.$btnCheck.off("tap").on("tap", function (event) {
	    //first check cart data, then add to if there is existing
	    
	    cost = $(this).parent().find("span.sentPrice").text();
	    product = $(this).parent().find("span.sentProduct").text();
	    size = $(this).parent().find("span.sentSize").text();
	    thumb = $(this).parent().find("img").attr('src');
	    var items = [product+"-"+size,cost,thumb];
        app.cartController.addtoCartCommand(items);
    });
});*/


localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'mickApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvalue_pairs', // Should be alphanumeric, with underscores.
    description : 'products'
});

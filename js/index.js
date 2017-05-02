var MickmanAppLogin = MickmanAppLogin || {};

var dbShell; //database name variable
var settings; //whether the db is loaded ie on or off
var product;
var cart;
var order;
var group; //get the group name
var currentuser; //get the user name
var deliverydate;
var isprintAvailable = false;
var swiper;

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
        window.plugin.printer.isAvailable(
		    function (isAvailable) {
		        //alert(isAvailable ? 'Service is available' : 'Service NOT available');
		        isprintAvailable = true;
		    }
		);
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
	$("#menu-panel").trigger("create");
});

app.signInController = new MickmanAppLogin.SignInController(); //call the signin controller
app.catalogController = new MickmanAppLogin.CatalogController(); //call the catalog controller 
app.cartController = new MickmanAppLogin.CartController(); //call the cart controller
app.orderController = new MickmanAppLogin.OrderController(); //call the order controller 

function checkGroup(){ //find the group name and the user saved.
	//first point at which we are querying the database
	//CHECK DB
	product.getItem('cust_id').then( function(value){
		group = value;
	});
	product.getItem('user').then( function(value){
		currentuser = value;
	});
	product.getItem('wod').then( function(value){
		deliverydate = value;
	});
	console.log("gcheck");
}
function format1(n, currency) {
    return currency + " " + n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

$(document).on("pagecontainerbeforeshow", function (event, ui) {
    if (typeof ui.toPage == "object") {
	    
        switch (ui.toPage.attr("id")) {
            case "page-main-menu":
                updatePageHighlight("#page-main-menu");//update navigation
				$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
                break;
            case "page-signin":
                // Reset signin form.
                app.signInController.resetSignInForm();
                updatePageHighlight("page-signin");//update navigation
                break;
            case "page-cart":
            	app.cartController.getCartData(); 
            	updatePageHighlight("#page-cart");//update navigation
				$('#page-cart div[data-role=header]').find('h1').html(group);//replace title 
            	break;
            case "page-checkout":
            	app.catalogController.getUserData();
            	app.catalogController.showDefaults();
            	updatePageHighlight("#page-cart");//update navigation
				$('#page-checkout div[data-role=header]').find('h1').html(group);//replace title
            	break;
            case "page-payment":
            	updatePageHighlight("#page-cart");//update navigation
				$('#page-payment div[data-role=header]').find('h1').html(group);//replace title 
            	break;
            case "page-orders":
           		updatePageHighlight("#page-orders");//update navigation
		   		$('#page-orders div[data-role=header]').find('h1').html(group);//replace title 
            	break;
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

//Login Button - pagebeforecreate
$(document).delegate("#page-signin", "pagebeforecreate", function () {
    app.signInController.init();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
    });
});

//Login Button - pagebeforecreate
$(document).delegate("#page-checkout", "pagebeforecreate", function () {
    app.cartController.init();
    app.cartController.$btnSave.off("tap").on("tap", function () {
        app.cartController.saveCartData();
    });
});

//Catalog Page is Loaded - pagebeforecreate
$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
//$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
    checkGroup(); 
	app.catalogController.init();
    app.catalogController.getSavedData();
    console.log("page-main-menu");
    app.cartController.init();
    app.cartController.$btnAdd.off("tap").on("tap", function () {
	    // last item - added db-name this one adds variables to the popup
	    //e,s,p,t,r
	    app.cartController.addpricetoPopup(
	    	$(this).data("num"),
	    	$(this).data("product-size"),
	    	$(this).data("product"),
	    	$(this).data("thumb"),
	    	$(this).data("db-name")
	    );
    });
    app.cartController.$btnCheck.off("tap").on("tap", function (event) {
	    //first check cart data, then add to if there is existing
	    cost = $(this).parent().parent().find("span.sentPrice").text();
	    product = $(this).parent().parent().find("span.sentProduct").text();
	    productID = $(this).parent().parent().data("fieldrealName");
	    size = $(this).parent().parent().find("span.sentSize").text();
	    thumb = $(this).parent().parent().find("img").attr('src');
	    //dbname = $(this).parent().parent().find().attr();
	    //var items = [[product+"-"+size,Number(cost),thumb,dbname]];
	    var items = [[product+"-"+size,Number(cost),thumb,productID]];
	    var radioSelected = $(this).parent().find(':radio:checked').val();
	    //lets check for addons
	    //need to check the DB-ID to see where it needs to get added to.
	    if($("#ledlights").is(":checked") || $("#ezwreathhanger").is(":checked")){
		    if($("#ledlights").is(":checked")){//led
			   lthumb = $(this).parent().parent().find(".cart-addons img.ledthumb").attr('src');
			   lprice = $(this).parent().parent().find("span.addledprice").text();
			   items.push(["Led Light Set",Number(lprice),lthumb,"led"]);
		    }
		    if($("#ezwreathhanger").is(":checked")){
			   ezthumb = $(this).parent().parent().find(".cart-addons img.ezthumb").attr('src');
			   ezprice = $(this).parent().parent().find("span.addhangerprice").text();
			   items.push(["EZ Wreath Hanger",Number(ezprice),ezthumb,"hanger"]);
		    }
	    }
        app.cartController.addtoCartCommand(items,radioSelected);
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
$( ".ppanel" ).on( "panelbeforeopen", function( event, ui ) {//lets gather all the info we need to display in there.
	app.catalogController.showDefaults();//grab the defaults if they are saved.
});
$( "#purchase" ).on( "popupbeforeposition", function( event, ui ) {
	var productName = $(this).data('fieldrealName');
	console.log(productName);
	if(productName == "hanger" || productName == "25gar" || productName == "50gar" || productName == "led" || productName == "tlt"){
		//EZ wreath hanger / Garland / LED lights / Tiny Living Tree
		console.log(productName);
		$(this).find(".addon-wrapper").css("display","none");
		$(this).find(".addon-wrapper").css("display","none");
		$(this).find(".addon-wrapper .hangerwrapper").show();
	}else if(productName == "cc"){
		console.log("centerpiece");
		$(this).find(".addon-wrapper").css("display","block");
		$(this).find(".addon-wrapper .hangerwrapper").hide();
	}else{
		console.log("other" + productName);
		$(this).find(".addon-wrapper").css("display","block");
		$(this).find(".addon-wrapper").css("display","block");	
		$(this).find(".addon-wrapper .hangerwrapper").show();
	}
});

function updatePageHighlight(x){
	//console.log(x);
	$( "#menu-panel li a" ).each( function( index, element ){
    	$( this ).removeClass("listview-active");
	});
	var currentmenu = $("#menu-panel a[href="+x+"]");
	currentmenu.addClass("listview-active");
	//console.log(currentmenu);
}
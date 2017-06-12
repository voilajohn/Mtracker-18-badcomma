var MickmanAppLogin = MickmanAppLogin || {};

var dbShell; //database name variable
var settings; //whether the db is loaded ie on or off
var product;
var cart;
var order;
var group; //get the group name
var currentuser; //get the user name
var wod; var id;
var deliverydate;
var isprintAvailable = false;
var orderdb; //new 1.23
var productdb; //new 1.25
var swiper;
var loadCatCalled = 0;

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
		//not sure if this is going to work or not. 
		if (cordova.platformId == 'android') {
		    StatusBar.hide(); //hide statusbar for just Android phones
		}
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();


// End boilerplate code.
$(document).on("mobileinit", function (event, ui) {
    //$.mobile.defaultPageTransition = "slide";
    $.mobile.defaultPageTransition = "none";
	$( "body>[data-role='panel']" ).panel(); //global panel
	$("#menu-panel").trigger("create");
});

//prepare the attached JS
app.signInController = new MickmanAppLogin.SignInController(); //call the signin controller
app.catalogController = new MickmanAppLogin.CatalogController(); //call the catalog controller 
app.cartController = new MickmanAppLogin.CartController(); //call the cart controller
app.orderController = new MickmanAppLogin.OrderController(); //call the order controller 

function checkGroup(x){ //find the group name and the user saved.
	//x - debug where the checkGroup is coming from
	user.iterate(function(value, key, iterationNumber) {
		if(key == "group"){      group = value;
		}else if(key == "user"){ currentuser = value;
		}else if(key == "wod"){  wod = value;
		}else if(key == "id"){   id = value;
		}
	}).then(function() {	                  //update the profile display
		$(".your-group").html(group);         //display on profile section
		$(".your-profile").html(currentuser); //display on profile section
		$(".your-delivery").html(wod);        //display on profile section
		deliverydate = wod;
		group = group;
		//make sure that the dbs are displaying
		app.orderController.CreateOrderDB(currentuser,id); //load the db
		app.signInController.CreateProductDB(currentuser,id,x); //load the db 
	});
	console.log("checkgroup" + x);
}

function format1(n, currency) {  // decimal currency format 00.00
    return currency + " " + n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

$(document).on("pagecontainerbeforeshow", function (event, ui) { //update the title on the pages.
    if (typeof ui.toPage == "object") {
	    
        switch (ui.toPage.attr("id")) {
            case "page-main-menu":
                updatePageHighlight("#page-main-menu");//update navigation
				$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
                break;
            case "page-signin":
                app.signInController.resetSignInForm(); // Reset signin form.
                updatePageHighlight("page-signin");//update navigation
                break;
            case "page-cart":
            	updatePageHighlight("#page-cart");//update navigation
				$('#page-cart div[data-role=header]').find('h1').html(group);//replace title 
            	break;
            case "page-checkout": 
            	app.catalogController.getUserData(); //load saved defaults
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
        	console.log("check-login");
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
    }
});
//close summary
$(document).on('click', '.closesummary', function(event){
	$("#OrderComplete").addClass("hidden");
	//redirect and hope for the best
	$(':mobile-pagecontainer').pagecontainer('change', '#page-main-menu', { 'transition':'none' });
})
//Login Button - pagebeforecreate
$(document).delegate("#page-signin", "pagebeforecreate", function () {
	app.signInController.init();
    app.signInController.$btnSubmit.off("tap").on("tap", function () {
        app.signInController.onSignInCommand();
        console.log("signin");
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
//$(document).delegate("#page-main-menu", "pageshow", function () {
//$(document).on( "pagecontainershow", function() {
$(document).delegate("#page-main-menu", "pagebeforecreate", function () {
	app.catalogController.init();
    //app.catalogController.getSavedData();
    checkGroup('pagebeforecreate'); 
    console.log("page-main-menu");
    app.cartController.init();
    //this adds the info to the cart pop up
    app.cartController.$btnAdd.off("tap").on("tap", function (event) {
	    // last item - added db-name this one adds variables to the popup
	    //e,s,p,t,r,q
	    console.log($(this).data("quantity"));
	     console.log($(this).data("db-name"));
	    //if($(this).data("num") != ""){
		if($(this).data("quantity") != 0){ 
		    app.cartController.addpricetoPopup(
		    	$(this).data("num"), //e
		    	$(this).data("product-size"), //s
		    	$(this).data("product"), //p
		    	$(this).data("thumb"), //t
		    	$(this).data("db-name"), //r
		    	$(this).data("quantity") //q
		    );
	    }else{
		    $(this).parent().find('.product-error').html("<p>You need to select a valid quantity.</p>");
		    $(this).parent().find('.product-error').addClass("bi-ctn-err").slideDown().delay(4000).fadeOut().removeClass("bt-ctn-err");
		    event.preventDefault();
	    }
    });
    //this function adds to the cart from the product popup
    app.cartController.$btnCheck.off("tap").on("tap", function (event) {
	    //lets check here to see if there are more than one item being added
	    console.log("push to the cart");
	    var costA = []; 
	    var productA = []; 
	    var productIDA = []; 
	    var sizeA = []; 
	    var thumbA = []; 
	    var quantityA = [];
	    var Num = 0;
	    //loop through item list
	    
	    $(this).parent().parent().find('.cart-items .clone').each(function(i, obj) {
		    costA.push($(this).find("span.sentPrice").text());
		    productA.push($(this).find("span.sentProduct").text());
		    productIDA.push($(this).attr("id"));
		    
		    sizeA.push($(this).find("span.sentSize").text());
		    thumb = $(this).find("img").attr('src');
		    quantityA.push($(this).find("span.sentQuantity").text());
		    console.log($(this).find("span.sentSize").text());
		    Num++;
	    });
	    if(Num == 0){
		    //first check cart data, then add to if there is existing
		    cost = $(this).parent().parent().find("span.sentPrice").text();
		    product = $(this).parent().parent().find("span.sentProduct").text();
		    productID = $(this).parent().parent().data("fieldrealName");
		    size = $(this).parent().parent().find("span.sentSize").text();
		    thumb = $(this).parent().parent().find("img").attr('src');
		    
		    if(product == "LED Lights" || product == "EZ Wreath Hanger"){ 
			    var items = [[product,Number(cost),thumb,productID,1]];
			    console.log(productID);
			}else{ 
				console.log(size);
				if(size != 0){
					var items = [[product+"-"+size,Number(cost),thumb,productID,1]];//just adding one
				}else{
					var items = [[product,Number(cost),thumb,productID,1]];//just adding one
				}
				
			}//added a quantity to the end
		}else{//put together an order for each item. 
			console.log('put together');
			var items = [];
			for(y=0;y<costA.length;y++){
				console.log("Siza:" + sizeA[y] + "-");
				if(sizeA[y] != 0){
					items.push([String(productA[y]+"-"+sizeA[y]),Number(costA[y]),thumb,productIDA[y],Number(quantityA[y])]);
				}else{
					items.push([String(productA[y]),Number(costA[y]),thumb,productIDA[y],Number(quantityA[y])]);
				}
			}
		}
		
		//option chosen from the popup on what they want to do
	    var radioSelected = $(this).parent().find(':radio:checked').val();
	    
	    //lets check for addons
	    //need to check the DB-ID to see where it needs to get added to.
	    //need to make sure that this is getting added if there is already one in there.
	    if($("#ledlights").is(":checked") || $("#ezwreathhanger").is(":checked")){
		    if($("#ledlights").is(":checked")){//led
			   lthumb = $(this).parent().parent().find(".cart-addons img.ledthumb").attr('src');
			   lprice = $(this).parent().parent().find("span.addledprice").text();
			   items.push(["LED Light Set",Number(lprice),lthumb,"led",1]);
		    }
		    if($("#ezwreathhanger").is(":checked")){
			   ezthumb = $(this).parent().parent().find(".cart-addons img.ezthumb").attr('src');
			   ezprice = $(this).parent().parent().find("span.addhangerprice").text();
			   items.push(["EZ Wreath Hanger",Number(ezprice),ezthumb,"hanger",1]);
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
	//we need to check all the items for addons
	
	var productName = $(this).data('fieldrealName');
	console.log("p: " + productName);
	if(productName == "hanger" || productName == "25gar" || productName == "50gar" || productName == "led" || productName == "tlt"){
		//EZ wreath hanger / Garland / LED lights / Tiny Living Tree
		$(this).find(".addon-wrapper").css("display","none");
		$(this).find(".addon-wrapper").css("display","none");
		$(this).find(".addon-wrapper .hangerwrapper").show();
	}else if(productName == "cc"){
		$(this).find(".addon-wrapper").css("display","block");
		$(this).find(".addon-wrapper .hangerwrapper").hide();
	}else{
		$(this).find(".addon-wrapper").css("display","block");
		$(this).find(".addon-wrapper").css("display","block");	
		$(this).find(".addon-wrapper .hangerwrapper").show();
	}
});

function updatePageHighlight(x){
	$( "#menu-panel li a" ).each( function( index, element ){
    	$( this ).removeClass("listview-active");
	});
	var currentmenu = $("#menu-panel a[href="+x+"]");
	currentmenu.addClass("listview-active");
}
//check for many items in the cart already
function setAll(arr){
	return Promise.all( arr.map(function(key){
		return product.setItem(key);
	}) );
}
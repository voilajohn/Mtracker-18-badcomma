/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

//reset the variables
MickmanAppLogin.CartController = function () {
    this.$storePage = null;
    this.$btnAdd = null;
    this.$btnCheck = null;
    this.$btnCheckShop = null;
};

//gather the variables that we will need 
MickmanAppLogin.CartController.prototype.init = function () {
    //this.$signInPage = $("#page-signin");
    this.storePage = "#page-main-menu";
    this.$btnAdd = $(".addtocart", this.$storePage);
    this.$btnCheck = $(".addCheckout", this.$storePage);
     this.$btnCheckShop = $(".addShop", this.$storePage)
};

//create an instance ocf the db for the products
var cart = localforage.createInstance({
	name: "cart"
});

//add to cart
MickmanAppLogin.CartController.prototype.addtoCart = function (item) {
	//get cart contents 
	//add to array 
    //db save 
    //update display
};

//remove from cart
MickmanAppLogin.CartController.prototype.removeFromCart = function (item) {
	//get cart contents 
	//add to array 
    //db save 
    //update display
};

//
MickmanAppLogin.CartController.prototype.addpricetoPopup = function (e,s,p) {
	//save cart to db 
	$('#purchase span.sentPrice').html(e);
	$('#purchase span.sentSize').html(s);
	$('#purchase span.sentProduct').html(p);
	$('#purchase').enhanceWithin();
};

MickmanAppLogin.CartController.prototype.addtoCartCommand = function (e) {
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			console.log("yep: " + value[1]);
			//it is in there so lets add a variable to show how many are in there. and update the price. 
			if(e != "" && value[1] != ""){ //name - cost - quantity
				cart.setItem(e[0],[e[1],Number(value[1]+1)]); //one up the quantity
			}
		}else{ 
			console.log("nope"); //this is new lets add it. 
			if(e != ""){//check for blanks
				cart.setItem(e[0],[e[1],1]);
			}
		}
	}).catch(function(err) {
    	// This code runs if there were any errors
		console.log(err);
	});
	
	$("#purchase").popup("close");
	$(':mobile-pagecontainer').pagecontainer('change', '#page-cart', {
        transition: 'slide',
        changeHash: false,
        reverse: false,
        showLoadMsg: false
    });
    $(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
    //ui.toPage = $("#page-cart"); 
	//this.getCartData(); //now lets boot up the page
};
MickmanAppLogin.CartController.prototype.getCartData = function(){
	//reset the table
	$("#cart-table tbody").html(""); //clear table
	//close the popup window
	cart.iterate(function(value, key, iterationNumber) {
		//console.log("update table" + value);
		$("#cart-table tbody").append("<tr><td>thumbnail</td><td>"+key+"</td><td>"+value[1]+"</td><td>"+value[0]+"</td><td>"+Number(value[0]*value[1])+"</td></tr>");
	}).then(function() {
		$("#cart-table").table("refresh");
	}).catch(function(err) {
    	// This code runs if there were any errors
		console.log(err);
	});
};

/*var keycheck = ['25c','28c','36c','48c','60c','25v','28v','36v','48v','60v'];
function getSavedData(){

	//hide everything
	$(".ClassicWreath").hide();
	$(".VictorianWreath").hide();
	$(".CranberrySplashWreath").hide();
	
	console.log("test");
	//hide everything
	for(x=0;x<keycheck.length;x++){
		$(".priceselect #wreath" + keycheck[x] + "").css("display","none");
	}
	var currentProd;
	for(x=0;x<keycheck.length;x++){
		
		//go through and check for entries
		dbShell.get(keycheck[x]).then(function (doc) {
			console.log(doc);
			// based on this let show items that are there. 
			$(".priceselect #wreath" + doc._id + "").val(doc.value);
		}).catch(function (err) {
			//hide the field
			$(".ClassicWreath .priceselect #wreath" + doc._id).hide();
			console.log(err);
		});

			//$(".ClassicWreath .priceselect #wreath" + keycheck[x]).val(price);
			//$(".ClassicWreath .priceselect #wreath" + keycheck[x]).val(price);
			////$(".ClassicWreath .priceselect #wreath" + keycheck[x]).next().html(price);
			//$(".ClassicWreath .priceselect label[for='#wreath"+keycheck[x]+"']").html("asd");
	}
	$(".ClassicWreath").show('slow');
}*/
//update the popup image
$('.emptyCart').click(function () {
	cart.clear().then(function(){
		console.log("cart db is empty");
	}).catch(function(err){
		console.log(err);
	});
	$("#cart-table tbody").html("");
	$("#cart-table").table("refresh"); //clear table
});
$('.addShop').click(function () {
	
});
/*function checkCart(e){
	//return e[0];
	var results;
	cart.getItem(String(e[0])).then(function(value) {
		if(value){
			results = true; 
		}else{
			results = false;
		}
		//return results;
		//console.log("found");
		console.log("l: " + value + "-" +  results);
	}).catch(function(err) {
    	// This code runs if there were any errors
		console.log(err);
		return false;
		console.log("not found");
	});	
};*/




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
			//console.log("yep: " + value[1]);
			//it is in there so lets add a variable to show how many are in there. and update the price. 
			if(e != "" && value[1] != ""){ //name - cost - quantity
				cart.setItem(e[0],[e[1],Number(value[1]+1)]); //one up the quantity
			}
		}else{ 
			//console.log("nope"); //this is new lets add it. 
			if(e != ""){//check for blanks
				cart.setItem(e[0],[e[1],1]);
			}
		}
	}).catch(function(err) {
    	// This code runs if there were any errors
		console.log(err);
	});
    $(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
};
MickmanAppLogin.CartController.prototype.getCartData = function(){
	//reset the table
	$("#cart-table tbody").html(""); //clear table
	//close the popup window
	cart.iterate(function(value, key, iterationNumber) {
		//console.log("update table" + value);
		$("#cart-table tbody").append("<tr><td>"+key+"</td><td>"+value[1]+" <div data-role='controlgroup' data-type='horizontal' data-mini='true' class='ui-group-theme-b' data-product-name='"+key+"' data-product-cost='"+value[0]+"'><a href='#' class='ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext addProduct'>+</a><a href='#' class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext removeProduct'>-</a></div></td><td>$"+value[0]+"</td><td class='total'>$<span>"+Number(value[0]*value[1])+"</span></td></tr>");
	}).then(function() {
		//$("#cart-table").enhanceWithin().controlgroup("refresh");
		$("#cart-table").enhanceWithin();
		$("#cart-table").table("refresh");
		//add up the totals
		var total = 0;
		$( "#cart-table tbody .total span" ).each( function( index, element ){
		    console.log( $( this ).text() );
		    total += Number($( this ).text());
		});
		console.log(total);
		$(".subtotal").html("$" + String(total));
	}).catch(function(err) {
    	// This code runs if there were any errors
		console.log(err);
	});
};

//add one product to the cart
MickmanAppLogin.CartController.prototype.addProduct = function (e) {
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			console.log("yep: " + value[1]);
			//it is in there so lets add a variable to show how many are in there. and update the price. 
			if(e != "" && value[1] != ""){ //name - cost - quantity
				cart.setItem(e[0],[e[1],Number(value[1]+1)]); //one up the quantity
				console.log(value[1]+1);
			}
		}
		//add up the totals
		var total = 0;
		$( "#cart-table tbody .total span" ).each( function( index, element ){
		    console.log( $( this ).text() );
		    total += Number($( this ).text());
		});
		$(".subtotal").html("$" + String(total));
		
		//$(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
		//refreshPage();
		app.cartController.getCartData();
		//$("#cart-table").table("refresh"); //clear table
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};
//remove one product from the cart. 
MickmanAppLogin.CartController.prototype.removeProduct = function (e) {
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			console.log("yep: " + value[1]);
			//it is in there so lets add a variable to show how many are in there. and update the price. 
			if(e != "" && value[1] != 1){ //name - cost - quantity
				cart.setItem(e[0],[e[1],Number(value[1]-1)]); //one up the quantity
				console.log(value[1]-1)
			}else if(e != "" && value[1] == 1){
				console.log("remove from ");
				cart.removeItem(e[0]); //one up the quantity
			}
		}
		
		//add up the totals
		var total = 0;
		$( "#cart-table tbody .total span" ).each( function( index, element ){
		    console.log( $( this ).text() );
		    total += Number($( this ).text());
		});
		$(".subtotal").html("$" + String(total));
		
		//$(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
		//refreshPage();
		app.cartController.getCartData();
		//$("#cart-table").table("refresh"); //clear table
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};
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

$(document).on('click', '.addProduct', function(){     
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	prod = [prodname,prodprice];
	console.log(prodname + ":" + prodprice);
	//document.addProduct(prod);
	app.cartController.addProduct(prod);
});
$(document).on('click', '.removeProduct', function(){     
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	prod = [prodname,prodprice];
	console.log(prodname + ":" + prodprice);
	//removeProduct(prod);
	app.cartController.removeProduct(prod);
}); 
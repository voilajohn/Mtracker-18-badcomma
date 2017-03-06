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
MickmanAppLogin.CartController.prototype.addpricetoPopup = function (e,s,p,t) {
	//save cart to db 
	$('#purchase img').attr('src',t);
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
				cart.setItem(e[0],[e[1],Number(value[1]+1),e[2]]); //one up the quantity
			}
		}else{ 
			//console.log("nope"); //this is new lets add it. 
			if(e != ""){//check for blanks
				cart.setItem(e[0],[e[1],1,e[2]]);
			}
		}
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
    $(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
};
MickmanAppLogin.CartController.prototype.getCartData = function(){
	//reset the table
	$(".cartlist").html("");
	//close the popup window
	cart.iterate(function(value, key, iterationNumber) {
		$(".cartlist").append("<li class='' data-role='list-divider'>"+key+"<span class='ui-li-count'>"+value[1]+"</span></li><li><div class='ui-grid-b'><div class='ui-block-a' style='width:60%'><img src='"+value[2]+"' alt='"+key+"' class='cartthumb'/><p style='margin:0px;'>$"+value[0]+" each</span> <div class='total'>$<span>"+Number(value[0]*value[1])+"</span></div></p></div><div class='ui-block-b' style='width:15%;'></div><div class='ui-block-c' style='width:15%;float:right;vertical-align:top;'><div data-role='controlgroup' data-type='vertical' data-mini='true' class='ui-group-theme-a' data-product-name='"+key+"' data-product-cost='"+value[0]+"' data-product-thumb='"+value[2]+"'><a href='#' class='ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext addProduct'>+</a><a href='#' class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext removeProduct'>-</a></div></div></li>");
		//
	}).then(function() {
		$(".cartlist").enhanceWithin();
		$(".cartlist").listview("refresh");
		//add up the totals
		var total = 0;
		$( ".cartlist li .total span" ).each( function( index, element ){
		    total += Number($( this ).text());
		});
		$(".subtotal").html("$" + String(total));
	}).catch(function(err) {// This code runs if there were any errors
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
				cart.setItem(e[0],[e[1],Number(value[1]+1),e[2]]); //one up the quantity
			}
		}
		//add up the totals
		var total = 0;
		$( ".cartlist li .total span" ).each( function( index, element ){
		//$( "#cart-table tbody .total span" ).each( function( index, element ){
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
				cart.setItem(e[0],[e[1],Number(value[1]-1),e[2]]); //one up the quantity
				console.log(value[1]-1)
			}else if(e != "" && value[1] == 1){
				console.log("remove from ");
				cart.removeItem(e[0]); //one up the quantity
			}
		}
		
		//add up the totals
		var total = 0;
		$( ".cartlist .total span" ).each( function( index, element ){
		//$( "#cart-table tbody .total span" ).each( function( index, element ){
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
	$(".cartlist").listview("refresh");
});

$(document).on('click', '.addProduct', function(){     
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	prod = [prodname,prodprice,prodthumb];
	console.log(prodname + ":" + prodprice + ":" + prodthumb);
	//document.addProduct(prod);
	app.cartController.addProduct(prod);
});
$(document).on('click', '.removeProduct', function(){     
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	prod = [prodname,prodprice,prodthumb];
	console.log(prodname + ":" + prodprice + ":" + prodthumb);
	//removeProduct(prod);
	app.cartController.removeProduct(prod);
}); 
/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

MickmanAppLogin.CartController = function () {//reset the variables
    this.$storePage = null;
    this.$btnAdd = null;
    this.$btnCheck = null;
    this.$btnCheckShop = null;
    this.$btnSave = null;
};

MickmanAppLogin.CartController.prototype.init = function () {//gather the variables that we will need 
    this.storePage = "#page-main-menu";
    this.checkoutPage = "#page-checkout";
    this.$btnAdd = $(".addtocart", this.$storePage);
    this.$btnCheck = $(".addCheckout", this.$storePage);
    this.$btnCheckShop = $(".addShop", this.$storePage);
    this.$btnSave = $(".saveCart", this.$checkoutPage);
    this.$ctnErr = $("#ctn-err", this.$storePage);
};
//10	Classic Wreath-25in. $30	[30,1,"images/products/thumbs/classic_sm.jpg"]
//##### add to cart #####
MickmanAppLogin.CartController.prototype.addProduct = function (e) {//add one product to the cart
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			if(e != "" && value[1] != ""){//one up the quantity 
				cart.setItem(e[0],[e[1],Number(value[1]+1),e[2]]); //name / cost / quantity / thumbnail
			}
		}
		var total = 0;
		$( ".cartlist li .total span" ).each( function( index, element ){
		    total += Number($( this ).text());
		});
		$(".subtotal").html("$" + String(total)); //add up the totals
		app.cartController.getCartData();
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};

//#### remove one product from the cart. ####
MickmanAppLogin.CartController.prototype.removeProduct = function (e) {
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			if(e != "" && value[1] != 1){
				cart.setItem(e[0],[e[1],Number(value[1]-1),e[2]]);
			}else if(e != "" && value[1] == 1){
				cart.removeItem(e[0]); //one up the quantity
			}
		}
		var total = 0;
		$( ".cartlist .total span" ).each( function( index, element ){
		    total += Number($( this ).text());
		});
		$(".subtotal").html("$" + String(total));
		app.cartController.getCartData();
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};

MickmanAppLogin.CartController.prototype.addpricetoPopup = function (e,s,p,t) {//save cart to db 
	$('#purchase img.cartthumb').attr('src',t);
	$('#purchase span.sentPrice').html(e);
	$('#purchase span.sentSize').html(s);
	$('#purchase span.sentProduct').html(p);
	$('#purchase').enhanceWithin();
};

MickmanAppLogin.CartController.prototype.addtoCartCommand = function (e,r) {
	//console.log(r);
	if(r != "cancel"){
		var cartList = []; //stuff that exists in the cart already
		var cartValues = [];
		var itemsLength = e.length; //number of things we are adding to the cart. 
		var itemList = []; //stuff we are adding to the cart.
		var listNum;
		var savedData;
		
		for(x=0;x<itemsLength;x++){
			itemList.push(e[x][0]);
		}
		itemList.push(["Classic Wreath-25in. $30"]);
		
		cart.iterate(function(value,key,iterationNumber){
			if(key != "personal" && key != "defaults"){ //list everything in the cart as an array
				cartList.push(key);
				cartValues.push(value);
			}
		}).then(function(){
			if(cartList.length == 0){
				console.log("add new ones to the db");
				for(x=0;x<itemList.length;x++){
					cart.setItem(e[x][0],[e[x][1],1,e[x][2]]);
				}
			}else{
				//lets add in items that are not on this list and if they are we are going to add one
				for(x=0;x<itemList.length;x++){
					if(jQuery.inArray(String(itemList[x]),cartList) !== -1){
						listNum = jQuery.inArray(String(itemList[x]),cartList);
						savedData = cartValues[Number(listNum)];
						cart.setItem(cartList[Number(listNum)],[cartValues[Number(listNum)][0],Number(cartValues[Number(listNum)][1]+1),cartValues[Number(listNum)][2]]);
					}else{
						cart.setItem(e[x][0],[e[x][1],1,e[x][2]]);
					}
				}
			}
		});
		//uncheck options if they are checked
		$("#ledlights").attr("checked",false).checkboxradio("refresh");
		$("#ezwreathhanger").attr("checked",false).checkboxradio("refresh");
		
		if(r == "checkout"){
	    	$(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
	    }else{
		    $("#purchase").popup("close");
	    }
    }else{
	    $("#purchase").popup("close");
    }
};

MickmanAppLogin.CartController.prototype.getCartData = function(){ //build the cart by grabbing saved db items
	console.log("getcart run");
	$(".cartlist").html("");
	var cartCount = 0;
	cart.iterate(function(value, key, iterationNumber) {
		//leave off the personal data
		if(key == "personal"){
		}else if(key == "defaults"){
		}else{
			$(".cartlist").hide();
			$(".cartlist").append("<li class='divider-title' data-role='list-divider'><h4>"+key+"</h4><span class='ui-li-count'>"+value[1]+"</span></li><li><div class='ui-grid-b'><div class='ui-block-a' style='width:60%'><img src='"+value[2]+"' alt='"+key+"' class='cartthumb'/><p style='margin:0px;'>$"+value[0]+" each</span> <div class='total'>$<span>"+Number(value[0]*value[1])+"</span></div></p></div><div class='ui-block-b' style='width:15%;'></div><div class='ui-block-c' style='width:15%;float:right;vertical-align:top;'><div data-role='controlgroup' data-type='vertical' data-mini='true' class='ui-group-theme-a' data-product-name='"+key+"' data-product-cost='"+value[0]+"' data-product-thumb='"+value[2]+"'><a href='#' class='ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext addProduct'>+</a><a href='#' class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext removeProduct'>-</a></div></div></li>");
			$(".cartlist").fadeIn();
			console.log("some");
			cartCount++;
		}
	}).then(function() {
		if(cartCount == 0){
			console.log("there is nothing in the cart");
			$(".checkoutNow").addClass("ui-state-disabled");
			$(".emptyCart").addClass("ui-state-disabled");
		}else{
			console.log(cartCount);
			$(".checkoutNow").removeClass("ui-state-disabled");
			$(".emptyCart").removeClass("ui-state-disabled");
		}
		$(".cartlist").enhanceWithin();
		$(".cartlist").listview("refresh");
		var total = 0;
		$( ".cartlist li .total span" ).each( function( index, element ){
		    total += Number($( this ).text());//add up the totals
		});
		$(".subtotal").html("$" + String(total));
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};

//save cart data function?
MickmanAppLogin.CartController.prototype.saveCartData = function(){ 
	var fieldArr = ['personal-fname','personal-lname','personal-address','personal-city','personal-state','personal-zip','personal-phone','personal-email'];
    $('#page-checkout #ctn-err').html();
    $('#page-checkout #ctn-err').removeClass("bi-ctn-err");
    
    var invalidInput = false;
    var invisibleStyle = "bi-invisible";
    var invalidInputStyle = "bi-invalid-input";
    
    for(x=0;x<fieldArr.length;x++){
		$('#'+fieldArr[x]).removeClass(invalidInputStyle);
		//console.log($('#'+fieldArr[x]).val().length);
    }
    for(y=0;y<fieldArr.length;y++){
		if($('#'+fieldArr[y]).val().length === 0){
			$('#'+fieldArr[y]).addClass(invalidInputStyle);
			invalidInput = true;
		}
    }
    
	if(invalidInput === true){
		$('#page-checkout #ctn-err').html("<p>Please enter all the required fields.</p>");
        $('#page-checkout #ctn-err').addClass("bi-ctn-err").slideDown();
	}else{
		var userN;
		if(currentuser != null){
			userN = currentuser;
		}else{
			userN = "not available";
		}
		var fname = $("#personal-fname").val();
		var lname = $("#personal-lname").val();
		var address = $("#personal-address").val();
		var city = $("#personal-city").val();
		var state = $("#personal-state").val();
		var zip  = $("#personal-zip").val();
		var phone = $("#personal-phone").val();
		var email = $("#personal-email").val();
		
		cart.setItem("personal",[userN, fname, lname, address, city, state, zip, phone, email]).then( function(){
			$('#personal-data').val([userN, fname, lname, address, city, state, zip, phone, email]);
			$(':mobile-pagecontainer').pagecontainer('change', '#page-payment');//go to next page
		});	
	}
};

//check for many items in the cart already
function getAll(arr){
	return Promise.all( arr.map(function(key){
		return cart.getItem(key);
	}) );
}

//contact info submitted - store it in A 
/* #### BUTTONS ### */
$('.emptyCart').click(function () { //clear the cart db
	cart.clear().then(function(){
		console.log("cart db is empty");
	}).catch(function(err){
		console.log(err);
	});
	$(".cartlist").listview("refresh");
});

$('.emptyOrders').click(function () { //temporary
	order.clear().then(function(){
		console.log("order db is empty");
	}).catch(function(err){
		console.log(err);
	});
});

$('.emptyProducts').click(function () { //temporary
	product.clear().then(function(){
		console.log("product db is empty");
	}).catch(function(err){
		console.log(err);
	});
});

/*$(document).on('click', '.saveCart', function(e){     
	//grab the fields and save them to the database.
	var fieldArr = ['personal-fname','personal-lname','personal-address','personal-city','personal-state','personal-zip','personal-phone','personal-email'];
    $('#page-checkout #ctn-err').html();
    $('#page-checkout #ctn-err').removeClass("bi-ctn-err");
    
    var invalidInput = false;
    var invisibleStyle = "bi-invisible";
    var invalidInputStyle = "bi-invalid-input";
    
    for(x=0;x<fieldArr.length;x++){
		$('#'+fieldArr[x]).removeClass(invalidInputStyle);
		//console.log($('#'+fieldArr[x]).val().length);
    }
    for(y=0;y<fieldArr.length;y++){
		if($('#'+fieldArr[y]).val().length === 0){
			$('#'+fieldArr[y]).addClass(invalidInputStyle);
			invalidInput = true;
		}
		//$('#'+fieldArr[x]).val()
    }
    
	if(invalidInput === true){
		$('#page-checkout #ctn-err').html("<p>Please enter all the required fields.</p>");
        $('#page-checkout #ctn-err').addClass("bi-ctn-err").slideDown();
	}else{
		var userN;
		product.getItem('user').then( function(value){ //this is failing randomly??
			console.log("user:"+value);
			userN = value;
		});
			if(userN != null){
			}else{
				userN = "not available";
			}
			var fname = $("#personal-fname").val();
			var lname = $("#personal-lname").val();
			var address = $("#personal-address").val();
			var city = $("#personal-city").val();
			var state = $("#personal-state").val();
			var zip  = $("#personal-zip").val();
			var phone = $("#personal-phone").val();
			var email = $("#personal-email").val();
			
			cart.setItem("personal",[userN, fname, lname, address, city, state, zip, phone, email]).then( function(){
				$('#personal-data').val([userN, fname, lname, address, city, state, zip, phone, email]);
				$(':mobile-pagecontainer').pagecontainer('change', '#page-payment');//go to next page
			});
		///}).catch(function(err){
			///console.log(err);
		///});		
	}
	e.preventDefault();
});*/

$(document).on('click', '.addProduct', function(){ //Cart + button  
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	prod = [prodname,prodprice,prodthumb];
	app.cartController.addProduct(prod);
});

$(document).on('click', '.removeProduct', function(){ //Cart - button    
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	prod = [prodname,prodprice,prodthumb];
	app.cartController.removeProduct(prod);
}); 
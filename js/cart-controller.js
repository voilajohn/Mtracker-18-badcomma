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

//##### add to cart #####
MickmanAppLogin.CartController.prototype.addProduct = function (e) {//add one product to the cart
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			if(e != "" && value[1] != ""){//one up the quantity 
				cart.setItem(e[0],[e[1],Number(value[1]+1),e[2],e[3]]).then(function(){ 
					//make sure to wait until it is set before refreshing it. 
					var total = 0;
					$( ".cartlist li .total span" ).each( function( index, element ){
					    total += Number($( this ).text());
					});
					$(".subtotal").html("$" + String(total)); //add up the totals
					app.cartController.getCartData();
				}); //name / cost / quantity / thumbnail / dbcode
			}
		}
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};

//#### remove one product from the cart. ####
MickmanAppLogin.CartController.prototype.removeProduct = function (e) {
	cart.getItem(e[0]).then(function(value) {
		if(value){ //the record is there.
			if(e != "" && value[1] != 1){
				cart.setItem(e[0],[e[1],Number(value[1]-1),e[2]]).then(function(){
					var total = 0;
					$( ".cartlist .total span" ).each( function( index, element ){
					    total += Number($( this ).text());
					});
					$(".subtotal").html("$" + String(total));
					app.cartController.getCartData(); //what if we update this after the number is called?
				});
			}else if(e != "" && value[1] == 1){
				cart.removeItem(e[0]).then(function(){
					var total = 0;
					$( ".cartlist .total span" ).each( function( index, element ){
					    total += Number($( this ).text());
					});
					$(".subtotal").html("$" + String(total));
					app.cartController.getCartData(); //what if we update this after the number is called?
				}); //one up the quantity
			}
		}
		
	}).catch(function(err) {// This code runs if there were any errors
		console.log(err);
	});
};

MickmanAppLogin.CartController.prototype.addpricetoPopup = function (e,s,p,t,r,q) {
	//save cart to db 
	//added q 
	console.log(e + ":" + e.length);//5
	if(Array.isArray(e)){ //check if it is multiples
		//fill in the first one 
		console.log("isArray");
		//hide original
		$('.purchaseAdd').addClass('hidden');
		var appendHtml = "";
		for(x=0;x<e.length;x++){//e is the prices array
			appendHtml += '<div class="purchaseAdd ui-corner-all clone new'+x+'" id="'+r[x]+'">';
			appendHtml += '<img src="'+t+'" alt="" class="cartthumb"/>';
			appendHtml += '<p><strong>Product:</strong> <span class="sentProduct">'+p+'</span></p>';
			//if(s[x] != 0){
				appendHtml += '<p><strong>Option:</strong> <span class="sentSize">'+s[x]+'</span></p>';
			//}else{
				//appendHtml += '<p><strong>Option:</strong> <span class="sentSize"></span></p>';
			//}
			appendHtml += '<p><strong>Price:</strong> $<span class="sentPrice">'+e[x]+'</span></p>';
			appendHtml += '<p><strong>Quantity:</strong> <span class="sentQuantity">'+q[x]+'</span></p>';
			appendHtml += '<div style="clear:both"></div>';
			appendHtml += '</div>';
		}
		$(".cart-items").append(appendHtml);
		$('#purchase').enhanceWithin();
	}else{
		//adding quantity for 
		$('#purchase img.cartthumb').attr('src',t);
		$('#purchase span.sentPrice').html(e);
		$('#purchase span.sentQuantity').html(q);
		if(s != ""){
			$('#purchase span.sentSize').html(s);
		}else{
			$('#purchase span.sentSize').html("");
		}
		$('#purchase span.sentProduct').html(p);
		$('#purchase').data('fieldrealName',r);
		$('#purchase').enhanceWithin();
	}
	
};

MickmanAppLogin.CartController.prototype.addtoCartCommand = function (e,r) {
	console.log(e + " --- " + r);
	
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
		
		cart.iterate(function(value,key,iterationNumber){
			if(key != "personal" && key != "defaults"){ //list everything in the cart as an array
				cartList.push(key);
				cartValues.push(value);
			}
		}).then(function(){
			if(cartList.length == 0){
				console.log("add new ones to the db");
				for(x=0;x<itemList.length;x++){
					cart.setItem(e[x][0],[e[x][1],e[x][4],e[x][2],e[x][3]]);
					//added e[x]4 in place of default 1 for the multiples option
				}
			}else{
				//lets add in items that are not on this list and if they are we are going to add one
				for(x=0;x<itemList.length;x++){
					if(jQuery.inArray(String(itemList[x]),cartList) !== -1){
						listNum = jQuery.inArray(String(itemList[x]),cartList);
						savedData = cartValues[Number(listNum)];
						cart.setItem(cartList[Number(listNum)],[cartValues[Number(listNum)][0],Number(cartValues[Number(listNum)][1]+e[x][4]),cartValues[Number(listNum)][2]]);
					}else{
						cart.setItem(e[x][0],[e[x][1],e[x][4],e[x][2],e[x][3]]);
					}
				}
			}
		});
		//uncheck options if they are checked
		$("#ledlights").attr("checked",false).checkboxradio("refresh");
		$("#ezwreathhanger").attr("checked",false).checkboxradio("refresh");
		
		//clear quantities items
		//$(".inner .q").val(0);
		
		//clear checked items
		$('.inner').find('.checkbox-check').each(function () {
			if(this.checked){ 
				$(this).click().checkboxradio("refresh");
			}
		});
		
		//clear cart variables
		$('#purchase img.cartthumb').attr('src',"");
		$('#purchase span.sentPrice').html("");
		$('#purchase span.sentQuantity').html("");
		$('#purchase span.sentSize').html("");
		$('#purchase span.sentProduct').html("");
		
		
		//$('#purchase').removeData('fieldrealName');
		$('#purchase .clone').remove();//remove clones
		$('.purchaseAdd').removeClass('hidden');//restore single checkout
		
		if(r == "checkout"){
	    	$(':mobile-pagecontainer').pagecontainer('change', '#page-cart');
	    }else{
		    $('.product-message').removeClass("bi-ctn-err");
		    $('.product-message').html("<p>Items successfully added to your cart.</p>").fadeIn('slow');
			$('.product-message').addClass("bi-ctn-suc").delay(4000).fadeOut('slow');
			$('body').scrollTop(0);
		    $("#purchase").popup("close");
	    }
    }else{
	    $('.product-message').removeClass("bi-ctn-suc");
	    $('.product-message').html("<p>Add to cart cancelled.</p>").fadeIn('slow');
		$('.product-message').addClass("bi-ctn-err").delay(4000).fadeOut('slow');
		$('body').scrollTop(0);
	    $("#purchase").popup("close");
	    console.log("clear");
	    //uncheck options if they are checked
		$("#ledlights").attr("checked",false).checkboxradio("refresh");
		$("#ezwreathhanger").attr("checked",false).checkboxradio("refresh");
		
		//clear cart variables
		$('#purchase img.cartthumb').attr('src',"");
		$('#purchase span.sentPrice').html("");
		$('#purchase span.sentQuantity').html("");
		$('#purchase span.sentSize').html("");
		$('#purchase span.sentProduct').html("");
		$('#purchase .clone').remove();//remove clones
		$('.purchaseAdd').removeClass('hidden');//restore single checkout
    }
};

MickmanAppLogin.CartController.prototype.getCartData = function(){ //build the cart by grabbing saved db items
	$(".cartlist").html("");
	var cartCount = 0;
	var cartContent = "";
	var addNum = 0;
	cart.iterate(function(value, key, iterationNumber) {
		//leave off the personal data
		if(key == "personal"){
		}else if(key == "defaults"){
		}else{
			$(".cartlist").hide();
			cartContent += "<li class='divider-title' data-role='list-divider'><h4>"+key+"</h4></li><li><img src='"+value[2]+"' alt='"+key+"' class='cartthumb'/><p style='margin:0px;'>$"+Number(value[0])+" each <div class='total green'>$<span>"+format1(Number(value[0]*value[1]),"")+"</span><br><strong class='smaller'>Quantity ordered:</strong></div><div data-role='controlgroup' data-type='horizontal' class='ui-group-theme-a' data-product-name='"+key+"' data-product-cost='"+value[0]+"' data-product-thumb='"+value[2]+"' data-product-id='"+value[3]+"'><input id='quantity' type='text' data-wrapper-class='controlgroup-textinput ui-btn quantity-input' value='"+value[1]+"'><a href='#' class='ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext addProduct'>+</a><a href='#' class='ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext removeProduct'>-</a></div></p></li>";//switched this from append to load it all at once 
			$(".cartlist").html(cartContent);
			cartCount++;
		}
	}).then(function() {
		if(cartCount == 0){
			console.log("there is nothing in the cart");
			$(".emptyCart").addClass("ui-state-disabled");
		}else{
			$(".emptyCart").removeClass("ui-state-disabled");
		}
		$(".cartlist").enhanceWithin(); //this will refresh the cart list. 
		$(".cartlist").listview("refresh"); //1.25 test - this breaks it
		$(".cartlist").fadeIn();
		var total = 0;
		$( ".cartlist li .total span" ).each( function( index, element ){
			addnumb = $( this ).text().split(',').join('');//remove comma
		    total += Number(addnumb);//add up the totals
		});
		$(".subtotal").html(format1(total, "$"));
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
    var emailReg = /^([a-zA-Z0-9\\.]+)@([a-zA-Z0-9\\-\\_\\.]+)\.([a-zA-Z0-9]+)$/i;
    var phoneReg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;


    //lets validate the fields
    for(x=0;x<fieldArr.length;x++){
		$('#'+fieldArr[x]).removeClass(invalidInputStyle);
		//console.log($('#'+fieldArr[x]).val().length);
    }
    for(y=0;y<fieldArr.length;y++){
		if($('#'+fieldArr[y]).val().length === 0){
			$('#'+fieldArr[y]).addClass(invalidInputStyle);
			invalidInput = true;
		}
		if('#'+fieldArr[y] == "#personal-email"){
			if(!emailReg.test($("#personal-email").val())){
	    		invalidInput = true;
				$("#personal-email").addClass(invalidInputStyle);
			}
    	}
    	if('#'+fieldArr[y] == "#personal-phone"){
			if(!phoneReg.test($("#personal-phone").val())){
	    		invalidInput = true;
				$("#personal-phone").addClass(invalidInputStyle);
			}
    	}
    	if('#'+fieldArr[y] == "#personal-zip"){
			if(!isValidZip.test($("#personal-zip").val())){
	    		invalidInput = true;
				$("#personal-zip").addClass(invalidInputStyle);
			}
    	}
    	
    }
   
	if(invalidInput === true){
		$('#page-checkout #ctn-err').html("<p>Please check that all the required fields are filled in properly.</p>");
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
		var phonetype = $("#personal-phone-type").val();
		var email = $("#personal-email").val();
		
		cart.setItem("personal",[userN, fname, lname, address, city, state, zip, phone, email]).then( function(){
			$('#personal-data').val([userN, fname, lname, address, city, state, zip, phone, phonetype, email]);
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
		app.cartController.getCartData();
	}).catch(function(err){
		console.log(err);
	});
	//$(".cartlist").listview("refresh"); //1.25
});

$('.emptyOrders').click(function () { //temporary
	/*order.clear().then(function(){
		console.log("order db is empty");
	}).catch(function(err){
		console.log(err);
	});*/
	
	//temporary
	orderBoone.clear().then(function(){
		console.log("order db is empty");
	});
	orderCherie.clear().then(function(){
		console.log("order db is empty");
	});
	orderjohn.clear().then(function(){
		console.log("order db is empty");
	});
	ordermandy.clear().then(function(){
		console.log("order db is empty");
	});
	orderKatie.clear().then(function(){
		console.log("order db is empty");
	});
	orderKermit.clear().then(function(){
		console.log("order db is empty");
	});
});

$('.emptyProducts').click(function () { //temporary
	product.clear().then(function(){
		console.log("product db is empty");
		//clear out the cart contents
		
	}).catch(function(err){
		console.log(err);
	});
});

$(document).on('click', '.addProduct', function(){ //Cart + button  
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	var prodid = $(this).parent().parent().data('product-id');
	prod = [prodname,prodprice,prodthumb,prodid];
	app.cartController.addProduct(prod);
});

$(document).on('click', '.removeProduct', function(){ //Cart - button    
	var prod;
	var prodname = $(this).parent().parent().data('product-name');
	var prodprice = $(this).parent().parent().data('product-cost');
	var prodthumb = $(this).parent().parent().data('product-thumb');
	var prodid = $(this).parent().parent().data('product-id');
	prod = [prodname,prodprice,prodthumb,prodid];
	app.cartController.removeProduct(prod);
}); 
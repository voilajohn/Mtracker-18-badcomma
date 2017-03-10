/* Order Controller */

var MickmanAppLogin = MickmanAppLogin || {};

MickmanAppLogin.OrderController = function () {
    this.$storePage = null;
    this.$btnAdd = null; 
};

//gather the variables that we will need 
MickmanAppLogin.OrderController.prototype.init = function () {
    this.$storePage = "#page-checkout";
};

//add orders


//delete orders - for testing only remove for final or with a ton of warnings that the orders will be gone forever. 

//show orders 
MickmanAppLogin.OrderController.prototype.buildOrders = function(){
	$(".orderList").html("");
	order.iterate(function(value, key, iterationNumber) {
		console.log(key + ":" + value);
		//add orders to the listview
		var name = value[0][1] + " " + value[0][2];
		var phone = value[0][7];
		var email = value[0][8];
		var getdate = key;
		var date = getdate.split("-");
		var button = key;
		var row = '<li data-role="list-divider">'+Date(date[1])+'<span class="ui-li-count">0</span></li><li><div class="ui-grid-c"><div class="ui-block-a"><div class="ui-bar">'+name+'</div></div><div class="ui-block-b"><div class="ui-bar">'+phone+'</div></div><div class="ui-block-c"><div class="ui-bar">'+email+'</div></div><div class="ui-block-d"><div class="ui-bar"><a href="#popupOrder" class="ui-btn ui-icon-search ui-btn-icon-notext ui-nodisc-icon ui-theme-b ui-alt-icon" data-rel="popup" data-position-to="window">+</a></div></div></div></li>';
		$(".orderList").append(row);
		//console.log(name + " : " + phone + " : " + email + " : " + button);
	}).then(function(){
		//refresh the listcontroller
		$(".orderList").enhanceWithin().listview("refresh");
	}).catch(function(err){
		console.log(err);
	})
};
//order details

$(".create-order").click(function () {
	//create an entry in the orders database
	var pdataA = $("#personal-data").val().split(",");
	var orderDate = new Date();
	var orderStamp = pdataA[0]+"-"+orderDate.getTime();
	var cartArr = ["personal"];
	var cartContents = [];
	var cartLength;
	var cartLength = cart.length().then(function(value){
		console.log("cart:" + value);
		cartLength = value;
	});
	//Key:User-Date, Value:[personal-info,order-info,payment]
	//Create the order record - then when we go through the cart add the orders to the record. 
		console.log(product);
		order.setItem(orderStamp,[pdataA,"order-info",$("#payment-type :radio:checked").val()]).then( function(){
			cart.iterate(function(value, key, iterationNumber) {//iterate over the cart 
				console.log("iter: "+iterationNumber);
			   if (key != "personal" && key != "defaults") {
			        //console.log(value);
			        cartArr.push(key); //push all the keys into an array
			        cartContents.push([key,value]);
			        order.getItem(orderStamp).then( function(value){
				        order.setItem(orderStamp,[value[0],cartContents,value[2]]).then( function(){
					        if (iterationNumber == (cartLength-1)) { //only do this before the interation is complete
					        	console.log("sweet just once");
					        	for(i=0;i<cartArr.length;i++){
									cart.removeItem(cartArr[i]);//remove everything from the cart
								}
								$(':mobile-pagecontainer').pagecontainer('change', '#page-orders');//go to next page
					        }
				        }).catch(function(err){
					        console.log("ORDER ARRAY NOT ADDED TO ORDER: " + err);
					    });
			        }).catch(function(err){
				        console.log("ORDER ITEM NOT FOUND TO ADD ARRAY TO: "+err)
			        });
			    }
			}).then(function(result) {
			    //console.log('Iteration has completed, last iterated pair:');
			    //console.log(result);
			}).catch(function(err) {
			    // This code runs if there were any errors
			    console.log("CART ITERATION FAILED: "+err);
			});
		}).catch(function(err){
			console.log("ORDER ITEM NOT ABLE TO BE CREATED: "+err);
		});

});
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
MickmanAppLogin.OrderController.prototype.addorderDatatoPopup = function (x) { //add order data to the popup then open it.
	console.log("button called" + x);
	order.getItem(x).then( function(value){
		$('#popupOrder div').html("");
		var orderNum = x.split("-");
		$('#popupOrder div').append("<h3>Order Details</h3>");
		var contact = "<p><strong>"+orderNum[1]+"</strong>";
		contact += "<span style='display:block'>"+value[0][1] + " " + value[0][2]+"</span>";
		contact += "<span style='display:block'>"+value[0][3]+"</span>";
		contact += "<span style='display:block'>"+value[0][4] + " " + value[0][5] + "," +  value[0][6] +"</span><br>";
		contact += "<span style='display:block'><strong>Phone: </strong>"+value[0][6]+"</span>";
		contact += "<span style='display:block'><strong>Email: </strong>"+value[0][7]+"</span>";
		contact += "</p>";
		contact += "<p><span style='display:block'></strong>Payment Status: </strong>"+value[2]+"</span></p>";
		var orders = "<div>";
		orders += "<br><p><strong>Order Details</strong></p>";
		for(y=0;y<value[1].length;y++){
			
			//console.log(value[1][y][1].length);
			//for(z=0;z<value[1][y][1].length;z++){
				orders += "<p style='display:block'>"+value[1][y][0]+ " x" +value[1][y][1][1] + " $" + value[1][y][1][0]+".00</p>";
			//}
		}
		
		orders += "</div>";
		$('#popupOrder div').append(contact);
		console.log(orders);
		$('#popupOrder div').append(orders);
		
		$('#popupOrder').enhanceWithin();
		
		$("#popupOrder").trigger( "updatelayout" );
		$("#popupOrder").popup("open");
		$("#popupOrder").popup("reposition", {positionTo: 'window'});
	}).catch( function(err){
		console.log("Not able to find it." + err);
	});
};

//show orders 
MickmanAppLogin.OrderController.prototype.buildOrders = function(){
	$(".orderList").html("");
	var evenOdd;
	order.iterate(function(value, key, iterationNumber) {
		//console.log(key + ":" + value);
		//add orders to the listview
		var name = value[0][1] + " " + value[0][2];
		var phone = value[0][7];
		var email = value[0][8];
		var getdate = key;
		var date = getdate.split("-");
		var day = new Date(+date[1]).getUTCDate();
		var month = new Date(+date[1]).getUTCMonth();
		var year = new Date(+date[1]).getUTCFullYear();
		var button = key;
		if(iterationNumber % 2 == 0){
			evenOdd = "even";
		}else{
			evenOdd = "odd";
		};
		var row = '<li class="'+evenOdd+'"><a href="#popupName" data-rel="popup" data-name="'+name+'" data-transition="pop" class="namePop"><div class="ui-grid-b"><div class="ui-block-a"><div class="ui-bar">'+Number(month+1) + "/" + day + "/" +  year+'</div></div><div class="ui-block-b"><div class="ui-bar">'+name+'</div></div><div class="ui-block-c"><div class="ui-bar">Total</div></div></div></a><a href="#popupOrder" class="fullOrder ui-nodisc-icon" data-rel="popup" data-position-to="window" data-orderid="'+key+'"></a></li>';
		$(".orderList").append(row);
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
		//console.log(product);
		order.setItem(orderStamp,[pdataA,"order-info",$("#payment-type :radio:checked").val()]).then( function(){
			cart.iterate(function(value, key, iterationNumber) {//iterate over the cart 
				//console.log("iter: "+iterationNumber);
			   if (key != "personal" && key != "defaults") {
			        //console.log(value);
			        cartArr.push(key); //push all the keys into an array
			        cartContents.push([key,value]);
			        order.getItem(orderStamp).then( function(value){
				        order.setItem(orderStamp,[value[0],cartContents,value[2]]).then( function(){
					        if (iterationNumber == (cartLength-1)) { //only do this before the interation is complete
					        	//console.log("sweet just once");
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

//buttons
$(document).on('click', '.fullOrder', function(){ //Cart + button  
	app.orderController.addorderDatatoPopup($(this).data('orderid'));
});
$(document).on('click', '.namePop', function(){//send Name to the popup
	$("#popupName p").html($(this).data('name'));
});
//print page
$(document).on('click', '.printOrders', function(){//first lets organize the content of the orders
	
	var orderContent;
	if(isprintAvailable == true){
		order.iterate(function(value, key, iterationNumber) {
			//lets put toget the content 
			var name = value[0][1] + " " + value[0][2];
			var address = value[0][3];
			var citystatezip = value[0][4] + " " +  value[0][5] + " ," + value[0][6];
			var phone = value[0][7];
			var email = value[0][8];
			var getdate = key;
			var date = getdate.split("-");
			var day = new Date(+date[1]).getUTCDate();
			var month = new Date(+date[1]).getUTCMonth();
			var year = new Date(+date[1]).getUTCFullYear();
			
			//build the client info
			orderContent += '<table>';
			orderContent += '<thead><tr><th>Name</th><th>Address</th><th>Phone</th><th>Email</th></tr></thead>';
			orderContent += '<tbody><tr><td>'+name+'</td>';
			orderContent += '<td>'+address+" "+citystatezip+'</td>';
			orderContent += '<td>'+phone+'</td>';
			orderContent += '<td>'+email+'</td>';
			orderContent += '</tr></tbody></table>';
			
			for(x=0;x<value[1].length;x++){
				orderContent += '<table><thead><tr><th>Product</th><th>Number</th><th>Cost</th></tr></thead><tbody>';
				orderContent += '<tr><td>'+value[1][x][0]+'</td><td>'+value[1][x][1][1]+'</td><td>'+value[1][x][1][0]+'</td></tr>';
				orderContent += '</tbody></table>';
			}
			orderContent += '<p><strong>Payment Status: </strong>'+value[2]+'</p>';
			
			
		}).then(function(){
			console.log(orderContent);
			$(".print-message").removeClass('bi-invisible');
			$(".print-message").html('Sending to printer');
			
			var page = '<style type="text/css">body{font:"\'Arial\',Helvetica,sans-serif;"}table{border:1px solid #000;width:100%;}td{border:1px solid #CCC;padding:10px;}</style><body>'+orderContent+'</body>'; //printed page
			
			window.plugin.printer.print(page, { name: 'Order Inventory', duplex: 'short' }, function(done){ //Print Function!!!!!
				if(done == done){
					$(".print-message").html('Orders printing').delay(800).fadeOut().delay(800).addClass('bi-invisible');
				}else{
					$(".print-message").html('Printing Cancelled').delay(800).fadeOut().delay(800).addClass('bi-invisible');
				}
			});
		});
	}else{
		$(".print-message").removeClass('bi-invisible');
		$(".print-message").addClass("bi-ctn-err");
		$(".print-message").html("Sorry Airprint is not currently available.");
	}
});
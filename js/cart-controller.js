/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

//reset the variables
MickmanAppLogin.CartController = function () {
    this.$storePage = null;
    this.$btnAdd = null;
};

//gather the variables that we will need 
MickmanAppLogin.CartController.prototype.init = function () {
    //this.$signInPage = $("#page-signin");
    this.storePage = "#page-main-menu";
    this.$btnAdd = $(".addtocart", this.$storePage);
};

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
MickmanAppLogin.CartController.prototype.addpricetoPopup = function (e) {
	//save cart to db 
	$('#purchase span').html(e);
	//console.log("add " + e.data("num") + " price to cart");
	//console.log(this.data("num"));
	
	//NEED TO FIND A WAY TO PUSH THE DATA TO POPUP
	//total cart contents 
};

MickmanAppLogin.CartController.prototype.addtoCartCommand = function (e) {
	//save cart to db 
	//console.log("add " + e.data("num") + " price to cart");
	//total cart contents 
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



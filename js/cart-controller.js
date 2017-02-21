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
/********* RADIO UPDATE PRICING */
//update the price display
$('.priceselect').change(function () {
  var radioSelected = $(this).find(':radio:checked');
  var optradioSelected = radioSelected.val();
  $(this).parent().parent().find('.price span').html(optradioSelected);
});
/********* POPUP ZOOM */
//update the popup image
$('.searchbtn').click(function () {
	console.log("clicked");
	var imageUrl = $(this).attr("data-largerimage"); //grab the URL
	$(".larger img").attr("href").val(imageUrl); //set the url of the popup image
	//console.log(imageUrl);
  //var radioSelected = $(this).find(':radio:checked');
  //var optradioSelected = radioSelected.val();
  //$(this).parent().parent().find('.price span').html(optradioSelected);
});

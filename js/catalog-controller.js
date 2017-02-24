/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

//reset the variables
MickmanAppLogin.CatalogController = function () {
    this.$storePage = null;
    this.$btnAdd = null;
    this.$Classic = null;
    this.$Victorian = null;
    this.$Cranberry = null;
    this.$ClassicS = null;
    this.$VictorianS = null;
    this.$CranberryS = null;
};

//gather the variables that we will need 
MickmanAppLogin.CatalogController.prototype.init = function () {
    this.$storePage = "#page-main-menu";
    this.$btnAdd = $(".addtocart", this.$storePage);
    this.$Classic = $("#ClassicWreath");
    this.$Victorian = $("#VictorianWreath");
    this.$Cranberry = $("#CranberrySplashWreath");
};

//add to cart
MickmanAppLogin.CatalogController.prototype.show = function (item) {
	//get cart contents 
	//add to array 
    //db save 
    //update display
};

//remove from cart
MickmanAppLogin.CatalogController.prototype.hide = function (item) {
	//get cart contents 
	//add to array 
    //db save 
    //update display
};

//
MickmanAppLogin.CatalogController.prototype.addpricetoPopup = function (e) {
	//save cart to db 
	$('#purchase span').html(e);
	//console.log("add " + e.data("num") + " price to cart");
	//console.log(this.data("num"));
	
	//NEED TO FIND A WAY TO PUSH THE DATA TO POPUP
	//total cart contents 
};

MickmanAppLogin.CatalogController.prototype.addtoCartCommand = function (e) {
	//save cart to db 
	//console.log("add " + e.data("num") + " price to cart");
	//total cart contents 
};

//create an instance ocf the db for the products
var product = localforage.createInstance({
	name: "product"
});

MickmanAppLogin.CatalogController.prototype.storeData = (function(x) { //Write the server items to the database
	var data = x;
	for(x=0;x<data.length;x++){
		if(data[x][1] != "" || data[x][1] != 0){//check for blanks
			product.setItem(data[x][0], data[x][1]);
		}else{
			console.log(data[x][0] + "is empty");
		}
	}
	this.getSavedData(); //now lets boot up the page
});

/*Build out page - grab the data from the database and show what the user set up on his website.*/
MickmanAppLogin.CatalogController.prototype.getSavedData = function(){
	console.log("popuplate the page"); //This runs when the page is loaded. 
	
	//hide everything
	$("#ClassicWreath").hide();
	$("#ClassicGreenzitWreath").hide();
	$("#VictorianWreath").hide();
	$("#CranberrySplashWreath").hide();
	
	console.log("hidestuff");
	  
	var radioBtn = "";
	// Find the number of items in the datastore.
	// Need to set lowest price and flag the radio button
	product.iterate(function(value, key, iterationNumber) {
	    if( (key == "25c") && value > 0 || 
	    	(key == "28c") && value > 0 || 
	    	(key == "36c") && value > 0 || 
	    	(key == "48c") && value > 0 || 
	    	(key == "60c") && value > 0
	    ){ //Classic Wreath is available
		    $("#ClassicWreath").show();
		    var buttonLabel = key.replace("c","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#ClassicOption').controlgroup('container').append(radioBtn);
	    }
	    if( (key == "25cg") && value > 0 || 
	    	(key == "28cg") && value > 0 || 
	    	(key == "36cg") && value > 0 || 
	    	(key == "48cg") && value > 0 || 
	    	(key == "60cg") && value > 0
	    ){ //Classic Wreath Greenzit is available
		    $("#ClassicWreathGreenzit").show();
		    var buttonLabel = key.replace("cg","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#ClassicGOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25v") && value > 0 || 
	    	(key == "28v") && value > 0 || 
	    	(key == "36v") && value > 0 
	    ){ //Victorian Wreath is available
		    $("#VictorianWreath").show();
		    var buttonLabel = key.replace("v","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#VictorianOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25vg") && value > 0 || 
	    	(key == "28vg") && value > 0 || 
	    	(key == "36vg") && value > 0 
	    ){ //Victorian Greenzit Wreath is available
		    $("#VictorianGreenzitWreath").show();
		    var buttonLabel = key.replace("vg","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#VictorianGOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25cs") && value > 0 || 
	    	(key == "28cs") && value > 0 || 
	    	(key == "36cs") && value > 0 
	    ){ //Cranberry Splash Wreath is available
		    $("#CranberrySplashWreath").show();
		    var buttonLabel = key.replace("cs","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#CranberryOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25csg") && value > 0 || 
	    	(key == "28csg") && value > 0 || 
	    	(key == "36csg") && value > 0 
	    ){ //Cranberry Splash Wreath is available
		    $("#CranberrySplashGWreath").show();
		    var buttonLabel = key.replace("csg","");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#CranberryGOption').controlgroup('container').append(radioBtn);
		}
	    
	}).then(function() {
	   // console.log('Iteration has completed');
	    $("#ClassicOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]:first-child').get(0).checked = true;
	    $("#ClassicGOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]', this).get(0).checked = true;
	     $("#VictorianOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]', this).get(0).checked = true;
	     $("#VictorianGOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]', this).get(0).checked = true;
	     $("#CranberryOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]', this).get(0).checked = true;
	     $("#CranberryGOption").enhanceWithin().controlgroup("refresh");
	    //$('#ClassicOption input[type=radio]', this).get(0).checked = true;
	    //now lets refresh the radio buttons
	    //$("#ClassicOption").controlgroup("refresh");
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});
	//refresh radio button set
	//$("#ClassicWreath form").trigger.create();
	//$("#ClassicOption").trigger("create");
	//$("#ClassicOption").enhanceWithin().controlgroup("refresh");
	//$("#ClassicOption").parent().enhanceWithin().controlgroup("refresh");
		////var currentId = keycheck[x];
		//console.log(currentId);
		
	
		//go through and check for entries
		//var myId = keycheck[x];
			
			
			/*if((currentID == "25c") || (currentID == "28c") || (currentID == "36c") || (currentID == "48c") || (currentID == "60c")){
				//console.log("show Classic" + currentID);
				$("#ClassicWreath").show();
				//not sure why I can't use the local var
				//if(currentID == "25c"){$("#ClassicWreath").show();}else{$("#ClassicWreath").hide();}
			}
			if((currentID == "25v") || (currentID == "28v") || (currentID == "36v") || (currentID == "48v") || (currentID == "60v") ){
				$("#VictorianWreath").show();
			}
			if((currentID == "25cs") || (currentID == "28cs") || (currentID == "36cs") ){
				$("#CranberrySplashWreath").show();
			}
			console.log(doc);*/
			// based on this let show items that are there. 
			////$(".priceselect #wreath" + doc._id + "").val(doc.value);
		//}).catch(function (err) {
		//}, function(err, results) {
			//hide the field
			//$("#ClassicWreath .priceselect #wreath" + doc._id).hide();
			//if (err) { return console.log(err); }
		//});

			//$(".ClassicWreath .priceselect #wreath" + keycheck[x]).val(price);
			//$(".ClassicWreath .priceselect #wreath" + keycheck[x]).val(price);
			////$(".ClassicWreath .priceselect #wreath" + keycheck[x]).next().html(price);
			//$(".ClassicWreath .priceselect label[for='#wreath"+keycheck[x]+"']").html("asd");
	
	//$(".ClassicWreath").show('slow');
}

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
	var imageUrl = $(this).attr("data-largerimage"); //grab the URL
	console.log(imageUrl);
	$("#larger img").attr("src", imageUrl); //set the url of the popup image
	$("#larger").trigger( "updatelayout" );
	$("#larger").popup("open");
});

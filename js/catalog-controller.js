/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

//reset the variables
MickmanAppLogin.CatalogController = function () {
    this.$storePage = null;
    this.$btnAdd = null; //add to cart button
    this.$btnCheck = null; //checkout buttons
    this.$btnCheckShop = null; //checkout and shop button
    //why no work
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
    //this.$btnCheck = $(".addCheckout", this.$storePage);
    //this.$btnCheckShop = $(".addShop", this.$storePage);
    //booo
    this.$Classic = $("#ClassicWreath");
    this.$Victorian = $("#VictorianWreath");
    this.$Cranberry = $("#CranberrySplashWreath");
};


MickmanAppLogin.CatalogController.prototype.addpricetoPopup = function (e) {
	$('#purchase span').html(e);
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
MickmanAppLogin.CatalogController.prototype.getSavedData = function(){ //This now only runs once when the page is loaded.
	//hide everything
	$("#ClassicWreath").hide(); $("#ClassicGreenzitWreath").hide();
	$("#VictorianWreath").hide(); $("#VictorianGreenzitWreath").hide();
	$("#CranberrySplashWreath").hide(); $("#CranberrySplashGWreath").hide();
	
	$("#ClassicSpray").hide();
	$("#VictorianSpray").hide();
	$("#CranberrySpray").hide();
	
	$("#HolidayCenterpiece").hide();
	$("#tabletoptree").hide();
	$("#garland").hide();
	$("#EZWreathHanger").hide();
	$("#Bags").hide();
	$("#LEDlights").hide();
	
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
		    var buttonLabel = key.replace("c","in.");
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
		    var buttonLabel = key.replace("cg","in.");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#ClassicGOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25v") && value > 0 || 
	    	(key == "28v") && value > 0 || 
	    	(key == "36v") && value > 0 
	    ){ //Victorian Wreath is available
		    $("#VictorianWreath").show();
		    var buttonLabel = key.replace("v","in.");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#VictorianOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25vg") && value > 0 || 
	    	(key == "28vg") && value > 0 || 
	    	(key == "36vg") && value > 0 
	    ){ //Victorian Greenzit Wreath is available
		    $("#VictorianGreenzitWreath").show();
		    var buttonLabel = key.replace("vg","in.");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#VictorianGOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25cs") && value > 0 || 
	    	(key == "28cs") && value > 0 || 
	    	(key == "36cs") && value > 0  
	    ){ //Cranberry Splash Wreath is available
		    $("#CranberrySplashWreath").show();
		    var buttonLabel = key.replace("cs","in.");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#CranberryOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25csg") && value > 0 || 
	    	(key == "28csg") && value > 0 || 
	    	(key == "36csg") && value > 0 
	    ){ //Cranberry Splash Wreath w Greenzit is available
		    $("#CranberrySplashGWreath").show();
		    var buttonLabel = key.replace("csg","in.");
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'">'+buttonLabel+'</label>');
		    $('#CranberryGOption').controlgroup('container').append(radioBtn);
		}
		//SPRAYS
		if( (key == "sprayc") && value > 0 || 
			(key == "spraycg") && value > 0
	    ){ //Classic Spray
		    $("#ClassicSpray").show();
		    if(key == "sprayc"){
			    var buttonLabel = key.replace("sprayc","Regular");
		    }else if(key == "spraycg"){
			    var buttonLabel = key.replace("spraycg","w Greenzit");
		    }
		    var radioBtn = $('<input type="radio" name="size" id="spray'+key+'" value="'+value+'" data-mini="true"/><label for="spray'+key+'">'+buttonLabel+'</label>');
		    $('#ClassicSprayOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "sprayv") && value > 0 || 
			(key == "sprayvg") && value > 0
	    ){ //Classic Spray
		    $("#VictorianSpray").show();
		    if(key == "sprayv"){
			    var buttonLabel = key.replace("sprayv","Regular");
		    }else if(key == "sprayvg"){
			    var buttonLabel = key.replace("sprayvg","w Greenzit");
		    }
		    var radioBtn = $('<input type="radio" name="size" id="spray'+key+'" value="'+value+'" data-mini="true"/><label for="spray'+key+'">'+buttonLabel+'</label>');
		    $('#VictorianSprayOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "spraycs") && value > 0 || 
			(key == "spraycsg") && value > 0
	    ){ //Classic Spray
		    $("#CranberrySpray").show();
		    if(key == "spraycs"){
			    var buttonLabel = key.replace("spraycs","Regular");
		    }else if(key == "spraycsg"){
			    var buttonLabel = key.replace("spraycsg","w Greenzit"); 
		    }
		    var radioBtn = $('<input type="radio" name="size" id="spray'+key+'" value="'+value+'" data-mini="true"/><label for="spray'+key+'">'+buttonLabel+'</label>');
		    $('#CranberrySprayOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "cc") && value > 0
		){ //Holiday Centerpiece
			$("#HolidayCenterpiece").show();
			$("#HolidayCenterpiece .split-custom-wrapper a").data("num",value);
			$("#HolidayCenterpiece .price span.num").html(value);
		}
		if( (key == "tlt") && value > 0
		){ //Tiny Living Tree
			$("#tabletoptree").show();
			$("#tabletoptree .split-custom-wrapper a").data("num",value);
			$("#tabletoptree .price span.num").html(value);
		}
		if( (key == "25gar") && value > 0 ||
			(key == "50gar") && value > 0 ||
			(key == "25garg") && value > 0 ||
			(key == "50garg") && value > 0 
		){ //Garland
			$("#garland").show();
			if(key == "25gar"){
			    var buttonLabel = key.replace("25gar","25ft");
		    }else if(key == "25garg"){
			    var buttonLabel = key.replace("25garg","25ft. w Greenzit"); 
		    }else if(key == "50gar"){
			    var buttonLabel = key.replace("50gar","50ft");
		    }else if(key == "50garg"){
			    var buttonLabel = key.replace("50garg","50ft. w Greenzit"); 
		    }
		    var radioBtn = $('<input type="radio" name="size" id="garland'+key+'" value="'+value+'" data-mini="true"/><label for="garland'+key+'">'+buttonLabel+'</label>');
		    $('#GarlandOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "hanger") && value > 0
		){
			$("#EZWreathHanger").show();
			$("#EZWreathHanger .split-custom-wrapper a").data("num",value);
			$("#EZWreathHanger .price span.num").html(value);
		}
		if( (key == "bag") && value > 0
		){
			$("#Bags").show();
			$("#Bags .split-custom-wrapper a").data("num",value);
			$("#Bags .price span.num").html(value);
		}
		if( (key == "led") && value > 0
		){
			$("#LEDlights").show();
			$("#LEDlights .split-custom-wrapper a").data("num",value);
			$("#LEDlights .price span.num").html(value);
		}
	
		//other parts
	    
	}).then(function() {
	    $("#ClassicOption").enhanceWithin().controlgroup("refresh");
	    $("#ClassicOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#ClassicGOption").enhanceWithin().controlgroup("refresh");
	    $("#ClassicGOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#VictorianOption").enhanceWithin().controlgroup("refresh"); 
	    $("#VictorianOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#VictorianGOption").enhanceWithin().controlgroup("refresh"); 
	    $("#VictorianGOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#CranberryOption").enhanceWithin().controlgroup("refresh");
	    $("#CranberryOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#CranberryGOption").enhanceWithin().controlgroup("refresh");
	    $("#CranberryGOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#ClassicSprayOption").enhanceWithin().controlgroup("refresh");
	    $("#ClassicSprayOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#VictorianSprayOption").enhanceWithin().controlgroup("refresh");
	    $("#VictorianSprayOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#CranberrySprayOption").enhanceWithin().controlgroup("refresh");
	    $("#CranberrySprayOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    //activate non radio buttons
		var productName = $("#HolidayCenterpiece h2").text();
		$("#HolidayCenterpiece .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#HolidayCenterpiece .split-custom-wrapper a").data("product-size","none available"); //push the product size to the checkout area.
		
		var productName = $("#tabletoptree h2").text();
		$("#tabletoptree .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#tabletoptree .split-custom-wrapper a").data("product-size","none available"); //push the product size to the checkout area.

	    $('#GarlandOption').enhanceWithin().controlgroup("refresh");
	    $('#GarlandOption').find(".ui-btn:first").trigger('click');//click the first button
	    
		var productName = $("#EZWreathHanger h2").text();
		$("#EZWreathHanger .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#EZWreathHanger .split-custom-wrapper a").data("product-size","none available"); //push the product size to the checkout area.
		
		var productName = $("#Bags h2").text();
		$("#Bags .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#Bags .split-custom-wrapper a").data("product-size","none available"); //push the product size to the checkout area.
		
		var productName = $("#LEDlights h2").text();
		$("#LEDlights .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#LEDlights .split-custom-wrapper a").data("product-size","none available"); //push the product size to the checkout area.
		$(".slickIt").trigger("click");
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});

}

/********* RADIO UPDATE PRICING */
//update the price display
$('.priceselect').change(function () {
  var radioSelected = $(this).find(':radio:checked');
  var optradioSelected = radioSelected.val();
  $(this).parent().parent().find('.price span.num').html(optradioSelected); //show the price on the listview
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("num",optradioSelected); //show the price in the cart
  
  var productName = $(this).parent().parent().find('h2').text(); //grab the product name
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product",productName); //push the product name to the checkout area.
  
  var radioSize = $(this).find(':radio:checked').prev('label').text();
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product-size",radioSize); //push the product option
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
var filtered = false;
$('.product-button').on('click', function(){
    var filtername = $(this).attr('id');
	if (filtered === false) {
        // currently filtered, turn the others off and this on
        console.log("." + filtername + '-filter');
         $('.product-display').slick('slickFilter','.'+ filtername +'-filter');
		 $(this).addClass('ui-btn-active');
		 filtered = true;
    } else {
	     $('.product-display').slick('slickUnfilter');
		 filtered = false;
		 console.log("unfilter");
		 $(".product-button").each( function(){
			 $(this).removeClass('ui-btn-active');
		 })
	}
    console.log(filtername);
});
//
$(".slickIt").on('click', function(){
	$('.product-display').slick({ //fire up the image rotater
    	centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: true,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
		] 	
	});
	$('.product-display').addClass("slicked");
	$('.product-display').removeClass("unslicked");
	console.log("slcked");
	$(this).addClass("ui-btn-active");
	$('.unslickIt').removeClass("ui-btn-active");
	//remove the listview layout
});
$(".unslickIt").on('click', function(){
	$('.product-display').slick("unslick");
	console.log("unslcked");
	$('.product-display').removeClass("slicked");
	$('.product-display').addClass("unslicked");
	$('.slickIt').removeClass("ui-btn-active");
	$(this).addClass("ui-btn-active");
	//style it as a listview
	
});

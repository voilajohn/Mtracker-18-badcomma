/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

MickmanAppLogin.CatalogController = function () {//reset the variables
    this.$storePage = null;
    this.$btnAdd = null; //add to cart button
    this.$btnCheck = null; //checkout buttons
    this.$btnCheckShop = null; //checkout and shop button
};

//gather the variables that we will need 
MickmanAppLogin.CatalogController.prototype.init = function () {
    this.$storePage = "#page-main-menu";
    this.$btnAdd = $(".addtocart", this.$storePage);
    $('#ClassicOption').html("");
	$('#VictorianOption').html("");
	$('#CranberryOption').html("");
	$('#GarlandOption').html("");
	    
	$('#CranberrySprayOption').html("");
	$('#GarlandOption').html("");
	$("#purchase #ledlights").hide();
    $("#purchase #ezwreathhanger").hide();
};

MickmanAppLogin.CatalogController.prototype.addpricetoPopup = function (e) { //push the price to the popup
	$('#purchase span').html(e);
};
MickmanAppLogin.CatalogController.prototype.storeData = (function(x,y) { //Write the server items to the database
	var data = y;
	data.unshift(['user',x]);//push username selected to the front of the list
	console.log(data);
	for(j=0;j<data.length;j++){
		if(data[j][1] != "" || data[j][1] != 0){//check for blanks
			product.setItem(data[j][0], data[j][1]);
		}else{
			console.log(data[j][0] + "is empty");
		}
	}
	this.getSavedData(); //now lets boot up the page
});

/*Build out page - grab the data from the database and show what the user set up on his website.*/
MickmanAppLogin.CatalogController.prototype.getSavedData = function(){ //This now only runs once when the page is loaded.
	//hide everything
	$("#ClassicWreath").hide(); 
	$("#VictorianWreath").hide(); 
	$("#CranberrySplashWreath").hide();
	
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
	
	    if( (key == "25c") && value > 0 || (key == "25cg") && value > 0 ||
	    	(key == "28c") && value > 0 || (key == "28cg") && value > 0 ||
	    	(key == "36c") && value > 0 || (key == "36cg") && value > 0 ||
	    	(key == "48c") && value > 0 || (key == "48cg") && value > 0 ||
	    	(key == "60c") && value > 0 || (key == "60cg") && value > 0
	    ){ //Classic Wreath is available
		    $("#ClassicWreath").show();
		    var buttonLabel = key.slice(0,2) + "in.";
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span> <span class="labelprice">$'+value+'</span></label>');
		    $('#ClassicOption').controlgroup('container').append(radioBtn);
	    }
		if( (key == "25v") && value > 0 || (key == "25vg") && value > 0 ||
	    	(key == "28v") && value > 0 || (key == "28vg") && value > 0 ||
	    	(key == "36v") && value > 0 || (key == "36vg") && value > 0 
	    ){ //Victorian Wreath is available
		    $("#VictorianWreath").show();
		    var buttonLabel = key.slice(0,2) + "in.";
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>');
		    $('#VictorianOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "25cs") && value > 0 || (key == "25csg") && value > 0 || 
	    	(key == "28cs") && value > 0 || (key == "28csg") && value > 0 ||
	    	(key == "36cs") && value > 0 || (key == "36csg") && value > 0
	    ){ //Cranberry Splash Wreath is available
		    $("#CranberrySplashWreath").show();
		    var buttonLabel = key.slice(0,2) + "in.";
		    var radioBtn = $('<input type="radio" name="size" id="wreath'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>');
		    $('#CranberryOption').controlgroup('container').append(radioBtn);
		}
		//SPRAYS
		if( (key == "sprayc") && value > 0 || 
			(key == "spraycg") && value > 0
	    ){ //Classic Spray
		    $("#ClassicSpray").show();
		    $("#ClassicSpray .price span.num").html(value);
		}
		if( (key == "sprayv") && value > 0 || 
			(key == "sprayvg") && value > 0
	    ){ //Classic Spray
		    $("#VictorianSpray").show();
		    $("#VictorianSpray .price span.num").html(value);
		}
		if( (key == "spraycs") && value > 0 || 
			(key == "spraycsg") && value > 0 ){ //Classic Spray
		    $("#CranberrySpray").show();
		    $("#CranberrySpray .price span.num").html(value);
		}
		if( (key == "cc") && value > 0 ){ //Holiday Centerpiece
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
			var buttonLabel = key.slice(0,2) + "ft.";
		    var radioBtn = $('<input type="radio" name="size" id="garland'+key+'" value="'+value+'" data-mini="true"/><label for="garland'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>');
		    $('#GarlandOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "hanger") && value > 0){
			$("#EZWreathHanger").show();
			$("#EZWreathHanger .split-custom-wrapper a").data("num",value);
			$("#EZWreathHanger .price span.num").html(value);
			$(".addhangerprice").html(value);
		}
		if( (key == "bag") && value > 0){
			$("#Bags").show();
			$("#Bags .split-custom-wrapper a").data("num",value);
			$("#Bags .price span.num").html(value);
		}
		if( (key == "led") && value > 0){
			$("#LEDlights").show();
			$("#LEDlights .split-custom-wrapper a").data("num",value);
			$("#LEDlights .price span.num").html(value);
			$(".addledprice").html(value);
		}
		if(key == "user"){
			$(".your-profile").html(value);
		}
		if(key == "cust_id"){
			$(".your-group").html(value);
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
		$(".slickIt").trigger("click"); //now load the carousel
		
		
		
		$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});
	
	cart.getItem("defaults").then( function(value) { //let's add in our defaults if they are saved
		$("#default-city").val(value[0]);
		$("#default-state").val(value[1]);
		$("#default-zip").val(value[2]);
	}).catch(function(err) {
		console.log(err);
	});
	console.log("Get Saved Data");
	//lets query for the user data too
	this.getUserData(); //only load this on the first time around after the catalog is in there
}

MickmanAppLogin.CatalogController.prototype.getUserData = function(){ //gather user info from the cart table
	var savedcart;
	cart.getItem("personal").then( function(value){//lets first check the cart for any data on the user 
		savedcart = value;
		if(savedcart != null){ //if there is a cart saved lets load that information in there. 
			var fieldArr = ['personal-fname','personal-lname','personal-address','personal-city','personal-state','personal-zip','personal-phone','personal-email'];
			for(x=0;x<fieldArr.length+1;x++){ //fill in the blanks
				$("#"+fieldArr[x]).val(savedcart[x+1]);
			}
		}else{
			cart.getItem("defaults").then( function(value) { //let's add in our defaults if they are saved
				$("#default-city").val(value[0]);
				$("#default-state").val(value[1]);
				$("#default-zip").val(value[2]);
				if(value[0] != ""){
					$("#personal-city").val(value[0]);
					$("#default-city").val(value[0]);
				}
				if(value[1] != ""){
					$("#personal-state").val(value[1]);
					$("#default-state").val(value[1]);
				}
				if(value[2] != ""){
					$("#personal-zip").val(value[2]);
					$("#default-zip").val(value[2]);
				}
			}).catch(function(err) {
				console.log(err);
			});
		}
		
	});
};

/********* RADIO UPDATE PRICING */
//update the price display
$('.priceselect').change(function () {
  var radioSelected = $(this).find(':radio:checked');
  var optradioSelected = radioSelected.val();
  $(this).parent().parent().find('.price span.num').html(optradioSelected); //show the price on the listview
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("num",optradioSelected); //show the price in the cart
  
  var productName = $(this).parent().parent().find('h2').text(); //grab the product name
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product",productName); //push the product name to the checkout area.
  
  var radioSize = $(this).find(':radio:checked').prev('label').find(".sizeoption").text();//need to be more specific now
  console.log("size: " + radioSize);
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product-size",radioSize); //push the product option
});

/********* POPUP ZOOM */
//update the popup image
$('.searchbtn').click(function () {
	var imageUrl = $(this).attr("data-largerimage"); //grab the URL
	console.log(imageUrl);
	//var frame = document.getElementById("myframe");
	//var frameDoc = frame.contentDocument;
	//frameDoc.querySelector("img").src = imageUrl;
	
	$("#larger img").attr("src", imageUrl); //set the url of the popup image
	$("#larger img.panzoom").panzoom({
		 startTransform: 'scale(1.1)',
         /*increment: 0.1,*/
         minScale: 0.1,
         contain: 'automatic'
	}).panzoom('zoom');
	/*$section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),
            startTransform: 'scale(1.1)',
            increment: 0.1,
            minScale: 1,
            contain: 'invert'
          }).panzoom('zoom');*/
	$("#larger").trigger( "updatelayout" );
	$("#larger").popup("open");
});
//save defaults option
//need to get USER 			
$('.save-defaults').click(function () { //lets create a default field in the cart database
	var username = $(".your-profile").text(); //this should be set already
	//get the values of the three fields
	var city = $("#default-city").val();
	var state = $("#default-state").val();
	var zip = $("#default-zip").val();
	
	var defaults = [city,state,zip];
	cart.setItem("defaults",defaults).then(function(){
		console.log("saved");
		app.catalogController.getUserData(); //refresh the form
	}).catch(function(err){
		console.log(err);
	});
});

//filter buttons on the bottom of the page
var filtered = false;
$('.product-button').on('click', function(){
	//lets make it so that when you click it switches to the other filter unless it is the all button then it shows everything.
	
    var filtername = $(this).attr('id');
    $('.product-display').slick('slickUnfilter');
    
    if(filtername != "All"){
         $('.product-display').slick('slickFilter','.'+ filtername +'-filter');
         $('.product-display').slick('refresh');
		 filtered = true;
		 $(".product-button").each( function(){
			 $(this).removeClass('ui-btn-active');
		 });
    }else{
		 filtered = false;
		 $(".product-button").each( function(){
			 $(this).removeClass('ui-btn-active');
		 });
    }
    $(this).addClass('ui-btn-active');
});

$(".slickIt").on('click', function(){ //rotating area
	$('.product-display').slick({ 
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
	$(this).addClass("ui-btn-active");
	$('.unslickIt').removeClass("ui-btn-active");
	//remove the listview layout
});
$(".unslickIt").on('click', function(){ //list view
	$('.product-display').slick("unslick");
	console.log("unslcked");
	$('.product-display').removeClass("slicked");
	$('.product-display').addClass("unslicked");
	$('.slickIt').removeClass("ui-btn-active");
	$(this).addClass("ui-btn-active");
	//style it as a listview
});

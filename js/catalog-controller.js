/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

var ClassicWreathDescription = "This popular wreath is as traditional as Christmas itself. The Balsam Fir Classic Wreath is tastefully decorated with a long tailed, gold-backed velveteen bow and white tipped and glittered Ponderosa pine cones accented with red jingle bells which match the generous red bow.";

var VictorianWreathDescription = "These most popular Balsam Fir Holiday Evergree feature an exquisite satin bow with imprinted wired-gold edges to hold the generous loops of the ribbon. Trimmings include natural pine cones accented with gold jingle bells, and the matchin Christmas bulbs finish off the look of these elegaHoliday Decorations.";

var CranberrySplashWreathDescription = "This traditionally festive wreath is made from natural Balsam Fir boughs and is decorated with a generous, 4” wide, fabric bow with gold wired edges. The ornamental trimmings include faux cranberry sprigs and gold Juniper twigs. Three naturally bronzed Ponderosa Pine cones laced with gold jingle bells set the finishing touches for this stunning addition to your holiday décor.";

var ClassicSprayDescription = "The combination of mixed evergreens of the Classic Spray are accented with a generous gold backed red velveteen bow which has wonderfully long tails. The white tipped & glittered pine cones are highlighted with festive red jingle bells which match the red bow. Either used by itself as a unique door decoration, or in concert with the Classic Wreath, the Classic Door Spray is appreciated by all.";

var VictorianSprayDescription = "These most popular Balsam Fir Holiday Evergree feature an exquisite satin bow with imprinted wired-gold edges to hold the generous loops of the ribbon. Trimmings include natural pine cones accented with gold jingle bells, and the matching Christmas bulbs finish off the look of these elegant Holiday Decorations.";

var CranberrySprayDescription = "The Cranberry Splash Spray is made from natural mixed evergreen boughs and is decorated with a generous, 4” wide, fabric bow with gold wired edges. The ornamental trimmings include faux cranberry sprigs and gold Juniper twigs. Natural bronze Ponderosa pine cones laced with gold jingle bells set the finishing touches for this stunning addition to your Holiday Décor.";

var tabletoptreeDescription = "Each living tree arrives with 7 frosted and glittered cones with a ‘star garland’ accent. The container is wrapped in burlap with a generous matching ribbon and bow that adds to the natural ‘organic’ theme of this wonderful Table Top Christmas Tree. The LED light set, with timer, adds just the right amount of twinkle to this festive Table Top Christmas Tree. These nursery grown Dwarf Alberta Spruce Trees are about 22” tall. They will remain fresh through the holidays with regular watering as per the care instructions which accompany each tree. These trees can be planted outdoors after the holidays to enjoy for years to come!";

var garlandDescription = "Available in both 25’ or 50’ lengths, these garlands add the perfect holiday touch to entryways, deck railings and a host of other outdoor home applications.";

var HolidayCenterpieceDescription = "This seasonal centerpiece, as pictured, is bursting with naturally scented mixed evergreens which stay fresh and moist from the  oral foam base. The festive decorations are certain to delight your guests and lend a joyful air to your Holiday Celebrations!";

var LEDlightsDescription = "Add just the right amount of twinkle to all of your holiday evergreens! <ul><li>23 - miniature ‘dew drop’ lights</li><li>Choose a steady light setting or a gently twinkling setting for additional interest.<li>Automatic Timer features 6 hours on & 18 hours off.</li><li>Uses 3 – AA Batteries lasting for about a week* (not included)</li><li>Thin  exible wire allows for effortless installation</li></ul><br>*Battery life is an estimate based upon timer use. Cold weather may decrease battery life.";

var EZWreathHangerDescription = "Our customized EZ Hanger® allows you to easily display your wreath or spray in seconds.<ul><li>No Nails</li><li>No Hammers</li><li>Easy Installation</li></ul>";

var CradioBtn = ""; //Classic
var VradioBtn = ""; //Victorian
var SradioBtn = ""; //Cranberry Splash
var GradioBtn = ""; //Garland

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
    
    //remove the options ?is this causing log out - in issues?
    $('#ClassicOption').html("");
	$('#VictorianOption').html("");
	$('#CranberryOption').html("");
	$('#GarlandOption').html("");
	
	$("#purchase #ledlights").hide();
    $("#purchase #ezwreathhanger").hide();
};

MickmanAppLogin.CatalogController.prototype.addpricetoPopup = function (e) { //push the price to the popup
	$('#purchase span').html(e);
};
//ADD TO PRODUCT DB
MickmanAppLogin.CatalogController.prototype.storeData = (function(x,y) { //Write the server items to the database
	var data = y;
	var productList = [];
	data.unshift(['user',x]);//push username selected to the front of the list
	//data.unshift(['token',x]);//push username selected to the front of the list
	console.log(data);
	for(j=0;j<data.length;j++){
		if(data[j][1] != "" || data[j][1] != 0){//check for blanks
			//need to send this all at once then return the info
			
			//product.setItem(data[j][0], data[j][1]).then( function(value){
				//alert("DEBUG: DB SAVED!");
			//});
			//let's turn this into a promise chain so it can all be done at once then fire the getsaveddata after
			productList.push([data[j][0], data[j][1]]);
		}else{
			console.log(data[j][0] + "is empty");
		}
	}
	
	//new
	var promises = productList.map(function(item) {
		return product.setItem(item[0],item[1]);
	});
	
	Promise.all(promises).then(function(results) {
	    //console.log("r-"+results);
	    //getSavedData();
	    app.catalogController.getSavedData();
	});
	
	//this.getSavedData(); //now lets boot up the page
});
MickmanAppLogin.CatalogController.prototype.showDefaults = function(){
	cart.getItem("defaults").then( function(value) { //let's add in our defaults if they are saved
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
	});
	//get user and group
	/*product.getItem("user").then( function(value) { //let's add in our defaults if they are saved
		$(".your-profile").html(value);
	});
	product.getItem("cust_id").then( function(value) { //let's add in our defaults if they are saved
		$(".your-group").html(value);
	});*/
	
	
}
/*Build out page - grab the data from the database and show what the user set up on his website.*/
MickmanAppLogin.CatalogController.prototype.getSavedData = function(){ //This now only runs once when the page is loaded.

	console.log("Fill out the Catalog");
	//hide everything 
	
	/*$("#ClassicWreath").hide(); 
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
	$("#LEDlights").hide();*/
	
	$("#ClassicWreath").addClass('hidden'); 
	$("#VictorianWreath").addClass('hidden');  
	$("#CranberrySplashWreath").addClass('hidden'); 
	
	$("#ClassicSpray").addClass('hidden'); 
	$("#VictorianSpray").addClass('hidden'); 
	$("#CranberrySpray").addClass('hidden'); 
	
	$("#HolidayCenterpiece").addClass('hidden'); 
	$("#tabletoptree").addClass('hidden'); 
	$("#garland").addClass('hidden'); 
	$("#EZWreathHanger").addClass('hidden'); 
	$("#Bags").addClass('hidden'); 
	$("#LEDlights").addClass('hidden'); 
	
	//clear buttons to make sure there isn't duplicates
	CradioBtn = "";
	VradioBtn = "";
	SradioBtn = "";
	GradioBtn = "";
    
	// Find the number of items in the datastore.
	// Need to set lowest price and flag the radio button
	product.iterate(function(value, key, iterationNumber) {
		
	    if( (key == "25c") && value > 0 && value != null || (key == "25cg") && value > 0 && value != null ||
	    	(key == "28c") && value > 0 && value != null || (key == "28cg") && value > 0 && value != null ||
	    	(key == "36c") && value > 0 && value != null || (key == "36cg") && value > 0 && value != null ||
	    	(key == "48c") && value > 0 && value != null || (key == "48cg") && value > 0 && value != null ||
	    	(key == "60c") && value > 0 && value != null || (key == "60cg") && value > 0 && value != null
	    ){ //Classic Wreath is available
		    //$("#ClassicWreath").show();
		    $("#ClassicWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";
		    CradioBtn += '<input type="radio" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span> <span class="labelprice">$'+value+'</span></label>';
	    }
		if( (key == "25v") && value > 0 && value != null || (key == "25vg") && value > 0 && value != null ||
	    	(key == "28v") && value > 0 && value != null || (key == "28vg") && value > 0 && value != null ||
	    	(key == "36v") && value > 0 && value != null || (key == "36vg") && value > 0 && value != null 
	    ){ //Victorian Wreath is available
		    //$("#VictorianWreath").show();
		    $("#VictorianWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";
		    VradioBtn += '<input type="radio" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>';		}
		if( (key == "25cs") && value > 0 && value != null || (key == "25csg") && value > 0 && value != null || 
	    	(key == "28cs") && value > 0 && value != null || (key == "28csg") && value > 0 && value != null ||
	    	(key == "36cs") && value > 0 && value != null || (key == "36csg") && value > 0 && value != null
	    ){ //Cranberry Splash Wreath is available
		    //$("#CranberrySplashWreath").show();
		    $("#CranberrySplashWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";
		    SradioBtn += '<input type="radio" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>';		}
		    if($("#ClassicWreath").hasClass('hidden') && $("#VictorianWreath").hasClass('hidden') && $("#CranberrySplashWreath").hasClass('hidden')){
			    //hide the wreath filter button
				$("#wreath").addClass('hidden');//hide the other category
				$('#filterset').trigger('create');
		    }else{
				$("#wreath").removeClass('hidden');//hide the other category
		    }
		//SPRAYS
		if( (key == "sprayc") && value > 0 && value != null || 
			(key == "spraycg") && value > 0 && value != null
	    ){ //Classic Spray
		    //$("#ClassicSpray").show();
		    $("#ClassicSpray").removeClass('hidden'); 
		    $("#ClassicSpray .split-custom-wrapper a").data("num",value);
		    $("#ClassicSpray .price span.num").html(value);
		    $("#ClassicSpray .split-custom-wrapper a").data("db-name",key);
		}
		if( (key == "sprayv") && value > 0 && value != null || 
			(key == "sprayvg") && value > 0 && value != null
	    ){ //Classic Spray
		    //$("#VictorianSpray").show();
		    $("#VictorianSpray").removeClass('hidden'); 
		    $("#VictorianSpray .split-custom-wrapper a").data("num",value);
		    $("#VictorianSpray .price span.num").html(value);
		    $("#VictorianSpray .split-custom-wrapper a").data("db-name",key);
		}
		if( (key == "spraycs") && value > 0 && value != null || 
			(key == "spraycsg") && value > 0 && value != null ){ //Classic Spray
		    //$("#CranberrySpray").show();
		    $("#CranberrySpray").removeClass('hidden');
		    $("#CranberrySpray .split-custom-wrapper a").data("num",value);
		    $("#CranberrySpray .price span.num").html(value);
		    $("#CranberrySpray .split-custom-wrapper a").data("db-name",key);
		}
		if($("#ClassicSpray").hasClass('hidden') &&  $("#VictorianSpray").hasClass('hidden') && $("#CranberrySpray").hasClass('hidden')){
			//hide wreath sort button
		    //hide the wreath filter button
			$("#spray").addClass('hidden');//hide the other category
			$('#filterset').trigger('create');
		}else{
			$("#spray").removeClass('hidden');//hide the other category
	    }
		if( (key == "cc") && value > 0 && value != null ){ //Holiday Centerpiece
			//$("#HolidayCenterpiece").show();
			$("#HolidayCenterpiece").removeClass('hidden');

			$("#HolidayCenterpiece .split-custom-wrapper a").data("num",value);
			$("#HolidayCenterpiece .price span.num").html(value);
			$("#HolidayCenterpiece .split-custom-wrapper a").data("db-name",key);
		}
		if($("#HolidayCenterpiece").hasClass('hidden')){
			$("#centerpiece").addClass('hidden');//hide the other category
			$('#filterset').trigger('create');
		}else{
			$("#centerpiece").removeClass('hidden');
		}
		
		if( (key == "tlt") && value > 0 && value != null
		){ //Tiny Living Tree
			//$("#tabletoptree").show();
			
			$("#tabletoptree").removeClass('hidden');
			$("#tabletoptree .split-custom-wrapper a").data("num",value);
			$("#tabletoptree .price span.num").html(value);
			$("#tabletoptree .split-custom-wrapper a").data("db-name",key);
		}
		if($("#tabletoptree").hasClass('hidden')){
			$("#tree").addClass('hidden');//hide the other category
			$('#filterset').trigger('create');
		}else{
			$("#tree").removeClass('hidden');
		}
		if( (key == "25gar") && value > 0 && value != null ||
			(key == "50gar") && value > 0 && value != null ||
			(key == "25garg") && value > 0 && value != null ||
			(key == "50garg") && value > 0 && value != null 
		){ //Garland
			//$("#garland").show();
			$("#garland").removeClass('hidden');
			var buttonLabel = key.slice(0,2) + "ft.";
		    GradioBtn += '<input type="radio" name="size" id="garland'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="garland'+key+'"><span class="sizeoption">'+buttonLabel+'</span><span class="labelprice">$'+value+'</span></label>';
		    //$('#GarlandOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "hanger") && value > 0 && value != null){
			//$("#EZWreathHanger").show();
			$("#EZWreathHanger").removeClass('hidden');
			$("#EZWreathHanger .split-custom-wrapper a").data("num",value);
			$("#EZWreathHanger .split-custom-wrapper a").data("db-name",key);
			$("#EZWreathHanger .price span.num").html(value);
			$(".addhangerprice").html(value);
		}
		if( (key == "led") && value > 0 && value != null){
			//$("#LEDlights").show();
			$("#LEDlights").removeClass('hidden');
			
			$("#LEDlights .split-custom-wrapper a").data("num",value);
			$("#LEDlights .split-custom-wrapper a").data("db-name",key);
			$("#LEDlights .price span.num").html(value);
			$(".addledprice").html(value);
		}
		if($("#garland").hasClass('hidden') && $("#EZWreathHanger").hasClass('hidden') && $("#LEDlights").hasClass('hidden')){
			$("#other").addClass('hidden');//hide the other category
			$('#filterset').trigger('create');
		}else{
			$("#other").removeClass('hidden');
		}
		if(key == "user"){
			$(".your-profile").html(value);
		}
		if(key == "cust_id"){
			$(".your-group").html(value);
		}
		if(key == "wod"){
			$(".your-delivery").html(value);
		}
	
		//other parts
	    
	}).then(function() {
		
		//alert("DEBUG: catalog should be showing");
		$('#ClassicOption').controlgroup('container').html(CradioBtn);
		$('#VictorianOption').controlgroup('container').html(VradioBtn);
		$('#CranberryOption').controlgroup('container').html(SradioBtn);
		$('#GarlandOption').controlgroup('container').html(GradioBtn);
		
		console.log("refresh");
	    $("#ClassicOption").enhanceWithin().controlgroup("refresh");
	    $("#ClassicOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#VictorianOption").enhanceWithin().controlgroup("refresh"); 
	    $("#VictorianOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $("#CranberryOption").enhanceWithin().controlgroup("refresh");
	    $("#CranberryOption").find(".ui-btn:first").trigger('click');//click the first button
	    
	    $('#GarlandOption').enhanceWithin().controlgroup("refresh");
	    $('#GarlandOption').find(".ui-btn:first").trigger('click');//click the first button
	    
	    //activate non radio buttons
	    var productName = $("#ClassicSpray h2").text();
		$("#ClassicSpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
	    $("#ClassicSpray .split-custom-wrapper a").data("product-size","");
	    
	    var productName = $("#VictorianSpray h2").text();
		$("#VictorianSpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
	    $("#VictorianSpray .split-custom-wrapper a").data("product-size","");
	    
	    var productName = $("#CranberrySpray h2").text();
		$("#CranberrySpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
	    $("#CranberrySpray .split-custom-wrapper a").data("product-size",""); 
	    
		var productName = $("#HolidayCenterpiece h2").text();
		$("#HolidayCenterpiece .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#HolidayCenterpiece .split-custom-wrapper a").data("product-size",""); //push the product size to the checkout area.
		
		var productName = $("#tabletoptree h2").text();
		$("#tabletoptree .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#tabletoptree .split-custom-wrapper a").data("product-size",""); //push the product size to the checkout area.
	    
		var productName = $("#EZWreathHanger h2").text();
		$("#EZWreathHanger .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#EZWreathHanger .split-custom-wrapper a").data("product-size",""); //push the product size to the checkout area.
		
		var productName = $("#LEDlights h2").text();
		$("#LEDlights .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
		$("#LEDlights .split-custom-wrapper a").data("product-size",""); //push the product size to the checkout area.
		
		//need to make sure the page is loaded.
		$(".slickIt").trigger("click"); //now load the carousel
		$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
		
		//update the page titles
		checkGroup();
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});
	
	console.log("Get Saved Data");
	//lets query for the user data too
	this.getUserData(); //only load this on the first time around after the catalog is in there
}

MickmanAppLogin.CatalogController.prototype.getUserData = function(){ //gather user info from the cart table
	var savedcart;
	cart.getItem("personal").then( function(err, value){//lets first check the cart for any data on the user 
		savedcart = value;
		if(savedcart != null){ //if there is a cart saved lets load that information in there. 
			var fieldArr = ['personal-fname','personal-lname','personal-address','personal-city','personal-state','personal-zip','personal-phone','personal-email'];
			for(x=0;x<fieldArr.length+1;x++){ //fill in the blanks
				$("#"+fieldArr[x]).val(savedcart[x+1]);
			}
		}else{
			//check for defaults saved
			cart.getItem("defaults").then( function(err, value) { //let's add in our defaults if they are saved
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
			});
		}
		
	});
};

/********* RADIO UPDATE PRICING */
//update the price display
$('.priceselect').change(function () {
  var radioSelected = $(this).find(':radio:checked');
  var optradioSelected = radioSelected.val();
  var Id = $(this).find(':radio:checked').data('prod-id');//find the ID 
  
  $(this).parent().parent().find('.price span.num').html(optradioSelected); //show the price on the listview
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("num",optradioSelected); //show the price in the cart
  
  var productName = $(this).parent().parent().find('h2').text(); //grab the product name
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product",productName); //push the product name to the checkout area.
  
  var getName = $(this).parent().data("prod-id");
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("db-name",Id);
  
  var radioSize = $(this).find(':radio:checked').prev('label').find(".sizeoption").text();//need to be more specific now
  $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product-size",radioSize); //push the product option
  
});
$('#personal-phone').change(function(){
	var myphone = String($('#personal-phone').val());
	console.log(myphone);
	var formattedPhone = myphone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
	$('#personal-phone').val(formattedPhone);
});
/********* POPUP ZOOM */
//update the popup image
$('.searchbtn').click(function () {
	var imageUrl = $(this).attr("data-largerimage"); //grab the URL
	var description = window[$(this).parent().attr("id") + "Description"];
	
	$("#larger .proddescription").html("");
	
	$("#larger img").attr("src", imageUrl); //set the url of the popup image
	$("#larger .proddescription").html(description);
	
	/*$("#larger img.panzoom").panzoom({
		 startTransform: 'scale(0.75)',
         minScale: 0.1,
         contain: 'automatic'
	}).panzoom();*/
	$('#larger').find('.panzoom').panzoom("reset");
	(function() {
          var $section = $('#larger');
          $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $reset: $section.find(".reset"),
            //panOnlyWhenZoomed: true,
            minScale: 0.1
          });
    })();
    
	$("#larger").trigger( "updatelayout" );
	$("#larger").popup("open");
});

//save defaults option
//need to get USER 			
$('.save-defaults').click(function () { //lets create a default field in the cart database
	$("#profile-panel #ctn-err").removeClass("bi-ctn-err");
	$("#profile-panel #ctn-err").removeClass("bi-ctn-suc");
	var username = $(".your-profile").text(); //this should be set already
	//get the values of the three fields
	var city = $("#default-city").val();
	var state = $("#default-state").val();
	var zip = $("#default-zip").val();
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
	//lets validate these quick
	if(city != "" && state != "" && zip != ""){ //check that they aren't blank
		if(!isValidZip.test(zip)){
			$("#profile-panel #ctn-err").text("Please check that you've filled in the zip properly.");
			$("#profile-panel #ctn-err").addClass("bi-ctn-err").slideDown();
		}else{
			var defaults = [city,state,zip];
			//ADD TO CART DB
			cart.setItem("defaults",defaults).then(function(){
				console.log("saved");
				app.catalogController.getUserData(); //refresh the form
				//show a confirmation message
				$("#profile-panel #ctn-err").text("Default settings saved");
				$("#profile-panel #ctn-err").addClass("bi-ctn-suc").slideDown();
			}).catch(function(err){
				console.log(err);
			});
		}
	}else{		
		$("#profile-panel #ctn-err").text("Please fill in all the fields to save.");
		$("#profile-panel #ctn-err").addClass("bi-ctn-err").slideDown();
	}
	
});

//filter buttons on the bottom of the page
var filtered = false;
$('.product-button').on('click', function(){
	//lets make it so that when you click it switches to the other filter unless it is the all button then it shows everything.
    var filtername = $(this).attr('id');
    var swiper = $(".swiper-container");
    console.log(swiper.length);
    if(swiper.length == 0){ //swiper no swiping
	    if(filtername != "All"){
		    //console.log(filtername);
		    $('.product-wrapper div.slider').show().filter(':not(.'+filtername+'-filter)').hide();
			$(".product-button").each( function(){
				$(this).removeClass('ui-btn-active');
			});
	        filtered = true;
	    }else{
			$(".product-button").each( function(){
				$(this).removeClass('ui-btn-active');
			});
		    $('.product-wrapper div.slider').show();
		    filtered = false;
	    }
    }else{
	    if(filtername != "All"){
		    $('.swiper-wrapper div.slider').show().filter(':not(.'+filtername+'-filter)').hide();
			$(".product-button").each( function(){
				$(this).removeClass('ui-btn-active');
			});
	        filtered = true;
	    }else{
			$(".product-button").each( function(){
				$(this).removeClass('ui-btn-active');
			});
		    $('.swiper-wrapper div.slider').show();
		    filtered = false;
	    }
	   var mySwiper = $('.swiper-container')[0].swiper;
	   mySwiper.update();
	   mySwiper.slideTo(0,1000,false);
	   mySwiper.update();
    }
    $(this).addClass('ui-btn-active');
});

$(".slickIt").on('click', function(){ //rotating area
	//alert("DEBUG: slickit triggered");
	$(".product-display").addClass('swiper-container');
	$(".product-wrapper").addClass('swiper-wrapper');
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 30,
        mode: 'horizontal',
        centeredSlides: true,
        slidesPerView: 'auto',
        grabCursor: true,
        breakpoints: {
            2000: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 5
            }
        }
    });
	$('.product-display').addClass("slicked");
	$('.product-display').removeClass("unslicked");
	
	$(this).addClass("ui-btn-active");
	$('.unslickIt').removeClass("ui-btn-active");
	//remove the listview layout
});
$(".unslickIt").on('click', function(){ //list view
	var mySwiper = $('.swiper-container')[0].swiper;
    mySwiper.destroy();
    mySwiper = undefined;
    $(".product-button").each( function(){
		$(this).removeClass('ui-btn-active');
	});
    $('#All').addClass('ui-btn-active');
    $('.swiper-wrapper').removeAttr('style');
    $('.swiper-slide').removeAttr('style');  
	$(".product-display").removeClass('swiper-container');
	$(".product-wrapper").removeClass('swiper-wrapper');
	
	console.log("unslcked");
	$('.product-display').removeClass("slicked");
	$('.product-display').addClass("unslicked");
	
	$('.slickIt').removeClass("ui-btn-active");
	$(this).addClass("ui-btn-active");
	//style it as a listview
});

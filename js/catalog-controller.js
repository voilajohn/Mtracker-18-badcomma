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
var SradioBtn = ""; //Cranberry 
var CSradioBtn = ""; //Classic Spray
var VSradioBtn = ""; //Victorian Spray
var CSSradioBtn = ""; //Cranberry Splash Spray
var CLCradioBtn = ""; //Candlelit Centerpiece
var GradioBtn = ""; //Garland
var NSTradioBtn = ""; //NorthStarTree
var EZWradioBtn = ""; //EZ Wreath Hanger
var LLradioBtn = ""; //LED Lights

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
    console.log("cat init");
    checkGroup();
    
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
	console.log(data);
	for(j=0;j<data.length;j++){
		if(data[j][1] != "" || data[j][1] != 0){//check for blanks
			//need to send this all at once then return the info
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
		//this should be there I think but lets turn it off to see what happens
	    //app.catalogController.getSavedData();
	    checkGroup();
	    console.log("store promise chain");
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
	//clear out the orders section
	$(".orderList").html("");
	$(".orderList").enhanceWithin();
	console.log("Fill out the Catalog");
	//hide everything 
	
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
	CSradioBtn = "";
	VSradioBtn = "";
	CSSradioBtn = "";
	CLCradioBtn = "";
	GradioBtn = "";
	NSTradioBtn = "";
	EZWradioBtn = "";
	LLradioBtn = "";
    
	// Find the number of items in the datastore.
	// Need to set lowest price and flag the radio button
	product.iterate(function(value, key, iterationNumber) {
		
	    if( (key == "25c") && value > 0 && value != null || (key == "25cg") && value > 0 && value != null ||
	    	(key == "28c") && value > 0 && value != null || (key == "28cg") && value > 0 && value != null ||
	    	(key == "36c") && value > 0 && value != null || (key == "36cg") && value > 0 && value != null ||
	    	(key == "48c") && value > 0 && value != null || (key == "48cg") && value > 0 && value != null ||
	    	(key == "60c") && value > 0 && value != null || (key == "60cg") && value > 0 && value != null
	    ){ //Classic Wreath is available
		    $("#ClassicWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";
		    CradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    CradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
		 
	    }
		if( (key == "25v") && value > 0 && value != null || (key == "25vg") && value > 0 && value != null ||
	    	(key == "28v") && value > 0 && value != null || (key == "28vg") && value > 0 && value != null ||
	    	(key == "36v") && value > 0 && value != null || (key == "36vg") && value > 0 && value != null 
	    ){ //Victorian Wreath is available
		    $("#VictorianWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";
		    VradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    VradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
		}
		if( (key == "25cs") && value > 0 && value != null || (key == "25csg") && value > 0 && value != null || 
	    	(key == "28cs") && value > 0 && value != null || (key == "28csg") && value > 0 && value != null ||
	    	(key == "36cs") && value > 0 && value != null || (key == "36csg") && value > 0 && value != null
	    ){ //Cranberry Splash Wreath is available
		    $("#CranberrySplashWreath").removeClass('hidden'); 
		    var buttonLabel = key.slice(0,2) + "in.";	
		    SradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    SradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>'; 
		}
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
		    var buttonLabel = "";
		    CSradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    CSradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
		}
		if( (key == "sprayv") && value > 0 && value != null || 
			(key == "sprayvg") && value > 0 && value != null
	    ){ //Classic Spray
		    //$("#VictorianSpray").show();
		    $("#VictorianSpray").removeClass('hidden'); 
		    $("#VictorianSpray .split-custom-wrapper a").data("num",value);
		    $("#VictorianSpray .price span.num").html(value);
		    $("#VictorianSpray .split-custom-wrapper a").data("db-name",key);
		    var buttonLabel = "";
		    VSradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    VSradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
		}
		if( (key == "spraycs") && value > 0 && value != null || 
			(key == "spraycsg") && value > 0 && value != null ){ //Classic Spray
		    //$("#CranberrySpray").show();
		    $("#CranberrySpray").removeClass('hidden');
		    $("#CranberrySpray .split-custom-wrapper a").data("num",value);
		    $("#CranberrySpray .price span.num").html(value);
		    $("#CranberrySpray .split-custom-wrapper a").data("db-name",key);
		    var buttonLabel = "";
		    CSSradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    CSSradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
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
			var buttonLabel = "";
			CLCradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    CLCradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
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
			var buttonLabel = "";
			NSTradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    NSTradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
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
			$("#garland").removeClass('hidden');
			var buttonLabel = key.slice(0,2) + "ft.";
			GradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    GradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
		   
		    //$('#GarlandOption').controlgroup('container').append(radioBtn);
		}
		if( (key == "hanger") && value > 0 && value != null){
			//$("#EZWreathHanger").show();
			$("#EZWreathHanger").removeClass('hidden');
			$("#EZWreathHanger .split-custom-wrapper a").data("num",value);
			$("#EZWreathHanger .split-custom-wrapper a").data("db-name",key);
			$("#EZWreathHanger .price span.num").html(value);
			$(".addhangerprice").html(value);
			var buttonLabel = "";
			EZWradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    EZWradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';		
		    }
		if( (key == "led") && value > 0 && value != null){
			//$("#LEDlights").show();
			$("#LEDlights").removeClass('hidden');
			
			$("#LEDlights .split-custom-wrapper a").data("num",value);
			$("#LEDlights .split-custom-wrapper a").data("db-name",key);
			$("#LEDlights .price span.num").html(value);
			$(".addledprice").html(value);
			var buttonLabel = "";
			LLradioBtn += '<li class="ui-grid-b" id="row'+key+'" >';
		    LLradioBtn += '<div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';	
			
		}
		if($("#garland").hasClass('hidden') && $("#EZWreathHanger").hasClass('hidden') && $("#LEDlights").hasClass('hidden')){
			$("#other").addClass('hidden');//hide the other category
			$('#filterset').trigger('create');
		}else{
			$("#other").removeClass('hidden');
		}
		/*if(key == "user"){
			$(".your-profile").html(value);
		}
		if(key == "cust_id"){
			$(".your-group").html(value);
		}
		if(key == "wod"){
			$(".your-delivery").html(value);
		}*/
	
		//other parts
	    
	}).then(function() {
		//put the pricing on the items that need pricing added.
		//$('#ClassicOption').controlgroup('container').html(CradioBtn);
		$('#ClassicOption').html(CradioBtn);
		$('#VictorianOption').html(VradioBtn);
		$('#CranberryOption').html(SradioBtn);
		$('#ClassicSprayOption').html(CSradioBtn);
		$('#VictorianSprayOption').html(VSradioBtn);
		$('#CranberrySprayOption').html(CSSradioBtn);
		$('#CandlelitCenterpieceOption').html(CLCradioBtn);
		$('#GarlandOption').html(GradioBtn);
		$('#NorthStarTreeOption').html(NSTradioBtn);
		$('#EZWreathHangerOption').html(EZWradioBtn);
		$('#LedLightOption').html(LLradioBtn);
		
		//console.log("refresh");
	    //$("#ClassicOption").enhanceWithin().controlgroup("refresh");
	    $("#ClassicOption").enhanceWithin();
	    $("#VictorianOption").enhanceWithin(); 
	    $("#CranberryOption").enhanceWithin();
	    $("#ClassicSprayOption").enhanceWithin();
	    $("#VictorianSprayOption").enhanceWithin();
	    $("#CranberrySprayOption").enhanceWithin();
	    $("#CandlelitCenterpieceOption").enhanceWithin();
	    $('#GarlandOption').enhanceWithin();
	    $('#NorthStarTreeOption').enhanceWithin();
	    $('#EZWreathHangerOption').enhanceWithin();
		$('#LedLightOption').enhanceWithin();
	    
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
		$("#LEDlights .split-custom-wrapper a").data("quantities","");
		
		//need to make sure the page is loaded.
		$(".slickIt").trigger("click"); //now load the carousel
		$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
		
		
	    
	}).catch(function(err) {
	    // This code runs if there were any errors
	    console.log(err);
	});
	//update the page titles
		checkGroup();
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

/********* CHECKBOX UPDATE PRICING */
$(document).on('change', '.priceselect', function(event){ 
	var checkSelected = $(event.target).is('.checkbox-check:checked');
	var productID = $(this).parent().parent().parent().attr('id');
	var buttonID = $(event.target).parent().parent().parent().attr('id');//get the specific ID
	var data = $('#'+buttonID).find('.q').val();//field value
	if(checkSelected == true){//lets check if it is checked 
		//if it has not been clicked before
		if(data == 0){ var setVal = Number(data) + 1; $('#'+buttonID).find('.q').val(setVal); }
	}else{
		var setVal = 0; $('#'+buttonID).find('.q').val(setVal);
	}
	//now then lets set the values?
	//loop through all of the checked options
	var  optradioSelected = []; var Id = [];  var checkSize = []; var quantities = [];
	$('#'+productID).find('.checkbox-check').each(function () {
		if(this.checked){ 
			Id.push($(this).data('prod-id')); 
			optradioSelected.push($(this).val());
			checkSize.push($(this).prev('label').find(".sizeoption").text());
			quantities.push($(this).parent().parent().parent().find('.q').val());
		}
		//find the ID
	});
	//console.log(quantities);
	//set the ID's 
	$(this).parent().parent().parent().find('.split-custom-wrapper a').data("db-name",Id);
	$(this).parent().parent().parent().find('.split-custom-wrapper a').data("num",optradioSelected);
	var productName = $(this).parent().parent().find('h2').text(); //grab the product name
    $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product",productName);
    $(this).parent().parent().parent().find('.split-custom-wrapper a').data("quantity",quantities); 
    $(this).parent().parent().parent().find('.split-custom-wrapper a').data("product-size",checkSize); 
    //push the product option
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
                slidesPerView: 8,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 'auto',
                spaceBetween: 8,
                centeredSlides: false
            }
        }
    });
	$('.product-display').addClass("slicked");
	$('.product-display').removeClass("unslicked");
	
	$(this).addClass("ui-btn-active");
	$('.unslickIt').removeClass("ui-btn-active");
	//remove the listview layout
});

$(document).on('click', '.plus', function(event){ //Cart - button  
	//these have changed
	var productID = $(event.target).parent().parent().parent().parent().parent().attr('id');
	var buttonID = $(event.target).parent().parent().parent().parent().attr('id');//get the specific ID
	console.log(productID + " :" + buttonID);
	var data = $('#'+buttonID).find('.q').val();
	var setVal = Number(data) + 1;
	$('#'+buttonID).find('.q').val(setVal);
	if (!$('#'+ buttonID).find('input.checkbox-check').is(':checked')) { //if the product is unchecked lets check it. 
		$('#'+ buttonID).find('input.checkbox-check').click().checkboxradio("refresh");
	}
	console.log(productID);
	var quantities = [];
	console.log($(this).parent().parent().parent().find('.q').val());
	$('#'+productID).find('.checkbox-check').each(function () {
		console.log(this);
		
		if(this.checked){ //?
			quantities.push($(this).parent().parent().parent().find('.q').val());
		}
		//find the ID
	});
	console.log("Q: "+quantities);
	//set the ID's 
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().find('.split-custom-wrapper a').data("quantity",quantities); //set the quantity
	console.log(buttonID + " - " + data + " - " + productID);
	console.log(event.target);
});

$(document).on('click', '.minus', function(event){ //Cart - button 
	var productID = $(event.target).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('id');
	var buttonID = $(event.target).parent().parent().parent().parent().attr('id');//get the specific ID
	var data = $('#'+buttonID).find('.q').val();
	if(Number(data) == 1){ //if we are at 1 it will be 0 
		var setVal = 0;
		//$('#'+ buttonID).find('input.checkbox-check').prop('checked',false).checkboxradio("refresh"); //uncheck
		$('#'+ buttonID).find('input.checkbox-check').click().checkboxradio("refresh");
	}else{
		var setVal = Number(data) - 1;
	}
	if(Number(data) != 0){ //no negative numbers
		$('#'+buttonID).find('.q').val(setVal);
		console.log(buttonID + " - " + data + " - " + productID);
		console.log(event.target);
	}
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

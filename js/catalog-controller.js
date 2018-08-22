/* Cart Controller */

var MickmanAppLogin = MickmanAppLogin || {};

var ClassicWreathDescription = "This popular wreath is as traditional as Christmas itself. The Balsam Fir Classic Wreath is tastefully decorated with a long tailed, gold-backed velveteen bow and white tipped and glittered Ponderosa pine cones accented with red jingle bells which match the generous red bow.";

var VictorianWreathDescription = "These most popular Balsam Fir Holiday Evergree feature an exquisite satin bow with imprinted wired-gold edges to hold the generous loops of the ribbon. Trimmings include natural pine cones accented with gold jingle bells, and the matching Christmas bulbs finish off the look of these elegant Holiday Decorations.";

var WintergreenWreathDescription = "The truly unique look of these Holiday Evergreens will stand out in any neighborhood! The stylish green bow and trimmings are accented with bronzed cones laced with gold jingle bells.";

var CranberrySplashWreathDescription = "This traditionally festive wreath is made from natural Balsam Fir boughs and is decorated with a generous, 4” wide, fabric bow with gold wired edges. The ornamental trimmings include faux cranberry sprigs and gold Juniper twigs. Three naturally bronzed Ponderosa Pine cones laced with gold jingle bells set the finishing touches for this stunning addition to your holiday décor.";

var ClassicSprayDescription = "The combination of mixed evergreens of the Classic Spray are accented with a generous gold backed red velveteen bow which has wonderfully long tails. The white tipped & glittered pine cones are highlighted with festive red jingle bells which match the red bow. Either used by itself as a unique door decoration, or in concert with the Classic Wreath, the Classic Door Spray is appreciated by all.";

var VictorianSprayDescription = "These most popular Balsam Fir Holiday Evergreen feature an exquisite satin bow with imprinted wired-gold edges to hold the generous loops of the ribbon. Trimmings include natural pine cones accented with gold jingle bells, and the matching Christmas bulbs finish off the look of these elegant Holiday Decorations.";

var CranberrySprayDescription = "The Cranberry Splash Spray is made from natural mixed evergreen boughs and is decorated with a generous, 4” wide, fabric bow with gold wired edges. The ornamental trimmings include faux cranberry sprigs and gold Juniper twigs. Natural bronze Ponderosa pine cones laced with gold jingle bells set the finishing touches for this stunning addition to your Holiday Décor.";

var WintergreenSprayDescription = "The truly unique look of these Holiday Evergreens will stand out in any neighborhood! The stylish green bow and trimmings are accented with bronzed cones laced with gold jingle bells.";

var tabletoptreeDescription = "Each living tree arrives with 7 frosted and glittered cones with a ‘star garland’ accent. The container is wrapped in burlap with a generous matching ribbon and bow that adds to the natural ‘organic’ theme of this wonderful Table Top Christmas Tree. The LED light set, with timer, adds just the right amount of twinkle to this festive Table Top Christmas Tree. These nursery grown Dwarf Alberta Spruce Trees are about 22” tall. They will remain fresh through the holidays with regular watering as per the care instructions which accompany each tree. These trees can be planted outdoors after the holidays to enjoy for years to come!";

var garlandDescription = "Available in both 25’ or 50’ lengths, these garlands add the perfect holiday touch to entryways, deck railings and a host of other outdoor home applications.";

var HolidayCenterpieceDescription = "This seasonal centerpiece, as pictured, is bursting with naturally scented mixed evergreens which stay fresh and moist from the  oral foam base. The festive decorations are certain to delight your guests and lend a joyful air to your Holiday Celebrations!";

var LEDlightsDescription = "Add just the right amount of twinkle to all of your holiday evergreens! <ul><li>23 - miniature ‘dew drop’ lights</li><li>Choose a steady light setting or a gently twinkling setting for additional interest.<li>Automatic Timer features 6 hours on & 18 hours off.</li><li>Uses 3 – AA Batteries lasting for about a week* (not included)</li><li>Thin  exible wire allows for effortless installation</li></ul><br>*Battery life is an estimate based upon timer use. Cold weather may decrease battery life.";

var EZWreathHangerDescription = "Our customized EZ Hanger® allows you to easily display your wreath or spray in seconds.<ul><li>No Nails</li><li>No Hammers</li><li>Easy Installation</li></ul>";

var CradioBtn = ""; //Classic
var VradioBtn = ""; //Victorian
var SradioBtn = ""; //Cranberry 
var WradioBtn = ""; //2018 
var CSradioBtn = ""; //Classic Spray
var VSradioBtn = ""; //Victorian Spray
var CSSradioBtn = ""; //Cranberry Splash Spray
var WSradioBtn = ""; //2018
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
    //remove the options ? - is this causing log out - in issues?
    $('#ClassicOption').html("");
	$('#VictorianOption').html("");
	$('#CranberryOption').html("");
	$('#WintergreenOption').html("");//2018
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
	//console.log(data);
	for(j=0;j<data.length;j++){
		if(data[j][1] != "" || data[j][1] != 0){//check for blanks
			productList.push([data[j][0], data[j][1]]);
		}else{
			productList.push([data[j][0], 0]);//lets clear it out
		}
	}
	var promises = productList.map(function(item) {
		return productdb.setItem(item[0],item[1]);
	});
	
	Promise.all(promises).then(function(results) {
	    checkGroup("promise"); //-- 1.25 turned this off - turned off the init but turned this one back on
	});
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
}
/*Build out page - grab the data from the database and show what the user set up on his website.*/
MickmanAppLogin.CatalogController.prototype.getSavedData = function(){ //This now only runs once when the page is 
	$('.addtocart').addClass('ui-disabled');
	$.mobile.loading("show");  // Show loading graphic
	// ALL OF THE DYNAMIC ITEMS NEED TO BE REFRESHED AFTER THEY ARE CLEARED.
	//clear out the orders section
	$(".orderList").html("");
	$(".orderList").enhanceWithin();
	
	console.log("Fill out the Catalog");
	
	//hide everything 
	$("#ClassicWreath").addClass('hidden'); 
	$("#VictorianWreath").addClass('hidden');  
	$("#CranberrySplashWreath").addClass('hidden'); 
	$("#WintergreenWreath").addClass('hidden'); //2018
	
	$("#ClassicSpray").addClass('hidden'); 
	$("#VictorianSpray").addClass('hidden'); 
	$("#CranberrySpray").addClass('hidden'); 
	$("#WintergreenSpray").addClass('hidden'); //2018
	
	$("#HolidayCenterpiece").addClass('hidden'); 
	$("#tabletoptree").addClass('hidden'); 
	$("#garland").addClass('hidden'); 
	$("#EZWreathHanger").addClass('hidden'); 
	$("#Bags").addClass('hidden'); 
	$("#LEDlights").addClass('hidden'); 
	
	//clear buttons to make sure there isn't duplicates
	CradioBtn = "";VradioBtn = "";SradioBtn = "";
	CSradioBtn = "";VSradioBtn = "";CSSradioBtn = "";
	CLCradioBtn = "";GradioBtn = "";NSTradioBtn = "";
	EZWradioBtn = "";LLradioBtn = "";
	WradioBtn = "";WSradioBtn = "";//2018
	
	$('#ClassicOption').html("");
	$('#VictorianOption').html("");
	$('#CranberryOption').html("");
	$('#WintergreenOption').html("");//
	$('#GarlandOption').html("");
				    
    $("#ClassicSprayOption").html("");
    $("#VictorianSprayOption").html("");
    $("#CranberrySprayOption").html("");
    $("#WintergreenSprayOption").html("");
    $("#CandlelitCenterpieceOption").html("");
    $('#NorthStarTreeOption').html("");
    $('#EZWreathHangerOption').html("");
	$('#LedLightOption').html("");
    // lets check to make sure that we have the correct user before loading this function
    var productuser;
    
    //var opt = new Object;
    var optC = [];
    var optV = [];
    var optCS = [];
    var optW = [];//2018
    var optG = [];
    
    productdb.getItem('user').then( function(value){
	    productuser = value;
	    
    	user.getItem('user').then( function(value){
	    	
	    	if(value == productuser){ //from here we should load the catalog
		    	console.log("we have a match it is ok to continue on" + value + ":" + productuser);
		    	
				productdb.iterate(function(value, key, iterationNumber) {
					//console.log(key + "-" + iterationNumber);
				    if( (key == "25c") && value > 0 && value != null || (key == "25cg") && value > 0 && value != null ){
					    optC[0] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if( (key == "28c") && value > 0 && value != null || (key == "28cg") && value > 0 && value != null ){
					    optC[1] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if( (key == "36c") && value > 0 && value != null || (key == "36cg") && value > 0 && value != null ){
					    optC[2] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if( (key == "48c") && value > 0 && value != null || (key == "48cg") && value > 0 && value != null ){
					    optC[3] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if ( (key == "60c") && value > 0 && value != null || (key == "60cg") && value > 0 && value != null ){ 					    		optC[4] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if(optC.length != 0){ //Classic Wreath is available
					    $("#ClassicWreath").removeClass('hidden');
					    $("#ClassicWreath").addClass('show');
				    }
				    
					if( (key == "25v") && value > 0 && value != null || (key == "25vg") && value > 0 && value != null){
						optV[0] = new Array(key,value,(key.slice(0,2) + "in."));
					}
				    if( (key == "28v") && value > 0 && value != null || (key == "28vg") && value > 0 && value != null){
					    optV[1] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if( (key == "36v") && value > 0 && value != null || (key == "36vg") && value > 0 && value != null){
					    optV[2] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if(optV.length != 0){ //Victorian Wreath is available
					   $("#VictorianWreath").removeClass('hidden'); 
					   $("#VictorianWreath").addClass('show');
				    }
					
				
					if( (key == "25cs") && value > 0 && value != null || (key == "25csg") && value > 0 && value != null){
						optCS[0] = new Array(key,value,(key.slice(0,2) + "in."));
					} 
				    if( (key == "28cs") && value > 0 && value != null || (key == "28csg") && value > 0 && value != null){
					    optCS[1] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
				    if( (key == "36cs") && value > 0 && value != null || (key == "36csg") && value > 0 && value != null){ 
					    optCS[2] = new Array(key,value,(key.slice(0,2) + "in."));
					}
					if(optCS.length != 0){ //Cranberry Splash Wreath is available
						$("#CranberrySplashWreath").removeClass('hidden');
						$("#CranberrySplashWreath").addClass('show'); 
					}
					
					//2018
					if( (key == "25w") && value > 0 && value != null || (key == "25wg") && value > 0 && value != null){
						optW[0] = new Array(key,value,(key.slice(0,2) + "in."));
					} 
				    if( (key == "28w") && value > 0 && value != null || (key == "28wg") && value > 0 && value != null){
					    optW[1] = new Array(key,value,(key.slice(0,2) + "in."));
				    }
					if(optW.length != 0){ //Wintergreen Wreath is available
						$("#WintergreenWreath").removeClass('hidden');
						$("#WintergreenWreath").addClass('show'); 
					}
					
					//category display option
				    if($("#ClassicWreath").hasClass('hidden') && $("#VictorianWreath").hasClass('hidden') && $("#CranberrySplashWreath").hasClass('hidden') && $("#WintergreenWreath").hasClass('hidden')){ //2018
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
					    $("#ClassicSpray").addClass('show'); 
					    $("#ClassicSpray .split-custom-wrapper a").data("num",value);
					    $("#ClassicSpray .price span.num").html(value);
					    $("#ClassicSpray .split-custom-wrapper a").data("db-name",key);
					    var buttonLabel = "";
					    CSradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
					}
					if( (key == "sprayv") && value > 0 && value != null || 
						(key == "sprayvg") && value > 0 && value != null
				    ){ //Classic Spray
					    //$("#VictorianSpray").show();
					    $("#VictorianSpray").removeClass('hidden'); 
					    $("#VictorianSpray").addClass('show'); 
					    $("#VictorianSpray .split-custom-wrapper a").data("num",value);
					    $("#VictorianSpray .price span.num").html(value);
					    $("#VictorianSpray .split-custom-wrapper a").data("db-name",key);
					    var buttonLabel = "";
					    VSradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
					}
					if( (key == "spraycs") && value > 0 && value != null || 
						(key == "spraycsg") && value > 0 && value != null ){ //Classic Spray
					    //$("#CranberrySpray").show();
					    $("#CranberrySpray").removeClass('hidden');
					    $("#CranberrySpray").addClass('show'); 
					    $("#CranberrySpray .split-custom-wrapper a").data("num",value);
					    $("#CranberrySpray .price span.num").html(value);
					    $("#CranberrySpray .split-custom-wrapper a").data("db-name",key);
					    var buttonLabel = "";
					    CSSradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
					}
					//2018
					if( (key == "sprayw") && value > 0 && value != null || 
						(key == "spraywg") && value > 0 && value != null ){ //Wintergreen Spray
					    $("#WintergreenSpray").removeClass('hidden');
					    $("#WintergreenSpray").addClass('show'); 
					    $("#WintergreenSpray .split-custom-wrapper a").data("num",value);
					    $("#WintergreenSpray .price span.num").html(value);
					    $("#WintergreenSpray .split-custom-wrapper a").data("db-name",key);
					    var buttonLabel = "";
					    WSradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
					}
					
					if($("#ClassicSpray").hasClass('hidden') &&  $("#VictorianSpray").hasClass('hidden') && $("#CranberrySpray").hasClass('hidden') && $("#WintergreenSpray").hasClass('hidden')){ //2018
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
						$("#HolidayCenterpiece").addClass('show'); 
			
						$("#HolidayCenterpiece .split-custom-wrapper a").data("num",value);
						$("#HolidayCenterpiece .price span.num").html(value);
						$("#HolidayCenterpiece .split-custom-wrapper a").data("db-name",key);
						var buttonLabel = "";
					    CLCradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
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
						$("#tabletoptree").addClass('show'); 
						$("#tabletoptree .split-custom-wrapper a").data("num",value);
						$("#tabletoptree .price span.num").html(value);
						$("#tabletoptree .split-custom-wrapper a").data("db-name",key);
						var buttonLabel = "";
					    NSTradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';
					}
					if($("#tabletoptree").hasClass('hidden')){
						console.log("tree should be hidden");
						$("#tree").addClass('hidden');//hide the other category
						$('#filterset').trigger('create');
					}else{
						console.log("show tree button");
						$("#tree").removeClass('hidden');
					}
					
					if( (key == "25gar") && value > 0 && value != null){
						optG[0] = new Array(key,value,(key.slice(0,2) + "in."));
					}
					if( (key == "50gar") && value > 0 && value != null){
						optG[1] = new Array(key,value,(key.slice(0,2) + "in."));
					}
					if( (key == "25garg") && value > 0 && value != null){
						optG[3] = new Array(key,value,(key.slice(0,2) + "in."));
					}
					if( (key == "50garg") && value > 0 && value != null){ //Garland
						optG[4] = new Array(key,value,(key.slice(0,2) + "in."));
					}
					if(optG.length != 0){
						$("#garland").removeClass('hidden');
					}
					if( (key == "hanger") && value > 0 && value != null){
						//$("#EZWreathHanger").show();
						$("#EZWreathHanger").removeClass('hidden');
						$("#EZWreathHanger").addClass('show'); 
						$("#EZWreathHanger .split-custom-wrapper a").data("num",value);
						$("#EZWreathHanger .split-custom-wrapper a").data("db-name",key);
						$("#EZWreathHanger .price span.num").html(value);
						$(".addhangerprice").html(value);
						var buttonLabel = "";
					    EZWradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';		
					    }
					if( (key == "led") && value > 0 && value != null){
						//$("#LEDlights").show();
						$("#LEDlights").removeClass('hidden');
						$("#LEDlights").addClass('show'); 
						
						$("#LEDlights .split-custom-wrapper a").data("num",value);
						$("#LEDlights .split-custom-wrapper a").data("db-name",key);
						$("#LEDlights .price span.num").html(value);
						$(".addledprice").html(value);
						var buttonLabel = "";
					    LLradioBtn = '<li class="ui-grid-b" id="row'+key+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+key+'" data-prod-id="'+key+'" value="'+value+'" data-mini="true"/><label for="wreath'+key+'"><span class="sizeoption">&nbsp;'+buttonLabel+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-mini ui-btn"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+value+'</span></div></li>';	
						
					}
					if($("#garland").hasClass('hidden') && $("#EZWreathHanger").hasClass('hidden') && $("#LEDlights").hasClass('hidden')){
						$("#other").addClass('hidden');//hide the other category
						$('#filterset').trigger('create');
					}else{
						$("#other").removeClass('hidden');
					}
				    if(key == "user"){
					    CurrentUser = key;		    
				    }
				}).then(function() {
					//put the pricing on the items that need pricing added.
					//loop through arrays to build out the options menu
						CradioBtn = "";
						$.each( optC, function( i, val ) {
							if(val){
								console.log(val[0]);
								CradioBtn += '<li class="ui-grid-b" id="row'+val[0]+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+val[0]+'" data-prod-id="'+val[0]+'" value="'+val[1]+'" data-mini="true"/><label for="wreath'+val[0]+'"><span class="sizeoption">'+val[2]+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+val[1]+'</span></div></li>';
							}
						});
						VradioBtn = "";
						$.each( optV, function( i, val ) {
							if(val){
								console.log(val[0]);
								VradioBtn += '<li class="ui-grid-b" id="row'+val[0]+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+val[0]+'" data-prod-id="'+val[0]+'" value="'+val[1]+'" data-mini="true"/><label for="wreath'+val[0]+'"><span class="sizeoption">'+val[2]+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+val[1]+'</span></div></li>';
							}
						});
						SradioBtn = "";
						$.each( optCS, function( i, val ) {
							if(val){
								console.log(val[0]);
								SradioBtn += '<li class="ui-grid-b" id="row'+val[0]+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+val[0]+'" data-prod-id="'+val[0]+'" value="'+val[1]+'" data-mini="true"/><label for="wreath'+val[0]+'"><span class="sizeoption">'+val[2]+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+val[1]+'</span></div></li>';
							}
						});
						WradioBtn = "";//2018
						$.each( optW, function( i, val ) {
							if(val){
								console.log(val[0]);
								WradioBtn += '<li class="ui-grid-b" id="row'+val[0]+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+val[0]+'" data-prod-id="'+val[0]+'" value="'+val[1]+'" data-mini="true"/><label for="wreath'+val[0]+'"><span class="sizeoption">'+val[2]+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+val[1]+'</span></div></li>';
							}
						});
						GradioBtn = "";
						$.each( optG, function( i, val ) {
							if(val){
								console.log(val[0]);
								GradioBtn += '<li class="ui-grid-b" id="row'+val[0]+'" ><div class="ui-block-a"><input type="checkbox" class="checkbox-check" name="size" id="wreath'+val[0]+'" data-prod-id="'+val[0]+'" value="'+val[1]+'" data-mini="true"/><label for="wreath'+val[0]+'"><span class="sizeoption">'+val[2]+'</span></label></div><div class="ui-block-b"><div data-role="controlgroup" data-type="horizontal"><a href="#" class="ui-mini ui-btn ui-corner-all minus">-</a><input type="text" class="q" value="0" disabled="disabled" data-wrapper-class="controlgroup-textinput ui-btn" data-mini="true"/><a href="#" class="ui-mini ui-btn ui-corner-all plus">+</a></div></div><div class="ui-block-c"><span class="labelprice">$'+val[1]+'</span></div></li>';
							}
						});
						
					//}
					
					console.log(CradioBtn);
					$('#ClassicOption').html("").html(CradioBtn).enhanceWithin();
					//$('#ClassicOption').html(CradioBtn);
					$('#VictorianOption').html("").html(VradioBtn).enhanceWithin();
					$('#CranberryOption').html("").html(SradioBtn).enhanceWithin();
					$('#WintergreenOption').html("").html(WradioBtn).enhanceWithin();//2018
					$('#ClassicSprayOption').html("").html(CSradioBtn).enhanceWithin();
					$('#VictorianSprayOption').html("").html(VSradioBtn).enhanceWithin();
					$('#CranberrySprayOption').html("").html(CSSradioBtn).enhanceWithin();
					$('#WintegreenSprayOption').html("").html(WGSradioBtn).enhanceWithin();//2018
					$('#CandlelitCenterpieceOption').html("").html(CLCradioBtn).enhanceWithin();
					$('#GarlandOption').html("").html(GradioBtn).enhanceWithin();
					$('#NorthStarTreeOption').html("").html(NSTradioBtn).enhanceWithin();
					$('#EZWreathHangerOption').html("").html(EZWradioBtn).enhanceWithin();
					$('#LedLightOption').html("").html(LLradioBtn).enhanceWithin();
				    
				    //activate non radio buttons
				    var productName = $("#ClassicSpray h2").text();
					$("#ClassicSpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
				    $("#ClassicSpray .split-custom-wrapper a").data("product-size",0);
				    
				    var productName = $("#VictorianSpray h2").text();
					$("#VictorianSpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
				    $("#VictorianSpray .split-custom-wrapper a").data("product-size",0);
				    
				    var productName = $("#CranberrySpray h2").text();
					$("#CranberrySpray .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
				    $("#CranberrySpray .split-custom-wrapper a").data("product-size",0); 
				    
				    var productName = $("#WintergreenSpray h2").text(); //2018
					$("#WintergreeenSpray .split-custom-wrapper a").data("product",productName); //2018
				    $("#wintergreenSpray .split-custom-wrapper a").data("product-size",0); //2018
				    
					var productName = $("#HolidayCenterpiece h2").text();
					$("#HolidayCenterpiece .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
					$("#HolidayCenterpiece .split-custom-wrapper a").data("product-size",0); //push the product size to the checkout area.
					
					var productName = $("#tabletoptree h2").text();
					$("#tabletoptree .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
					$("#tabletoptree .split-custom-wrapper a").data("product-size",0); //push the product size to the checkout area.
				    
					var productName = $("#EZWreathHanger h2").text();
					$("#EZWreathHanger .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
					$("#EZWreathHanger .split-custom-wrapper a").data("product-size",0); //push the product size to the checkout area.
					
					var productName = $("#LEDlights h2").text();
					$("#LEDlights .split-custom-wrapper a").data("product",productName); //push the product name to the checkout area.
					$("#LEDlights .split-custom-wrapper a").data("product-size",0); //push the product size to the checkout area.
					//$("#LEDlights .split-custom-wrapper a").data("quantities","");
				
					//need to make sure the page is loaded.
					$.mobile.loading("hide");
					$('.addtocart').removeClass('ui-disabled');//hopefully this fixes the phantom product issue
					
					$(".slickIt").trigger("click"); //now load the carousel
					//$('#page-main-menu div[data-role=header]').find('h1').html(group);//replace title 
					$('.banner-text').find('p').html(groupname);//replace title 
					    
				}).catch(function(err) {
				    // This code runs if there were any errors
				    console.log("E: " + err);
				});
				console.log("Get Saved Data");
				
				//lets query for the user data too
				this.getUserData(); //only load this on the first time around after the catalog is in there
	    	}else{
		    	console.log("err: " + value + " and " + productuser + "do not match");
	    	}
	    });
    });
    
    
    
	
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
            startTransform: 'scale(1.1)',
            
            //panOnlyWhenZoomed: true,
            minScale: 0.5,
            contain: 'automatic'
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

//sort products sample
function showProductsbyCat( cat ){
  console.log(cat);
  if ( cat == 'all'){
	
	//then we will show the rest. 
    $('#products-hidden .slider').each(function(){
       var owl = $(".slider-wrapper").data('owlCarousel');
       elem = $(this).parent().html();

       owl.addItem(elem);
       $(this).parent().remove();
    });
  }else{
	  
    $('#products-hidden .slider.'+ cat).each(function(){
       var owl = $(".slider-wrapper").data('owlCarousel');
       elem = $(this).parent().html();

       owl.addItem( elem );
       $(this).parent().remove();
    });

    $('#projects-carousel .slider:not(.project.'+ cat + ')').each(function(){
	   //console.log($(this).parent().index());
       var owl = $(".slider-wrapper").data('owlCarousel');
       targetPos = $(this).parent().index();
       elem = $(this).parent();

       $( elem ).clone().appendTo( $('#projects-hidden') );
       owl.removeItem(targetPos);
       $(".slider-wrapper").trigger('refresh.owl.carousel');
    });
  }
}


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
	    
	   var swiper = $('.swiper-container')[0].swiper;
	   swiper.update();
	   swiper.slideTo(0,1000,false);
	   swiper.update();
    }
    $(this).addClass('ui-btn-active');
});

$(".slickIt").on('click', function(){ //rotating area
	//remove the slides we aren't going to need.
	console.log("Swiper fired");
	$(".product-display").addClass('swiper-container');
	$(".product-wrapper").addClass('swiper-wrapper');
		
	if(swiperRunning != 1){
    }else{
	    var mySwiper = $('.swiper-container')[0].swiper;
	    mySwiper.destroy();//true,true
	    mySwiper = undefined;
	    console.log("swiper booted - remove and restart");
	    swiperRunning = 0;
    }
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 8,
        mode: 'horizontal',
        initialSlide: 0,
        loop: false,
        slidesPerView: 1,
        grabCursor: true,
        onInit: function(swiper){
        // do something
        	swiperRunning = 1;
        	console.log("swiper init");
    	}
    });
    //slide to the first slide if we are redoing it. 
    //swiper.slideTo(0,1000,false); 
    
	$('.product-display').addClass("slicked");
	$('.product-display').removeClass("unslicked");
	
	$(this).addClass("ui-btn-active");
	$('.unslickIt').removeClass("ui-btn-active");
	//remove the listview layout
});

$(".unslickIt").on('click', function(){ //list view
	//this should be destroying the swiper not allowing the 
	var mySwiper = $('.swiper-container')[0].swiper;
    //var mySwiper = $('.swiper-container');
    mySwiper.destroy();//true,true
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
	swiperRunning = 0;
	//style it as a listview
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
		//console.log(this);
		
		if(this.checked){ //?
			quantities.push($(this).parent().parent().parent().find('.q').val());
		}
		//find the ID
	});
	//console.log("Q: "+quantities);
	//set the ID's 
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().find('.split-custom-wrapper a').data("quantity",quantities); //set the quantity
	//console.log(buttonID + " - " + data + " - " + productID);
	//console.log(event.target);
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
		//console.log(buttonID + " - " + data + " - " + productID);
		//console.log(event.target);
	}
});



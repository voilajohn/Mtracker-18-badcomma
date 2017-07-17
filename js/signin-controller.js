/*
	Source Code logic 
	Original code from the BookIt App example.
*/
var MickmanAppLogin = MickmanAppLogin || {};

MickmanAppLogin.SignInController = function () {
    this.$signInPage = null;
    this.$btnSubmit = null;
    this.$txtUserName = null;
    this.$txtPassword = null;
    this.$chkKeepSignedIn = null;
    this.$ctnErr = null;
    this.mainMenuPageId = null;
};

//create custom db per user for products - new #1.25
MickmanAppLogin.SignInController.prototype.CreateProductDB = function (name,id,x) {
	productdb = "product"+name+"-"+id;
	productdb = localforage.createInstance({ //Orders Database
		name: productdb
	});
	//we want to make sure that the proper products are loaded!!
	if(x != "orderBuild"){
		app.catalogController.getSavedData(); //load the saved data into the catalog
		console.log("- - - > load catalog");
	}
	console.log("catalog called - " + x);
}

MickmanAppLogin.SignInController.prototype.init = function () {
    this.$signInPage = $("#page-signin");
    this.mainMenuPageId = "#page-main-menu";
    this.$btnSubmit = $("#btn-submit", this.$signInPage);
    this.$ctnErr = $("#ctn-err", this.$signInPage);
    this.$txtUserName = $("#txt-user-name", this.$signInPage);
    this.$txtPassword = $("#txt-password", this.$signInPage);
    this.$tryLogin = $("#try-login", this.$signInPage);
    this.$chkKeepSignedIn = $("#chk-keep-signed-in", this.$signInPage);
};

MickmanAppLogin.SignInController.prototype.resetSignInForm = function () {
    var invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    this.$ctnErr.html("");
    this.$ctnErr.removeClass().addClass(invisibleStyle);
    this.$txtUserName.removeClass(invalidInputStyle);
    this.$txtPassword.removeClass(invalidInputStyle);
    this.$txtUserName.val("");
    this.$txtPassword.val("");
    this.$chkKeepSignedIn.prop("checked", false);
};

MickmanAppLogin.SignInController.prototype.onSignInCommand = function () {
	console.log("prod-db: "+productdb);
    var me = this,
        userName = me.$txtUserName.val().trim(),
        password = me.$txtPassword.val().trim(),
        tryLogin = me.$tryLogin.val().trim(),
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtUserName.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    if (userName.length === 0) { // check that there is a username entered.
        me.$txtUserName.addClass(invalidInputStyle);
        invalidInput = true;
        console.log("empty user");
    }
    
    if (password.length === 0) { // check that there is a password entered.
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
        console.log("empty pass");
    }
    
    if (invalidInput) {  // Make sure that all the required fields have values.
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }
    //check for cart contents
	console.log("logging in - clear cart");
	cart.clear().then(function(){
		console.log("cart db is empty");
		//clear out the cart contents
		
	}).catch(function(err){
		console.log(err);
	});
	
    $.mobile.loading("show");  // Show loading graphic
    $.ajax({
        type: 'POST',
        url: MickmanAppLogin.Settings.signInUrl,
        data: "user=" + userName + "&password=" + password + "&try-login=" + tryLogin,
        success: function (resp) {
            $.mobile.loading("hide");
            console.log(resp);
            if(resp == ""){
	            console.log("Error: server issues");
	            me.$ctnErr.html("<p>Sorry there appears to be a server issue: please standby while we work on getting the issue resolved.</p>");
											  me.$ctnErr.addClass("bi-ctn-err").slideDown();
											  me.$txtUserName.addClass(invalidInputStyle);
	        }else{
	            if (resp.success === true) { // If the login method changes this part can be skipped
	                if(resp.extras.users){//build out the menu
		                $('#select-choice-1').html(""); //prevent big lists from multiple logins
		                var users = resp.extras.users;
		                var ids = resp.extras.ids;
		                
		                $.each(users, function(bb){
			                var Uname = (users[bb]);
			                var Uid = (ids[bb]);
			                $('#select-choice-1').append('<option value="'+Uname+'" id="'+Uid+'">'+Uname+'</option>');
			            });
			            var userDeets = resp.extras.products;
			            var group = userDeets[userDeets.indexOf('cust_id') + 1][1];
			            var wod = userDeets[userDeets.indexOf('wod') + 2][1];
			            //var gname = userDeets[userDeets.indexOf('groupname')][1];
			            //var message = userDeets[userDeets.indexOf('message')][1];
			            //console.log(userDeets.indexOf('groupname'));
			            
			            $(".mygroup").html(resp.extras.cust_id);
			            $('#select-choice-1').selectmenu("refresh"); //make sure that the items load
			            //name is chosen - lets now create the products db and load up the interface
	                	$(".startSession").click(function(){//They need to choose a user
		                	
		                	app.signInController.CreateProductDB($('#select-choice-1').val(),$('#select-choice-1 :selected').attr('id'),"createProducts"); //create unique products db
		                	
					        var key = [
					        	["user",$('#select-choice-1').val()],
					        	["id",$('#select-choice-1 :selected').attr('id')],
					        	["wod",wod],
					        	["group",group]
					        	//,
					        	//["groupname",gname],
					        	//["message",message]
					        ];
							var promises = key.map(function(item) { 
								return user.setItem(item[0],item[1]);
							});
							Promise.all(promises).then(function(results) {
								$.mobile.loading("show");//show spinner
								app.catalogController.storeData($('#select-choice-1').val(),resp.extras.products);
								
								//put the additional stuff into the DB
			                	var today = new Date();
				                var expirationDate = new Date();
				                expirationDate.setTime(today.getTime() + MickmanAppLogin.Settings.sessionTimeoutInMSec);
				                
				                //left save all this stuff to a local database to get later 
				                // - this may take over for the localdata stuff	
				                
				                var token = resp.extras.sessionID;
				                var memberProf = $('#select-choice-1').val();
				                var groupName = resp.extras.products[1][1];//find this in the code
				                var UserID = $('#select-choice-1 :selected').attr('id');
				                
				                //create the session variables
				                MickmanAppLogin.Session.getInstance().set({//local variable for checking the sessions
				                    userProfileModel:  memberProf,
				                    userGroup: groupName,
				                    sessionId: token,
				                    userId: UserID,
				                    expirationDate: expirationDate,
				                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
				                });
				               
				                $.ajax({  //save this the users token to the db. 
							        type: 'POST',
							        url: MickmanAppLogin.Settings.tokenUrl,
							        data: "user=" + userName + "&password=" + password + "&member=" + memberProf + "&senttoken=" + token,
							        success: function (response) {
								    	$.mobile.loading("hide");
										if(response.success === true){
											token = response.extras.token;
											backup = $('product-display').clone();
											//ADD TO DB - PRODUCTS 
											user.setItem("token",token);//push the token to the database
											$.mobile.navigate(me.mainMenuPageId); //if that is successful we will reroute them to the catalog page
										}else{ //show an error message.
											  me.$ctnErr.html("<p>There was an error loading your profile. Please check your connection and try again.</p>");
											  me.$ctnErr.addClass("bi-ctn-err").slideDown();
											  me.$txtUserName.addClass(invalidInputStyle);
										}
									},
									//YOU WERE ADDING THE RESPONSE TO THE PHP AND TRYING TO GET IT TO LOGIN AND STORE THE TOKEN TO BE USED IN THE SYNC OPERATION
							        error: function (e) {
							            $.mobile.loading("hide");
							            console.log(e);
							            // TODO: Use a friendlier error message below.
							            me.$ctnErr.html("<p>Oops! It looks like we had a problem and could not log you on.  Please try again in a few minutes.</p>");
							            me.$ctnErr.addClass("bi-ctn-err").slideDown();
							        }
				                });
								
								
								
							});
		                
			                
			                
	                	});
						//pop up window with selection
						$( "#confirm-member" ).popup( "open");
	                }else{
		                me.$ctnErr.html("<p>Oops! It looks like your leader hasn't added members yet.</p>");
	                    me.$ctnErr.addClass("bi-ctn-err").slideDown();
	                }
	                return;
	            } else {
	                if (resp.extras.msg) {
		                console.log(resp.extras.msg);
	                    switch (resp.extras.msg) {
	                        case 0: //MickmanAppLogin.ApiMessages.DB_ERROR:
	                        // TODO: Use a friendlier error message below.
	                            me.$ctnErr.html("<p>Oops! It looks like we had a problem and could not log you on.  Please try again in a few minutes.</p>");
	                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
	                            break;
	                        case 1: //MickmanAppLogin.ApiMessages.INVALID_PWD:
	                        
	                        case 2: //MickmanAppLogin.ApiMessages.EMAIL_NOT_FOUND:
	                            me.$ctnErr.html("<p>You entered a wrong username or password.  Please try again.</p>");
	                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
	                            me.$txtUserName.addClass(invalidInputStyle);
	                            break;
	                        default:
	                        	me.$ctnErr.html("<p>Something Unexpected Happened.  Please try again.</p>");
	                            me.$ctnErr.addClass("bi-ctn-err").slideDown();
	                            me.$txtUserName.addClass(invalidInputStyle);
	                            break;
	                    }
	                }else{
		                console.log("nothing back");
	                }
	            }
	        }//server issue message
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! It looks like we had a problem and could not log you on.  Please try again in a few minutes. ("+ JSON.stringify(e, null, 4)+")</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};

function restartApplication(){
	//show splash screen
	//navigator.splashscreen.show();
	console.log("location reloading page");
	window.location = initialHref;
}

//sign out button
$(".signOut").on('click', function(){ 
	user.clear().then(function() {//clear out the current user data
		console.log("should change pages to page-signin");
		$(".orderList").addClass("hidden");
		
		//clear product settings
		$("#ClassicSprayOption").html(""); 
	    $("#VictorianSprayOption").html("");
	    $("#CranberrySprayOption").html("");
	    $("#CandlelitCenterpieceOption").html("");
	    $('#NorthStarTreeOption').html("");
	    $('#EZWreathHangerOption').html("");
		$('#LedLightOption').html("");	
		CradioBtn = "";VradioBtn = "";SradioBtn = ""; //clear options
		CSradioBtn = "";VSradioBtn = "";CSSradioBtn = "";
		CLCradioBtn = "";GradioBtn = "";NSTradioBtn = "";
		EZWradioBtn = "";LLradioBtn = "";
		
		//remove swiper
		//$('.swiper-wrapper').slick('unslick'); //clean up catalog
		//$(".swiper-wrapper div.slider").each( function(){
		//	console.log($(this));
		//	$(this).addClass('hidden');
		//	$(this).removeClass('show');
		//});
		
		window.localStorage.removeItem('mickman-session'); //remove the session key
		productdb = ""; //clear out the current productdb var
		loadCatCalled = 0; //reset this variable
		
		//old
		var mySwiper = $('.swiper-container')[0].swiper; 
		mySwiper.destroy();		
		mySwiper = undefined;
		
		$(':mobile-pagecontainer').pagecontainer('change', '#page-signin');//go to next page
		//empty the cart
		//$('.emptyTCart').click();
		app.cartController.flushCart("logout");
		restartApplication(); //reload the DOM
		
		console.log("called restart");
	}) 
});
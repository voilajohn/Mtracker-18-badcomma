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
	
    $.mobile.loading("show");  // Show loading graphic
    $.ajax({
        type: 'POST',
        url: MickmanAppLogin.Settings.signInUrl,
        data: "user=" + userName + "&password=" + password + "&try-login=" + tryLogin,
        success: function (resp) {
	        
            $.mobile.loading("hide");
            console.log(resp);
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
		            $(".mygroup").html(resp.extras.cust_id);
		            $('#select-choice-1').selectmenu("refresh"); //make sure that the items load
                	$(".startSession").click(function(){//They need to choose a user
	                	//ADD TO DB - PRODUCTS
	                	product.setItem("id",$('#select-choice-1 :selected').attr('id'));//push the userID to the database 
		                app.catalogController.storeData($('#select-choice-1').val(),resp.extras.products);//put the additional stuff into the DB
		              
	                	var today = new Date();
		                var expirationDate = new Date();
		                expirationDate.setTime(today.getTime() + MickmanAppLogin.Settings.sessionTimeoutInMSec);
		                
		                //left save all this stuff to a local database to get later - this may take over for the localdata stuff	
		                var token = resp.extras.sessionID;
		                var memberProf = $('#select-choice-1').val();
		                var groupName = resp.extras.products[2][1];//find this in the code
		                var UserID = $('#select-choice-1 :selected').attr('id');
		                console.log("id-" + groupName);
		                MickmanAppLogin.Session.getInstance().set({//local variable for checking the sessions
		                    userProfileModel:  memberProf,
		                    userGroup: groupName,
		                    sessionId: token,
		                    userId: UserID,
		                    expirationDate: expirationDate,
		                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
		                });
		               
		                $.mobile.loading("show");
		               
		                $.ajax({  //save this the users token to his db. 
					        type: 'POST',
					        url: MickmanAppLogin.Settings.tokenUrl,
					        data: "user=" + userName + "&password=" + password + "&member=" + memberProf + "&senttoken=" + token,
					        success: function (response) {
						    	$.mobile.loading("hide");
								if(response.success === true){
									token = response.extras.token;
									//ADD TO DB - PRODUCTS 
									product.setItem("token",token);//push the token to the database 
								
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
					//pop up window with selection
					$( "#confirm-member" ).popup( "open");
                }else{
	                me.$ctnErr.html("<p>Oops! It looks like your leader hasn't added members yet.</p>");
                    me.$ctnErr.addClass("bi-ctn-err").slideDown();
                }
                return;
            } else {
                if (resp.extras.msg) {
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
        },
        error: function (e) {
            $.mobile.loading("hide");
            console.log(e);
            // TODO: Use a friendlier error message below.
            me.$ctnErr.html("<p>Oops! It looks like we had a problem and could not log you on.  Please try again in a few minutes. ("+e+")</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};
// keep startup url (in case your app is an SPA with html5 url routing)
var initialHref = window.location.href;

function restartApplication() {
  // Show splash screen (useful if your app takes time to load) 
  //navigator.splashscreen.show();
  // Reload original app url (ie your index.html file)
  window.location = initialHref;
}

//sign out button
$(".signOut").on('click', function(){ 
	console.log("sign-out");
	//page-signin
	//empty the cart
	$('.emptyCart').click();
	window.localStorage.removeItem('mickman-session');//remove the session key
	$(".orderList").addClass("hidden");
	//$(':mobile-pagecontainer').pagecontainer('change', '#page-signin',{ reloadPage:true });//go to next page
	$(':mobile-pagecontainer').pagecontainer('change', '#page-signin');//go to next page
	//restartApplication();
});
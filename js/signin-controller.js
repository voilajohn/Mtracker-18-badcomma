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
        invalidInput = false,
        invisibleStyle = "bi-invisible",
        invalidInputStyle = "bi-invalid-input";

    // Reset styles.
    me.$ctnErr.removeClass().addClass(invisibleStyle);
    me.$txtUserName.removeClass(invalidInputStyle);
    me.$txtPassword.removeClass(invalidInputStyle);

    if (userName.length === 0) {
        me.$txtUserName.addClass(invalidInputStyle);
        invalidInput = true;
        console.log("empty user");
    }
    
    // check that there is a password entered.
    if (password.length === 0) {
        me.$txtPassword.addClass(invalidInputStyle);
        invalidInput = true;
        console.log("empty pass");
    }
    
    // Make sure that all the required fields have values.
    if (invalidInput) {
        me.$ctnErr.html("<p>Please enter all the required fields.</p>");
        me.$ctnErr.addClass("bi-ctn-err").slideDown();
        return;
    }

    $.mobile.loading("show");
    $.ajax({
        type: 'POST',
        url: MickmanAppLogin.Settings.signInUrl,
        data: "user=" + userName + "&password=" + password,
        success: function (resp) {
	        
            $.mobile.loading("hide");
            console.log(resp);
            if (resp.success === true) {
                // If the login method changes this part can be skipped
                if(resp.extras.users){//build out the menu
	                 $('#select-choice-1').html(""); //prevent big lists from multiple logins
	                var users = resp.extras.users;
	                $.each(users, function(bb){
		                var Uname = (users[bb]);
		                $('#select-choice-1').append('<option value="'+Uname+'">'+Uname+'</option>');
		            });
		            $(".mygroup").html(resp.extras.cust_id);
		            $('#select-choice-1').selectmenu("refresh"); //make sure that the items load
                	
                	$(".startSession").click(function(){//Now lets assign a function to the button - they need to choose a user
	                	//put the additional stuff into the DB
		                app.catalogController.storeData(resp.extras.products);
	                	//lets get the selected name and create the session variable.
	                	var today = new Date();
		                var expirationDate = new Date();
		                expirationDate.setTime(today.getTime() + MickmanAppLogin.Settings.sessionTimeoutInMSec);
		                
		                //left save all this stuff to a local database to get later.
		
		                MickmanAppLogin.Session.getInstance().set({
		                    userProfileModel:  $('#select-choice-1').val(),
		                    sessionId: resp.extras.sessionId,
		                    expirationDate: expirationDate,
		                    keepSignedIn:me.$chkKeepSignedIn.is(":checked")
		                });
		                
						// if that is successful we will reroute them to the catalog page
		                $.mobile.navigate(me.mainMenuPageId);
                	});
					//pop up window with selection
					$( "#confirm-member" ).popup( "open");
                }else{
	                me.$ctnErr.html("<p>Oops! It looks like your leader hasn't added members yet.</p>");
                    me.$ctnErr.addClass("bi-ctn-err").slideDown();
                }
                return;
            } else {
	            //console.log("should be an error here");
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
            me.$ctnErr.html("<p>Oops! It looks like we had a problem and could not log you on.  Please try again in a few minutes.</p>");
            me.$ctnErr.addClass("bi-ctn-err").slideDown();
        }
    });
};